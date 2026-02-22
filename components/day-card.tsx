"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Check, Sparkles, MapPin, Hotel, StickyNote, Wallet, ChevronDown, GripVertical, Pencil, Save, X, ExternalLink, User, Trash2, Snowflake, Waves } from "lucide-react"
import * as LucideIcons from "lucide-react"
import type { DayData, Activity } from "@/lib/itinerary-data"
import { MapsSpotAdder } from "@/components/maps-spot"
import { useTripNotes, useTripBudget, useTripActivities } from "@/hooks/use-trip-storage"
import { WeatherWidget } from "@/components/weather-widget"

type Lang = "en" | "zh"

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[name]
  if (!IconComponent) return <Sparkles className={className} />
  return <IconComponent className={className} />
}

function ActivityItem({
  activity,
  lang,
  region,
  checked,
  onToggle,
  onUpdate,
  isDraggable,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  activity: Activity
  lang: Lang
  region: "hokkaido" | "kansai"
  checked: boolean
  onToggle: () => void
  onUpdate: (updated: Activity) => void
  isDraggable: boolean
  onDragStart: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}) {
  const [justChecked, setJustChecked] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(activity.name[lang])
  const [editDesc, setEditDesc] = useState(activity.description[lang])
  const [editLink, setEditLink] = useState(activity.link || "")

  const handleToggle = () => {
    if (!checked) {
      setJustChecked(true)
      setTimeout(() => setJustChecked(false), 500)
    }
    onToggle()
  }

  const handleSave = () => {
    onUpdate({
      ...activity,
      name: { ...activity.name, [lang]: editName },
      description: { ...activity.description, [lang]: editDesc },
      link: editLink.trim() || undefined
    })
    setIsEditing(false)
  }

  const typeBadge = {
    main: null,
    food: {
      label: lang === "en" ? "Food" : "美食",
      class:
        region === "hokkaido"
          ? "bg-hokkaido-accent-soft/50 text-hokkaido-accent"
          : "bg-kansai-accent/20 text-kansai-accent",
    },
    "hidden-gem": {
      label: lang === "en" ? "Hidden Gem" : "隐藏推荐",
      class:
        region === "hokkaido"
          ? "bg-amber-100 text-amber-700"
          : "bg-kansai-accent-soft/20 text-kansai-accent-soft",
    },
  }

  const badge = typeBadge[activity.type]

  if (isEditing) {
    return (
      <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
          <input 
            value={editName} 
            onChange={(e) => setEditName(e.target.value)}
            className="text-sm font-medium p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hokkaido-accent/50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
          <textarea 
            value={editDesc} 
            onChange={(e) => setEditDesc(e.target.value)}
            rows={2}
            className="text-xs p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hokkaido-accent/50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Google Maps Link</label>
          <input 
            value={editLink} 
            onChange={(e) => setEditLink(e.target.value)}
            placeholder="https://maps.google.com/..."
            className="text-xs p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hokkaido-accent/50 font-mono"
          />
        </div>
        <div className="flex gap-2 justify-end mt-1">
          <button onClick={() => setIsEditing(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-4 h-4" />
          </button>
          <button onClick={handleSave} className="flex items-center gap-1 px-3 py-2 rounded-lg bg-hokkaido-accent text-white text-xs font-bold hover:bg-hokkaido-accent/90">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative flex items-start gap-3 p-3 rounded-xl transition-all duration-300 w-full text-left group ${
        checked
          ? region === "hokkaido"
            ? "bg-hokkaido-accent/10"
            : "bg-kansai-accent/10"
          : region === "hokkaido"
            ? "hover:bg-hokkaido-accent-soft/30"
            : "hover:bg-kansai-card/60"
      }`}
    >
      {/* Drag Handle */}
      <div className="mt-1.5 cursor-move opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity">
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleToggle()
        }}
        className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          justChecked ? "animate-celebrate" : ""
        } ${
          checked
            ? region === "hokkaido"
              ? "bg-hokkaido-accent border-hokkaido-accent"
              : "bg-kansai-accent border-kansai-accent"
            : region === "hokkaido"
              ? "border-hokkaido-accent-soft group-hover:border-hokkaido-accent"
              : "border-kansai-text-muted group-hover:border-kansai-accent"
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </button>

      {/* Icon */}
      <div
        className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          region === "hokkaido"
            ? "bg-hokkaido-accent-soft/50"
            : "bg-kansai-accent/20"
        }`}
      >
        <DynamicIcon
          name={activity.icon}
          className={`w-4 h-4 ${
            region === "hokkaido"
              ? "text-hokkaido-accent"
              : "text-kansai-accent"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0" onClick={handleToggle}>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-medium text-sm leading-snug transition-all ${
              checked ? "line-through opacity-60" : ""
            } ${
              region === "hokkaido"
                ? "text-hokkaido-text"
                : "text-kansai-text"
            }`}
          >
            {activity.name[lang]}
          </span>
          {badge && (
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${badge.class}`}
            >
              {badge.label}
            </span>
          )}
        </div>
        <p
          className={`text-xs mt-1 leading-relaxed ${
            checked ? "opacity-40" : ""
          } ${
            region === "hokkaido"
              ? "text-hokkaido-text-muted"
              : "text-kansai-text-muted"
          }`}
        >
          {activity.description[lang]}
        </p>
        
        {/* Link Display */}
        {activity.link && (
          <a 
            href={activity.link} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-blue-500 hover:underline"
          >
            <ExternalLink className="w-3 h-3" /> Google Maps
          </a>
        )}
      </div>

      {/* Edit Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation()
          setIsEditing(true)
        }}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-black/5 text-gray-400 hover:text-gray-700 transition-all"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function getUserColor(id: string) {
  const colors = [
    "bg-red-100 text-red-700 border-red-200",
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-green-100 text-green-700 border-green-200",
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-pink-100 text-pink-700 border-pink-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-teal-100 text-teal-700 border-teal-200",
  ]
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function NotesSection({
  dayId,
  lang,
  region,
}: {
  dayId: number
  lang: Lang
  region: "hokkaido" | "kansai"
}) {
  const { notes, setNotes, saveNotes, deleteNote, sharedNotes, currentUserId } = useTripNotes(dayId)
  const { budget, setBudget } = useTripBudget(dayId)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [notes])

  const handleSave = () => {
    saveNotes()
    // Optional: Show a toast or visual feedback here
  }

  const handleDelete = () => {
    if (confirm(lang === "en" ? "Delete your note?" : "删除您的笔记？")) {
      deleteNote()
    }
  }

  const isHokkaido = region === "hokkaido"

  return (
    <div
      className={`mx-4 mb-4 rounded-xl border-2 border-dashed overflow-hidden ${
        isHokkaido
          ? "border-hokkaido-accent-soft/50 bg-hokkaido-accent-soft/10"
          : "border-kansai-accent/20 bg-kansai-accent/5"
      }`}
    >
      {/* Notes header with colored bar */}
      <div
        className={`flex items-center gap-2 px-3 py-2 ${
          isHokkaido
            ? "bg-hokkaido-accent-soft/30"
            : "bg-kansai-accent/15"
        }`}
      >
        <StickyNote
          className={`w-3.5 h-3.5 ${
            isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
          }`}
        />
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
          }`}
        >
          {lang === "en" ? "Travel Notes" : "旅行笔记"}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {/* Budget input */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
              isHokkaido
                ? "bg-hokkaido-accent/10"
                : "bg-kansai-accent/10"
            }`}
          >
            <Wallet
              className={`w-3.5 h-3.5 ${
                isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
              }`}
            />
            <span
              className={`text-[10px] font-bold uppercase ${
                isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
              }`}
            >
              {lang === "en" ? "Budget" : "预算"}
            </span>
          </div>
          <div className="flex-1 relative">
            <span
              className={`absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold ${
                isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
              }`}
            >
              {"¥"}
            </span>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder={lang === "en" ? "e.g. 15,000" : "例如 15,000"}
              className={`w-full pl-7 pr-3 py-1.5 rounded-lg text-xs font-mono border transition-colors focus:outline-none ${
                isHokkaido
                  ? "bg-hokkaido-card border-hokkaido-accent-soft/50 text-hokkaido-text placeholder:text-hokkaido-text-muted/50 focus:border-hokkaido-accent"
                  : "bg-kansai-card border-kansai-accent/20 text-kansai-text placeholder:text-kansai-text-muted/50 focus:border-kansai-accent"
              }`}
            />
          </div>
        </div>

        {/* Shared Notes List */}
        {sharedNotes && sharedNotes.length > 0 && (
          <div className="flex flex-col gap-2">
            {sharedNotes.filter(n => n.content.trim()).map((note) => {
              // Hide my own note from this list (since it's in the editor below)
              if (currentUserId && note.user_id === currentUserId) return null

              const colorClass = getUserColor(note.user_email || note.user_id)
              const displayName = note.user_email ? note.user_email.split('@')[0] : "User"
              
              return (
                <div key={note.user_id} className={`p-2 rounded-lg border text-xs ${colorClass}`}>
                  <div className="flex items-center gap-1.5 mb-1 opacity-80 font-bold text-[10px] uppercase tracking-wider">
                    <User className="w-3 h-3" />
                    {displayName}
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{note.content}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* Notes textarea */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              lang === "en"
                ? "Write your note here..."
                : "在这里输入笔记..."
            }
            rows={2}
            className={`w-full px-3 py-2 pr-16 rounded-lg text-xs leading-relaxed border resize-none transition-colors focus:outline-none ${
              isHokkaido
                ? "bg-hokkaido-card border-hokkaido-accent-soft/50 text-hokkaido-text placeholder:text-hokkaido-text-muted/50 focus:border-hokkaido-accent"
                : "bg-kansai-card border-kansai-accent/20 text-kansai-text placeholder:text-kansai-text-muted/50 focus:border-kansai-accent"
            }`}
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            {notes && (
              <button
                onClick={handleDelete}
                className="p-1.5 rounded text-red-400 hover:bg-red-50 transition-colors"
                title={lang === "en" ? "Delete note" : "删除笔记"}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleSave}
              className={`px-2 py-1 rounded text-[10px] font-bold text-white transition-transform active:scale-95 ${
                isHokkaido
                  ? "bg-hokkaido-accent hover:bg-hokkaido-accent/90"
                  : "bg-kansai-accent hover:bg-kansai-accent/90"
              }`}
            >
              {lang === "en" ? "SAVE" : "保存"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DayCard({
  data,
  lang,
  checkedActivities,
  onToggleActivity,
}: {
  data: DayData
  lang: Lang
  checkedActivities: Set<string>
  onToggleActivity: (id: string) => void
}) {
  const [isExpanded, setIsExpanded] = useState(data.day <= 2)
  // Optimization: Only render heavy details (notes/spots) after the card has been expanded once.
  const [hasRendered, setHasRendered] = useState(data.day <= 2)

  useEffect(() => {
    if (isExpanded) setHasRendered(true)
  }, [isExpanded])

  const { activities, setActivities } = useTripActivities(data.day, data.activities)
  
  const completedCount = activities.filter((a) =>
    checkedActivities.has(a.id)
  ).length
  const totalCount = activities.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const isHokkaido = data.region === "hokkaido"

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"))
    if (dragIndex === dropIndex) return

    const newActivities = [...activities]
    const [draggedItem] = newActivities.splice(dragIndex, 1)
    newActivities.splice(dropIndex, 0, draggedItem)
    setActivities(newActivities)
  }

  return (
    <div
      id={`day-${data.day}`}
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${
        isHokkaido
          ? "bg-hokkaido-card shadow-[0_2px_16px_rgba(74,158,218,0.08)]"
          : "bg-kansai-card shadow-[0_2px_16px_rgba(255,107,61,0.12)]"
      }`}
    >
      {/* Card image banner */}
      <div className="relative w-full h-32 overflow-hidden">
        <Image
          src={data.cardImage}
          alt={data.title.en}
          fill
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 ${
            isHokkaido
              ? "bg-gradient-to-t from-[#1a2332]/70 via-[#1a2332]/20 to-transparent"
              : "bg-gradient-to-t from-[#1a1118]/70 via-[#1a1118]/20 to-transparent"
          }`}
        />
        {/* Day badge on image */}
        <div className="absolute top-3 left-3">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
              isHokkaido
                ? "bg-hokkaido-accent/80 text-white"
                : "bg-kansai-accent/80 text-white"
            }`}
          >
            Day {data.day}
          </div>
        </div>
        {/* Date on image */}
        <div className="absolute top-3 right-3">
          <div className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium">
            {data.date} {data.weekday[lang]}
          </div>
        </div>
        {/* Title on image bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <h3 className="font-bold text-white text-base text-pretty leading-snug drop-shadow-md">
            {data.title[lang]}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-white/80" />
            <span className="text-[11px] text-white/80">
              {data.location[lang]}
            </span>
          </div>
        </div>
      </div>

      {/* Collapsible header area */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
          isHokkaido
            ? "hover:bg-hokkaido-accent-soft/20"
            : "hover:bg-kansai-accent/10"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Accommodation */}
          {data.accommodation[lang] !== "---" && (
            <div
              className={`flex items-center gap-1.5 text-xs ${
                isHokkaido
                  ? "text-hokkaido-text-muted"
                  : "text-kansai-text-muted"
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span className="truncate max-w-[180px]">{data.accommodation[lang]}</span>
            </div>
          )}

          {/* Weather Widget */}
          <WeatherWidget 
            dateStr={data.date} 
            locationStr={data.location.en} 
            lang={lang} 
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Progress ring */}
          <div className="flex-shrink-0 relative w-9 h-9">
            <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                className={
                  isHokkaido
                    ? "stroke-hokkaido-accent-soft/40"
                    : "stroke-kansai-accent/20"
                }
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                className={
                  isHokkaido
                    ? "stroke-hokkaido-accent"
                    : "stroke-kansai-accent"
                }
                strokeWidth="3"
                strokeDasharray={`${progress * 0.974} 100`}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.5s ease" }}
              />
            </svg>
            <span
              className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold ${
                isHokkaido ? "text-hokkaido-accent" : "text-kansai-accent"
              }`}
            >
              {completedCount}/{totalCount}
            </span>
          </div>
          {/* Chevron */}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            } ${
              isHokkaido ? "text-hokkaido-text-muted" : "text-kansai-text-muted"
            }`}
          />
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`relative overflow-hidden transition-all duration-400 ease-in-out ${
          isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {hasRendered && (
          <>
            {/* Activities list */}
            <div className="px-3 pb-2 flex flex-col gap-1">
              {activities.map((activity, index) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  lang={lang}
                  region={data.region}
                  checked={checkedActivities.has(activity.id)}
                  onToggle={() => onToggleActivity(activity.id)}
                  onUpdate={(updated) => {
                    const newActivities = [...activities]
                    newActivities[index] = updated
                    setActivities(newActivities)
                  }}
                  isDraggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, index)}
                />
              ))}
            </div>

            {/* Google Maps spot adder */}
            <MapsSpotAdder dayId={data.day} lang={lang} region={data.region} />

            {/* Notes & budget section */}
            <NotesSection dayId={data.day} lang={lang} region={data.region} />

            {/* Decorative Watermark */}
            <div className="absolute bottom-0 right-0 pointer-events-none opacity-[0.03] overflow-hidden">
              {isHokkaido ? (
                <Snowflake className="w-48 h-48 -mb-10 -mr-10 text-hokkaido-text" />
              ) : (
                <Waves className="w-48 h-48 -mb-10 -mr-10 text-kansai-text" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
