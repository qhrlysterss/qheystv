"use server"

import { getSession, createSession } from "@/lib/auth"
import { updateUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function subscribeToPlan(formData: FormData) {
  const session = await getSession()

  if (!session) {
    return { error: "You must be logged in to subscribe" }
  }

  const plan = formData.get("plan") as "basic" | "premium" | "family"

  if (!plan || !["basic", "premium", "family"].includes(plan)) {
    return { error: "Invalid plan selected" }
  }

  try {
    const updatedUser = await updateUser(session.id, {
      subscription: plan,
      subscriptionStatus: "active",
    })

    if (!updatedUser) {
      return { error: "Failed to update subscription" }
    }

    await createSession(updatedUser)

    redirect("/dashboard")
  } catch (error) {
    console.error("[v0] Subscription error:", error)
    return { error: "Failed to process subscription" }
  }
}

export async function cancelSubscription() {
  const session = await getSession()

  if (!session) {
    return { error: "You must be logged in to cancel" }
  }

  try {
    const updatedUser = await updateUser(session.id, {
      subscriptionStatus: "cancelled",
    })

    if (!updatedUser) {
      return { error: "Failed to cancel subscription" }
    }

    await createSession(updatedUser)

    return { success: true }
  } catch (error) {
    console.error("[v0] Cancellation error:", error)
    return { error: "Failed to cancel subscription" }
  }
}

export async function reactivateSubscription() {
  const session = await getSession()

  if (!session) {
    return { error: "You must be logged in" }
  }

  try {
    const updatedUser = await updateUser(session.id, {
      subscriptionStatus: "active",
    })

    if (!updatedUser) {
      return { error: "Failed to reactivate subscription" }
    }

    await createSession(updatedUser)

    return { success: true }
  } catch (error) {
    console.error("[v0] Reactivation error:", error)
    return { error: "Failed to reactivate subscription" }
  }
}
