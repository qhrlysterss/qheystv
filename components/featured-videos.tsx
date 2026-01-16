import { VideoPreview } from "./video-preview"
import { getFeaturedMovies, getMoviesByCategory, type Movie } from "@/lib/movies-data"

interface FeaturedVideosProps {
  title?: string
  description?: string
  limit?: number
  category?: Movie["category"]
  featured?: boolean
}

export function FeaturedVideos({
  title = "Featured Videos",
  description = "Watch our top picks",
  limit = 8,
  category,
  featured = false,
}: FeaturedVideosProps) {
  let movies: Movie[]

  if (featured) {
    movies = getFeaturedMovies()
  } else if (category) {
    movies = getMoviesByCategory(category)
  } else {
    movies = getFeaturedMovies()
  }

  const displayMovies = movies.slice(0, limit)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMovies.map((movie) => (
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
      </div>
    </section>
  )
}
