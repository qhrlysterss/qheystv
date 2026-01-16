"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroVideoProps {
  videoUrl: string
  title: string
  subtitle: string
  children?: React.ReactNode
}

export function HeroVideo({ videoUrl, title, subtitle, children }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isMounted = true
    const playVideo = async () => {
      try {
        await video.play()
      } catch {
        // Autoplay was prevented or component unmounted, that's okay
      }
    }

    if (isMounted) {
      playVideo()
    }

    return () => {
      isMounted = false
      // Pause on cleanup to prevent lingering play promises
      video.pause()
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">{title}</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">{subtitle}</p>
          {children}
        </div>

        {/* Mute toggle */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-8 right-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
        </Button>
      </div>
    </section>
  )
}
