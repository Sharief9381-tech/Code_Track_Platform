"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bookmark, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RecentShortlists() {
  const shortlists = [
    {
      id: 1,
      name: "SDE Intern 2025",
      candidates: 12,
      status: "active",
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      name: "Full Stack Developer",
      candidates: 8,
      status: "active",
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      name: "Backend Engineer",
      candidates: 15,
      status: "reviewing",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      name: "DevOps Engineer",
      candidates: 6,
      status: "closed",
      lastUpdated: "1 week ago",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500">Active</Badge>
      case "reviewing":
        return <Badge className="bg-yellow-500/20 text-yellow-500">Reviewing</Badge>
      case "closed":
        return <Badge variant="secondary">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-chart-2" />
          <CardTitle>Shortlists</CardTitle>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {shortlists.map((list) => (
          <div
            key={list.id}
            className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
          >
            <div className="space-y-1">
              <p className="font-medium text-foreground">{list.name}</p>
              <p className="text-xs text-muted-foreground">
                {list.candidates} candidates • {list.lastUpdated}
              </p>
            </div>
            {getStatusBadge(list.status)}
          </div>
        ))}
        <Button variant="outline" className="w-full bg-transparent">
          Create New Shortlist
        </Button>
      </CardContent>
    </Card>
  )
}
