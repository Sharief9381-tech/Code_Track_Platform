"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function HiringPipeline() {
  const stages = [
    {
      name: "Sourced",
      count: 248,
      color: "bg-chart-1",
      percentage: 100,
    },
    {
      name: "Screened",
      count: 156,
      color: "bg-chart-2",
      percentage: 63,
    },
    {
      name: "Technical Interview",
      count: 89,
      color: "bg-chart-3",
      percentage: 36,
    },
    {
      name: "HR Interview",
      count: 45,
      color: "bg-chart-4",
      percentage: 18,
    },
    {
      name: "Offered",
      count: 28,
      color: "bg-primary",
      percentage: 11,
    },
    {
      name: "Hired",
      count: 18,
      color: "bg-green-500",
      percentage: 7,
    },
  ]

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Hiring Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {stages.map((stage, index) => (
          <div key={stage.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                <span className="font-medium text-foreground">{stage.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {stage.count} candidates
                </span>
                <span className="text-sm font-medium text-foreground">
                  {stage.percentage}%
                </span>
              </div>
            </div>
            <Progress value={stage.percentage} className="h-2" />
            {index < stages.length - 1 && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  Conversion:{" "}
                  {Math.round((stages[index + 1].count / stage.count) * 100)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
