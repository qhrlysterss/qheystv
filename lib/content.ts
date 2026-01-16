import { readFile, writeFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

const DATA_DIR = join(process.cwd(), "data")
const CONTENT_FILE = join(DATA_DIR, "content.json")

export interface Content {
  id: string
  title: string
  description: string
  category: "sports" | "movies" | "anime" | "music" | "comedy" | "live"
  thumbnail: string
  videoUrl: string
  duration: string
  rating: number
  releaseYear: number
  featured: boolean
  requiredPlan: "basic" | "premium" | "family"
  createdAt: string
}

export interface WatchHistory {
  userId: string
  contentId: string
  progress: number
  lastWatched: string
}

const HISTORY_FILE = join(DATA_DIR, "watch-history.json")

async function getContent(): Promise<Content[]> {
  try {
    if (!existsSync(CONTENT_FILE)) {
      const defaultContent: Content[] = [
        {
          id: "1",
          title: "Champions League Final",
          description: "Watch the most exciting football match of the season",
          category: "sports",
          thumbnail: "/vibrant-football-match.png",
          videoUrl: "/videos/sample.mp4",
          duration: "2h 15m",
          rating: 4.8,
          releaseYear: 2025,
          featured: true,
          requiredPlan: "basic",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Space Odyssey",
          description: "An epic journey through the cosmos",
          category: "movies",
          thumbnail: "/space-movie.png",
          videoUrl: "/videos/sample.mp4",
          duration: "2h 30m",
          rating: 4.9,
          releaseYear: 2025,
          featured: true,
          requiredPlan: "basic",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Dragon Warriors",
          description: "An action-packed anime adventure",
          category: "anime",
          thumbnail: "/anime-warriors.jpg",
          videoUrl: "/videos/sample.mp4",
          duration: "24m",
          rating: 4.7,
          releaseYear: 2025,
          featured: true,
          requiredPlan: "premium",
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          title: "Summer Music Festival",
          description: "Live performances from top artists",
          category: "music",
          thumbnail: "/vibrant-music-festival.png",
          videoUrl: "/videos/sample.mp4",
          duration: "3h",
          rating: 4.6,
          releaseYear: 2025,
          featured: false,
          requiredPlan: "premium",
          createdAt: new Date().toISOString(),
        },
        {
          id: "5",
          title: "Comedy Night Special",
          description: "Stand-up comedy that will make you laugh",
          category: "comedy",
          thumbnail: "/comedy-show.png",
          videoUrl: "/videos/sample.mp4",
          duration: "1h 15m",
          rating: 4.5,
          releaseYear: 2025,
          featured: false,
          requiredPlan: "basic",
          createdAt: new Date().toISOString(),
        },
        {
          id: "6",
          title: "Live Concert: Rock Legends",
          description: "Experience the greatest rock concert live",
          category: "live",
          thumbnail: "/rock-concert.png",
          videoUrl: "/videos/sample.mp4",
          duration: "2h",
          rating: 4.9,
          releaseYear: 2025,
          featured: true,
          requiredPlan: "family",
          createdAt: new Date().toISOString(),
        },
      ]
      await writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2))
      return defaultContent
    }
    const data = await readFile(CONTENT_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function getAllContent(): Promise<Content[]> {
  return getContent()
}

export async function getContentById(id: string): Promise<Content | null> {
  const content = await getContent()
  return content.find((c) => c.id === id) || null
}

export async function getContentByCategory(category: string): Promise<Content[]> {
  const content = await getContent()
  return content.filter((c) => c.category === category)
}

export async function getFeaturedContent(): Promise<Content[]> {
  const content = await getContent()
  return content.filter((c) => c.featured)
}

export async function getWatchHistory(userId: string): Promise<WatchHistory[]> {
  try {
    if (!existsSync(HISTORY_FILE)) {
      return []
    }
    const data = await readFile(HISTORY_FILE, "utf-8")
    const allHistory: WatchHistory[] = JSON.parse(data)
    return allHistory.filter((h) => h.userId === userId)
  } catch {
    return []
  }
}

export async function updateWatchHistory(userId: string, contentId: string, progress: number): Promise<void> {
  try {
    let history: WatchHistory[] = []
    if (existsSync(HISTORY_FILE)) {
      const data = await readFile(HISTORY_FILE, "utf-8")
      history = JSON.parse(data)
    }

    const existingIndex = history.findIndex((h) => h.userId === userId && h.contentId === contentId)

    const record: WatchHistory = {
      userId,
      contentId,
      progress,
      lastWatched: new Date().toISOString(),
    }

    if (existingIndex >= 0) {
      history[existingIndex] = record
    } else {
      history.push(record)
    }

    await writeFile(HISTORY_FILE, JSON.stringify(history, null, 2))
  } catch (error) {
    console.error("[v0] Error updating watch history:", error)
  }
}
