async def session_cookie_check(request, get_session_data_func):
    
    session_id = request.cookies.get('session')

    if not session_id:
        return False

    status = await check_session_valid(session_id, get_session_data_func)

    if not status:
        return False
    
    return True


async def check_session_valid(session_id: str, get_session_data_func) -> bool:
    user_data = await get_session_data_func(session_id)

    if user_data:
        return True
    
    return False


async def get_session_id(request):

    session_id = request.cookies.get('session')

    return session_id