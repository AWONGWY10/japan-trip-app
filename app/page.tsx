"use client"

import { useState, useCallback, useEffect } from "react"
import { itineraryData } from "@/lib/itinerary-data"
import { HeroSection } from "@/components/hero-section"
import { TripProgress } from "@/components/trip-progress"
import { DayCard } from "@/components/day-card"
import { RegionDivider } from "@/components/region-divider"
import { FloatingNav } from "@/components/floating-nav"
import { PackingList } from "@/components/packing-list"
import { TripFooter } from "@/components/trip-footer"
import { BudgetSummary } from "@/components/budget-summary"

function HokkaidoPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Large Snowflake Top Left */}
      <svg className="absolute -top-10 -left-10 w-64 h-64 text-hokkaido-accent/5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ animationDuration: '4s' }}>
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
      </svg>
      {/* Small Snowflake Right */}
      <svg className="absolute top-40 -right-10 w-48 h-48 text-hokkaido-accent/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
      </svg>
      {/* Scattered dots */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-hokkaido-accent/20 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-hokkaido-accent/10 rounded-full" />
      <div className="absolute bottom-1/4 left-10 w-4 h-4 bg-hokkaido-accent/10 rounded-full" />
    </div>
  )
}

function KansaiPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Abstract Circle/Neon vibe Top Right */}
      <svg className="absolute -top-20 -right-20 w-80 h-80 text-kansai-accent/5" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40" />
      </svg>
      {/* Wave pattern Bottom Left */}
      <svg className="absolute bottom-0 left-0 w-full h-32 text-kansai-accent/5" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" />
      </svg>
      {/* Floating triangles */}
      <svg className="absolute top-1/3 left-10 w-12 h-12 text-kansai-accent/10 animate-bounce" viewBox="0 0 24 24" fill="currentColor" style={{ animationDuration: '3s' }}>
        <path d="M12 2L22 22H2L12 2Z" />
      </svg>
      <svg className="absolute bottom-1/3 right-10 w-8 h-8 text-kansai-accent/10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 2L22 22M22 2L2 22" stroke="currentColor" strokeWidth="4" />
      </svg>
    </div>
  )
}

type Lang = "en" | "zh"

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh")
  const [checkedActivities, setCheckedActivities] = useState<Set<string>>(
    new Set()
  )
  const [packingListOpen, setPackingListOpen] = useState(false)

  // Persist checked activities in localStorage (survives refresh and browser restart)
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("japan-trip-checked") : null
    if (saved) {
      try {
        setCheckedActivities(new Set(JSON.parse(saved)))
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    if (checkedActivities.size > 0) {
      window.localStorage.setItem(
        "japan-trip-checked",
        JSON.stringify(Array.from(checkedActivities))
      )
    } else if (typeof window !== "undefined") {
      // Also persist empty state so unchecking all items is saved
      window.localStorage.setItem("japan-trip-checked", "[]")
    }
  }, [checkedActivities])

  const toggleActivity = useCallback((id: string) => {
    setCheckedActivities((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "zh" : "en"))
  }, [])

  // Separate days into regions
  const hokkaidoDays = itineraryData.filter((d) => d.region === "hokkaido")
  const kansaiDays = itineraryData.filter((d) => d.region === "kansai")

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <HeroSection lang={lang} />

      {/* Progress bar */}
      <TripProgress lang={lang} checkedActivities={checkedActivities} />

      {/* Hokkaido section */}
      <section className="bg-hokkaido-bg relative overflow-hidden">
        <HokkaidoPattern />
        <div className="max-w-lg mx-auto px-4 pt-6 pb-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-hokkaido-accent/10 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-hokkaido-accent"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-hokkaido-text">
                {lang === "en" ? "Part 1: Hokkaido" : "第一部分：北海道"}
              </h2>
              <p className="text-xs text-hokkaido-text-muted">
                {lang === "en"
                  ? "Winter wonderland road trip"
                  : "冬日仙境自驾之旅"}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 flex flex-col gap-4 pb-6">
          {hokkaidoDays.map((day) => (
            <DayCard
              key={day.day}
              data={day}
              lang={lang}
              checkedActivities={checkedActivities}
              onToggleActivity={toggleActivity}
            />
          ))}
        </div>

        {/* Hokkaido budget summary */}
        <div className="max-w-lg mx-auto px-4 pb-6">
          <BudgetSummary lang={lang} region="hokkaido" days={hokkaidoDays} />
        </div>
      </section>

      {/* Region transition */}
      <section className="bg-kansai-bg relative overflow-hidden">
        <KansaiPattern />
        <div className="max-w-lg mx-auto px-4 pt-6">
          <RegionDivider lang={lang} />
        </div>

        <div className="max-w-lg mx-auto px-4 pt-2 pb-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-kansai-accent/10 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-kansai-accent"
              >
                <path
                  d="M13 10V3L4 14H11V21L20 10H13Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-kansai-text">
                {lang === "en" ? "Part 2: Kansai" : "第二部分：关西"}
              </h2>
              <p className="text-xs text-kansai-text-muted">
                {lang === "en"
                  ? "Neon nights & ancient temples"
                  : "霓虹夜色与古寺"}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 flex flex-col gap-4 pb-6">
          {kansaiDays.map((day) => (
            <DayCard
              key={day.day}
              data={day}
              lang={lang}
              checkedActivities={checkedActivities}
              onToggleActivity={toggleActivity}
            />
          ))}
        </div>

        {/* Kansai budget summary */}
        <div className="max-w-lg mx-auto px-4 pb-6">
          <BudgetSummary lang={lang} region="kansai" days={kansaiDays} />
        </div>

        <TripFooter lang={lang} />
      </section>

      {/* Floating navigation */}
      <FloatingNav
        lang={lang}
        onToggleLang={toggleLang}
        onShowPackingList={() => setPackingListOpen(true)}
      />

      {/* Packing list modal */}
      <PackingList
        lang={lang}
        isOpen={packingListOpen}
        onClose={() => setPackingListOpen(false)}
      />
    </main>
  )
}
