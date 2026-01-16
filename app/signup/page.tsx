"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signUp } from "@/app/actions/auth"
import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense, useRef, useEffect } from "react"

function SignUpForm() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const [state, formAction, isPending] = useActionState(signUp, undefined)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const handleCanPlay = () => {
      playPromiseRef.current = videoRef.current?.play()
      playPromiseRef.current?.catch(() => {})
    }

    const video = videoRef.current
    video.addEventListener("canplay", handleCanPlay)

    // Clean up on unmount
    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      if (playPromiseRef.current) {
        playPromiseRef.current = null
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onError={() => console.log("[v0] Video failed to load")}
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-pink-600/80 to-blue-600/80" />

      <Card className="w-full max-w-md relative z-10 m-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Get started with QheysTV today
            {redirect && <span className="block mt-1 text-xs">Sign up to continue</span>}
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          {redirect && <input type="hidden" name="redirect" value={redirect} />}
          <CardContent className="space-y-4">
            {state?.error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{state.error}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                required
                disabled={isPending}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating account..." : "Sign Up"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href={`/login${redirect ? `?redirect=${redirect}` : ""}`} className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  )
}
