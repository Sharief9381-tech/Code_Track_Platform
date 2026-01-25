"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Building2,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Calendar,
  IndianRupee,
  ExternalLink,
  Plus,
} from "lucide-react"

const companies = [
  {
    id: 1,
    name: "Google",
    logo: "G",
    status: "active",
    positions: 5,
    applications: 156,
    shortlisted: 45,
    selected: 8,
    ctc: "45 LPA",
    driveDate: "Feb 15, 2026",
    roles: ["SDE Intern", "ML Engineer Intern"],
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "M",
    status: "active",
    positions: 8,
    applications: 198,
    shortlisted: 62,
    selected: 12,
    ctc: "42 LPA",
    driveDate: "Feb 20, 2026",
    roles: ["SDE Intern", "PM Intern"],
  },
  {
    id: 3,
    name: "Amazon",
    logo: "A",
    status: "completed",
    positions: 10,
    applications: 245,
    shortlisted: 78,
    selected: 15,
    ctc: "38 LPA",
    driveDate: "Jan 10, 2026",
    roles: ["SDE Intern"],
  },
  {
    id: 4,
    name: "Flipkart",
    logo: "F",
    status: "upcoming",
    positions: 6,
    applications: 0,
    shortlisted: 0,
    selected: 0,
    ctc: "32 LPA",
    driveDate: "Mar 5, 2026",
    roles: ["SDE Intern", "Data Analyst Intern"],
  },
]

const placedStudents = [
  { id: 1, name: "Rahul Kumar", branch: "CSE", company: "Google", role: "SDE Intern", ctc: "45 LPA" },
  { id: 2, name: "Priya Sharma", branch: "IT", company: "Microsoft", role: "SDE Intern", ctc: "42 LPA" },
  { id: 3, name: "Amit Patel", branch: "CSE", company: "Amazon", role: "SDE Intern", ctc: "38 LPA" },
  { id: 4, name: "Sneha Gupta", branch: "ECE", company: "Amazon", role: "SDE Intern", ctc: "38 LPA" },
  { id: 5, name: "Vikram Singh", branch: "CSE", company: "Microsoft", role: "PM Intern", ctc: "42 LPA" },
]

export function PlacementTracker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-500/10 text-blue-500">Completed</Badge>
      case "upcoming":
        return <Badge className="bg-yellow-500/10 text-yellow-500">Upcoming</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">+4 this month</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">28</p>
              <p className="text-sm text-muted-foreground">Companies Visited</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-2/10 p-2">
                <Users className="h-5 w-5 text-chart-2" />
              </div>
              <Badge className="bg-chart-2/10 text-chart-2">87% of eligible</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">456</p>
              <p className="text-sm text-muted-foreground">Students Placed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-3/10 p-2">
                <IndianRupee className="h-5 w-5 text-chart-3" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">+12% YoY</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">18.5 LPA</p>
              <p className="text-sm text-muted-foreground">Avg. Package</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-4/10 p-2">
                <CheckCircle className="h-5 w-5 text-chart-4" />
              </div>
              <Badge className="bg-chart-4/10 text-chart-4">Top: 45 LPA</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">892</p>
              <p className="text-sm text-muted-foreground">Total Offers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="companies" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="bg-secondary">
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="placed">Placed Students</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="bg-secondary pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-secondary">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Company
            </Button>
          </div>
        </div>

        <TabsContent value="companies" className="space-y-4">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="bg-card">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/10 text-lg text-primary">
                        {company.logo}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{company.name}</h3>
                        {getStatusBadge(company.status)}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {company.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{company.positions}</p>
                      <p className="text-xs text-muted-foreground">Positions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{company.applications}</p>
                      <p className="text-xs text-muted-foreground">Applications</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{company.shortlisted}</p>
                      <p className="text-xs text-muted-foreground">Shortlisted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-primary">{company.selected}</p>
                      <p className="text-xs text-muted-foreground">Selected</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-chart-3">{company.ctc}</p>
                      <p className="text-xs text-muted-foreground">CTC</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {company.driveDate}
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <ExternalLink className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="placed" className="space-y-4">
          <Card className="bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Student</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Branch</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Company</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Package</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placedStudents.map((student) => (
                      <tr key={student.id} className="border-b border-border">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-xs text-primary">
                                {student.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{student.branch}</td>
                        <td className="px-6 py-4 text-foreground">{student.company}</td>
                        <td className="px-6 py-4 text-muted-foreground">{student.role}</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-chart-3/10 text-chart-3">{student.ctc}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">
                            View Profile
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
