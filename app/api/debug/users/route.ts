import { NextResponse } from "next/server"
import { getUsers } from "@/lib/auth"

export async function GET() {
  try {
    const users = await getUsers()
    const userList = Array.from(users.entries()).map(([id, user]) => ({
      id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    }))
    
    return NextResponse.json({ 
      count: users.size,
      users: userList 
    })
  } catch (error) {
    console.error("Debug users error:", error)
    return NextResponse.json(
      { error: "Failed to get users" },
      { status: 500 }
    )
  }
}