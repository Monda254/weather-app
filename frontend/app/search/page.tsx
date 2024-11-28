'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WeatherDisplay from '@/components/weather-display'
import { useToast } from '@/components/ui/use-toast'

export default function SearchPage() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: city }),
      })

      const data = await response.json()

      if (response.ok) {
        setWeatherData(data)
      } else {
        toast({
          title: 'Error',
          description: data.detail || 'Failed to fetch weather data',
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

      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  )
}

