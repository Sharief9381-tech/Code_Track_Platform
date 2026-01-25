import { UserModel } from '@/lib/models/user'
import { getDatabase } from '@/lib/database'
import { PlatformAggregator, type AggregatedStats } from '@/lib/services/platform-aggregator'
import type { StudentProfile, CollegeProfile } from '@/lib/types'

export interface EnhancedStudentAnalytics {
  totalStudents: number
  activeStudents: number
  aggregatedStats: {
    totalProblems: number
    totalContributions: number
    totalContests: number
    averageRating: number
  }
  topPerformers: Array<{
    name: string
    email: string
    totalProblems: number
    githubContributions: number
    contestsAttended: number
    currentRating: number
    overallRank: string
  }>
  platformDistribution: Record<string, number>
  skillsDistribution: Record<string, number>
  departmentStats: Record<string, {
    students: number
    averageProblems: number
    averageContributions: number
    averageRating: number
    topLanguages: string[]
  }>
  activityLevels: Record<string, number>
  difficultyDistribution: {
    easy: number
    medium: number
    hard: number
  }
}

export interface RecruiterAnalytics {
  totalCandidates: number
  matchedCandidates: number
  averageSkillMatch: number
  topSkills: Array<{
    skill: string
    count: number
  }>
  collegeDistribution: Record<string, number>
  experienceDistribution: Record<string, number>
}

export class AnalyticsService {
  static async getEnhancedStudentAnalytics(collegeId?: string): Promise<EnhancedStudentAnalytics> {
    const db = await getDatabase()
    
    // Build filter for college-specific analytics
    const filter: any = { role: 'student' }
    if (collegeId) {
      const college = await UserModel.findById(collegeId)
      if (college && college.role === 'college') {
        filter.collegeCode = (college as any).collegeCode
      }
    }

    const students = await UserModel.findAll(filter)
    
    const totalStudents = students.length
    const activeStudents = students.filter((s: any) => 
      s.linkedPlatforms && Object.keys(s.linkedPlatforms).length > 0
    ).length

    // Calculate aggregated stats
    let totalProblems = 0
    let totalContributions = 0
    let totalContests = 0
    let totalRating = 0
    let studentsWithStats = 0

    const activityLevels: Record<string, number> = {
      'Low': 0,
      'Medium': 0,
      'High': 0,
      'Very High': 0
    }

    const difficultyDistribution = {
      easy: 0,
      medium: 0,
      hard: 0
    }

    // Top performers with enhanced metrics
    const topPerformers = students
      .filter((s: any) => s.aggregatedStats)
      .sort((a: any, b: any) => {
        const scoreA = (a.aggregatedStats?.totalProblems || 0) * 2 + 
                      Math.floor((a.aggregatedStats?.githubContributions || 0) / 10) + 
                      (a.aggregatedStats?.contestsAttended || 0) * 5
        const scoreB = (b.aggregatedStats?.totalProblems || 0) * 2 + 
                      Math.floor((b.aggregatedStats?.githubContributions || 0) / 10) + 
                      (b.aggregatedStats?.contestsAttended || 0) * 5
        return scoreB - scoreA
      })
      .slice(0, 10)
      .map((s: any) => ({
        name: s.name,
        email: s.email,
        totalProblems: s.aggregatedStats?.totalProblems || 0,
        githubContributions: s.aggregatedStats?.githubContributions || 0,
        contestsAttended: s.aggregatedStats?.contestsAttended || 0,
        currentRating: s.aggregatedStats?.currentRating || 0,
        overallRank: s.aggregatedStats?.skillsAnalysis?.overallRank || 'Beginner'
      }))

    // Aggregate all student stats
    students.forEach((s: any) => {
      if (s.aggregatedStats) {
        totalProblems += s.aggregatedStats.totalProblems || 0
        totalContributions += s.aggregatedStats.githubContributions || 0
        totalContests += s.aggregatedStats.contestsAttended || 0
        totalRating += s.aggregatedStats.currentRating || 0
        studentsWithStats++

        // Activity levels
        const activityLevel = s.aggregatedStats.skillsAnalysis?.activityLevel || 'Low'
        activityLevels[activityLevel]++

        // Difficulty distribution
        if (s.aggregatedStats.skillsAnalysis?.difficultyDistribution) {
          const diff = s.aggregatedStats.skillsAnalysis.difficultyDistribution
          difficultyDistribution.easy += diff.easy || 0
          difficultyDistribution.medium += diff.medium || 0
          difficultyDistribution.hard += diff.hard || 0
        }
      }
    })

    // Platform distribution
    const platformDistribution: Record<string, number> = {}
    students.forEach((s: any) => {
      if (s.linkedPlatforms) {
        Object.keys(s.linkedPlatforms).forEach(platform => {
          platformDistribution[platform] = (platformDistribution[platform] || 0) + 1
        })
      }
    })

    // Skills distribution (enhanced with languages from GitHub)
    const skillsDistribution: Record<string, number> = {}
    students.forEach((s: any) => {
      // Traditional skills
      if (s.skills) {
        s.skills.forEach((skill: string) => {
          skillsDistribution[skill] = (skillsDistribution[skill] || 0) + 1
        })
      }
      
      // Programming languages from aggregated stats
      if (s.aggregatedStats?.skillsAnalysis?.primaryLanguages) {
        s.aggregatedStats.skillsAnalysis.primaryLanguages.forEach((lang: string) => {
          skillsDistribution[lang] = (skillsDistribution[lang] || 0) + 1
        })
      }
    })

    // Enhanced department stats
    const departmentStats: Record<string, any> = {}
    students.forEach((s: any) => {
      const dept = s.branch || 'Unknown'
      if (!departmentStats[dept]) {
        departmentStats[dept] = {
          students: 0,
          totalProblems: 0,
          totalContributions: 0,
          totalRating: 0,
          languages: {} as Record<string, number>
        }
      }
      
      departmentStats[dept].students++
      
      if (s.aggregatedStats) {
        departmentStats[dept].totalProblems += s.aggregatedStats.totalProblems || 0
        departmentStats[dept].totalContributions += s.aggregatedStats.githubContributions || 0
        departmentStats[dept].totalRating += s.aggregatedStats.currentRating || 0
        
        // Track languages per department
        if (s.aggregatedStats.skillsAnalysis?.primaryLanguages) {
          s.aggregatedStats.skillsAnalysis.primaryLanguages.forEach((lang: string) => {
            departmentStats[dept].languages[lang] = (departmentStats[dept].languages[lang] || 0) + 1
          })
        }
      }
    })

    // Calculate averages and top languages per department
    Object.keys(departmentStats).forEach(dept => {
      const stats = departmentStats[dept]
      stats.averageProblems = Math.round(stats.totalProblems / stats.students)
      stats.averageContributions = Math.round(stats.totalContributions / stats.students)
      stats.averageRating = Math.round(stats.totalRating / stats.students)
      
      // Top 3 languages for this department
      stats.topLanguages = Object.entries(stats.languages)
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .slice(0, 3)
        .map(([lang]) => lang)
      
      delete stats.totalProblems
      delete stats.totalContributions
      delete stats.totalRating
      delete stats.languages
    })

    return {
      totalStudents,
      activeStudents,
      aggregatedStats: {
        totalProblems,
        totalContributions,
        totalContests,
        averageRating: studentsWithStats > 0 ? Math.round(totalRating / studentsWithStats) : 0
      },
      topPerformers,
      platformDistribution,
      skillsDistribution,
      departmentStats,
      activityLevels,
      difficultyDistribution
    }
  }

