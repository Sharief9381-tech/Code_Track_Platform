import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("=== CLEAR STORAGE API CALLED ===")
    
    // Clear fallback storage
    const { clearAllData } = await import("@/lib/auth-fallback")
    const result = await clearAllData()
    
    console.log("Storage cleared successfully")
    
    return NextResponse.json({
      success: true,
      message: `Cleared ${result.usersCleared} users and ${result.sessionsCleared} sessions`,
      details: result
    })
  } catch (error) {
    console.error("Clear storage error:", error)
    return NextResponse.json(
      { 
        error: "Failed to clear storage",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method to clear storage",
    warning: "This will delete ALL data permanently"
  })
}