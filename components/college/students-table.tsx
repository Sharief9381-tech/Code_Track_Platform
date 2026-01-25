"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Download, Filter, ExternalLink, RefreshCw, Users } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  rollNumber?: string
  department: string
  year: number
  collegeName: string
  collegeCode: string
  totalProblems: number
  githubContributions: number
  contestsAttended: number
  currentRating: number
  activityLevel: string
  overallRank: string
  primaryLanguages: string[]
  linkedPlatforms: string[]
  platformCount: number
  isOpenToWork: boolean
  placementStatus: string
  lastStatsUpdate?: string
  createdAt: string
}

interface CollegeInfo {
  name: string
  code: string
}

export function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("all")
  const [year, setYear] = useState("all")
  const [college, setCollege] = useState<CollegeInfo | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [department, year])

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (search !== "") {
        fetchStudents()
      } else if (search === "") {
        fetchStudents()
      }
    }, 500)

    return () => clearTimeout(delayedSearch)
  }, [search])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (department !== "all") params.append("department", department)
      if (year !== "all") params.append("year", year)
      if (search.trim()) params.append("search", search.trim())

      const response = await fetch(`/api/college/students?${params.toString()}`)
      
      if (response.ok) {
        const data = await response.json()
        setStudents(data.students)
        setCollege(data.college)
      } else {
        console.error("Failed to fetch students:", response.status)
        setStudents([])
      }
    } catch (error) {
      console.error("Error fetching students:", error)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "placed":
        return <Badge className="bg-green-500/20 text-green-500">Placed</Badge>
      case "interviewing":
        return <Badge className="bg-yellow-500/20 text-yellow-500">Interviewing</Badge>
      case "searching":
        return <Badge variant="secondary">Searching</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActivityBadge = (level: string) => {
    switch (level) {
      case "Very High":
        return <Badge className="bg-green-500/20 text-green-500">Very High</Badge>
      case "High":
        return <Badge className="bg-blue-500/20 text-blue-500">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500/20 text-yellow-500">Medium</Badge>
      default:
        return <Badge variant="secondary">Low</Badge>
    }
  }

  const getRankBadge = (rank: string) => {
    switch (rank) {
      case "Expert":
        return <Badge className="bg-purple-500/20 text-purple-500">Expert</Badge>
      case "Advanced":
        return <Badge className="bg-blue-500/20 text-blue-500">Advanced</Badge>
      case "Intermediate":
        return <Badge className="bg-green-500/20 text-green-500">Intermediate</Badge>
      default:
        return <Badge variant="secondary">Beginner</Badge>
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "leetcode":
        return "bg-[#FFA116]"
      case "github":
        return "bg-[#238636]"
      case "codeforces":
        return "bg-[#1890FF]"
      case "codechef":
        return "bg-[#5B4638]"
      default:
        return "bg-secondary"
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Name", "Email", "Roll Number", "Department", "Year", 
      "Total Problems", "GitHub Contributions", "Contests", "Rating",
      "Activity Level", "Rank", "Platforms", "Status"
    ]
    
    const csvData = students.map(student => [
      student.name,
      student.email,
      student.rollNumber || "",
      student.department,
      student.year,
      student.totalProblems,
      student.githubContributions,
      student.contestsAttended,
      student.currentRating,
      student.activityLevel,
      student.overallRank,
      student.linkedPlatforms.join("; "),
      student.placementStatus
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${college?.name || 'college'}_students_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Get unique departments and years from students
  const departments = [...new Set(students.map(s => s.department))].sort()
  const years = [...new Set(students.map(s => s.year))].sort((a, b) => b - a)

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Students from {college?.name || 'Your College'}
          </CardTitle>
          {college?.code && (
            <p className="text-sm text-muted-foreground mt-1">
              College Code: {college.code}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchStudents}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToCSV}
            disabled={students.length === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students by name, email, or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(yr => (
                  <SelectItem key={yr} value={yr.toString()}>{yr}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {search || department !== "all" || year !== "all" 
                ? "No students found matching your criteria" 
                : "No students found from your college"}
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Problems</TableHead>
                  <TableHead>Contributions</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            {student.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {student.rollNumber || student.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell className="font-medium">{student.totalProblems}</TableCell>
                    <TableCell className="font-medium">{student.githubContributions}</TableCell>
                    <TableCell className="font-medium">{student.currentRating}</TableCell>
                    <TableCell>{getActivityBadge(student.activityLevel)}</TableCell>
                    <TableCell>{getRankBadge(student.overallRank)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {student.linkedPlatforms.map((platform) => (
                          <div
                            key={platform}
                            className={`h-3 w-3 rounded-full ${getPlatformColor(platform)}`}
                            title={platform}
                          />
                        ))}
                        {student.platformCount === 0 && (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(student.placementStatus)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" title="View Details">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {students.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing {students.length} student{students.length !== 1 ? 's' : ''} from {college?.name}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