  static async getRecruiterAnalytics(): Promise<RecruiterAnalytics> {
    const students = await UserModel.findByRole('student')
    
    const totalCandidates = students.length
    const matchedCandidates = students.filter((s: any) => s.isOpenToWork).length

    // Top skills
    const skillCounts: Record<string, number> = {}
    students.forEach((s: any) => {
      if (s.skills) {
        s.skills.forEach((skill: string) => {
          skillCounts[skill] = (skillCounts[skill] || 0) + 1
        })
      }
    })

    const topSkills = Object.entries(skillCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([skill, count]) => ({ skill, count }))

    // College distribution
    const collegeDistribution: Record<string, number> = {}
    students.forEach((s: any) => {
      const college = s.collegeName || 'Unknown'
      collegeDistribution[college] = (collegeDistribution[college] || 0) + 1
    })

    // Experience distribution (based on graduation year)
    const currentYear = new Date().getFullYear()
    const experienceDistribution: Record<string, number> = {}
    students.forEach((s: any) => {
      const gradYear = s.graduationYear || currentYear
      let experience: string
      
      if (gradYear > currentYear) {
        experience = 'Student'
      } else if (gradYear === currentYear) {
        experience = 'Fresh Graduate'
      } else if (currentYear - gradYear <= 2) {
        experience = '0-2 years'
      } else if (currentYear - gradYear <= 5) {
        experience = '2-5 years'
      } else {
        experience = '5+ years'
      }
      
      experienceDistribution[experience] = (experienceDistribution[experience] || 0) + 1
    })

    return {
      totalCandidates,
      matchedCandidates,
      averageSkillMatch: 0, // Would need job matching algorithm
      topSkills,
      collegeDistribution,
      experienceDistribution
    }
  }

