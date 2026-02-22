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