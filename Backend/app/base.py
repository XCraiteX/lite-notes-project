from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import select
import json
import asyncpg

from app.settings import *
from app.models import *
from app.schemas import *
from app.protection import * 
from app.network import *

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

async def get_notes_json_data():

    with open('data/notes.json', 'r') as f:
        json_data = json.load(f)

        return json_data

async def get_notes_names(email: str):

    async with session() as db:

        result = await db.execute(select(Notes).filter(Notes.email == email))        
        objects = result.scalars().all()

    notes = []

    json_data = await get_notes_json_data()

    for obj in objects:
        note = json_data[obj.key]
        note['key'] = obj.key 

        notes.append(note)
   
    return { 'status': 'OK', 'notes': notes }
    

async def get_note_data_by_id(note_id, owner):
    
    json_data = await get_notes_json_data()

    note = json_data[note_id]

    return { 'status': 'OK', 'name': note['name'], 'content': note['content'], 'owner':  owner}


async def create_note(email, name, content):

    id = await generate_note_id()

    json_data = await get_notes_json_data()

    json_data[id] = { "name": name, "content": content }  

    with open('data/notes.json', 'w') as f:
        json.dump(json_data, f, indent=4)


    async with session() as db:
        obj = Notes(email=email, key=id)
        db.add(obj)

        await db.commit()

    return { 'status': 'OK' }


async def edit_note(note_id, new_data: Note):

    json_data = await get_notes_json_data()

    json_data[note_id]['name'] = new_data.name
    json_data[note_id]['content'] = new_data.content

    with open('data/notes.json', 'w') as f:
        json.dump(json_data, f, indent=4)

        return { 'status': 'OK', 'details': 'Successfully saved' }