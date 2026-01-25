import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { UserModel } from "@/lib/models/user"
import { isDatabaseAvailable } from "@/lib/database"

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user || user.role !== "college") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const year = searchParams.get("year")
    const search = searchParams.get("search")

    // Get college information
    const college = user as any
    const collegeName = college.collegeName
    const collegeCode = college.collegeCode

    if (!collegeName && !collegeCode) {
      return NextResponse.json(
        { error: "College information not found" },
        { status: 400 }
      )
    }

    console.log(`Fetching students for college: ${collegeName} (${collegeCode})`)

    // Build filter for students from this college
    const filter: any = { 
      role: 'student',
      collegeCode: collegeCode
    }

    // Additional filters
    if (department && department !== 'all') {
      filter.branch = department
    }

    if (year && year !== 'all') {
      filter.graduationYear = parseInt(year)
    }

    let students = []

    if (isDatabaseAvailable()) {
      // Use database
      students = await UserModel.findAll(filter)
    } else {
      // Use fallback system
      const { getUsers } = await import("@/lib/auth-fallback")
      const allUsers = await getUsers()
      
      students = allUsers.filter((student: any) => {
        if (student.role !== 'student') return false
        
        // College matching by college code
        if (!student.collegeCode || student.collegeCode !== collegeCode) {
          return false
        }
        
        // Department filter
        if (department && department !== 'all' && student.branch !== department) {
          return false
        }
        
        // Year filter
        if (year && year !== 'all' && student.graduationYear !== parseInt(year)) {
          return false
        }
        
        return true
      })
    }

    // Apply search filter
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase()
      students = students.filter((student: any) => 
        student.name?.toLowerCase().includes(searchTerm) ||
        student.email?.toLowerCase().includes(searchTerm) ||
        student.rollNumber?.toLowerCase().includes(searchTerm)
      )
    }

    // Transform students data for frontend
    const transformedStudents = students.map((student: any) => ({
      id: student._id,
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      department: student.branch || 'Unknown',
      year: student.graduationYear || new Date().getFullYear(),
      collegeCode: student.collegeCode,
      // Aggregated stats
      totalProblems: student.aggregatedStats?.totalProblems || 0,
      githubContributions: student.aggregatedStats?.githubContributions || 0,
      contestsAttended: student.aggregatedStats?.contestsAttended || 0,
      currentRating: student.aggregatedStats?.currentRating || 0,
      activityLevel: student.aggregatedStats?.skillsAnalysis?.activityLevel || 'Low',
      overallRank: student.aggregatedStats?.skillsAnalysis?.overallRank || 'Beginner',
      primaryLanguages: student.aggregatedStats?.skillsAnalysis?.primaryLanguages || [],
      // Platform connections
      linkedPlatforms: Object.keys(student.linkedPlatforms || {}),
      platformCount: Object.keys(student.linkedPlatforms || {}).length,
      // Status
      isOpenToWork: student.isOpenToWork || false,
      placementStatus: student.placementStatus || 'searching',
      lastStatsUpdate: student.lastStatsUpdate,
      createdAt: student.createdAt
    }))

    // Sort by total problems (descending) then by name
    transformedStudents.sort((a: any, b: any) => {
      if (b.totalProblems !== a.totalProblems) {
        return b.totalProblems - a.totalProblems
      }
      return a.name.localeCompare(b.name)
    })

    return NextResponse.json({
      students: transformedStudents,
      total: transformedStudents.length,
      college: {
        name: collegeName,
        code: collegeCode
      }
    })
  } catch (error) {
    console.error("Get college students error:", error)
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    )
  }
}