"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
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
} from "recharts"
import { TrendingUp, Users, Target, Award, RefreshCw, Building } from "lucide-react"

interface BatchAnalyticsProps {
  college: any
}

export function BatchAnalytics({ college }: BatchAnalyticsProps) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDept, setSelectedDept] = useState("all")

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/college/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        console.error('Failed to fetch analytics:', response.status)
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
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading college analytics...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No analytics data available</p>
              <Button onClick={fetchAnalytics} className="mt-4">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Prepare chart data from analytics
  const departmentData = Object.entries(analytics.departmentStats).map(([dept, stats]: [string, any]) => ({
    department: dept,
    students: stats.students,
    avgProblems: stats.averageProblems,
    avgContributions: stats.averageContributions,
    avgRating: stats.averageRating,
    topLanguages: stats.topLanguages
  }))

  const activityData = Object.entries(analytics.activityLevels).map(([level, count]: [string, any]) => ({
    name: level,
    value: count,
    color: level === 'Very High' ? '#10B981' : 
           level === 'High' ? '#3B82F6' : 
           level === 'Medium' ? '#F59E0B' : '#6B7280'
  }))

  const difficultyData = [
    { name: 'Easy', value: analytics.difficultyDistribution.easy, color: '#10B981' },
    { name: 'Medium', value: analytics.difficultyDistribution.medium, color: '#F59E0B' },
    { name: 'Hard', value: analytics.difficultyDistribution.hard, color: '#EF4444' }
  ]

  const platformData = Object.entries(analytics.platformDistribution).map(([platform, count]: [string, any]) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    students: count
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {analytics.college?.name} Analytics
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchAnalytics}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-blue-500/10 text-blue-500">
                {analytics.activeStudents}/{analytics.totalStudents}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{analytics.totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-2/10 p-2">
                <Target className="h-5 w-5 text-chart-2" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">
                Total: {analytics.aggregatedStats.totalProblems}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {Math.round(analytics.aggregatedStats.totalProblems / Math.max(analytics.activeStudents, 1))}
              </p>
              <p className="text-sm text-muted-foreground">Avg. Problems/Student</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-3/10 p-2">
                <TrendingUp className="h-5 w-5 text-chart-3" />
              </div>
              <Badge className="bg-purple-500/10 text-purple-500">
                Total: {analytics.aggregatedStats.totalContributions}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {Math.round(analytics.aggregatedStats.totalContributions / Math.max(analytics.activeStudents, 1))}
              </p>
              <p className="text-sm text-muted-foreground">Avg. Contributions</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-4/10 p-2">
                <Award className="h-5 w-5 text-chart-4" />
              </div>
              <Badge className="bg-orange-500/10 text-orange-500">
                Avg: {analytics.aggregatedStats.averageRating}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {analytics.aggregatedStats.totalContests}
              </p>
              <p className="text-sm text-muted-foreground">Total Contests</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topPerformers.slice(0, 5).map((student: any, index: number) => (
              <div key={student.email} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{student.totalProblems} problems</p>
                  <p className="text-sm text-muted-foreground">
                    {student.githubContributions} contributions • {student.contestsAttended} contests
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Comparison */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Department-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="department" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="avgProblems" name="Avg Problems" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Levels */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Student Activity Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Platform Distribution */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Platform Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="platform" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="students" name="Students" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Distribution */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Problem Difficulty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Details */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Department Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departmentData.map((dept) => (
              <div key={dept.department} className="p-4 rounded-lg bg-secondary/30">
                <h3 className="font-semibold mb-2">{dept.department}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="font-medium">{dept.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Problems:</span>
                    <span className="font-medium">{dept.avgProblems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Rating:</span>
                    <span className="font-medium">{dept.avgRating}</span>
                  </div>
                  {dept.topLanguages.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Top Languages:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dept.topLanguages.map((lang: string) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
