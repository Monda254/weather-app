import { useState, useEffect } from 'react'

interface Settings {
  units: 'metric' | 'imperial'
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('weatherAppSettings')
      return savedSettings ? JSON.parse(savedSettings) : { units: 'metric' }
    }
    return { units: 'metric' }
  })

  useEffect(() => {
    localStorage.setItem('weatherAppSettings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }))
  }

  return { settings, updateSettings }
}

