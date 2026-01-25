"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Code2, GitCommit, Trophy } from "lucide-react"
import type { StudentProfile } from "@/lib/types"

interface RecentActivityProps {
  student: StudentProfile
}

export function RecentActivity({ student }: RecentActivityProps) {
  // Sample activities - in production, this would come from actual platform data
  const activities = [
    {
      id: 1,
      type: "problem",
      title: "Solved Two Sum",
      platform: "LeetCode",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 2,
      type: "commit",
      title: "Pushed to portfolio",
      platform: "GitHub",
      time: "5 hours ago",
      icon: GitCommit,
      color: "text-chart-2",
    },
    {
      id: 3,
      type: "contest",
      title: "Participated in Weekly Contest",
      platform: "Codeforces",
      time: "1 day ago",
      icon: Trophy,
      color: "text-chart-3",
    },
    {
      id: 4,
      type: "problem",
      title: "Solved Binary Tree Inorder",
      platform: "LeetCode",
      time: "2 days ago",
      icon: Code2,
      color: "text-chart-1",
    },
  ]

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-sm">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`mt-0.5 ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.platform} • {activity.time}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
