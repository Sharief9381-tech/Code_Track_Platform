"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, Building } from "lucide-react"

interface Department {
  name: string
  students: number
  avgProblems: number
  avgContributions: number
  avgRating: number
  placementRate: number
  placed: number
  interviewing: number
  searching: number
}

export function DepartmentBreakdown() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDepartmentData()
  }, [])

  const fetchDepartmentData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/college/dashboard')
      if (response.ok) {
        const data = await response.json()
        setDepartments(data.departments || [])
      } else {
        console.error('Failed to fetch department data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching department data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getColorForIndex = (index: number) => {
    const colors = [
      "bg-chart-1",
      "bg-chart-2", 
      "bg-chart-3",
      "bg-chart-4",
      "bg-chart-5"
    ]
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-secondary rounded-full" />
                  <div className="h-4 w-32 bg-secondary rounded" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-20 bg-secondary rounded" />
                  <div className="h-4 w-24 bg-secondary rounded" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 bg-secondary rounded" />
                <div className="h-4 w-8 bg-secondary rounded" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Department Performance</CardTitle>
        <button
          onClick={fetchDepartmentData}
          disabled={loading}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </CardHeader>
      <CardContent className="space-y-6">
        {departments.length === 0 ? (
          <div className="text-center py-8">
            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No department data available</p>
            <p className="text-sm text-muted-foreground mt-1">
              Students need to register to see department breakdown
            </p>
          </div>
        ) : (
          departments.map((dept, index) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${getColorForIndex(index)}`} />
                  <span className="font-medium text-foreground">{dept.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{dept.students} students</span>
                  <span>{dept.avgProblems} avg problems</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={dept.placementRate} className="flex-1" />
                <span className="text-sm font-medium text-foreground">
                  {dept.placementRate}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex gap-4">
                  <span>Placed: {dept.placed}</span>
                  <span>Interviewing: {dept.interviewing}</span>
                  <span>Searching: {dept.searching}</span>
                </div>
                <span>Avg Rating: {dept.avgRating}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
