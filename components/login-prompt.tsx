"use client"

import { useState, useEffect } from "react"
import { X, Cloud } from "lucide-react"
import Link from "next/link"
import { getSafeUser } from "@/lib/supabase"

export function LoginPrompt({ lang }: { lang: "en" | "zh" }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await getSafeUser()
      if (!user) {
        // Only show if not logged in and not dismissed
        const dismissed = localStorage.getItem("japan-trip-login-prompt-dismissed")
        if (!dismissed) {
          // Small delay for better UX (don't annoy immediately)
          setTimeout(() => setIsVisible(true), 3000)
        }
      }
    }
    checkUser()
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("japan-trip-login-prompt-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 right-4 z-40 max-w-[300px] w-full animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-4 relative overflow-hidden">
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-hokkaido-accent/10 flex items-center justify-center flex-shrink-0">
            <Cloud className="w-5 h-5 text-hokkaido-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-sm mb-1">
              {lang === "en" ? "Sync your trip?" : "同步您的行程？"}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              {lang === "en" 
                ? "Log in to save your notes to the cloud and access them on any device." 
                : "登录以将笔记保存到云端，并在任何设备上访问。"}
            </p>
            <div className="flex gap-2">
              <Link
                href="/login"
                className="flex-1 bg-hokkaido-accent text-white text-xs font-bold py-2 rounded-lg text-center hover:bg-hokkaido-accent/90 transition-colors shadow-sm shadow-hokkaido-accent/20"
              >
                {lang === "en" ? "Log In" : "登录"}
              </Link>
              <button
                onClick={handleDismiss}
                className="flex-1 bg-gray-50 text-gray-600 text-xs font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {lang === "en" ? "Guest" : "游客模式"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}