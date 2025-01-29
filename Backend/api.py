from fastapi import FastAPI, Request
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.base import *
from app.schemas import *

origins = [
    "http://localhost:3000",  
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"])


@app.on_event('startup')
async def startup():
    await create_tables()


@app.get('/me')
async def check_authorized(request: Request):
    
    session_id = request.cookies.get('session')

    if session_id:
        status = await check_session_valid(session_id)

        return { 'status': 'OK', 'authorized': status }

    return { 'status': 'OK', 'authorized': False }
    

@app.get('/get_profile')
async def get_profile(request: Request):

    session_id = request.cookies.get('session')

    if not session_id:
        return { 'status': 'Error' }
    
    status = await check_session_valid(session_id)

    if not status:
        return { 'status': 'Error' }
    
    user_data = await get_session_data(session_id)

    return { 'status': 'OK', 'email': user_data.email }



@app.post('/create_note')
async def create_new_note(request: Request, note_props: Note):
    
    session_id = request.cookies.get('session')

    if not session:
        return { 'status': 'Error' }

    status = await check_session_valid(session_id)

    if not status:
        return { 'status': 'Error' }
    
    user_data = await get_session_data(session_id)

    result = await create_note(user_data.email, note_props.name, note_props.content)
    
    return result


@app.post('/register')
async def register(reg: Registration):

    result = await register_user(reg.email, reg.password)

    return result 


@app.post('/login')
async def login(login: Login, response: Response):

    if not await check_register(login.email, login.password):
        return {
            'status': 'Error',
            'details': 'No registered account'
        }

    session = await login_user(login.email, login.password)

    if session:
        response.set_cookie(key='session', value=session, httponly=True)
        print(response.body)

        return {'status': 'OK', 'session': session}
    
    return {'status': 'Error', 'details': 'Incorrect password'}

