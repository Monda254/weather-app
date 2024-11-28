from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, database
from typing import List
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/weather", response_model=schemas.WeatherResponse)
async def get_weather(city: schemas.CityInput, db: Session = Depends(get_db)):
    api_key = os.getenv("OPENWEATHERMAP_API_KEY")
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{base_url}?q={city.name}&appid={api_key}&units=metric")
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch weather data")
    
    weather_data = response.json()
    
    # Save the weather data to the database
    db_weather = models.Weather(
        city=city.name,
        temperature=weather_data["main"]["temp"],
        description=weather_data["weather"][0]["description"],
        humidity=weather_data["main"]["humidity"],
        wind_speed=weather_data["wind"]["speed"]
    )
    db.add(db_weather)
    db.commit()
    db.refresh(db_weather)
    
    return db_weather

@app.get("/api/recent", response_model=List[schemas.WeatherResponse])
def get_recent_searches(db: Session = Depends(get_db)):
    recent_searches = db.query(models.Weather).order_by(models.Weather.id.desc()).limit(5).all()
    return recent_searches

