"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Sparkles,
  Star,
  Bookmark,
  ExternalLink,
  Filter,
  X,
} from "lucide-react"

export function TalentSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [minProblems, setMinProblems] = useState([100])
  const [minRating, setMinRating] = useState([1400])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedColleges, setSelectedColleges] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)

  const skills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
    "Node.js",
    "TypeScript",
    "Go",
    "Rust",
    "AWS",
    "Docker",
    "Kubernetes",
    "System Design",
    "Machine Learning",
    "Data Structures",
  ]

  const colleges = [
    "IIT Delhi",
    "IIT Bombay",
    "IIT Madras",
    "NIT Trichy",
    "BITS Pilani",
    "IIIT Hyderabad",
    "DTU Delhi",
    "VIT Vellore",
  ]

  const candidates = [
    {
      id: 1,
      name: "Rahul Kumar",
      college: "IIT Delhi",
      branch: "CSE",
      year: 2025,
      matchScore: 95,
      problems: 456,
      rating: 1892,
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
      platforms: ["leetcode", "github", "codeforces"],
      isOpenToWork: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      college: "NIT Trichy",
      branch: "IT",
      year: 2025,
      matchScore: 92,
      problems: 412,
      rating: 1756,
      skills: ["Java", "Spring Boot", "MongoDB", "Docker", "Kubernetes"],
      platforms: ["leetcode", "github"],
      isOpenToWork: true,
    },
    {
      id: 3,
      name: "Amit Patel",
      college: "BITS Pilani",
      branch: "CSE",
      year: 2025,
      matchScore: 88,
      problems: 398,
      rating: 1698,
      skills: ["C++", "Algorithms", "System Design", "Python"],
      platforms: ["leetcode", "codeforces", "codechef"],
      isOpenToWork: true,
    },
    {
      id: 4,
      name: "Sneha Gupta",
      college: "IIT Bombay",
      branch: "CSE",
      year: 2025,
      matchScore: 86,
      problems: 378,
      rating: 1645,
      skills: ["Python", "Machine Learning", "TensorFlow", "Data Structures"],
      platforms: ["leetcode", "github"],
      isOpenToWork: false,
    },
    {
      id: 5,
      name: "Vikram Singh",
      college: "IIIT Hyderabad",
      branch: "CSE",
      year: 2025,
      matchScore: 84,
      problems: 345,
      rating: 1612,
      skills: ["Go", "Rust", "System Design", "Docker", "AWS"],
      platforms: ["leetcode", "github", "codeforces"],
      isOpenToWork: true,
    },
  ]

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    )
  }

  const toggleCollege = (college: string) => {
    setSelectedColleges((prev) =>
      prev.includes(college)
        ? prev.filter((c) => c !== college)
        : [...prev, college]
    )
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

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      !searchQuery ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
    const matchesProblems = candidate.problems >= minProblems[0]
    const matchesRating = candidate.rating >= minRating[0]
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => candidate.skills.includes(skill))
    const matchesCollege =
      selectedColleges.length === 0 ||
      selectedColleges.includes(candidate.college)
    return (
      matchesSearch &&
      matchesProblems &&
      matchesRating &&
      matchesSkills &&
      matchesCollege
    )
  })

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Filters Sidebar */}
      <div className={`lg:col-span-1 ${showFilters ? "" : "hidden lg:block"}`}>
        <Card className="sticky top-6 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedSkills([])
                setSelectedColleges([])
                setMinProblems([100])
                setMinRating([1400])
              }}
            >
              Clear All
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Min Problems */}
            <div className="space-y-3">
              <Label>Min Problems Solved: {minProblems[0]}</Label>
              <Slider
                value={minProblems}
                onValueChange={setMinProblems}
                max={500}
                min={0}
                step={10}
              />
            </div>

            {/* Min Rating */}
            <div className="space-y-3">
              <Label>Min Rating: {minRating[0]}</Label>
              <Slider
                value={minRating}
                onValueChange={setMinRating}
                max={2500}
                min={800}
                step={50}
              />
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Colleges */}
            <div className="space-y-3">
              <Label>Colleges</Label>
              <div className="space-y-2">
                {colleges.map((college) => (
                  <div key={college} className="flex items-center space-x-2">
                    <Checkbox
                      id={college}
                      checked={selectedColleges.includes(college)}
                      onCheckedChange={() => toggleCollege(college)}
                    />
                    <label
                      htmlFor={college}
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      {college}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      <div className="lg:col-span-3 space-y-4">
        {/* Search Bar */}
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skills, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                AI Search
              </Button>
              <Button
                variant="outline"
                className="lg:hidden bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCandidates.length} candidates
          </p>
          <Select defaultValue="match">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="problems">Most Problems</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="recent">Recently Active</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="bg-card">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-lg text-primary">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {candidate.name}
                      </h3>
                      <Badge className="gap-1 bg-primary/20 text-primary">
                        <Star className="h-3 w-3" />
                        {candidate.matchScore}% match
                      </Badge>
                      {candidate.isOpenToWork && (
                        <Badge className="bg-green-500/20 text-green-500">
                          Open to Work
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {candidate.college} • {candidate.branch} •{" "}
                      {candidate.year}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div>
                        <span className="font-medium text-foreground">
                          {candidate.problems}
                        </span>{" "}
                        <span className="text-muted-foreground">problems</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">
                          {candidate.rating}
                        </span>{" "}
                        <span className="text-muted-foreground">rating</span>
                      </div>
                      <div className="flex gap-1">
                        {candidate.platforms.map((platform) => (
                          <div
                            key={platform}
                            className={`h-4 w-4 rounded-full ${getPlatformColor(platform)}`}
                            title={platform}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button>Invite</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
