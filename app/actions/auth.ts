"use server"

import { createUser, verifyUser, createSession, destroySession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectPath = formData.get("redirect") as string | null

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" }
  }

  const user = await createUser(email, password, name)

  if (!user) {
    return { error: "User already exists" }
  }

  await createSession(user)
  redirect(redirectPath || "/dashboard")
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectPath = formData.get("redirect") as string | null

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const user = await verifyUser(email, password)

  if (!user) {
    return { error: "Invalid email or password" }
  }

  await createSession(user)
  redirect(redirectPath || "/dashboard")
}

export async function signOut() {
  await destroySession()
  redirect("/")
}
