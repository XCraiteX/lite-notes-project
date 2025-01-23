from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
import json
import asyncpg



engine = create_async_engine(url='postgresql+asyncpg://postgres:password@localhost:5432/postgres')
session = async_sessionmaker(bind=engine, class_=AsyncSession)

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync()