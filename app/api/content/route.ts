import { type NextRequest, NextResponse } from "next/server"
import { getAllContent, getContentByCategory, getFeaturedContent } from "@/lib/content"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const featured = searchParams.get("featured")

  try {
    if (featured === "true") {
      const content = await getFeaturedContent()
      return NextResponse.json(content)
    }

    if (category) {
      const content = await getContentByCategory(category)
      return NextResponse.json(content)
    }

    const content = await getAllContent()
    return NextResponse.json(content)
  } catch (error) {
    console.error("[v0] Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
