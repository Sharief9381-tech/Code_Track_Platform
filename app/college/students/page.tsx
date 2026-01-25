import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { StudentsTable } from "@/components/college/students-table"

export default async function StudentsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "college") {
    redirect("/login")
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Students"
        description="View and manage registered students"
      />
      <div className="flex-1 p-6">
        <StudentsTable />
      </div>
    </div>
  )
}
