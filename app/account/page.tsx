import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, User, Mail, Calendar, CreditCard, Radio, Film } from "lucide-react"
import { ManageSubscriptionButton } from "@/components/manage-subscription-button"
import { MovieGrid } from "@/components/movie-grid"
import { Badge } from "@/components/ui/badge"
import {
  getAllMovies,
  getFeaturedMovies,
  getMoviesByCategory,
  getLatestMovies,
  getLiveSportsNow,
} from "@/lib/movies-database"

export default async function AccountPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const featuredMovies = getFeaturedMovies()
  const allMovies = getAllMovies()
  const latestMovies = getLatestMovies(30)
  const liveSports = getLiveSportsNow()

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
          {liveSports.length > 0 && (
            <Button asChild variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
              <Link href="/sports">
                <Radio className="mr-2 h-4 w-4 animate-pulse" />
                {liveSports.length} Live Sports
              </Link>
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Account Info Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <p className="text-lg font-semibold">{session.name}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{session.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Subscription
                </CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Plan</label>
                  <p className="text-2xl font-bold capitalize">{session.subscription || "Free"}</p>
                  {session.subscriptionStatus && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Status:{" "}
                      <span
                        className={
                          session.subscriptionStatus === "active" ? "text-green-600 font-medium" : "text-yellow-600"
                        }
                      >
                        {session.subscriptionStatus}
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  {!session.subscription ? (
                    <Button asChild>
                      <Link href="/subscribe">Choose a Plan</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/subscribe">Change Plan</Link>
                      </Button>
                      <ManageSubscriptionButton
                        subscriptionStatus={session.subscriptionStatus || "active"}
                        hasPlan={!!session.subscription}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  Your Library
                </CardTitle>
                <CardDescription>Content available to you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Movies</span>
                  <span className="font-bold">{allMovies.length}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Live Sports</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-600 text-white">
                      <Radio className="h-2 w-2 mr-1 animate-pulse" />
                      Live
                    </Badge>
                    <span className="font-bold">{liveSports.length}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">New This Week</span>
                  <span className="font-bold">{latestMovies.length}+</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Navigate your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/browse">Browse {allMovies.length}+ Titles</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start bg-transparent border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Link href="/sports">
                      <Radio className="mr-2 h-4 w-4" />
                      Watch Live Sports
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Watch</CardTitle>
                <CardDescription>Jump back into your favorites - {allMovies.length}+ titles available</CardDescription>
              </CardHeader>
              <CardContent>
                <MovieGrid movies={featuredMovies.slice(0, 9)} initialLimit={9} showLoadMore={false} columns={3} />
              </CardContent>
            </Card>

            <MovieGrid
              movies={latestMovies}
              title="Latest Releases"
              description="Newest additions to the library"
              initialLimit={9}
              columns={3}
            />

            <MovieGrid
              movies={getMoviesByCategory("movies")}
              title="Top Movies"
              description="Most popular films"
              initialLimit={9}
              columns={3}
            />

            <MovieGrid
              movies={getMoviesByCategory("sports")}
              title="Sports Highlights"
              description="Live events and replays"
              initialLimit={6}
              columns={3}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
