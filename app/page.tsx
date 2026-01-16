import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Play, Tv, Film, Music, Dumbbell, Laugh, Radio } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getSession } from "@/lib/auth"
import { HeroVideo } from "@/components/hero-video"
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

export default async function QheysTV() {
  const session = await getSession()
  const allMovies = getAllMovies()
  const featuredMovies = getFeaturedMovies()
  const latestMovies = getLatestMovies(50)
  const topRatedMovies = getTopRatedMovies(50)
  const actionMovies = getMoviesByCategory("movies")
  const sportsMovies = getMoviesByCategory("sports")
  const animeMovies = getMoviesByCategory("anime")
  const liveSports = getLiveSportsNow()

  const categories = [
    { name: "Sports", icon: Dumbbell },
    { name: "Movies", icon: Film },
    { name: "Anime & Cartoons", icon: Tv },
    { name: "Music", icon: Music },
    { name: "Comedy & Drama", icon: Laugh },
    { name: "Live Shows", icon: Play },
  ]

  const plans = [
    {
      name: "Basic",
      price: "$10",
      period: "/month",
      features: ["HD Streaming", "2 Devices", "Sports & Movies", "Limited Anime Collection"],
    },
    {
      name: "Premium",
      price: "$20",
      period: "/month",
      popular: true,
      features: [
        "4K Ultra HD Streaming",
        "5 Devices",
        "All Content Categories",
        "Early Access to New Shows",
        "Download for Offline Viewing",
      ],
    },
    {
      name: "Family",
      price: "$30",
      period: "/month",
      features: [
        "4K Ultra HD Streaming",
        "Unlimited Devices",
        "All Content Categories",
        "Early Access to New Shows",
        "Download for Offline Viewing",
        "Family Profiles",
        "Parental Controls",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header with Auth Buttons */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">QheysTV</h1>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
              Movies
            </Link>
            <Link
              href="/sports"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              Sports
              {liveSports.length > 0 && (
                <Badge className="bg-red-600 text-white text-xs px-1.5 py-0 h-5">
                  <Radio className="h-2 w-2 mr-1 animate-pulse" />
                  {liveSports.length}
                </Badge>
              )}
            </Link>
            <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
              Anime
            </Link>
          </nav>
          <div className="flex gap-4">
            {session ? (
              <>
                <Button asChild variant="ghost">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/account">Account</Link>
                </Button>
                <Button asChild>
                  <Link href="/browse">Browse Content</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section replaced with video background */}
      <HeroVideo
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        title="Discover the Power of Full-Stack OTT Streaming with QheysTV"
        subtitle={`Stream ${allMovies.length}+ movies, live sports, anime, and more. ${liveSports.length} live events happening now!`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
            <Link href={session ? "/dashboard" : "/signup"}>{session ? "Go to Dashboard" : "Start Free Trial"}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 bg-transparent"
          >
            <Link href="/browse">Browse {allMovies.length}+ Titles</Link>
          </Button>
          {liveSports.length > 0 && (
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/sports">
                <Radio className="mr-2 h-4 w-4 animate-pulse" />
                {liveSports.length} Live Now
              </Link>
            </Button>
          )}
        </div>
      </HeroVideo>

      <div className="container mx-auto px-4">
        <MovieGrid
          movies={featuredMovies}
          title="Trending Now"
          description={`${featuredMovies.length} featured titles everyone's watching`}
          initialLimit={12}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={latestMovies}
          title="Latest Releases"
          description="Brand new movies added this week"
          initialLimit={12}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={topRatedMovies}
          title="Top Rated"
          description="Highest rated movies of all time"
          initialLimit={12}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={actionMovies}
          title="Movies & Films"
          description={`${actionMovies.length} blockbusters, dramas, and cinematic masterpieces`}
          initialLimit={16}
          columns={4}
          showFilters={true}
        />

        <MovieGrid
          movies={sportsMovies}
          title="Sports & Live Events"
          description={`${sportsMovies.length} titles - Catch all the action from around the world`}
          initialLimit={12}
          columns={4}
        />

        <MovieGrid
          movies={animeMovies}
          title="Anime Collection"
          description={`${animeMovies.length} anime series and movies`}
          initialLimit={12}
          columns={4}
        />
      </div>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Stream What You Love</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our library of {allMovies.length}+ titles across multiple genres and categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link href="/sports">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer relative">
                <CardContent className="pt-6 pb-6">
                  <Dumbbell className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <p className="font-semibold">Live Sports</p>
                  {liveSports.length > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs">
                      {liveSports.length} Live
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
            <Link href="/browse">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 pb-6">
                  <Film className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <p className="font-semibold">Movies</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/browse">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 pb-6">
                  <Tv className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <p className="font-semibold">Anime</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/browse">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 pb-6">
                  <Music className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <p className="font-semibold">Music</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/browse">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 pb-6">
                  <Laugh className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <p className="font-semibold">Comedy</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/browse">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 pb-6">
                  <Play className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <p className="font-semibold">Live Shows</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">QheysTV Subscription Plans</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get access to {allMovies.length}+ movies and {liveSports.length}+ live sports events
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                    <Link href={session ? "/subscribe?plan=" + plan.name.toLowerCase() : "/signup"}>
                      {session ? "Subscribe" : "Sign Up"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose QheysTV?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Tv className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{allMovies.length}+ Movies & Shows</h3>
                    <p className="text-muted-foreground text-sm">
                      Access sports, anime, cartoons, Bollywood, Nollywood, wrestling, music, drama, comedy, wildlife,
                      movies, and live shows
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Radio className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Live Sports 24/7</h3>
                    <p className="text-muted-foreground text-sm">
                      Watch live soccer, basketball, football, tennis, MMA, boxing, racing, and more
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Seamless Streaming</h3>
                    <p className="text-muted-foreground text-sm">
                      Enjoy buffer-free streaming with our optimized full-stack delivery system
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image src="/streaming-platform-interface-dark-mode.jpg" alt="QheysTV interface preview" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* More Movie Sections */}
      <div className="container mx-auto px-4">
        <MovieGrid
          movies={getMoviesByCategory("music")}
          title="Music & Concerts"
          description="Live performances and music documentaries"
          initialLimit={12}
          columns={4}
        />

        <MovieGrid
          movies={getMoviesByCategory("comedy")}
          title="Comedy & Entertainment"
          description="Laugh out loud with our comedy collection"
          initialLimit={12}
          columns={4}
        />

        <MovieGrid
          movies={getMoviesByCategory("live")}
          title="Live Shows & Theatre"
          description="Broadway, concerts, and live entertainment"
          initialLimit={12}
          columns={4}
        />
      </div>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4 text-balance">
            Ready to Start Streaming?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of viewers enjoying {allMovies.length}+ movies and live sports
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
              <Link href={session ? "/dashboard" : "/signup"}>Get Started Today</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/sports">Watch Live Sports</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">QheysTV</h3>
              <p className="text-sm text-muted-foreground">
                Your premium OTT streaming platform with {allMovies.length}+ movies and live sports
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Content</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/sports" className="hover:text-primary">
                    Live Sports
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="hover:text-primary">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="hover:text-primary">
                    Anime
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="hover:text-primary">
                    Live Shows
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 QheysTV. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
