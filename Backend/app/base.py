from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
import json
import asyncpg

from app.models import *
from app.schemas import *
from app.utils import * 

engine = create_async_engine(url='postgresql+asyncpg://postgres:password@localhost:5432/postgres')
session = async_sessionmaker(bind=engine, class_=AsyncSession)

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def register_user(login: str, email: str, password: str):
    
    async with session() as db:
        login_obj = Logins(login=login, email=email, password=password)
        user_obj = Users(login=login, notes=[])
        
        db.add_all([login_obj, user_obj])

        await db.commit()


async def create_note():
    async with session() as db:

        pass 

