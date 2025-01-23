from fastapi import FastAPI
from fastapi.middleware import Middleware

from app.base import *
from app.schemas import *


app = FastAPI()

@app.on_event('startup')
async def startup():
    await create_tables()

@app.post('/create')
async def create_note(login: Login):
    pass 


@app.post('/register')
async def register(reg: Registration):
    await register_user(reg.login, reg.email, reg.password)
    
    print(f'login: {reg.login}\nemail: {reg.email}\npassword: {reg.password}')



@app.post('/login')
async def login(login: Login):
    print(f'login: {login.login}\npassword: {login.password}')