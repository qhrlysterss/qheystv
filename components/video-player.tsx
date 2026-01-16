"use client"

import { useEffect, useRef } from "react"

interface VideoPlayerProps {
  contentId: string
  videoUrl: string
}

export function VideoPlayer({ contentId, videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = async () => {
      const progress = (video.currentTime / video.duration) * 100
      try {
        await fetch("/api/watch-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentId, progress: Math.round(progress) }),
        })
      } catch (error) {
        console.error("[v0] Error updating watch history:", error)
      }
    }

    const handleTimeUpdate = () => {
      if (video.currentTime % 10 < 0.5) {
        updateProgress()
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", updateProgress)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", updateProgress)
    }
  }, [contentId])

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video ref={videoRef} controls className="w-full h-full" poster="/placeholder.svg?height=720&width=1280">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
