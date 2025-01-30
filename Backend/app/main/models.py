from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy.types import String, Integer
from sqlalchemy.dialects.postgresql import ARRAY
from typing import List

class Base(DeclarativeBase):
    pass 

class Logins(Base):
    __tablename__ = 'logins'
    
    email: Mapped[String] = mapped_column(String, primary_key=True)
    password: Mapped[String] = mapped_column(String)
    session: Mapped[String] = mapped_column(String)

class Notes(Base):
    __tablename__ = 'notes'

    key: Mapped[String] = mapped_column(String, primary_key=True)
    email: Mapped[String] = mapped_column(String)