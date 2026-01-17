import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"
import { getSession } from "@/lib/supabase/server"
import { HeroVideo } from "@/components/hero-video"
import { MovieGrid } from "@/components/movie-grid"
import {
  getAllMovies,
  getFeaturedMovies,
  getMoviesByCategory,
  getLatestMovies,
  getTopRatedMovies,
  getLiveSportsNow,
} from "@/lib/movies-database"

export default async function QheysTV() {
  const session = await getSession()
  const allMovies = await getAllMovies()
  const featuredMovies = await getFeaturedMovies()
  const latestMovies = await getLatestMovies(50)
  const topRatedMovies = await getTopRatedMovies(50)
  const actionMovies = await getMoviesByCategory("movies")
  const sportsMovies = await getMoviesByCategory("sports")
  const animeMovies = await getMoviesByCategory("anime")
  const liveSports = await getLiveSportsNow()

  const categories = [
    { name: "Featured", movies: featuredMovies },
    { name: "Latest", movies: latestMovies },
    { name: "Top Rated", movies: topRatedMovies },
    { name: "Action", movies: actionMovies },
    { name: "Sports", movies: sportsMovies },
    { name: "Anime", movies: animeMovies },
    { name: "Live Sports", movies: liveSports },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeroVideo />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {categories.map((category) => (
          <Card key={category.name} className="h-full">
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <MovieGrid movies={category.movies} />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-transparent">
                <Play className="mr-2 h-4 w-4" />
                Watch All
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
