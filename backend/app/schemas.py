from pydantic import BaseModel
from datetime import datetime

class CityInput(BaseModel):
    name: str

class WeatherResponse(BaseModel):
    id: int
    city: str
    temperature: float
    description: str
    humidity: float
    wind_speed: float
    timestamp: datetime

    class Config:
        orm_mode = True

