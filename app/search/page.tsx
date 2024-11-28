'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WeatherDisplay from '@/components/weather-display'
import WeatherForecast from '@/components/weather-forecast'
import { useToast } from '@/components/ui/use-toast'
import { useSettings } from '@/hooks/use-settings'

export default function SearchPage() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { settings } = useSettings()

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`/api/weather?city=${encodeURIComponent(city)}&units=${settings.units}`),
        fetch(`/api/forecast?city=${encodeURIComponent(city)}&units=${settings.units}`)
      ])

      const weatherData = await weatherResponse.json()
      const forecastData = await forecastResponse.json()

      if (weatherResponse.ok && forecastResponse.ok) {
        setWeatherData(weatherData)
        setForecastData(forecastData)
      } else {
        toast({
          title: 'Error',
          description: weatherData.message || forecastData.message || 'Failed to fetch weather data',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An error occurred while fetching weather data. Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Search Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={fetchWeather} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : <Search className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>

      {weatherData && <WeatherDisplay data={weatherData} units={settings.units} />}
      {forecastData && <WeatherForecast data={forecastData} units={settings.units} />}
    </div>
  )
}

