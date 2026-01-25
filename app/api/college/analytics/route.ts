import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { AnalyticsService } from "@/lib/services/analytics"

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user || user.role !== "college") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get college-specific analytics
    const analytics = await AnalyticsService.getEnhancedStudentAnalytics(user._id as string)

    return NextResponse.json({
      ...analytics,
      college: {
        name: (user as any).collegeName,
        code: (user as any).collegeCode
      }
    })
  } catch (error) {
    console.error("Get college analytics error:", error)
    return NextResponse.json(
      { error: "Failed to get analytics" },
      { status: 500 }
    )
  }
}