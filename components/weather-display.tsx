import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react'

const weatherIcons: { [key: string]: React.ElementType } = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Thunderstorm: CloudLightning,
  Drizzle: CloudRain,
  Mist: Wind,
  Smoke: Wind,
  Haze: Wind,
  Dust: Wind,
  Fog: Wind,
  Sand: Wind,
  Ash: Wind,
  Squall: Wind,
  Tornado: Wind,
}

interface WeatherData {
  name: string
  sys: { country: string }
  main: { temp: number; feels_like: number; humidity: number }
  weather: [{ description: string; main: string }]
  wind: { speed: number }
}

export default function WeatherDisplay({ data }: { data: WeatherData }) {
  const WeatherIcon = weatherIcons[data.weather[0].main] || Cloud

  return (
    <div className="mt-4 text-center">
      <h2 className="text-2xl font-semibold mb-2">
        {data.name}, {data.sys.country}
      </h2>
      <div className="flex justify-center items-center mb-4">
        <WeatherIcon className="h-16 w-16 text-blue-500 mr-2" />
        <span className="text-4xl font-bold">{Math.round(data.main.temp)}°C</span>
      </div>
      <p className="text-lg capitalize mb-2">{data.weather[0].description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Feels like: {Math.round(data.main.feels_like)}°C</div>
        <div>Humidity: {data.main.humidity}%</div>
        <div>Wind speed: {data.wind.speed} m/s</div>
      </div>
    </div>
  )
}

