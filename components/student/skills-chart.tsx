"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"
import type { StudentProfile } from "@/lib/types"

interface SkillsChartProps {
  student: StudentProfile
}

export function SkillsChart({ student }: SkillsChartProps) {
  const stats = student.stats || {
    totalProblems: 0,
    easyProblems: 0,
    mediumProblems: 0,
    hardProblems: 0,
    githubContributions: 0,
    contestsParticipated: 0,
    rating: 0,
  }

  // Normalize values for radar chart (0-100 scale)
  const maxValues = {
    easy: 300,
    medium: 200,
    hard: 100,
    contests: 50,
    contributions: 500,
  }

  const data = [
    {
      subject: "Easy",
      value: Math.min((stats.easyProblems / maxValues.easy) * 100, 100),
      fullMark: 100,
    },
    {
      subject: "Medium",
      value: Math.min((stats.mediumProblems / maxValues.medium) * 100, 100),
      fullMark: 100,
    },
    {
      subject: "Hard",
      value: Math.min((stats.hardProblems / maxValues.hard) * 100, 100),
      fullMark: 100,
    },
    {
      subject: "Contests",
      value: Math.min(
        (stats.contestsParticipated / maxValues.contests) * 100,
        100
      ),
      fullMark: 100,
    },
    {
      subject: "Contrib",
      value: Math.min(
        (stats.githubContributions / maxValues.contributions) * 100,
        100
      ),
      fullMark: 100,
    },
  ]

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-sm">Skill Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
