"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts"
import { TrendingUp, Users, Clock, Target, Award, Building2 } from "lucide-react"

const applicationTrend = [
  { week: "W1", applications: 45, shortlisted: 12 },
  { week: "W2", applications: 62, shortlisted: 18 },
  { week: "W3", applications: 78, shortlisted: 22 },
  { week: "W4", applications: 92, shortlisted: 28 },
  { week: "W5", applications: 85, shortlisted: 25 },
  { week: "W6", applications: 110, shortlisted: 35 },
]

const sourceBreakdown = [
  { name: "Direct", value: 45, color: "#22c55e" },
  { name: "College Referral", value: 30, color: "#3b82f6" },
  { name: "Job Boards", value: 15, color: "#f59e0b" },
  { name: "Employee Referral", value: 10, color: "#8b5cf6" },
]

const collegeWiseHires = [
  { college: "IIT Delhi", hires: 12, applications: 45 },
  { college: "IIT Bombay", hires: 10, applications: 38 },
  { college: "NIT Trichy", hires: 8, applications: 42 },
  { college: "BITS Pilani", hires: 7, applications: 35 },
  { college: "IIIT Hyderabad", hires: 6, applications: 28 },
]

const hiringFunnel = [
  { name: "Applications", value: 702, fill: "hsl(var(--chart-1))" },
  { name: "Screened", value: 445, fill: "hsl(var(--chart-2))" },
  { name: "Interviewed", value: 189, fill: "hsl(var(--chart-3))" },
  { name: "Offered", value: 56, fill: "hsl(var(--chart-4))" },
  { name: "Hired", value: 42, fill: "hsl(var(--primary))" },
]

const timeToHire = [
  { stage: "Screening", days: 3 },
  { stage: "Technical", days: 7 },
  { stage: "HR", days: 4 },
  { stage: "Offer", days: 5 },
  { stage: "Acceptance", days: 3 },
]

export function RecruiterAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">+8%</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">18.4%</p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-2/10 p-2">
                <Clock className="h-5 w-5 text-chart-2" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">-3 days</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">22 days</p>
              <p className="text-sm text-muted-foreground">Avg. Time to Hire</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-3/10 p-2">
                <Award className="h-5 w-5 text-chart-3" />
              </div>
              <Badge className="bg-chart-3/10 text-chart-3">75%</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">42/56</p>
              <p className="text-sm text-muted-foreground">Offer Acceptance</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-chart-4/10 p-2">
                <Building2 className="h-5 w-5 text-chart-4" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">+5 this month</Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">28</p>
              <p className="text-sm text-muted-foreground">Partner Colleges</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Application Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    name="Applications"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="shortlisted"
                    name="Shortlisted"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hiringFunnel.map((stage, index) => {
                const percentage = index === 0 ? 100 : Math.round((stage.value / hiringFunnel[0].value) * 100)
                return (
                  <div key={stage.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{stage.name}</span>
                      <span className="text-muted-foreground">
                        {stage.value} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: stage.fill,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Source Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {sourceBreakdown.map((source) => (
                <div key={source.name} className="flex items-center gap-1 text-xs">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-muted-foreground">
                    {source.name} ({source.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Time to Hire Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeToHire} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="stage" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value} days`, "Duration"]}
                  />
                  <Bar dataKey="days" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Top Colleges by Hires</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {collegeWiseHires.map((college, index) => (
              <div key={college.college} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground">{college.college}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary">{college.hires} hires</Badge>
                  <span className="text-xs text-muted-foreground">
                    {Math.round((college.hires / college.applications) * 100)}% rate
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
