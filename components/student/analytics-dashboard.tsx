"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"
import { TrendingUp, Award, Target, Calendar, Trophy, Star } from "lucide-react"
import type { StudentProfile } from "@/lib/types"

interface AnalyticsDashboardProps {
  student: StudentProfile
}

export function AnalyticsDashboard({ student }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/student/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analytics || !analytics.hasStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Analytics Dashboard
          </CardTitle>
          <CardDescription>
            {analytics?.message || 'Connect platforms and sync stats to see detailed analytics'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No analytics data available yet
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { aggregatedStats, skillsAnalysis, progressData, platformStats, achievements, ranking } = analytics

  // Prepare chart data
  const difficultyData = [
    { name: 'Easy', value: skillsAnalysis.difficultyDistribution.easy, color: '#10B981' },
    { name: 'Medium', value: skillsAnalysis.difficultyDistribution.medium, color: '#F59E0B' },
    { name: 'Hard', value: skillsAnalysis.difficultyDistribution.hard, color: '#EF4444' }
  ]

  const platformComparisonData = platformStats.map((platform: any) => ({
    name: platform.platform,
    problems: platform.problems || 0,
    contributions: platform.contributions || 0,
    rating: platform.rating || 0
  }))

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{ranking.overallRank}</div>
            <p className="text-xs text-muted-foreground">
              Overall ranking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problems Rank</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{ranking.problemsRank}</div>
            <p className="text-xs text-muted-foreground">
              Problems solved ranking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributions Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{ranking.contributionsRank}</div>
            <p className="text-xs text-muted-foreground">
              GitHub contributions ranking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Level</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillsAnalysis.activityLevel}</div>
            <p className="text-xs text-muted-foreground">
              Current activity level
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Progress Over Time
          </CardTitle>
          <CardDescription>
            Your problem-solving progress throughout the year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="problems" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Difficulty Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Problem Difficulty Distribution</CardTitle>
            <CardDescription>
              Breakdown of problems solved by difficulty level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Comparison</CardTitle>
            <CardDescription>
              Problems solved across different platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={platformComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="problems" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Milestones you've unlocked based on your coding activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {achievements.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement: string) => (
                <Badge key={achievement} variant="secondary" className="gap-1">
                  <Award className="h-3 w-3" />
                  {achievement}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Keep coding to unlock achievements!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Summary</CardTitle>
          <CardDescription>
            Your programming languages and expertise level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-sm font-medium">Overall Rank:</span>
            <Badge className="ml-2" variant={
              skillsAnalysis.overallRank === 'Expert' ? 'default' : 'secondary'
            }>
              {skillsAnalysis.overallRank}
            </Badge>
          </div>
          
          {skillsAnalysis.primaryLanguages.length > 0 && (
            <div>
              <span className="text-sm font-medium mb-2 block">Primary Languages:</span>
              <div className="flex flex-wrap gap-2">
                {skillsAnalysis.primaryLanguages.map((lang: string) => (
                  <Badge key={lang} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}