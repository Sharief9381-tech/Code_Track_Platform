"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  MapPin,
  Building2,
  IndianRupee,
  Clock,
  Bookmark,
  ExternalLink,
  CheckCircle,
  Target,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "Google",
    location: "Bangalore, India",
    salary: "80,000 - 1,20,000/month",
    type: "Internship",
    matchScore: 95,
    skills: ["Python", "Data Structures", "Algorithms", "System Design"],
    matchedSkills: ["Python", "Data Structures", "Algorithms"],
    missingSkills: ["System Design"],
    posted: "2 days ago",
    applicants: 234,
    deadline: "Jan 30, 2026",
    description: "Join Google's engineering team and work on impactful products used by billions.",
  },
  {
    id: 2,
    title: "SDE Intern",
    company: "Amazon",
    location: "Hyderabad, India",
    salary: "60,000 - 1,00,000/month",
    type: "Internship",
    matchScore: 92,
    skills: ["Java", "AWS", "Microservices", "React"],
    matchedSkills: ["Java", "React"],
    missingSkills: ["AWS", "Microservices"],
    posted: "1 day ago",
    applicants: 456,
    deadline: "Feb 15, 2026",
    description: "Build and scale services that power Amazon's global infrastructure.",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Microsoft",
    location: "Noida, India",
    salary: "70,000 - 90,000/month",
    type: "Internship",
    matchScore: 88,
    skills: ["TypeScript", "Node.js", "React", "Azure"],
    matchedSkills: ["TypeScript", "Node.js", "React"],
    missingSkills: ["Azure"],
    posted: "3 days ago",
    applicants: 189,
    deadline: "Feb 1, 2026",
    description: "Work on Microsoft 365 products and cloud services.",
  },
  {
    id: 4,
    title: "Backend Engineer Intern",
    company: "Flipkart",
    location: "Bangalore, India",
    salary: "50,000 - 80,000/month",
    type: "Internship",
    matchScore: 85,
    skills: ["Java", "Spring Boot", "MongoDB", "Kafka"],
    matchedSkills: ["Java", "MongoDB"],
    missingSkills: ["Spring Boot", "Kafka"],
    posted: "5 days ago",
    applicants: 312,
    deadline: "Feb 20, 2026",
    description: "Build scalable backend systems for India's leading e-commerce platform.",
  },
  {
    id: 5,
    title: "ML Engineer Intern",
    company: "Swiggy",
    location: "Bangalore, India",
    salary: "55,000 - 75,000/month",
    type: "Internship",
    matchScore: 78,
    skills: ["Python", "TensorFlow", "ML Algorithms", "SQL"],
    matchedSkills: ["Python", "SQL"],
    missingSkills: ["TensorFlow", "ML Algorithms"],
    posted: "1 week ago",
    applicants: 145,
    deadline: "Feb 28, 2026",
    description: "Apply ML to improve food delivery recommendations and logistics.",
  },
]

const appliedJobs = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "Meta",
    status: "Under Review",
    appliedDate: "Jan 15, 2026",
    stage: 2,
    totalStages: 5,
  },
  {
    id: 2,
    title: "SDE Intern",
    company: "Atlassian",
    status: "Interview Scheduled",
    appliedDate: "Jan 10, 2026",
    stage: 3,
    totalStages: 5,
  },
]

export function JobMatches() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const toggleSave = (id: number) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    )
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-500 bg-green-500/10"
    if (score >= 80) return "text-chart-3 bg-chart-3/10"
    return "text-chart-5 bg-chart-5/10"
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || job.type.toLowerCase() === roleFilter
    const matchesLocation = locationFilter === "all" || job.location.includes(locationFilter)
    return matchesSearch && matchesRole && matchesLocation
  })

  return (
    <Tabs defaultValue="matches" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="bg-secondary">
          <TabsTrigger value="matches" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Matches
          </TabsTrigger>
          <TabsTrigger value="applied" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Applied
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Saved
          </TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="bg-secondary pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-40 bg-secondary">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              <SelectItem value="Noida">Noida</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TabsContent value="matches" className="space-y-4">
        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Your Job Match Score</p>
              <p className="text-sm text-muted-foreground">
                Based on your coding stats, skills, and profile completeness
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">87%</p>
              <p className="text-xs text-muted-foreground">Profile Strength</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-card transition-colors hover:bg-card/80">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <IndianRupee className="h-4 w-4" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <Badge className={`gap-1 ${getMatchColor(job.matchScore)}`}>
                        <Sparkles className="h-3 w-3" />
                        {job.matchScore}% Match
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{job.description}</p>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant={job.matchedSkills.includes(skill) ? "default" : "outline"}
                            className={job.matchedSkills.includes(skill) ? "bg-primary/20 text-primary" : "bg-transparent"}
                          >
                            {job.matchedSkills.includes(skill) && (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            )}
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Posted {job.posted}
                      </span>
                      <span>{job.applicants} applicants</span>
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 lg:flex-col">
                    <Button className="flex-1 gap-2 lg:w-32">
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className={`flex-1 gap-2 lg:w-32 ${savedJobs.includes(job.id) ? "bg-primary/10 text-primary" : "bg-transparent"}`}
                      onClick={() => toggleSave(job.id)}
                    >
                      <Bookmark className={`h-4 w-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                      {savedJobs.includes(job.id) ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="applied" className="space-y-4">
        <div className="grid gap-4">
          {appliedJobs.map((job) => (
            <Card key={job.id} className="bg-card">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Applied on {job.appliedDate}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <Badge variant="secondary">{job.status}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Stage {job.stage}/{job.totalStages}
                      </span>
                    </div>
                    <Progress value={(job.stage / job.totalStages) * 100} className="h-2 w-48" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="saved" className="space-y-4">
        {savedJobs.length === 0 ? (
          <Card className="bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bookmark className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-foreground">No saved jobs yet</p>
              <p className="text-sm text-muted-foreground">Save jobs to view them here later</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {jobs
              .filter((job) => savedJobs.includes(job.id))
              .map((job) => (
                <Card key={job.id} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company} - {job.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Apply</Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSave(job.id)}
                        >
                          <Bookmark className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
