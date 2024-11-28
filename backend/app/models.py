from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from .database import Base

class Weather(Base):
    __tablename__ = "weather"

    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, index=True)
    temperature = Column(Float)
    description = Column(String)
    humidity = Column(Float)
    wind_speed = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

