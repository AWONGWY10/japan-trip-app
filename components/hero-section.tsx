"use client"

import Image from "next/image"

type Lang = "en" | "zh"

export function HeroSection({ lang }: { lang: Lang }) {
  return (
    <section className="relative w-full h-[60vh] md:h-[85vh] min-h-[400px] md:min-h-[560px] overflow-hidden">
      {/* Split background images */}
      <div className="absolute inset-0 flex">
        {/* Hokkaido side */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <Image
            src="/images/hokkaido-hero.jpg"
            alt="Snowy Hokkaido landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1a2332]/30" />
        </div>
        {/* Kansai side */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <Image
            src="/images/kansai-hero.jpg"
            alt="Vibrant Osaka neon streets"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1a1118]/30" />
        </div>
      </div>

      {/* Diagonal divider */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <polygon points="48,0 52,0 52,100 48,100" fill="white" fillOpacity="0.15" />
        </svg>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        {/* Region labels */}
        <div className="flex items-center gap-6 mb-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c0ddf0]">
            Hokkaido
          </span>
          <div className="w-px h-4 bg-white/40" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#ff9eb8]">
            Kansai
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight text-balance leading-tight">
          {lang === "en" ? (
            <>
              13-Day
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c0ddf0] to-[#ff9eb8]">
                Japan Adventure
              </span>
            </>
          ) : (
            <>
              13天
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c0ddf0] to-[#ff9eb8]">
                日本冒险之旅
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm md:text-base text-white/80 max-w-md leading-relaxed">
          {lang === "en"
            ? "From Hokkaido's powder snow to Osaka's neon glow. Feb 27 - Mar 11, 2025"
            : "从北海道的粉雪到大阪的霓虹。2025年2月27日 - 3月11日"}
        </p>

        {/* Dates badge */}
        <div className="mt-6 flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
            {lang === "en" ? "8 Days Hokkaido" : "8天 北海道"}
          </div>
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
            {lang === "en" ? "5 Days Kansai" : "5天 关西"}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/60 uppercase tracking-widest font-mono">
            {lang === "en" ? "Scroll to explore" : "下滑探索"}
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
