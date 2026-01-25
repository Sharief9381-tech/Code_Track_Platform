import { DashboardHeader } from "@/components/dashboard/header"
import { ShortlistManager } from "@/components/recruiter/shortlist-manager"

export default function ShortlistsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Shortlists"
        description="Manage your candidate shortlists and interview pipeline"
      />
      <div className="flex-1 p-6">
        <ShortlistManager />
      </div>
    </div>
  )
}
