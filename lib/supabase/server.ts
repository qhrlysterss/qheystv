"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      async getAll() {
        const store = await cookieStore
        return store.getAll()
      },
      async setAll(cookiesToSet) {
        const store = await cookieStore
        try {
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
        } catch {
          // The `setAll` method was called server-side.
          // This can happen when the server needs to do work that will update
          // the client. If this happens, we can't modify the cookies directly,
          // and the client will need to pick up the new cookies in the next request.
        }
      },
    },
  })
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function getSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
  }
}
