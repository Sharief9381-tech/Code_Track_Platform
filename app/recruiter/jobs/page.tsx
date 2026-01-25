import { DashboardHeader } from "@/components/dashboard/header"
import { JobPostings } from "@/components/recruiter/job-postings"

export default function JobsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Job Postings"
        description="Manage your job postings and track applications"
      />
      <div className="flex-1 p-6">
        <JobPostings />
      </div>
    </div>
  )
}
