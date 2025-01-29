from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import select
import json
import asyncpg

from app.settings import *
from app.models import *
from app.schemas import *
from app.protection import * 

engine = create_async_engine(url='postgresql+asyncpg://postgres:password@localhost:5432/postgres')
session = async_sessionmaker(bind=engine, class_=AsyncSession)

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def check_register(email: str, password: str):

    async with session() as db:
        result = await db.execute(select(Logins).filter(Logins.email == email))
        obj = result.scalars().first()

        if not obj:
            return False

        return True
            

async def register_user(email: str, password: str):

    hashed_password = await hash_password(password)
    session_code = await generate_session_key()

    if await check_register(email, password):
        return { 
            'status': 'Error',
              'details': 'Account already registered' 
            }

    async with session() as db:
        login_obj = Logins(email=email, password=hashed_password, session=session_code)
        
        db.add_all([login_obj])

        await db.commit()

        return { 'status': 'OK', 'details': 'Account successfully registered' }


async def login_user(email: str, password: str):
    async with session() as db:

        result = await db.execute(select(Logins).filter(Logins.email == email))
        obj = result.scalars().first()

        if await check_password(password, obj.password):
            return obj.session

        return False 

async def get_session_data(session_id: str):
    async with session() as db:

        result = await db.execute(select(Logins).filter(Logins.session == session_id))
        user_data = result.scalars().first()

        return user_data
    

async def check_session_valid(session_id: str) -> bool:
    user_data = await get_session_data(session_id)

    if user_data:
        return True
    
    return False



async def create_note(email, name, content):

    id = await generate_note_id()

    with open('data/notes.json', 'r') as f:
        json_data = json.load(f)

        json_data[id] = { "name": name, "content": content }  

    with open('data/notes.json', 'w') as f:
        json.dump(json_data, f, indent=4)


    async with session() as db:
        obj = Notes(email=email, key=id)
        db.add(obj)

        await db.commit()

    return { 'status': 'OK' }
