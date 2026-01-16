import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import { readFile, writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface User {
  id: string
  email: string
  name: string
  passwordHash: string
  subscription?: "basic" | "premium" | "family"
  subscriptionStatus?: "active" | "cancelled" | "expired"
  createdAt: string
}

export interface SessionUser {
  id: string
  email: string
  name: string
  subscription?: "basic" | "premium" | "family"
  subscriptionStatus?: "active" | "cancelled" | "expired"
}

const DATA_DIR = join(process.cwd(), "data")
const USERS_FILE = join(DATA_DIR, "users.json")

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

async function getUsers(): Promise<User[]> {
  try {
    await ensureDataDir()
    if (!existsSync(USERS_FILE)) {
      return []
    }
    const data = await readFile(USERS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveUsers(users: User[]) {
  await ensureDataDir()
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2))
}

export async function createUser(email: string, password: string, name: string): Promise<User | null> {
  const users = await getUsers()

  if (users.find((u) => u.email === email)) {
    return null
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  await saveUsers(users)
  return newUser
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const users = await getUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return null
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  return isValid ? user : null
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers()
  return users.find((u) => u.id === id) || null
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const users = await getUsers()
  const index = users.findIndex((u) => u.id === id)

  if (index === -1) {
    return null
  }

  users[index] = { ...users[index], ...updates }
  await saveUsers(users)
  return users[index]
}

export async function createSession(user: User) {
  const sessionUser: SessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    subscription: user.subscription,
    subscriptionStatus: user.subscriptionStatus,
  }

  const token = await new SignJWT(sessionUser)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  return sessionUser
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as SessionUser
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
