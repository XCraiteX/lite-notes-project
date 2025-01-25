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

    if await check_register(email, password):
        return { 
            'status': 'Error',
              'details': 'Account already registered' 
            }

    async with session() as db:
        login_obj = Logins(email=email, password=hashed_password)
        user_obj = Users(email=email, notes=[])
        
        db.add_all([login_obj, user_obj])

        await db.commit()

        return { 'status': 'OK' }


async def login_user(email: str, password: str):

    if not await check_register(email, password):
        return {
            'status': 'Error',
            'details': 'No registered account'
        }

    hashed_password = await hash_password(password)

    async with session() as db:
        result = await db.execute(select(Logins).filter(Logins.email == email))
        obj = result.scalars().first()

        if await check_password(password, obj.password):

            pass





async def create_note():
    async with session() as db:

        pass 

