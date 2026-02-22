"use client"

import { Heart } from "lucide-react"

type Lang = "en" | "zh"

export function TripFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="py-12 px-6 text-center">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-kansai-accent" />
        </div>
        <p className="text-sm font-medium text-kansai-text leading-relaxed">
          {lang === "en"
            ? "Made with love for an unforgettable Japan adventure. See you next time!"
            : "为一段难忘的日本冒险之旅精心制作。下次再见！"}
        </p>
        <p className="text-xs text-kansai-text-muted mt-3 font-mono">
          {lang === "en"
            ? "Feb 27 - Mar 11, 2025 | Hokkaido & Kansai"
            : "2025年2月27日 - 3月11日 | 北海道 & 关西"}
        </p>
      </div>
    </footer>
  )
}
