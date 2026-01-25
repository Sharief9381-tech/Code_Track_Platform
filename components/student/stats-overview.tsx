"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, TrendingUp, Award, Code, GitBranch, Trophy, Star } from "lucide-react"
import type { StudentProfile } from "@/lib/types"

interface StatsOverviewProps {
  student: StudentProfile
}

interface AggregatedStats {
  totalProblems: number
  githubContributions: number
  contestsAttended: number
  currentRating: number
  skillsAnalysis: {
    primaryLanguages: string[]
    activityLevel: string
    overallRank: string
    difficultyDistribution: {
      easy: number
      medium: number
      hard: number
    }
  }
  lastUpdated: string
}

export function StatsOverview({ student }: StatsOverviewProps) {
  const [stats, setStats] = useState<AggregatedStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/student/sync-stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const syncStats = async () => {
    setSyncing(true)
    try {
      const response = await fetch('/api/student/sync-stats', { method: 'POST' })
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error syncing stats:', error)
    } finally {
      setSyncing(false)
    }
  }

  const linkedPlatforms = student.linkedPlatforms || {}
  const hasLinkedPlatforms = Object.keys(linkedPlatforms).length > 0

  if (!hasLinkedPlatforms) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Coding Stats
          </CardTitle>
          <CardDescription>
            Connect your coding platforms to see your aggregated statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              No platforms connected yet. Add your first platform to start tracking your progress!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Coding Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading your stats...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Coding Stats
          </CardTitle>
          <CardDescription>
            Sync your platforms to see aggregated statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Button onClick={syncStats} disabled={syncing} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Stats'}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'bg-green-500'
      case 'High': return 'bg-blue-500'
      case 'Medium': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Expert': return 'text-purple-600 bg-purple-100'
      case 'Advanced': return 'text-blue-600 bg-blue-100'
      case 'Intermediate': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Problems</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProblems}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GitHub Contributions</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.githubContributions}</div>
            <p className="text-xs text-muted-foreground">
              This year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contests</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contestsAttended}</div>
            <p className="text-xs text-muted-foreground">
              Participated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentRating}</div>
            <p className="text-xs text-muted-foreground">
              Highest across platforms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Skills Analysis
            </CardTitle>
            <CardDescription>
              Your coding profile and activity level
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={syncStats} 
            disabled={syncing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Activity Level and Rank */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Activity Level:</span>
              <Badge className={`${getActivityColor(stats.skillsAnalysis.activityLevel)} text-white`}>
                {stats.skillsAnalysis.activityLevel}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Overall Rank:</span>
              <Badge className={getRankColor(stats.skillsAnalysis.overallRank)}>
                {stats.skillsAnalysis.overallRank}
              </Badge>
            </div>
          </div>

          {/* Primary Languages */}
          {stats.skillsAnalysis.primaryLanguages.length > 0 && (
            <div>
              <span className="text-sm font-medium">Primary Languages:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {stats.skillsAnalysis.primaryLanguages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Difficulty Distribution */}
          <div>
            <span className="text-sm font-medium mb-2 block">Problem Difficulty Distribution:</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600">Easy</span>
                <span className="text-sm font-medium">{stats.skillsAnalysis.difficultyDistribution.easy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-600">Medium</span>
                <span className="text-sm font-medium">{stats.skillsAnalysis.difficultyDistribution.medium}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-600">Hard</span>
                <span className="text-sm font-medium">{stats.skillsAnalysis.difficultyDistribution.hard}</span>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date(stats.lastUpdated).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}