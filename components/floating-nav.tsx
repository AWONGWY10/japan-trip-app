"use client"

import { ArrowUp, Globe, List, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase, getSafeUser } from "@/lib/supabase"

type Lang = "en" | "zh"

export function FloatingNav({
  lang,
  onToggleLang,
  onShowPackingList,
}: {
  lang: Lang
  onToggleLang: () => void
  onShowPackingList: () => void
}) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check current user
    getSafeUser().then(({ data }) => setUser(data.user))

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload() // Reload to switch back to localStorage mode
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
      {/* Login / Profile */}
      {user ? (
        <button
          onClick={handleLogout}
          className="w-12 h-12 rounded-full bg-white text-red-500 shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      ) : (
        <Link
          href="/login"
          className="w-12 h-12 rounded-full bg-white text-hokkaido-text shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label="Login"
        >
          <User className="w-5 h-5" />
        </Link>
      )}

      {/* Language toggle */}
      <button
        onClick={onToggleLang}
        className="w-12 h-12 rounded-full bg-hokkaido-accent text-white shadow-lg shadow-hokkaido-accent/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        aria-label={lang === "en" ? "Switch to Chinese" : "Switch to English"}
      >
        <Globe className="w-5 h-5" />
      </button>

      {/* Packing list */}
      <button
        onClick={onShowPackingList}
        className="w-12 h-12 rounded-full bg-kansai-accent text-white shadow-lg shadow-kansai-accent/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        aria-label={lang === "en" ? "Packing list" : "行李清单"}
      >
        <List className="w-5 h-5" />
      </button>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-12 h-12 rounded-full bg-[#1a2332] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  )
}
