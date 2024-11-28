'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WeatherDisplay from '@/components/weather-display'

export default function Home() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (response.ok) {
        setWeatherData(data)
      } else {
        setError(data.message || 'Failed to fetch weather data')
      }
    } catch (err) {
      setError('An error occurred while fetching weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-100 to-blue-200">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Weather Forecast</CardTitle>
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {weatherData && <WeatherDisplay data={weatherData} />}
        </CardContent>
      </Card>
    </main>
  )
}

