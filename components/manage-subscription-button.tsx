"use client"

import { Button } from "@/components/ui/button"
import { cancelSubscription, reactivateSubscription } from "@/app/actions/subscription"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ManageSubscriptionButtonProps {
  subscriptionStatus: string
  hasPlan: boolean
}

export function ManageSubscriptionButton({ subscriptionStatus, hasPlan }: ManageSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = async () => {
    setIsLoading(true)
    const result = await cancelSubscription()
    if (result.error) {
      alert(result.error)
    } else {
      window.location.reload()
    }
    setIsLoading(false)
  }

  const handleReactivate = async () => {
    setIsLoading(true)
    const result = await reactivateSubscription()
    if (result.error) {
      alert(result.error)
    } else {
      window.location.reload()
    }
    setIsLoading(false)
  }

  if (!hasPlan) return null

  if (subscriptionStatus === "cancelled") {
    return (
      <Button onClick={handleReactivate} disabled={isLoading}>
        {isLoading ? "Processing..." : "Reactivate Subscription"}
      </Button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isLoading}>
          Cancel Subscription
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will cancel your subscription. You'll continue to have access until the end of your current billing
            period. You can reactivate anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel}>Cancel Subscription</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
