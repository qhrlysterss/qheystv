import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/supabase/server"
import { getWatchHistory, updateWatchHistory } from "@/lib/content"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const history = await getWatchHistory(session.id)
    return NextResponse.json(history)
  } catch (error) {
    console.error("[v0] Error fetching watch history:", error)
    return NextResponse.json({ error: "Failed to fetch watch history" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { contentId, progress } = await request.json()

    // Update watch history with the new contentId and progress
    await updateWatchHistory(session.id, contentId, progress)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating watch history:", error)
    return NextResponse.json({ error: "Failed to update watch history" }, { status: 500 })
  }
}
