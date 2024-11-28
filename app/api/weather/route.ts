import { NextResponse } from 'next/server'

const API_KEY = process.env.OPENWEATHERMAP_API_KEY
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')

  if (!city) {
    return NextResponse.json({ message: 'City parameter is required' }, { status: 400 })
  }

  const params = new URLSearchParams({
    q: city,
    appid: API_KEY!,
    units: 'metric',
  })

  try {
    const response = await fetch(`${BASE_URL}?${params}`)
    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ message: data.message }, { status: response.status })
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json({ message: 'An error occurred while fetching weather data' }, { status: 500 })
  }
}

