import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const getSupabaseClient = () => {
  if (supabaseUrl && supabaseKey) {
    return createClient(supabaseUrl, supabaseKey)
  }

  // Fallback: If variables are missing, don't crash. 
  // Return a dummy client so the app works in "Offline/LocalStorage" mode.
  if (typeof window !== 'undefined') {
    console.warn("⚠️ Supabase config missing. App running in localStorage mode.")
  }

  // Helper to allow chaining methods like .select().eq().maybeSingle()
  const chain = {
    select: () => chain,
    eq: () => chain,
    maybeSingle: async () => ({ data: null }),
    then: (resolve: any) => Promise.resolve({ data: [] }).then(resolve)
  } as any

  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithOtp: async () => ({ error: { message: "Supabase not configured. Check .env.local" } }),
      signInWithPassword: async () => ({ error: { message: "Supabase not configured. Check .env.local" } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signOut: async () => {},
    },
    from: () => ({
      select: () => chain,
      upsert: async () => ({}),
      insert: async () => ({}),
      delete: () => chain,
    })
  } as any
}

export const supabase = getSupabaseClient()

// Helper to deduplicate auth calls and prevent hanging
let globalUserPromise: Promise<any> | null = null

export async function getSafeUser() {
  if (!globalUserPromise) {
    // Create a promise that rejects/resolves after 2 seconds to prevent hanging
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve({ data: { user: null }, error: null }), 2000)
    })

    // Race the actual auth call against the timeout
    globalUserPromise = Promise.race([supabase.auth.getUser(), timeoutPromise]).then((res) => {
      // Keep cache briefly to handle simultaneous component mounts
      setTimeout(() => { globalUserPromise = null }, 2000)
      return res
    })
  }
  return globalUserPromise
}