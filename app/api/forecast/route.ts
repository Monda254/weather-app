import { NextResponse } from 'next/server'

const API_KEY = process.env.OPENWEATHERMAP_API_KEY
const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const units = searchParams.get('units') || 'metric'

  if (!city) {
    return NextResponse.json({ message: 'City parameter is required' }, { status: 400 })
  }

  if (!API_KEY) {
    console.error('OpenWeatherMap API key is missing')
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 })
  }

  const params = new URLSearchParams({
    q: city,
    appid: API_KEY,
    units: units,
  })

  try {
    const response = await fetch(`${BASE_URL}?${params}`)
    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      console.error('OpenWeatherMap API error:', data.message)
      return NextResponse.json({ message: data.message }, { status: response.status })
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error)
    return NextResponse.json({ message: 'An error occurred while fetching forecast data' }, { status: 500 })
  }
}

