from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy.types import String, Integer
from typing import List

class Base(DeclarativeBase):
    pass 

class Logins(Base):
    __tablename__ = 'logins'
    
    login: Mapped[String] = mapped_column(String, primary_key=True)
    email: Mapped[String] = mapped_column(String)
    password: Mapped[String] = mapped_column(String)


class Users(Base):
    __tablename__ = 'users'

    login: Mapped[String] = mapped_column(String, primary_key=True)
    notes: Mapped[List[String]] = mapped_column(List[String])
    