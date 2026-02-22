"use client"

import { useEffect, useState } from "react"
import { Cloud, CloudRain, CloudSnow, Sun, Thermometer } from "lucide-react"

type WeatherData = {
  maxTemp: number
  minTemp: number
  weatherCode: number
}

// Mapping location names to coordinates
const COORDINATES: Record<string, { lat: number; lng: number }> = {
  Sapporo: { lat: 43.0618, lng: 141.3545 },
  Asahikawa: { lat: 43.7706, lng: 142.3649 },
  Biei: { lat: 43.5908, lng: 142.4687 },
  Furano: { lat: 43.3421, lng: 142.3832 },
  Otaru: { lat: 43.1907, lng: 140.9947 },
  Osaka: { lat: 34.6937, lng: 135.5023 },
  Kyoto: { lat: 35.0116, lng: 135.7681 },
  USJ: { lat: 34.6654, lng: 135.4323 },
}

function getWeatherIcon(code: number) {
  // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
  if (code <= 3) return <Sun className="w-4 h-4 text-amber-500" />
  if (code >= 71 && code <= 77) return <CloudSnow className="w-4 h-4 text-blue-300" />
  if (code >= 85 && code <= 86) return <CloudSnow className="w-4 h-4 text-blue-300" />
  if (code >= 51 && code <= 67) return <CloudRain className="w-4 h-4 text-blue-500" />
  if (code >= 80 && code <= 82) return <CloudRain className="w-4 h-4 text-blue-500" />
  return <Cloud className="w-4 h-4 text-gray-400" />
}

export function WeatherWidget({
  dateStr,
  locationStr,
  lang,
}: {
  dateStr: string
  locationStr: string
  lang: "en" | "zh"
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Parse Date (e.g., "2/27" -> "2025-02-27")
    const [month, day] = dateStr.split("/")
    const year = "2025"
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`

    // 2. Find Coordinates
    // Handle "Asahikawa → Biei" by taking the first known city
    const cityKey = Object.keys(COORDINATES).find((key) =>
      locationStr.includes(key)
    )
    const coords = cityKey ? COORDINATES[cityKey] : null

    if (!coords) {
      setLoading(false)
      return
    }

    // 3. Fetch Data from Open-Meteo
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords!.lat}&longitude=${coords!.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&start_date=${formattedDate}&end_date=${formattedDate}&timezone=auto`
        )
        const data = await res.json()
        
        if (data.daily) {
          setWeather({
            maxTemp: data.daily.temperature_2m_max[0],
            minTemp: data.daily.temperature_2m_min[0],
            weatherCode: data.daily.weather_code[0],
          })
        }
      } catch (e) {
        console.error("Weather fetch failed", e)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [dateStr, locationStr])

  if (loading) return <div className="animate-pulse w-16 h-4 bg-gray-200 rounded" />
  if (!weather) return null

  return (
    <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
      {getWeatherIcon(weather.weatherCode)}
      <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
        <span className="text-blue-500">{Math.round(weather.minTemp)}°</span>
        <span className="text-gray-300">/</span>
        <span className="text-amber-500">{Math.round(weather.maxTemp)}°</span>
      </div>
    </div>
  )
}
