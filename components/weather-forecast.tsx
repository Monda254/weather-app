import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { weatherIcons } from '@/lib/weather-icons'

interface ForecastData {
  list: Array<{
    dt: number
    main: { temp: number }
    weather: Array<{ main: string; description: string }>
  }>
}

interface WeatherForecastProps {
  data: ForecastData
  units: 'metric' | 'imperial'
}

export default function WeatherForecast({ data, units }: WeatherForecastProps) {
  const tempUnit = units === 'metric' ? '°C' : '°F'

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {data.list.filter((_, index) => index % 8 === 0).map((day) => {
            const WeatherIcon = weatherIcons[day.weather[0].main] || weatherIcons.Default
            return (
              <div key={day.dt} className="text-center">
                <div className="font-semibold">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <WeatherIcon className="h-8 w-8 mx-auto my-2 text-primary" />
                <div>{Math.round(day.main.temp)}{tempUnit}</div>
                <div className="text-xs capitalize">{day.weather[0].description}</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

