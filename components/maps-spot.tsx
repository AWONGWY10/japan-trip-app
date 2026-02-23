"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Plus, Trash2, ExternalLink, Loader2, Navigation, X } from "lucide-react"
import type { CustomSpot } from "@/lib/itinerary-data"
import { useTripSpots } from "@/hooks/use-trip-storage"

type Lang = "en" | "zh"

/**
 * Parse a Google Maps URL to extract place name and coordinates.
 * Supports various Google Maps URL formats:
 * - https://www.google.com/maps/place/Place+Name/@lat,lng,...
 * - https://www.google.com/maps?q=place+name
 * - https://maps.google.com/?q=lat,lng
 * - https://maps.app.goo.gl/... (short links - name must be entered manually)
 * - https://goo.gl/maps/... (short links)
 */
function parseGoogleMapsUrl(input: string): { name: string; lat?: number; lng?: number; url: string } | null {
  try {
    // 1. Extract URL if mixed with text (common on mobile share: "Check out this place https://...")
    const urlMatch = input.match(/https?:\/\/(www\.)?(google\.com\/maps|maps\.google\.com|goo\.gl\/maps|maps\.app\.goo\.gl)[^\s]*/)
    const url = urlMatch ? urlMatch[0] : input.trim()

    // Check if it's a Google Maps URL
    const isGoogleMaps =
      url.includes("google.com/maps") ||
      url.includes("maps.google") ||
      url.includes("goo.gl/maps") ||
      url.includes("maps.app.goo.gl")

    if (!isGoogleMaps) return null

    // Try to extract from /place/Name/@lat,lng pattern
    const placeMatch = url.match(/\/place\/([^/@]+)\/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
    if (placeMatch) {
      return {
        name: decodeURIComponent(placeMatch[1]).replace(/\+/g, " "),
        lat: parseFloat(placeMatch[2]),
        lng: parseFloat(placeMatch[3]),
        url,
      }
    }

    // Try /place/Name pattern without coordinates
    const placeNameOnly = url.match(/\/place\/([^/@?]+)/)
    if (placeNameOnly) {
      return {
        name: decodeURIComponent(placeNameOnly[1]).replace(/\+/g, " "),
        url,
      }
    }

    // Try ?q=lat,lng or ?q=place+name
    const qMatch = url.match(/[?&]q=([^&]+)/)
    if (qMatch) {
      const qVal = decodeURIComponent(qMatch[1]).replace(/\+/g, " ")
      const coordMatch = qVal.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/)
      if (coordMatch) {
        return {
          name: `Location (${parseFloat(coordMatch[1]).toFixed(4)}, ${parseFloat(coordMatch[2]).toFixed(4)})`,
          lat: parseFloat(coordMatch[1]),
          lng: parseFloat(coordMatch[2]),
          url,
        }
      }
      return { name: qVal, url }
    }

    // Try @lat,lng in URL
    const atMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
    if (atMatch) {
      return {
        name: `Location (${parseFloat(atMatch[1]).toFixed(4)}, ${parseFloat(atMatch[2]).toFixed(4)})`,
        lat: parseFloat(atMatch[1]),
        lng: parseFloat(atMatch[2]),
        url,
      }
    }

    // Short link - can't resolve client-side, just accept it
    if (url.includes("goo.gl") || url.includes("maps.app")) {
      return { name: "", url } // Will prompt user to name it
    }

    return null
  } catch {
    return null
  }
}

