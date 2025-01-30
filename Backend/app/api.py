from fastapi import FastAPI, Request
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.main.base import *
from app.main.schemas import *
from app.main.protection import *

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
    print('Started!')
    await create_tables()


@app.get('/me')
async def check_authorized(request: Request):
    
    result = await session_cookie_check(request, get_session_data)

    if result:
        return { 'status': 'OK', 'authorized': True }

    return { 'status': 'OK', 'authorized': False }
    

@app.get('/get_profile')
async def get_profile(request: Request):

    result = session_cookie_check(request, get_session_data)
    
    user_data = await get_session_data(await get_session_id(request))

    return { 'status': 'OK', 'email': user_data.email }


@app.get('/get_notes')
async def get_all_notes(request: Request):

    await session_cookie_check(request, get_session_data)

    user_data = await get_session_data(await get_session_id(request))
    email = user_data.email

    result = await get_notes_names(email)

    return result


@app.get('/note')
async def get_note_data(request: Request, id):

    owner = await session_cookie_check(request, get_session_data)

    result = await get_note_data_by_id(id, owner)

    return result


@app.put('/edit_note')
async def edit_note_req(request: Request, id, note_props: Note):

    owner = await session_cookie_check(request, get_session_data)

    if not owner:
        return { 'status': 'Error', 'details': 'No rights to edit' }

    result = await edit_note(id, note_props)

    return result



@app.post('/create_note')
async def create_new_note(request: Request, note_props: Note):
    
    result = await session_cookie_check(request, get_session_data)

    if result:
        user_data = await get_session_data(await get_session_id(request))

        response = await create_note(user_data.email, note_props.name, note_props.content)
    
    return response


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

        return {'status': 'OK', 'session': session}
    
    return {'status': 'Error', 'details': 'Incorrect password'}


@app.get('/logout')
async def logout(response: Response):
    
    response.delete_cookie('session')

    return { 'status': 'OK' }
