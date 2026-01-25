"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Star, ExternalLink, Bookmark } from "lucide-react"

export function RecommendedCandidates() {
  // Sample AI-recommended candidates
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
      skills: ["React", "Node.js", "Python", "AWS"],
      platforms: ["leetcode", "github", "codeforces"],
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
      skills: ["Java", "Spring Boot", "MongoDB", "Docker"],
      platforms: ["leetcode", "github"],
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
      skills: ["C++", "Algorithms", "System Design"],
      platforms: ["leetcode", "codeforces", "codechef"],
    },
  ]

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

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center gap-2">
        <Sparkles className="h-5 w-5 text-chart-3" />
        <CardTitle>AI Recommended Candidates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="flex flex-col gap-4 rounded-lg border border-border bg-secondary/30 p-4 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{candidate.name}</p>
                  <Badge className="gap-1 bg-primary/20 text-primary">
                    <Star className="h-3 w-3" />
                    {candidate.matchScore}% match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {candidate.college} • {candidate.branch} • {candidate.year}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-wrap items-center gap-2">
              {candidate.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{candidate.skills.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-foreground">
                  {candidate.problems} problems
                </p>
                <p className="text-xs text-muted-foreground">
                  Rating: {candidate.rating}
                </p>
              </div>
              <div className="flex gap-1">
                {candidate.platforms.map((platform) => (
                  <div
                    key={platform}
                    className={`h-3 w-3 rounded-full ${getPlatformColor(platform)}`}
                    title={platform}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full bg-transparent">
          View All Recommendations
        </Button>
      </CardContent>
    </Card>
  )
}
