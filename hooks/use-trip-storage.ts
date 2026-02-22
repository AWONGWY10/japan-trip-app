"use client"

import { useState, useEffect, useCallback } from "react"
import type { CustomSpot, Activity } from "@/lib/itinerary-data"
import { supabase, getSafeUser } from "@/lib/supabase"

export function useTripNotes(dayId: number) {
  const key = `japan-trip-notes-day-${dayId}`
  const [notes, setNotes] = useState("")
  const [sharedNotes, setSharedNotes] = useState<Array<{ user_id: string, content: string, user_email?: string }>>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    async function load() {
      const { data: { user } } = await getSafeUser()
      
      if (user) {
        setCurrentUserId(user.id)
        // Load ALL notes for this day from Supabase
        const { data } = await supabase
          .from("notes")
          .select("user_id, content, user_email")
          .eq("day_id", dayId)
        
        if (!ignore && data) {
          setSharedNotes(data)
          // Find my specific note to populate the textarea
          const myEntry = data.find((n: any) => n.user_id === user.id)
          if (myEntry) setNotes(myEntry.content || "")
        }
      } else {
        // Load from LocalStorage
        const saved = localStorage.getItem(key)
        if (!ignore && saved) setNotes(saved)
      }
    }
    load()
    return () => { ignore = true }
  }, [dayId, key])

  // Update local state only (Draft)
  const updateDraft = useCallback((newNotes: string) => {
    setNotes(newNotes)
    localStorage.setItem(key, newNotes)
  }, [key])

  // Persist to Database (Save)
  const saveNotes = useCallback(async () => {
    
    const { data: { user } } = await getSafeUser()
    if (user) {
      // Save to Supabase
      await supabase.from("notes").upsert({
        user_id: user.id, 
        day_id: dayId, 
        content: notes,
        user_email: user.email 
      })
      
      // Optimistically update the shared list
      setSharedNotes(prev => {
        const others = prev.filter(n => n.user_id !== user.id)
        // If content is empty, remove it from list, otherwise add/update it
        if (!notes.trim()) return others
        return [...others, { user_id: user.id, content: notes, user_email: user.email }]
      })
    } else {
      // Save to LocalStorage
      localStorage.setItem(key, notes)
    }
  }, [dayId, key, notes])

  const deleteNote = useCallback(async () => {
    setNotes("")
    localStorage.removeItem(key)
    
    const { data: { user } } = await getSafeUser()
    if (user) {
      // Save empty content to "delete" it from view
      await supabase.from("notes").upsert({ 
        user_id: user.id, 
        day_id: dayId, 
        content: "",
        user_email: user.email 
      })
      setSharedNotes(prev => prev.filter(n => n.user_id !== user.id))
    }
  }, [dayId, key])

  return { notes, setNotes: updateDraft, saveNotes, deleteNote, sharedNotes, currentUserId }
}

export function useTripBudget(dayId: number) {
  const key = `japan-trip-budget-day-${dayId}`
  const [budget, setBudget] = useState("")

  useEffect(() => {
    let ignore = false
    async function load() {
      const { data: { user } } = await getSafeUser()
      
      if (user) {
        const { data } = await supabase
          .from("budgets")
          .select("amount")
          .eq("day_id", dayId)
          .maybeSingle()
        if (!ignore && data) setBudget(data.amount || "")
      } else {
        const saved = localStorage.getItem(key)
        if (!ignore && saved) setBudget(saved)
      }
    }
    load()
    return () => { ignore = true }
  }, [dayId, key])

  const saveBudget = useCallback(async (newBudget: string) => {
    setBudget(newBudget)
    
    const { data: { user } } = await getSafeUser()
    if (user) {
      await supabase.from("budgets").upsert({ user_id: user.id, day_id: dayId, amount: newBudget })
    } else {
      localStorage.setItem(key, newBudget)
    }
  }, [dayId, key])

  return { budget, setBudget: saveBudget }
}

