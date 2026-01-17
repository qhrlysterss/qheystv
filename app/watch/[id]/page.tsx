import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { getContentById } from "@/lib/content"
import { getMovieById } from "@/lib/movies-database"

export default async function WatchPage({ params }: { params: { id: string } }) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const { id } = params

  const legacyContent = await getContentById(id)
  const movie = await getMovieById(id)

  // ** rest of code here **
}
