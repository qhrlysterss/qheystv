import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { getAllMovies, getFeaturedMovies, getLatestMovies, getLiveSportsNow } from "@/lib/movies-database"

export default async function AccountPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const featuredMovies = getFeaturedMovies()
  const allMovies = getAllMovies()
  const latestMovies = getLatestMovies(30)
  const liveSports = getLiveSportsNow()

  return <div>{/* Account page content goes here */}</div>
}
