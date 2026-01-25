"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Briefcase,
  MapPin,
  IndianRupee,
  Calendar,
  Users,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

const jobPostings = [
  {
    id: 1,
    title: "Software Engineer Intern",
    type: "Internship",
    location: "Bangalore, India",
    salary: "80,000 - 1,20,000/month",
    status: "active",
    applications: 234,
    shortlisted: 45,
    views: 1892,
    posted: "Jan 10, 2026",
    deadline: "Feb 15, 2026",
    skills: ["Python", "Java", "Data Structures", "Algorithms"],
    description: "Join our engineering team and work on impactful products.",
  },
  {
    id: 2,
    title: "ML Engineer Intern",
    type: "Internship",
    location: "Hyderabad, India",
    salary: "70,000 - 1,00,000/month",
    status: "active",
    applications: 156,
    shortlisted: 28,
    views: 1245,
    posted: "Jan 12, 2026",
    deadline: "Feb 20, 2026",
    skills: ["Python", "TensorFlow", "Machine Learning", "SQL"],
    description: "Work on cutting-edge ML projects and recommendation systems.",
  },
  {
    id: 3,
    title: "Product Manager Intern",
    type: "Internship",
    location: "Remote",
    salary: "60,000 - 80,000/month",
    status: "draft",
    applications: 0,
    shortlisted: 0,
    views: 0,
    posted: null,
    deadline: null,
    skills: ["Product Management", "Analytics", "Communication"],
    description: "Drive product strategy and work with cross-functional teams.",
  },
  {
    id: 4,
    title: "Backend Developer",
    type: "Full-time",
    location: "Noida, India",
    salary: "15-25 LPA",
    status: "closed",
    applications: 312,
    shortlisted: 56,
    views: 2456,
    posted: "Dec 1, 2025",
    deadline: "Jan 15, 2026",
    skills: ["Node.js", "MongoDB", "AWS", "Microservices"],
    description: "Build scalable backend systems for our platform.",
  },
]

export function JobPostings() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="gap-1 bg-green-500/10 text-green-500">
            <CheckCircle className="h-3 w-3" />
            Active
          </Badge>
        )
      case "draft":
        return (
          <Badge className="gap-1 bg-yellow-500/10 text-yellow-500">
            <Clock className="h-3 w-3" />
            Draft
          </Badge>
        )
      case "closed":
        return (
          <Badge className="gap-1 bg-red-500/10 text-red-500">
            <XCircle className="h-3 w-3" />
            Closed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredJobs = jobPostings.filter((job) => {
    return statusFilter === "all" || job.status === statusFilter
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">+2 this month</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Active Postings</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-2/10 p-2">
                <Users className="h-5 w-5 text-chart-2" />
              </div>
              <Badge className="bg-chart-2/10 text-chart-2">+156 this week</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">702</p>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-3/10 p-2">
                <Eye className="h-5 w-5 text-chart-3" />
              </div>
              <Badge className="bg-chart-3/10 text-chart-3">+892 this week</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">5,593</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-4/10 p-2">
                <CheckCircle className="h-5 w-5 text-chart-4" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">18.4%</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">129</p>
              <p className="text-sm text-muted-foreground">Shortlisted</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-secondary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Job Posting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Job Posting</DialogTitle>
              <DialogDescription>
                Create a new job posting to attract candidates
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] space-y-4 overflow-y-auto py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input placeholder="e.g., Software Engineer Intern" />
                </div>
                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select defaultValue="internship">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="e.g., Bangalore, India" />
                </div>
                <div className="space-y-2">
                  <Label>Salary Range</Label>
                  <Input placeholder="e.g., 80,000 - 1,20,000/month" />
                </div>
                <div className="space-y-2">
                  <Label>Application Deadline</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Number of Positions</Label>
                  <Input type="number" placeholder="5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Required Skills (comma separated)</Label>
                <Input placeholder="Python, Java, Data Structures, Algorithms" />
              </div>
              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea placeholder="Describe the role, responsibilities, and requirements..." rows={5} />
              </div>
              <div className="space-y-2">
                <Label>Minimum Requirements</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Min. CGPA</Label>
                    <Input type="number" step="0.1" placeholder="7.0" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Min. Problems Solved</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Min. Rating</Label>
                    <Input type="number" placeholder="1400" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save as Draft
                </Button>
                <Button className="flex-1" onClick={() => setCreateDialogOpen(false)}>
                  Publish Posting
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                        {getStatusBadge(job.status)}
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {job.salary}
                        </span>
                        {job.deadline && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Deadline: {job.deadline}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{job.views}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{job.applications}</p>
                      <p className="text-xs text-muted-foreground">Applications</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-primary">{job.shortlisted}</p>
                      <p className="text-xs text-muted-foreground">Shortlisted</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    {job.status === "active" && (
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
