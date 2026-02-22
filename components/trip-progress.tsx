"use client"

import { Trophy } from "lucide-react"
import { itineraryData } from "@/lib/itinerary-data"

type Lang = "en" | "zh"

export function TripProgress({
  lang,
  checkedActivities,
}: {
  lang: Lang
  checkedActivities: Set<string>
}) {
  const totalActivities = itineraryData.reduce(
    (sum, day) => sum + day.activities.length,
    0
  )
  const completedCount = checkedActivities.size
  const progress =
    totalActivities > 0 ? (completedCount / totalActivities) * 100 : 0

  const milestones = [
    { pct: 25, label: lang === "en" ? "Getting started!" : "出发了！" },
    { pct: 50, label: lang === "en" ? "Halfway there!" : "已完成一半！" },
    { pct: 75, label: lang === "en" ? "Almost done!" : "快要完成了！" },
    { pct: 100, label: lang === "en" ? "Trip complete!" : "旅程完成！" },
  ]

  const currentMilestone = milestones
    .filter((m) => progress >= m.pct)
    .pop()

  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-hokkaido-bg/90 border-b border-hokkaido-accent-soft/30">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-hokkaido-accent" />
            <span className="text-xs font-semibold text-hokkaido-text">
              {completedCount}/{totalActivities}{" "}
              {lang === "en" ? "completed" : "已完成"}
            </span>
          </div>
          {currentMilestone && (
            <span className="text-[10px] font-medium text-hokkaido-accent animate-fade-in-up">
              {currentMilestone.label}
            </span>
          )}
        </div>
        <div className="w-full h-2 rounded-full bg-hokkaido-accent-soft/30 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-hokkaido-accent to-[#ff9eb8] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
