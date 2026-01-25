import { NextResponse } from "next/server"
import { createStudent, createCollege, createRecruiter } from "@/lib/auth"

export async function POST() {
  try {
    // Create a test student
    const student = await createStudent({
      name: "Test Student",
      email: "student@test.com",
      password: "password123",
      role: "student",
      collegeName: "Test College",
      graduationYear: 2025,
      branch: "Computer Science",
      linkedPlatforms: {},
      stats: {
        totalProblems: 0,
        easyProblems: 0,
        mediumProblems: 0,
        hardProblems: 0,
        githubContributions: 0,
        contestsParticipated: 0,
        rating: 0,
      },
      skills: [],
      isOpenToWork: true,
    })

    // Create a test college
    const college = await createCollege({
      name: "Test College Admin",
      email: "college@test.com", 
      password: "password123",
      role: "college",
      collegeName: "Test College",
      collegeCode: "TC",
      location: "Test City",
      website: "",
      placementOfficerName: "Test Officer",
      placementOfficerEmail: "officer@test.com",
      totalStudents: 0,
      departments: [],
    })

    // Create a test recruiter
    const recruiter = await createRecruiter({
      name: "Test Recruiter",
      email: "recruiter@test.com",
      password: "password123",
      role: "recruiter",
      companyName: "Test Company",
      companyWebsite: "",
      companySize: "100-500",
      industry: "Technology",
      designation: "HR Manager",
      hiringFor: [],
      preferredSkills: [],
    })

    return NextResponse.json({
      success: true,
      message: "Test users created",
      users: {
        student: { id: student._id, email: student.email },
        college: { id: college._id, email: college.email },
        recruiter: { id: recruiter._id, email: recruiter.email }
      }
    })
  } catch (error) {
    console.error("Create test user error:", error)
    return NextResponse.json(
      { error: "Failed to create test users" },
      { status: 500 }
    )
  }
}