"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Loader2, Mail } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Redirect back to the main page after login
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    })

    if (error) {
      if (error.message.includes("rate limit")) {
        setMessage({ type: 'error', text: "Too many login attempts. Please wait a bit or check your inbox for a previous link." })
      } else {
        setMessage({ type: 'error', text: error.message })
      }
    } else {
      setMessage({ type: 'success', text: 'Check your email for the login link!' })
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-hokkaido-accent p-6 text-center">
        <h1 className="text-2xl font-bold text-white">Trip Sync Login</h1>
        <p className="text-white/80 text-sm mt-2">Save your itinerary to the cloud</p>
      </div>
      
      <div className="p-8">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-hokkaido-accent focus:ring-2 focus:ring-hokkaido-accent/20 outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-hokkaido-accent text-white font-bold py-3 rounded-xl hover:bg-hokkaido-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Magic Link"}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}