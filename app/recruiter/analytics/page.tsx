import { DashboardHeader } from "@/components/dashboard/header"
import { RecruiterAnalytics } from "@/components/recruiter/recruiter-analytics"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Hiring Analytics"
        description="Track your recruitment metrics and hiring performance"
      />
      <div className="flex-1 p-6">
        <RecruiterAnalytics />
      </div>
    </div>
  )
}
