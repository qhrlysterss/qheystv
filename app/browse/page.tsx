import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Play, Radio } from "lucide-react"
import { HeroVideo } from "@/components/hero-video"
import { MovieGrid } from "@/components/movie-grid"
import { Badge } from "@/components/ui/badge"
import {
  getAllMovies,
  getMoviesByCategory,
  getFeaturedMovies,
  getLatestMovies,
  getTopRatedMovies,
  getLiveSportsNow,
  type Movie,
} from "@/lib/movies-database"

export default async function BrowsePage() {
  const allMovies = getAllMovies()
  const featuredMovies = getFeaturedMovies()
  const latestMovies = getLatestMovies(100)
  const topRatedMovies = getTopRatedMovies(100)
  const liveSports = getLiveSportsNow()
  const categories: Movie["category"][] = ["sports", "movies", "anime", "music", "comedy", "live", "documentary"]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">QheysTV</h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-primary">
              <Link href="/browse">Movies</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/sports" className="flex items-center gap-1">
                Sports
                {liveSports.length > 0 && (
                  <Badge className="bg-red-600 text-white text-xs ml-1">
                    <Radio className="h-2 w-2 mr-1 animate-pulse" />
                    {liveSports.length}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      <HeroVideo
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        title="Browse Our Library"
        subtitle={`Discover ${allMovies.length}+ movies, shows, and live events across all genres`}
      >
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
            <Link href="#content">
              <Play className="mr-2 h-5 w-5" />
              Start Watching
            </Link>
          </Button>
          {liveSports.length > 0 && (
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/sports">
                <Radio className="mr-2 h-4 w-4 animate-pulse" />
                {liveSports.length} Live Sports
              </Link>
            </Button>
          )}
        </div>
      </HeroVideo>

      <div className="container mx-auto px-4">
        <MovieGrid
          movies={featuredMovies}
          title="Editor's Picks"
          description={`${featuredMovies.length} handpicked titles just for you`}
          initialLimit={16}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={latestMovies}
          title="Latest Releases"
          description="Newest additions to our library"
          initialLimit={16}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={topRatedMovies}
          title="Top Rated"
          description="Highest rated content on QheysTV"
          initialLimit={16}
          columns={4}
          showFilters={true}
        />
      </div>

      <main id="content" className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">All Content</h1>
            <p className="text-muted-foreground">Browse {allMovies.length} titles across all categories</p>
          </div>
        </div>

        {categories.map((category) => {
          const categoryMovies = getMoviesByCategory(category)
          if (categoryMovies.length === 0) return null

          const categoryTitles: Record<Movie["category"], string> = {
            sports: "Sports & Live Events",
            movies: "Movies & Films",
            anime: "Anime Collection",
            music: "Music & Concerts",
            comedy: "Comedy & Entertainment",
            live: "Live Shows & Theatre",
            documentary: "Documentaries",
            thriller: "Thrillers",
            romance: "Romance",
            action: "Action",
            horror: "Horror",
            family: "Family",
          }

          return (
            <MovieGrid
              key={category}
              movies={categoryMovies}
              title={categoryTitles[category]}
              description={`${categoryMovies.length} titles available`}
              initialLimit={16}
              showLoadMore={true}
              columns={4}
              showFilters={true}
            />
          )
        })}

        <MovieGrid
          movies={allMovies}
          title="Complete Library"
          description={`All ${allMovies.length} titles in one place`}
          initialLimit={24}
          showLoadMore={true}
          columns={5}
          showFilters={true}
        />
      </main>
    </div>
  )
}
