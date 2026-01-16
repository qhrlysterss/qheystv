"use client"

import { useRef, useState } from "react"
import { Play, Volume2, VolumeX, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface VideoPreviewProps {
  title: string
  description?: string
  videoUrl: string
  poster?: string
  className?: string
  href?: string
  rating?: number
  year?: number
}

export function VideoPreview({
  title,
  description,
  videoUrl,
  poster,
  className = "",
  href,
  rating,
  year,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  const togglePlay = async () => {
    if (!videoRef.current) return

    if (isPlaying) {
      if (playPromiseRef.current) {
        try {
          await playPromiseRef.current
        } catch {
          // Ignore errors from previous play attempt
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
        // Play was interrupted or failed, that's okay
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

  const ContentWrapper = href ? Link : "div"
  const wrapperProps = href ? { href } : {}

  return (
    <div className={`relative rounded-lg overflow-hidden bg-black group ${className}`}>
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        poster={poster || "/placeholder.svg?height=400&width=600"}
        muted={isMuted}
        loop
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay with title and controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
        <div className="flex items-end justify-between">
          {/* @ts-expect-error - Dynamic wrapper component */}
          <ContentWrapper {...wrapperProps} className="text-white flex-1 cursor-pointer">
            <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
            {description && <p className="text-sm text-white/80 line-clamp-1">{description}</p>}
            {(rating || year) && (
              <div className="flex items-center gap-3 mt-1">
                {rating && (
                  <span className="flex items-center gap-1 text-sm text-yellow-400">
                    <Star className="h-3 w-3 fill-current" />
                    {rating.toFixed(1)}
                  </span>
                )}
                {year && <span className="text-sm text-white/60">{year}</span>}
              </div>
            )}
          </ContentWrapper>
          <div className="flex gap-2 ml-2">
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
              <Play className={`h-4 w-4 text-white ${isPlaying ? "hidden" : ""}`} />
              {isPlaying && (
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
