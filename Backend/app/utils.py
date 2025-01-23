import string
import random 

SYMBOLS = string.ascii_letters + string.digits

async def generate_key():
    chars = [SYMBOLS[random.randint(0, len(SYMBOLS))] for x in range(len(SYMBOLS))]    
    key = ''.join(chars)

    return key 