function SpotCard({
  spot,
  region,
  onDelete,
}: {
  spot: CustomSpot
  region: "hokkaido" | "kansai"
  onDelete: () => void
}) {
  const isHokkaido = region === "hokkaido"

  return (
    <div
      className={`group flex items-start gap-3 p-3 rounded-xl border-2 border-dashed transition-all animate-slide-down ${
        isHokkaido
          ? "border-hokkaido-accent/30 bg-hokkaido-accent/5 hover:border-hokkaido-accent/50"
          : "border-kansai-accent/30 bg-kansai-accent/5 hover:border-kansai-accent/50"
      }`}
    >
      {/* Map pin with pulse */}
      <div className="flex-shrink-0 relative mt-0.5">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isHokkaido ? "bg-hokkaido-accent/20" : "bg-kansai-accent/20"
          }`}
        >
          <Navigation
            className={`w-4 h-4 ${
              isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
            }`}
          />
        </div>
        {/* Small "custom" badge */}
        <div
          className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold ${
            isHokkaido
              ? "bg-hokkaido-accent text-white"
              : "bg-kansai-accent text-white"
          }`}
        >
          +
        </div>
      </div>

      {/* Spot info */}
      <div className="flex-1 min-w-0">
        <span
          className={`font-medium text-sm leading-snug block ${
            isHokkaido ? "text-hokkaido-text" : "text-kansai-text"
          }`}
        >
          {spot.name}
        </span>
        
        <div className="flex items-center gap-2 mt-1">
          {spot.lat && spot.lng && (
            <span
              className={`text-[10px] font-mono ${
                isHokkaido ? "text-hokkaido-text-muted/60" : "text-kansai-text-muted/60"
              }`}
            >
              {spot.lat.toFixed(4)}, {spot.lng.toFixed(4)}
            </span>
          )}
          <a
            href={spot.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1 text-[10px] font-semibold transition-colors ${
              isHokkaido
                ? "text-hokkaido-accent hover:text-hokkaido-accent/80"
                : "text-kansai-accent hover:text-kansai-accent/80"
            }`}
          >
            <ExternalLink className="w-3 h-3" />
            Google Maps
          </a>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ${
          isHokkaido
            ? "hover:bg-red-50 text-red-400 hover:text-red-500"
            : "hover:bg-red-900/20 text-red-400 hover:text-red-300"
        }`}
        aria-label="Remove spot"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export function MapsSpotAdder({
  dayId,
  lang,
  region,
}: {
  dayId: number
  lang: Lang
  region: "hokkaido" | "kansai"
}) {
  const { spots, addSpot, removeSpot } = useTripSpots(dayId)
  const [inputUrl, setInputUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)
  const [customName, setCustomName] = useState("")
  const [pendingParsed, setPendingParsed] = useState<{
    name: string
    lat?: number
    lng?: number
    url: string
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const isHokkaido = region === "hokkaido"

  const handleSubmitUrl = () => {
    const url = inputUrl.trim()
    if (!url) return

    setError("")
    setIsLoading(true)

    // Simulate a brief loading state
    setTimeout(() => {
      const parsed = parseGoogleMapsUrl(url)

      if (!parsed) {
        setError(
          lang === "en"
            ? "Not a valid Google Maps link. Please paste a Google Maps URL."
            : "无效的 Google Maps 链接，请粘贴正确的 Google 地图 URL。"
        )
        setIsLoading(false)
        return
      }

      if (!parsed.name) {
        // Short link or no name found - ask user to name it
        setPendingParsed({ ...parsed, url: parsed.url })
        setShowNameInput(true)
        setIsLoading(false)
        setInputUrl("")
        setTimeout(() => nameInputRef.current?.focus(), 100)
        return
      }

      addSpot(parsed.name, parsed.url, parsed.lat, parsed.lng)
      
      setInputUrl("")
      setIsLoading(false)
    }, 600)
  }

  const handleNameSubmit = () => {
    if (!pendingParsed || !customName.trim()) return
    addSpot(
      customName.trim(),
      pendingParsed.url,
      pendingParsed.lat,
      pendingParsed.lng
    )
    setCustomName("")
    setShowNameInput(false)
    setPendingParsed(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmitUrl()
    }
  }

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleNameSubmit()
    }
    if (e.key === "Escape") {
      setShowNameInput(false)
      setPendingParsed(null)
      setCustomName("")
    }
  }

  return (
    <div className="mx-4 mb-4">
      {/* Custom spots list */}
      {spots.length > 0 && (
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <MapPin
              className={`w-3.5 h-3.5 ${
                isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
              }`}
            />
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider ${
                isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
              }`}
            >
              {lang === "en"
                ? `Custom Spots (${spots.length})`
                : `自定义地点 (${spots.length})`}
            </span>
          </div>
          {spots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              region={region}
              onDelete={() => removeSpot(spot.id)}
            />
          ))}
        </div>
      )}

      {/* Name input overlay when short link detected */}
      {showNameInput && (
        <div
          className={`flex items-center gap-2 mb-3 p-3 rounded-xl border-2 ${
            isHokkaido
              ? "border-hokkaido-accent bg-hokkaido-accent/5"
              : "border-kansai-accent bg-kansai-accent/5"
          }`}
        >
          <input
            ref={nameInputRef}
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={handleNameKeyDown}
            placeholder={
              lang === "en" ? "Name this spot..." : "为这个地点命名..."
            }
            className={`flex-1 px-3 py-1.5 rounded-lg text-base md:text-xs border focus:outline-none ${
              isHokkaido
                ? "bg-hokkaido-card border-hokkaido-accent-soft text-hokkaido-text placeholder:text-hokkaido-text-muted/50 focus:border-hokkaido-accent"
                : "bg-kansai-card border-kansai-accent/30 text-kansai-text placeholder:text-kansai-text-muted/50 focus:border-kansai-accent"
            }`}
          />
          <button
            onClick={handleNameSubmit}
            disabled={!customName.trim()}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40 ${
              isHokkaido
                ? "bg-hokkaido-accent text-white hover:bg-hokkaido-accent/90"
                : "bg-kansai-accent text-white hover:bg-kansai-accent/90"
            }`}
          >
            {lang === "en" ? "Add" : "添加"}
          </button>
          <button
            onClick={() => {
              setShowNameInput(false)
              setPendingParsed(null)
              setCustomName("")
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isHokkaido
                ? "text-hokkaido-text-muted hover:bg-hokkaido-accent-soft/30"
                : "text-kansai-text-muted hover:bg-kansai-accent/10"
            }`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* URL Input */}
      <div
        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-dashed transition-all ${
          isHokkaido
            ? "border-hokkaido-accent-soft/40 hover:border-hokkaido-accent/40 bg-hokkaido-accent-soft/5"
            : "border-kansai-accent/20 hover:border-kansai-accent/40 bg-kansai-accent/5"
        }`}
      >
        {isLoading ? (
          <Loader2
            className={`w-4 h-4 flex-shrink-0 animate-spin ${
              isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
            }`}
          />
        ) : (
          <Plus
            className={`w-4 h-4 flex-shrink-0 ${
              isHokkaido ? "text-hokkaido-accent/60" : "text-kansai-accent/60"
            }`}
          />
        )}
        <input
          ref={inputRef}
          type="text"
          inputMode="url"
          enterKeyHint="go"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value)
            setError("")
          }}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={
            lang === "en"
              ? "Paste Google Maps link to add a spot..."
              : "粘贴 Google Maps 链接添加地点..."
          }
          className={`flex-1 bg-transparent text-base md:text-xs focus:outline-none disabled:opacity-50 ${
            isHokkaido
              ? "text-hokkaido-text placeholder:text-hokkaido-text-muted/40"
              : "text-kansai-text placeholder:text-kansai-text-muted/40"
          }`}
        />
        {inputUrl && !isLoading && (
          <button
            onClick={handleSubmitUrl}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
              isHokkaido
                ? "bg-hokkaido-accent text-white hover:bg-hokkaido-accent/90"
                : "bg-kansai-accent text-white hover:bg-kansai-accent/90"
            }`}
          >
            {lang === "en" ? "ADD" : "添加"}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1.5 text-[10px] text-red-500 px-1">{error}</p>
      )}
    </div>
  )
}
