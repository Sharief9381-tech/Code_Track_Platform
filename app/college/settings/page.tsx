import { DashboardHeader } from "@/components/dashboard/header"
import { RecruiterAccess } from "@/components/college/recruiter-access"

export default function SettingsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Settings & Access Control"
        description="Manage recruiter access and college settings"
      />
      <div className="flex-1 p-6">
        <RecruiterAccess />
      </div>
    </div>
  )
}
