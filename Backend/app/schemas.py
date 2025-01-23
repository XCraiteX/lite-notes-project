from pydantic import BaseModel, EmailStr

class Login(BaseModel):
    login: str
    email: EmailStr
    password: str 

