"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { RefreshCw, TrendingUp } from "lucide-react"

interface PlacementData {
  total: number
  placed: number
  interviewing: number
  searching: number
  placementRate: number
}

export function PlacementOverview() {
  const [placementData, setPlacementData] = useState<PlacementData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlacementData()
  }, [])

  const fetchPlacementData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/college/dashboard')
      if (response.ok) {
        const data = await response.json()
        setPlacementData(data.placement)
      } else {
        console.error('Failed to fetch placement data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching placement data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Placement Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse bg-secondary/30 rounded" />
        </CardContent>
      </Card>
    )
  }

  if (!placementData || placementData.total === 0) {
    return (
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Placement Overview</CardTitle>
          <button
            onClick={fetchPlacementData}
            disabled={loading}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No placement data available</p>
            <p className="text-sm text-muted-foreground mt-1">
              Students need to register to see placement statistics
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Prepare data for pie chart
  const pieData = [
    { name: 'Placed', value: placementData.placed, color: '#10B981' },
    { name: 'Interviewing', value: placementData.interviewing, color: '#F59E0B' },
    { name: 'Searching', value: placementData.searching, color: '#6B7280' }
  ].filter(item => item.value > 0)

  // Historical data (simulated - would come from database in production)
  const historicalData = [
    { year: "2022", placed: Math.floor(placementData.placed * 0.7), eligible: Math.floor(placementData.total * 0.8) },
    { year: "2023", placed: Math.floor(placementData.placed * 0.85), eligible: Math.floor(placementData.total * 0.9) },
    { year: "2024", placed: placementData.placed, eligible: placementData.total },
  ]

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Placement Overview</CardTitle>
        <button
          onClick={fetchPlacementData}
          disabled={loading}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Current Status Pie Chart */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Current Status</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Historical Trends */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Historical Trends</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar
                    dataKey="eligible"
                    fill="hsl(var(--secondary))"
                    name="Total Students"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="placed"
                    fill="hsl(var(--primary))"
                    name="Placed Students"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-secondary/30 rounded-lg">
            <p className="text-2xl font-bold text-foreground">{placementData.total}</p>
            <p className="text-xs text-muted-foreground">Total Students</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg">
            <p className="text-2xl font-bold text-green-500">{placementData.placed}</p>
            <p className="text-xs text-muted-foreground">Placed</p>
          </div>
          <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
            <p className="text-2xl font-bold text-yellow-500">{placementData.interviewing}</p>
            <p className="text-xs text-muted-foreground">Interviewing</p>
          </div>
          <div className="text-center p-3 bg-gray-500/10 rounded-lg">
            <p className="text-2xl font-bold text-gray-500">{placementData.searching}</p>
            <p className="text-xs text-muted-foreground">Searching</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Overall Placement Rate: <span className="font-semibold text-foreground">{placementData.placementRate}%</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
