from pydantic import BaseModel, EmailStr

class Registration(BaseModel):
    login: str
    email: EmailStr
    password: str 

class Login(BaseModel):
    email: str 
    password: str 