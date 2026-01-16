import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getFeaturedContent, getWatchHistory, getAllContent } from "@/lib/content"
import Image from "next/image"
import Link from "next/link"
import { Play, User, CreditCard, Clock, Radio, Film } from "lucide-react"
import { SignOutButton } from "@/components/sign-out-button"
import { MovieGrid } from "@/components/movie-grid"
import { Badge } from "@/components/ui/badge"
import {
  getAllMovies,
  getFeaturedMovies,
  getMoviesByCategory,
  getLatestMovies,
  getTopRatedMovies,
  getLiveSportsNow,
} from "@/lib/movies-database"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const [featuredContent, watchHistoryData, allContent] = await Promise.all([
    getFeaturedContent(),
    getWatchHistory(session.id),
    getAllContent(),
  ])

  const allMovies = getAllMovies()
  const featuredMovies = getFeaturedMovies()
  const latestMovies = getLatestMovies(50)
  const topRatedMovies = getTopRatedMovies(50)
  const liveSports = getLiveSportsNow()
  const recommendedMovies = allMovies.slice(0, 20)

  const continueWatching = watchHistoryData
    .map((h) => {
      const content = allContent.find((c) => c.id === h.contentId)
      return content ? { ...content, progress: h.progress, lastWatched: h.lastWatched } : null
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime())
    .slice(0, 5)

  const subscriptionStatus = session.subscription
    ? {
        plan: session.subscription,
        status: session.subscriptionStatus || "active",
      }
    : null

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">QheysTV</h1>
          </Link>
          <div className="flex gap-4 items-center">
            <Button asChild variant="ghost">
              <Link href="/browse">Browse</Link>
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
              <Link href="/account">Account</Link>
            </Button>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {session.name}</h1>
          <p className="text-muted-foreground">
            {allMovies.length}+ movies and {liveSports.length} live sports events available
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{session.name}</div>
              <p className="text-xs text-muted-foreground mt-1">{session.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{subscriptionStatus?.plan || "Free"}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {subscriptionStatus?.status === "active" ? "Active" : "No active subscription"}
              </p>
              {!subscriptionStatus && (
                <Button asChild size="sm" className="mt-3">
                  <Link href="/subscribe">Upgrade Now</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Library</CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allMovies.length}+</div>
              <p className="text-xs text-muted-foreground mt-1">Movies & Shows</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Live Sports</CardTitle>
              <Radio className="h-4 w-4 text-red-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{liveSports.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Live Now</p>
              <Button asChild size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
                <Link href="/sports">Watch Live</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <MovieGrid
          movies={recommendedMovies}
          title="Recommended For You"
          description="Based on your viewing history"
          initialLimit={8}
          columns={4}
          showLoadMore={false}
        />

        {continueWatching.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Continue Watching</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {continueWatching.map((item) => (
                <Link key={item.id} href={`/watch/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative aspect-video">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.progress}% complete</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <MovieGrid
          movies={latestMovies}
          title="Latest Releases"
          description="Newest additions this week"
          initialLimit={12}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={topRatedMovies}
          title="Top Rated"
          description="Highest rated content"
          initialLimit={12}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={getMoviesByCategory("movies")}
          title="Popular Movies"
          description={`${getMoviesByCategory("movies").length} top rated films`}
          initialLimit={16}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={getMoviesByCategory("sports")}
          title="Sports Highlights"
          description="Don't miss the action"
          initialLimit={8}
          columns={4}
          showLoadMore={false}
        />

        <MovieGrid
          movies={getMoviesByCategory("anime")}
          title="Anime Picks"
          description={`${getMoviesByCategory("anime").length} anime titles for you`}
          initialLimit={12}
          columns={4}
        />

        <MovieGrid
          movies={featuredMovies}
          title="Featured Content"
          description="Handpicked by our editors"
          initialLimit={16}
          columns={4}
        />
      </main>
    </div>
  )
}
