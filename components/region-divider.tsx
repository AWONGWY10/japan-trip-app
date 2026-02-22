"use client"

import Image from "next/image"
import { Plane } from "lucide-react"

type Lang = "en" | "zh"

export function RegionDivider({ lang }: { lang: Lang }) {
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-2xl my-4">
      <Image
        src="/images/kansai-hero.jpg"
        alt="Welcome to Kansai"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/80 to-[#1a1118]/80" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="w-12 h-12 rounded-full bg-kansai-accent/20 flex items-center justify-center mb-3">
          <Plane className="w-6 h-6 text-kansai-accent animate-pulse" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {lang === "en" ? "Welcome to Kansai" : "欢迎来到关西"}
        </h2>
        <p className="text-sm text-white/70 mt-2">
          {lang === "en"
            ? "From snow to neon. The adventure continues."
            : "从白雪到霓虹，冒险继续。"}
        </p>
      </div>
    </div>
  )
}
