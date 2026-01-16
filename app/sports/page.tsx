import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Radio, Calendar, Trophy, Tv } from "lucide-react"
import { HeroVideo } from "@/components/hero-video"
import { LiveSportsGrid } from "@/components/live-sports-grid"
import { getAllLiveSports, getLiveSportsNow, getUpcomingSports, getLiveSportsByCategory } from "@/lib/movies-database"

export default function SportsPage() {
  const allSports = getAllLiveSports()
  const liveSports = getLiveSportsNow()
  const upcomingSports = getUpcomingSports().slice(0, 20)

  const soccerSports = getLiveSportsByCategory("soccer").slice(0, 8)
  const basketballSports = getLiveSportsByCategory("basketball").slice(0, 8)
  const footballSports = getLiveSportsByCategory("football").slice(0, 8)
  const mmaSports = getLiveSportsByCategory("mma").slice(0, 8)
  const racingSports = getLiveSportsByCategory("racing").slice(0, 8)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">QheysTV</h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/browse">Movies</Link>
            </Button>
            <Button asChild variant="ghost" className="text-primary">
              <Link href="/sports">Sports</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      <HeroVideo
        videoUrl={
          liveSports.length > 0
            ? liveSports[0].videoUrl
            : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
        }
        title="Live Sports"
        subtitle={`${liveSports.length} events streaming live right now`}
      >
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="#live">
              <Radio className="mr-2 h-5 w-5 animate-pulse" />
              Watch Live ({liveSports.length})
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
            <Link href="#upcoming">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Events
            </Link>
          </Button>
        </div>
      </HeroVideo>

      {/* Stats bar */}
      <div className="bg-muted/50 border-y">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <Radio className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{liveSports.length}</p>
                <p className="text-sm text-muted-foreground">Live Now</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingSports.length}+</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Sport Types</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Tv className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allSports.length}+</p>
                <p className="text-sm text-muted-foreground">Total Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Live Now Section */}
        <section id="live" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold">Live Now</h2>
            <Badge className="bg-red-600 text-white animate-pulse flex items-center gap-1">
              <Radio className="h-3 w-3" />
              {liveSports.length} Live
            </Badge>
          </div>
          <LiveSportsGrid sports={liveSports} showFilters={true} initialLimit={16} />
        </section>

        {/* Soccer Section */}
        {soccerSports.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Soccer</h2>
              <Button variant="ghost" asChild>
                <Link href="#all-sports">View All</Link>
              </Button>
            </div>
            <LiveSportsGrid sports={soccerSports} showFilters={false} initialLimit={8} />
          </section>
        )}

        {/* Basketball Section */}
        {basketballSports.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Basketball</h2>
              <Button variant="ghost" asChild>
                <Link href="#all-sports">View All</Link>
              </Button>
            </div>
            <LiveSportsGrid sports={basketballSports} showFilters={false} initialLimit={8} />
          </section>
        )}

        {/* Football Section */}
        {footballSports.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">American Football</h2>
              <Button variant="ghost" asChild>
                <Link href="#all-sports">View All</Link>
              </Button>
            </div>
            <LiveSportsGrid sports={footballSports} showFilters={false} initialLimit={8} />
          </section>
        )}

        {/* MMA Section */}
        {mmaSports.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">MMA & Boxing</h2>
              <Button variant="ghost" asChild>
                <Link href="#all-sports">View All</Link>
              </Button>
            </div>
            <LiveSportsGrid sports={mmaSports} showFilters={false} initialLimit={8} />
          </section>
        )}

        {/* Racing Section */}
        {racingSports.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Motorsports</h2>
              <Button variant="ghost" asChild>
                <Link href="#all-sports">View All</Link>
              </Button>
            </div>
            <LiveSportsGrid sports={racingSports} showFilters={false} initialLimit={8} />
          </section>
        )}

        {/* Upcoming Section */}
        <section id="upcoming" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">Coming Up Next</h2>
            <Badge variant="secondary">
              <Calendar className="h-3 w-3 mr-1" />
              Scheduled
            </Badge>
          </div>
          <LiveSportsGrid sports={upcomingSports} showFilters={false} initialLimit={12} />
        </section>

        {/* All Sports */}
        <section id="all-sports">
          <h2 className="text-3xl font-bold mb-6">All Sports Events ({allSports.length}+)</h2>
          <LiveSportsGrid sports={allSports} showFilters={true} initialLimit={24} />
        </section>
      </main>
    </div>
  )
}