export function useTripSpots(dayId: number) {
  const key = `japan-trip-spots-day-${dayId}`
  const [spots, setSpots] = useState<CustomSpot[]>([])

  useEffect(() => {
    let ignore = false
    async function load() {
      const { data: { user } } = await getSafeUser()
      
      if (user) {
        const { data } = await supabase
          .from("spots")
          .select("*")
          .eq("day_id", dayId)
        
        if (!ignore && data) {
          // Map DB columns to CustomSpot type
          const mapped: CustomSpot[] = data.map((row: any) => ({
            id: row.spot_id,
            name: row.name,
            url: row.url,
            lat: row.lat,
            lng: row.lng,
            addedAt: row.added_at
          }))
          setSpots(mapped)
        }
      } else {
        const saved = localStorage.getItem(key)
        if (saved && !ignore) {
          try {
            setSpots(JSON.parse(saved))
          } catch (e) { console.error(e) }
        }
      }
    }
    load()
    return () => { ignore = true }
  }, [dayId, key])

  const addSpot = useCallback(async (name: string, url: string, lat?: number, lng?: number) => {
    const newSpot: CustomSpot = {
      id: `custom-${dayId}-${Date.now()}`,
      name,
      url,
      lat,
      lng,
      addedAt: Date.now(),
    }
    
    setSpots((prev) => [...prev, newSpot])

    const { data: { user } } = await getSafeUser()
    if (user) {
      await supabase.from("spots").insert({
        user_id: user.id,
        day_id: dayId,
        spot_id: newSpot.id,
        name,
        url,
        lat,
        lng,
        added_at: newSpot.addedAt
      })
    } else {
      const saved = localStorage.getItem(key)
      const prev = saved ? JSON.parse(saved) : []
      localStorage.setItem(key, JSON.stringify([...prev, newSpot]))
    }
  }, [dayId, key])

  const removeSpot = useCallback(async (id: string) => {
    setSpots((prev) => prev.filter((s) => s.id !== id))

    const { data: { user } } = await getSafeUser()
    if (user) {
      await supabase.from("spots").delete().eq("spot_id", id)
    } else {
      const saved = localStorage.getItem(key)
      if (saved) {
        const prev = JSON.parse(saved)
        const updated = prev.filter((s: CustomSpot) => s.id !== id)
        localStorage.setItem(key, JSON.stringify(updated))
      }
    }
  }, [dayId, key])

  return { spots, addSpot, removeSpot }
}

export function useAllTripBudgets(dayIds: number[]) {
  const [budgets, setBudgets] = useState<Record<number, string>>({})
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const checkBudgets = async () => {
      const newBudgets: Record<number, string> = {}
      let newTotal = 0
      
      const { data: { user } } = await getSafeUser()

      if (user) {
        // Fetch all budgets for this user in one go
        const { data } = await supabase.from("budgets").select("day_id, amount")
        
        data?.forEach((row) => {
          if (row.amount) {
            newBudgets[row.day_id] = row.amount
            const num = parseFloat(row.amount.replace(/,/g, ""))
            if (!isNaN(num)) newTotal += num
          }
        })
      } else {
        // Fallback to local storage
        dayIds.forEach((id) => {
          const saved = localStorage.getItem(`japan-trip-budget-day-${id}`)
          if (saved) {
            newBudgets[id] = saved
            const num = parseFloat(saved.replace(/,/g, ""))
            if (!isNaN(num)) newTotal += num
          }
        })
      }
      
      setBudgets(newBudgets)
      setTotal(newTotal)
    }

    // Initial load
    checkBudgets()

    // Removed polling to prevent "Navigator LockManager" timeout errors
  }, [dayIds]) // In a real app, we'd memoize dayIds, but for this static list it's okay

  return { budgets, total }
}

export function useTripActivities(dayId: number, initialActivities: Activity[]) {
  const key = `japan-trip-activities-day-${dayId}`
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let ignore = false
    async function load() {
      const { data: { user } } = await getSafeUser()
      
      if (user) {
        const { data } = await supabase
          .from("day_activities")
          .select("activities_json")
          .eq("day_id", dayId)
          .maybeSingle()
        
        if (!ignore && data?.activities_json) {
          setActivities(data.activities_json)
        }
      } else {
        const saved = localStorage.getItem(key)
        if (!ignore && saved) {
          try {
            setActivities(JSON.parse(saved))
          } catch (e) { console.error(e) }
        }
      }
      setIsLoaded(true)
    }
    load()
    return () => { ignore = true }
  }, [dayId, key])

  const saveActivities = useCallback(async (newActivities: Activity[]) => {
    setActivities(newActivities)
    
    const { data: { user } } = await getSafeUser()
    if (user) {
      await supabase.from("day_activities").upsert({ user_id: user.id, day_id: dayId, activities_json: newActivities })
    } else {
      localStorage.setItem(key, JSON.stringify(newActivities))
    }
  }, [dayId, key])

  return { activities, setActivities: saveActivities, isLoaded }
}
