import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsOverview } from "@/components/student/stats-overview"
import { PlatformsManager } from "@/components/student/platforms-manager"
import { RecentActivity } from "@/components/student/recent-activity"
import { SkillsChart } from "@/components/student/skills-chart"
import { ClientOnly } from "@/components/client-only"
import { serializeUser } from "@/lib/serialize"
import type { StudentProfile } from "@/lib/types"

export default async function StudentDashboard() {
  const user = await getCurrentUser()

  if (!user || user.role !== "student") {
    redirect("/login")
  }

  const student = serializeUser(user) as StudentProfile

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Dashboard"
        description="Track your coding progress across all platforms"
      />
      <div className="flex-1 space-y-6 p-6">
        <ClientOnly fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-24"></div>
              </div>
            ))}
          </div>
        }>
          <StatsOverview student={student} />
        </ClientOnly>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ClientOnly fallback={
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Connected Platforms</h3>
                    <p className="text-sm text-muted-foreground">
                      Link your coding platforms to track your progress
                    </p>
                  </div>
                </div>
                <div className="text-center py-8">
                  <div className="animate-pulse">Loading platforms...</div>
                </div>
              </div>
            }>
              <PlatformsManager student={student} />
            </ClientOnly>
          </div>
          <div className="space-y-6">
            <ClientOnly fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-48"></div>}>
              <SkillsChart student={student} />
            </ClientOnly>
            <ClientOnly fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-48"></div>}>
              <RecentActivity student={student} />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  )
}
