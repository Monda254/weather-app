import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { weatherIcons } from '@/lib/weather-icons'

interface WeatherData {
  city: string
  temperature: number
  description: string
  humidity: number
  wind_speed: number
}

interface WeatherDisplayProps {
  data: WeatherData
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  const WeatherIcon = weatherIcons[data.description] || weatherIcons.Default

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {data.city}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <WeatherIcon className="h-16 w-16 text-primary mr-2" />
          <span className="text-4xl font-bold">{Math.round(data.temperature)}°C</span>
        </div>
        <p className="text-lg capitalize mb-2 text-center">{data.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Humidity: {data.humidity}%</div>
          <div>Wind speed: {data.wind_speed} m/s</div>
        </div>
      </CardContent>
    </Card>
  )
}

