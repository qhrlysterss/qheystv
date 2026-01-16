"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Users, Radio, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { LiveSport } from "@/lib/movies-database"

interface LiveSportsCardProps {
  sport: LiveSport
}

export function LiveSportsCard({ sport }: LiveSportsCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const [viewers, setViewers] = useState(sport.viewers)

  // Simulate live viewer count changes
  useEffect(() => {
    if (!sport.isLive) return

    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 200) - 100)
    }, 5000)

    return () => clearInterval(interval)
  }, [sport.isLive])

  const togglePlay = async () => {
    if (!videoRef.current) return

    if (isPlaying) {
      if (playPromiseRef.current) {
        try {
          await playPromiseRef.current
        } catch {
          // Ignore
        }
        playPromiseRef.current = null
      }
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      playPromiseRef.current = videoRef.current.play()
      try {
        await playPromiseRef.current
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
      playPromiseRef.current = null
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatViewers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
    return count.toString()
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-black group">
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        poster={sport.thumbnail}
        muted={isMuted}
        loop
        playsInline
      >
        <source src={sport.videoUrl} type="video/mp4" />
      </video>

      {/* Live badge */}
      {sport.isLive && (
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge className="bg-red-600 text-white animate-pulse flex items-center gap-1">
            <Radio className="h-3 w-3" />
            LIVE
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {formatViewers(viewers)}
          </Badge>
        </div>
      )}

      {/* Score overlay for live games */}
      {sport.isLive && sport.teams.homeScore !== undefined && (
        <div className="absolute top-3 right-3 bg-black/80 rounded-lg px-3 py-2 text-white">
          <div className="flex items-center gap-3 text-sm font-bold">
            <span>{sport.teams.home}</span>
            <span className="text-lg">
              {sport.teams.homeScore} - {sport.teams.awayScore}
            </span>
            <span>{sport.teams.away}</span>
          </div>
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
        <Link href={`/watch/${sport.id}`} className="flex-1 flex flex-col justify-end">
          <Badge variant="outline" className="w-fit mb-2 text-white border-white/50">
            {sport.league}
          </Badge>
          <h3 className="font-bold text-lg text-white">{sport.title}</h3>
          <p className="text-sm text-white/70 capitalize">{sport.category}</p>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-white/60">
            {sport.isLive ? "Live Now" : new Date(sport.startTime).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm h-8 w-8"
              onClick={(e) => {
                e.preventDefault()
                toggleMute()
              }}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm h-8 w-8"
              onClick={(e) => {
                e.preventDefault()
                togglePlay()
              }}
            >
              {isPlaying ? (
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <Play className="h-4 w-4 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
