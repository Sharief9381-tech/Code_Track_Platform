import { DashboardHeader } from "@/components/dashboard/header"
import { PlacementTracker } from "@/components/college/placement-tracker"

export default function PlacementsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Placement Tracking"
        description="Monitor and manage student placements and company interactions"
      />
      <div className="flex-1 p-6">
        <PlacementTracker />
      </div>
    </div>
  )
}
