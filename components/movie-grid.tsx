"use client"

import { useState } from "react"
import type { Movie } from "@/lib/movies-database"
import { VideoPreview } from "./video-preview"
import { Button } from "@/components/ui/button"
import { ChevronDown, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MovieGridProps {
  movies: Movie[]
  title?: string
  description?: string
  initialLimit?: number
  showLoadMore?: boolean
  columns?: 2 | 3 | 4 | 5
  showFilters?: boolean
}

export function MovieGrid({
  movies,
  title,
  description,
  initialLimit = 12,
  showLoadMore = true,
  columns = 4,
  showFilters = false,
}: MovieGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialLimit)
  const [sortBy, setSortBy] = useState<"rating" | "year" | "title">("rating")
  const [filterGenre, setFilterGenre] = useState<string>("all")

  // Get unique genres
  const genres = [...new Set(movies.map((m) => m.genre))].sort()

  // Filter and sort movies
  const filteredMovies = filterGenre === "all" ? movies : movies.filter((m) => m.genre === filterGenre)

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "year") return b.releaseYear - a.releaseYear
    return a.title.localeCompare(b.title)
  })

  const visibleMovies = sortedMovies.slice(0, visibleCount)
  const hasMore = visibleCount < sortedMovies.length

  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  }

  return (
    <section className="py-8">
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {showFilters && (
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filterGenre}
              onValueChange={(value) => {
                setFilterGenre(value)
                setVisibleCount(initialLimit)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={sortBy} onValueChange={(value: "rating" | "year" | "title") => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="year">Newest First</SelectItem>
              <SelectItem value="title">A-Z</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground self-center">{sortedMovies.length} movies</span>
        </div>
      )}

      <div className={`grid ${columnClasses[columns]} gap-6`}>
        {visibleMovies.map((movie) => (
          <VideoPreview
            key={movie.id}
            title={movie.title}
            description={`${movie.genre} • ${movie.duration}`}
            videoUrl={movie.videoUrl}
            poster={movie.thumbnail}
            href={`/watch/${movie.id}`}
            rating={movie.rating}
            year={movie.releaseYear}
          />
        ))}
      </div>

      {visibleMovies.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No movies found matching your criteria</div>
      )}

      {showLoadMore && hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" onClick={() => setVisibleCount((prev) => prev + 24)} className="gap-2">
            Load More ({sortedMovies.length - visibleCount} remaining)
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  )
}
