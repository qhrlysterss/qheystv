import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getContentById } from "@/lib/content"
import {
  getMovieById,
  getAllMovies,
  getMoviesByCategory,
  getLiveSportById,
  getLiveSportsNow,
} from "@/lib/movies-database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Calendar, Users, Radio } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import { MovieGrid } from "@/components/movie-grid"
import { LiveSportsGrid } from "@/components/live-sports-grid"

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const { id } = await params

  const legacyContent = await getContentById(id)
  const movie = getMovieById(id)
  const liveSport = getLiveSportById(id)
  const liveSportsNow = getLiveSportsNow()

  // Use movie data if found, check live sport, otherwise fall back to legacy content
  const content = movie
    ? {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        category: movie.category,
        thumbnail: movie.thumbnail,
        videoUrl: movie.videoUrl,
        duration: movie.duration,
        rating: movie.rating,
        releaseYear: movie.releaseYear,
        requiredPlan: movie.requiredPlan,
        genre: movie.genre,
        director: movie.director,
        cast: movie.cast,
        isLive: false,
      }
    : liveSport
      ? {
          id: liveSport.id,
          title: liveSport.title,
          description: `${liveSport.league} - ${liveSport.teams.home} vs ${liveSport.teams.away}`,
          category: "sports" as const,
          thumbnail: liveSport.thumbnail,
          videoUrl: liveSport.videoUrl,
          duration: "Live",
          rating: 5,
          releaseYear: new Date().getFullYear(),
          requiredPlan: "basic" as const,
          genre: liveSport.category,
          isLive: liveSport.isLive,
          viewers: liveSport.viewers,
          teams: liveSport.teams,
          league: liveSport.league,
        }
      : legacyContent

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Content Not Found</CardTitle>
            <CardDescription>The content you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/browse">Back to Browse</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const hasAccess =
    !session.subscription ||
    content.requiredPlan === "basic" ||
    (content.requiredPlan === "premium" && ["premium", "family"].includes(session.subscription)) ||
    (content.requiredPlan === "family" && session.subscription === "family")

  const relatedMovies = movie
    ? getMoviesByCategory(movie.category)
        .filter((m) => m.id !== movie.id)
        .slice(0, 12)
    : getAllMovies().slice(0, 12)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button asChild variant="ghost">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          {liveSportsNow.length > 0 && (
            <Button asChild variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
              <Link href="/sports">
                <Radio className="mr-2 h-4 w-4 animate-pulse" />
                {liveSportsNow.length} More Live
              </Link>
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!hasAccess ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Upgrade Required</CardTitle>
              <CardDescription>This content requires a {content.requiredPlan} subscription or higher.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/subscribe">View Subscription Plans</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              {"isLive" in content && content.isLive && (
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-red-600 text-white animate-pulse flex items-center gap-1">
                    <Radio className="h-3 w-3" />
                    LIVE
                  </Badge>
                  {"viewers" in content && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {(content.viewers as number).toLocaleString()} watching
                    </Badge>
                  )}
                </div>
              )}
              <VideoPlayer contentId={content.id} videoUrl={content.videoUrl} />
            </div>

            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold mb-4">{content.title}</h1>

              {"teams" in content && content.teams && (
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">{"league" in content && content.league}</p>
                  <div className="flex items-center justify-center gap-8 text-2xl font-bold">
                    <span>{(content.teams as { home: string }).home}</span>
                    {"homeScore" in (content.teams as object) && (
                      <span className="text-3xl">
                        {(content.teams as { homeScore?: number }).homeScore} -{" "}
                        {(content.teams as { awayScore?: number }).awayScore}
                      </span>
                    )}
                    <span>{(content.teams as { away: string }).away}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">{content.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{content.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{content.releaseYear}</span>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                  {content.category}
                </span>
                {movie?.genre && (
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">{movie.genre}</span>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{content.description}</p>

              {movie?.director && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Director</h3>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>
              )}

              {movie?.cast && movie.cast.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Cast</h3>
                  <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
                </div>
              )}

              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Required Plan</h3>
                <p className="text-muted-foreground capitalize">{content.requiredPlan} or higher</p>
              </div>
            </div>

            {liveSport && liveSportsNow.length > 1 && (
              <div className="mt-12">
                <LiveSportsGrid
                  sports={liveSportsNow.filter((s) => s.id !== liveSport.id).slice(0, 8)}
                  title="More Live Sports"
                  showFilters={false}
                  initialLimit={8}
                />
              </div>
            )}

            <div className="mt-12">
              <MovieGrid
                movies={relatedMovies}
                title="More Like This"
                description={`More ${movie?.category || "content"} you might enjoy`}
                initialLimit={12}
                showLoadMore={false}
                columns={4}
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
