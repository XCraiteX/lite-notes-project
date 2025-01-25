import string
import random 
import bcrypt

SYMBOLS = string.ascii_letters + string.digits

async def generate_key():
    chars = [SYMBOLS[random.randint(0, len(SYMBOLS))] for x in range(KEY_LENGTH)]    
    key = ''.join(chars)

    return key 


async def hash_password(password):

    salt = bcrypt.gensalt()

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    return hashed_password.decode('utf-8')


async def check_password(password, hashed_password):
    
    if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
        return True
    
    return False