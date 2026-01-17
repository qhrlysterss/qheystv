"use server"

import { getSession } from "@/lib/supabase/server"

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
    // In a production app, you would update user metadata in Supabase
    return { success: true, plan }
  } catch (error) {
    console.error("[v0] Subscription error:", error)
    return { error: "Failed to update subscription" }
  }
}

export async function cancelSubscription() {
  const session = await getSession()

  if (!session) {
    return { error: "You must be logged in to cancel" }
  }

  try {
    // In a production app, you would update user metadata in Supabase
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
    // In a production app, you would update user metadata in Supabase
    return { success: true }
  } catch (error) {
    console.error("[v0] Reactivation error:", error)
    return { error: "Failed to reactivate subscription" }
  }
}
