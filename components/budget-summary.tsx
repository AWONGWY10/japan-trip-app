"use client"

import { Wallet, TrendingUp } from "lucide-react"
import type { DayData } from "@/lib/itinerary-data"
import { useAllTripBudgets } from "@/hooks/use-trip-storage"

type Lang = "en" | "zh"

export function BudgetSummary({
  lang,
  region,
  days,
}: {
  lang: Lang
  region: "hokkaido" | "kansai"
  days: DayData[]
}) {
  const dayIds = days.map(d => d.day)
  const { budgets: dayBudgets, total: totalBudget } = useAllTripBudgets(dayIds)

  const isHokkaido = region === "hokkaido"

  return (
    <div
      className={`rounded-2xl overflow-hidden ${
        isHokkaido
          ? "bg-hokkaido-card shadow-[0_2px_16px_rgba(74,158,218,0.08)]"
          : "bg-kansai-card shadow-[0_2px_16px_rgba(255,107,61,0.12)]"
      }`}
    >
      {/* Header bar */}
      <div
        className={`flex items-center gap-2.5 px-4 py-3 ${
          isHokkaido
            ? "bg-hokkaido-accent/10"
            : "bg-kansai-accent/10"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isHokkaido ? "bg-hokkaido-accent/20" : "bg-kansai-accent/20"
          }`}
        >
          <TrendingUp
            className={`w-4 h-4 ${
              isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
            }`}
          />
        </div>
        <div>
          <h3
            className={`text-sm font-bold ${
              isHokkaido ? "text-hokkaido-text" : "text-kansai-text"
            }`}
          >
            {lang === "en"
              ? `${isHokkaido ? "Hokkaido" : "Kansai"} Budget Summary`
              : `${isHokkaido ? "北海道" : "关西"}预算汇总`}
          </h3>
        </div>
      </div>

      {/* Budget items */}
      <div className="px-4 py-3">
        <div className="flex flex-col gap-2">
          {days.map((day) => {
            const val = dayBudgets[day.day]
            return (
              <div
                key={day.day}
                className={`flex items-center justify-between py-1.5 border-b last:border-b-0 ${
                  isHokkaido
                    ? "border-hokkaido-accent-soft/20"
                    : "border-kansai-accent/10"
                }`}
              >
                <span
                  className={`text-xs ${
                    isHokkaido
                      ? "text-hokkaido-text-muted"
                      : "text-kansai-text-muted"
                  }`}
                >
                  Day {day.day}: {day.title[lang]}
                </span>
                <span
                  className={`text-xs font-mono font-medium ${
                    val
                      ? isHokkaido
                        ? "text-hokkaido-accent"
                        : "text-kansai-accent"
                      : isHokkaido
                        ? "text-hokkaido-text-muted/40"
                        : "text-kansai-text-muted/40"
                  }`}
                >
                  {val ? `¥${val}` : "---"}
                </span>
              </div>
            )
          })}
        </div>

        {/* Total */}
        <div
          className={`mt-3 pt-3 flex items-center justify-between border-t-2 ${
            isHokkaido
              ? "border-hokkaido-accent/30"
              : "border-kansai-accent/30"
          }`}
        >
          <div className="flex items-center gap-2">
            <Wallet
              className={`w-4 h-4 ${
                isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
              }`}
            />
            <span
              className={`text-sm font-bold ${
                isHokkaido ? "text-hokkaido-text" : "text-kansai-text"
              }`}
            >
              {lang === "en" ? "Total" : "合计"}
            </span>
          </div>
          <span
            className={`text-lg font-bold font-mono ${
              isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
            }`}
          >
            ¥{totalBudget.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
