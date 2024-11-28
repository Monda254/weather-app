'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WeatherDisplay from '@/components/weather-display'
import { useToast } from '@/components/ui/use-toast'

export default function RecentSearchesPage() {
  const [recentSearches, setRecentSearches] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const response = await fetch('/api/recent')
        const data = await response.json()

        if (response.ok) {
          setRecentSearches(data)
        } else {
          toast({
            title: 'Error',
            description: 'Failed to fetch recent searches',
            variant: 'destructive',
          })
        }
      } catch (err) {
        toast({
          title: 'Error',
          description: 'An error occurred while fetching recent searches',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRecentSearches()
  }, [toast])

  if (loading) {
    return <div>Loading recent searches...</div>
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Recent Searches</CardTitle>
        </CardHeader>
        <CardContent>
          {recentSearches.length === 0 ? (
            <p>No recent searches found.</p>
          ) : (
            recentSearches.map((search) => (
              <WeatherDisplay key={search.id} data={search} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

