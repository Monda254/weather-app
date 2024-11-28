import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react'

export const weatherIcons: { [key: string]: React.ElementType } = {
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
  Default: Cloud,
}

