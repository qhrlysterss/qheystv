import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowLeft, Radio } from "lucide-react"
import Link from "next/link"
import { SubscribeButton } from "@/components/subscribe-button"
import { MovieGrid } from "@/components/movie-grid"
import { Badge } from "@/components/ui/badge"
import { getAllMovies, getFeaturedMovies, getLatestMovies, getLiveSportsNow } from "@/lib/movies-database"
import { PaymentsSection } from "@/components/payments-section"

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; return?: string }>
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const { plan: selectedPlan, return: returnUrl } = await searchParams

  const allMovies = getAllMovies()
  const featuredMovies = getFeaturedMovies()
  const latestMovies = getLatestMovies(50)
  const liveSports = getLiveSportsNow()

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$10",
      period: "/month",
      features: [
        "HD Streaming",
        "2 Devices",
        `Access to ${Math.floor(allMovies.length * 0.6)}+ titles`,
        "Sports & Movies",
        "Limited Anime Collection",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$20",
      period: "/month",
      popular: true,
      features: [
        "4K Ultra HD Streaming",
        "5 Devices",
        `Access to all ${allMovies.length}+ titles`,
        `Live Sports (${liveSports.length} events)`,
        "Early Access to New Shows",
        "Download for Offline Viewing",
      ],
    },
    {
      id: "family",
      name: "Family",
      price: "$30",
      period: "/month",
      features: [
        "4K Ultra HD Streaming",
        "Unlimited Devices",
        `Access to all ${allMovies.length}+ titles`,
        "All Live Sports Events",
        "Download for Offline Viewing",
        "Family Profiles",
        "Parental Controls",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button asChild variant="ghost">
            <Link href={returnUrl || "/dashboard"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get access to {allMovies.length}+ movies, shows, and {liveSports.length}+ live sports events
          </p>
          {session.subscription && (
            <p className="mt-4 text-sm text-muted-foreground">
              Current plan: <span className="font-semibold capitalize">{session.subscription}</span>
            </p>
          )}
        </div>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Preview Our Premium Content</h2>
              <p className="text-muted-foreground">{allMovies.length}+ titles waiting for you</p>
            </div>
            {liveSports.length > 0 && (
              <Badge className="bg-red-600 text-white">
                <Radio className="h-3 w-3 mr-1 animate-pulse" />
                {liveSports.length} Live Now
              </Badge>
            )}
          </div>
          <MovieGrid movies={featuredMovies.slice(0, 16)} initialLimit={16} showLoadMore={false} columns={4} />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Latest Releases</h2>
          <MovieGrid movies={latestMovies.slice(0, 12)} initialLimit={12} showLoadMore={false} columns={4} />
        </section>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              } ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
            >
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
                <SubscribeButton
                  plan={plan.id as "basic" | "premium" | "family"}
                  currentPlan={session.subscription}
                  variant={plan.popular ? "default" : "outline"}
                />
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="max-w-6xl mx-auto mb-16">
          <PaymentsSection />
        </section>

        <div className="text-center text-sm text-muted-foreground">
          <p>All plans include a 7-day free trial. Cancel anytime.</p>
          <p className="mt-2">
            Questions? Visit our{" "}
            <Link href="/help" className="text-primary hover:underline">
              Help Center
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
