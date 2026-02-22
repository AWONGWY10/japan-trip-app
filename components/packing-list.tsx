"use client"

import { useState } from "react"
import { X, Check, Luggage } from "lucide-react"

type Lang = "en" | "zh"

type PackingItem = {
  id: string
  name: { en: string; zh: string }
  category: { en: string; zh: string }
}

const packingItems: PackingItem[] = [
  { id: "p1", name: { en: "Passport", zh: "护照" }, category: { en: "Essentials", zh: "必备" } },
  { id: "p2", name: { en: "Japan Rail Pass / IC Card", zh: "日本铁路通票 / IC卡" }, category: { en: "Essentials", zh: "必备" } },
  { id: "p3", name: { en: "Hotel Confirmations", zh: "酒店确认单" }, category: { en: "Essentials", zh: "必备" } },
  { id: "p4", name: { en: "Cash (JPY)", zh: "日元现金" }, category: { en: "Essentials", zh: "必备" } },
  { id: "p5", name: { en: "Portable WiFi / SIM", zh: "便携WiFi / SIM卡" }, category: { en: "Essentials", zh: "必备" } },
  { id: "p6", name: { en: "Heavy Winter Coat", zh: "厚冬衣" }, category: { en: "Hokkaido Gear", zh: "北海道装备" } },
  { id: "p7", name: { en: "Thermal Layers", zh: "保暖内衣" }, category: { en: "Hokkaido Gear", zh: "北海道装备" } },
  { id: "p8", name: { en: "Snow Boots", zh: "雪地靴" }, category: { en: "Hokkaido Gear", zh: "北海道装备" } },
  { id: "p9", name: { en: "Gloves & Beanie", zh: "手套和帽子" }, category: { en: "Hokkaido Gear", zh: "北海道装备" } },
  { id: "p10", name: { en: "Hand Warmers", zh: "暖宝宝" }, category: { en: "Hokkaido Gear", zh: "北海道装备" } },
  { id: "p11", name: { en: "Camera + Extra Batteries", zh: "相机 + 备用电池" }, category: { en: "Tech", zh: "电子设备" } },
  { id: "p12", name: { en: "Power Bank", zh: "充电宝" }, category: { en: "Tech", zh: "电子设备" } },
  { id: "p13", name: { en: "Universal Adapter (Type A)", zh: "转换插头 (A型)" }, category: { en: "Tech", zh: "电子设备" } },
  { id: "p14", name: { en: "Sunscreen (Snow glare!)", zh: "防晒霜（雪地反光！）" }, category: { en: "Personal", zh: "个人用品" } },
  { id: "p15", name: { en: "Lip Balm & Moisturizer", zh: "润唇膏和保湿霜" }, category: { en: "Personal", zh: "个人用品" } },
  { id: "p16", name: { en: "Medicines / First Aid", zh: "常备药品" }, category: { en: "Personal", zh: "个人用品" } },
]

export function PackingList({
  lang,
  isOpen,
  onClose,
}: {
  lang: Lang
  isOpen: boolean
  onClose: () => void
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (!isOpen) return null

  const categories = Array.from(
    new Set(packingItems.map((item) => item.category.en))
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1a2332]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md max-h-[85vh] bg-hokkaido-card rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-hokkaido-accent-soft/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-hokkaido-accent/10 flex items-center justify-center">
              <Luggage className="w-5 h-5 text-hokkaido-accent" />
            </div>
            <div>
              <h2 className="font-bold text-hokkaido-text text-lg">
                {lang === "en" ? "Packing List" : "行李清单"}
              </h2>
              <p className="text-xs text-hokkaido-text-muted">
                {checked.size}/{packingItems.length}{" "}
                {lang === "en" ? "packed" : "已打包"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-hokkaido-accent-soft/30 flex items-center justify-center hover:bg-hokkaido-accent-soft/50 transition-colors"
          >
            <X className="w-4 h-4 text-hokkaido-text-muted" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-4">
          {categories.map((cat) => (
            <div key={cat} className="mb-5">
              <h3 className="text-xs font-semibold text-hokkaido-text-muted uppercase tracking-wider mb-2">
                {
                  packingItems.find((i) => i.category.en === cat)?.category[
                    lang
                  ]
                }
              </h3>
              <div className="flex flex-col gap-1">
                {packingItems
                  .filter((i) => i.category.en === cat)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                        checked.has(item.id)
                          ? "bg-hokkaido-accent/10"
                          : "hover:bg-hokkaido-accent-soft/20"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          checked.has(item.id)
                            ? "bg-hokkaido-accent border-hokkaido-accent"
                            : "border-hokkaido-accent-soft"
                        }`}
                      >
                        {checked.has(item.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm transition-all ${
                          checked.has(item.id)
                            ? "line-through text-hokkaido-text-muted"
                            : "text-hokkaido-text"
                        }`}
                      >
                        {item.name[lang]}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
