import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { getAllMovies, getFeaturedMovies, getLatestMovies, getLiveSportsNow } from "@/lib/movies-database"

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

  // Placeholder for the rest of the code
}
