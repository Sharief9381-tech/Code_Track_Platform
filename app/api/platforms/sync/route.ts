import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { PlatformSyncService } from "@/lib/services/platform-sync"

export async function POST() {
  try {
    console.log("Platform sync POST request received")
    
    const user = await getCurrentUser()
    console.log("Current user:", user ? { id: user._id, role: user.role } : "null")
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    if (user.role !== "student") {
      return NextResponse.json(
        { error: "Only students can sync platforms" },
        { status: 403 }
      )
    }

    console.log("Starting platform sync for user:", user._id)
    const results = await PlatformSyncService.syncUserPlatforms(user._id as string)
    console.log("Sync results:", results)

    return NextResponse.json({
      success: true,
      results,
      syncedAt: new Date()
    })
  } catch (error) {
    console.error("Platform sync error:", error)
    return NextResponse.json(
      { error: `Failed to sync platforms: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    console.log("Platform sync GET request received")
    
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    if (user.role !== "student") {
      return NextResponse.json(
        { error: "Only students can view platform data" },
        { status: 403 }
      )
    }

    console.log("Returning platform data for user:", user._id)
    return NextResponse.json({
      linkedPlatforms: (user as any).linkedPlatforms || {},
      stats: (user as any).stats || {},
      lastSync: user.updatedAt
    })
  } catch (error) {
    console.error("Get platforms error:", error)
    return NextResponse.json(
      { error: `Failed to get platform data: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}