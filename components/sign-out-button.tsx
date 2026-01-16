"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/app/actions/auth"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => {
        await signOut()
      }}
    >
      <LogOut className="h-5 w-5" />
      <span className="sr-only">Sign out</span>
    </Button>
  )
}
