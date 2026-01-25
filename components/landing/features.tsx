import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  BarChart3, 
  Users, 
  Brain,
  Trophy,
  FileText,
  Target
} from "lucide-react"

export function Features() {
  const studentFeatures = [
    {
      icon: BarChart3,
      title: "Unified Dashboard",
      description: "Track your progress across LeetCode, CodeChef, Codeforces, HackerRank, and GitHub in one place."
    },
    {
      icon: Trophy,
      title: "Score Analytics",
      description: "Get normalized scores that make your skills comparable across platforms and colleges."
    },
    {
      icon: FileText,
      title: "Smart Resume",
      description: "Auto-generate verified resumes with real performance data and achievements."
    },
    {
      icon: Target,
      title: "AI Job Match",
      description: "Receive personalized job recommendations based on your coding profile and skills."
    }
  ]

  const collegeFeatures = [
    {
      icon: Users,
      title: "Batch Tracking",
      description: "Monitor entire batches with branch-wise statistics and real-time performance data."
    },
    {
      icon: BarChart3,
      title: "Placement Analytics",
      description: "Data-driven insights to improve placement rates and identify skill gaps."
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description: "Motivate students with competitive leaderboards and achievement systems."
    },
    {
      icon: Building2,
      title: "Recruiter Portal",
      description: "Control which companies can access your student data with granular permissions."
    }
  ]

  const recruiterFeatures = [
    {
      icon: Brain,
      title: "AI Talent Matching",
      description: "Find candidates with AI that analyzes coding skills, not just keywords."
    },
    {
      icon: Target,
      title: "Advanced Filters",
      description: "Filter by tech stack, ratings, contest rankings, GitHub activity, and more."
    },
    {
      icon: Users,
      title: "Bulk Outreach",
      description: "Shortlist and contact multiple candidates efficiently with smart automation."
    },
    {
      icon: FileText,
      title: "Verified Profiles",
      description: "Access verified coding performance data directly from platforms, not self-reported."
    }
  ]

  return (
    <section id="features" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Built for Everyone in the Hiring Ecosystem
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Whether you are a student, college, or recruiter, CodeTrack has the tools you need.
          </p>
        </div>

        {/* Students */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">For Students</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studentFeatures.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <feature.icon className="h-5 w-5 text-primary mb-2" />
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Colleges */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Building2 className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">For Colleges</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collegeFeatures.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-accent/50 transition-colors">
                <CardHeader className="pb-2">
                  <feature.icon className="h-5 w-5 text-accent mb-2" />
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recruiters */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
              <Briefcase className="h-5 w-5 text-chart-3" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">For Recruiters</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recruiterFeatures.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-chart-3/50 transition-colors">
                <CardHeader className="pb-2">
                  <feature.icon className="h-5 w-5 text-chart-3 mb-2" />
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
