"use client"

import { useState } from "react"
import type { LiveSport } from "@/lib/movies-database"
import { LiveSportsCard } from "./live-sports-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Radio } from "lucide-react"

interface LiveSportsGridProps {
  sports: LiveSport[]
  title?: string
  showFilters?: boolean
  initialLimit?: number
}

const SPORT_CATEGORIES = [
  { value: "all", label: "All Sports" },
  { value: "soccer", label: "Soccer" },
  { value: "basketball", label: "Basketball" },
  { value: "football", label: "Football" },
  { value: "tennis", label: "Tennis" },
  { value: "mma", label: "MMA" },
  { value: "boxing", label: "Boxing" },
  { value: "racing", label: "Racing" },
  { value: "baseball", label: "Baseball" },
  { value: "hockey", label: "Hockey" },
  { value: "golf", label: "Golf" },
  { value: "cricket", label: "Cricket" },
  { value: "rugby", label: "Rugby" },
]

export function LiveSportsGrid({ sports, title, showFilters = true, initialLimit = 12 }: LiveSportsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [visibleCount, setVisibleCount] = useState(initialLimit)

  const filteredSports =
    selectedCategory === "all" ? sports : sports.filter((sport) => sport.category === selectedCategory)

  const visibleSports = filteredSports.slice(0, visibleCount)
  const hasMore = visibleCount < filteredSports.length
  const liveCount = sports.filter((s) => s.isLive).length

  return (
    <section className="py-8">
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {liveCount > 0 && (
            <Badge className="bg-red-600 text-white flex items-center gap-1">
              <Radio className="h-3 w-3 animate-pulse" />
              {liveCount} Live Now
            </Badge>
          )}
        </div>
      )}

      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {SPORT_CATEGORIES.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.value)
                setVisibleCount(initialLimit)
              }}
            >
              {category.label}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleSports.map((sport) => (
          <LiveSportsCard key={sport.id} sport={sport} />
        ))}
      </div>

      {visibleSports.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No sports available in this category</div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" onClick={() => setVisibleCount((prev) => prev + 12)} className="gap-2">
            Load More ({filteredSports.length - visibleCount} remaining)
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  )
}
