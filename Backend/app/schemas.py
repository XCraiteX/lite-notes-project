from pydantic import BaseModel, EmailStr

class Registration(BaseModel):
    email: EmailStr
    password: str 

class Login(BaseModel):
    email: str 
    password: str 

class Note(BaseModel):
    name: str
    content: str 