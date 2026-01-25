"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, Send, CheckCircle } from "lucide-react"

export function RecruiterStats() {
  const stats = [
    {
      label: "Candidates Viewed",
      value: 1248,
      icon: Users,
      change: "+86 this week",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Active Job Postings",
      value: 12,
      icon: Briefcase,
      change: "4 closing soon",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "Invites Sent",
      value: 156,
      icon: Send,
      change: "+24 this month",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Shortlisted",
      value: 89,
      icon: CheckCircle,
      change: "32 interviewed",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-muted-foreground">
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