  static async getPersonalAnalytics(userId: string): Promise<any> {
    const user = await UserModel.findById(userId)
    if (!user || user.role !== 'student') {
      throw new Error('User not found or not a student')
    }

    const student = user as any
    const aggregatedStats = student.aggregatedStats as AggregatedStats
    
    if (!aggregatedStats) {
      return {
        hasStats: false,
        message: 'No aggregated stats available. Please sync your platforms first.',
        linkedPlatforms: Object.keys(student.linkedPlatforms || {}),
        totalPlatforms: Object.keys(student.linkedPlatforms || {}).length
      }
    }

    // Calculate progress over time (simulated - would need historical data)
    const progressData = [
      { month: 'Jan', problems: Math.floor(aggregatedStats.totalProblems * 0.1) },
      { month: 'Feb', problems: Math.floor(aggregatedStats.totalProblems * 0.2) },
      { month: 'Mar', problems: Math.floor(aggregatedStats.totalProblems * 0.4) },
      { month: 'Apr', problems: Math.floor(aggregatedStats.totalProblems * 0.6) },
      { month: 'May', problems: Math.floor(aggregatedStats.totalProblems * 0.8) },
      { month: 'Jun', problems: aggregatedStats.totalProblems },
    ]

    // Platform comparison with detailed breakdown
    const platformStats = [
      {
        platform: 'LeetCode',
        problems: aggregatedStats.platformBreakdown.leetcode.problems,
        rating: aggregatedStats.platformBreakdown.leetcode.rating,
        details: {
          easy: aggregatedStats.platformBreakdown.leetcode.easy,
          medium: aggregatedStats.platformBreakdown.leetcode.medium,
          hard: aggregatedStats.platformBreakdown.leetcode.hard
        },
        connected: !!student.linkedPlatforms?.leetcode
      },
      {
        platform: 'GitHub',
        contributions: aggregatedStats.platformBreakdown.github.contributions,
        repositories: aggregatedStats.platformBreakdown.github.repositories,
        followers: aggregatedStats.platformBreakdown.github.followers,
        connected: !!student.linkedPlatforms?.github
      },
      {
        platform: 'Codeforces',
        problems: aggregatedStats.platformBreakdown.codeforces.problems,
        rating: aggregatedStats.platformBreakdown.codeforces.rating,
        contests: aggregatedStats.platformBreakdown.codeforces.contests,
        connected: !!student.linkedPlatforms?.codeforces
      },
      {
        platform: 'CodeChef',
        problems: aggregatedStats.platformBreakdown.codechef.problems,
        rating: aggregatedStats.platformBreakdown.codechef.rating,
        stars: aggregatedStats.platformBreakdown.codechef.stars,
        connected: !!student.linkedPlatforms?.codechef
      }
    ].filter(p => p.connected)

    // Calculate achievements and milestones
    const achievements = []
    if (aggregatedStats.totalProblems >= 100) achievements.push('Century Solver')
    if (aggregatedStats.totalProblems >= 500) achievements.push('Problem Master')
    if (aggregatedStats.githubContributions >= 365) achievements.push('Daily Contributor')
    if (aggregatedStats.contestsAttended >= 10) achievements.push('Contest Warrior')
    if (aggregatedStats.currentRating >= 1500) achievements.push('Rated Coder')
    if (aggregatedStats.skillsAnalysis.overallRank === 'Expert') achievements.push('Expert Level')

    // Get all students for ranking calculation
    const allStudents = await UserModel.findByRole('student')
    const allStats = allStudents
      .filter((s: any) => s.aggregatedStats)
      .map((s: any) => s.aggregatedStats as AggregatedStats)
    
    const ranking = PlatformAggregator.calculateGlobalRanking(aggregatedStats, allStats)

    return {
      hasStats: true,
      aggregatedStats: {
        totalProblems: aggregatedStats.totalProblems,
        githubContributions: aggregatedStats.githubContributions,
        contestsAttended: aggregatedStats.contestsAttended,
        currentRating: aggregatedStats.currentRating,
        lastUpdated: aggregatedStats.lastUpdated
      },
      skillsAnalysis: aggregatedStats.skillsAnalysis,
      progressData,
      platformStats,
      achievements,
      ranking,
      linkedPlatforms: Object.keys(student.linkedPlatforms || {}),
      isOpenToWork: student.isOpenToWork
    }
  }
}