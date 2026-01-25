export function HowItWorks() {
  const studentSteps = [
    { step: "01", title: "Connect Profiles", description: "Link your LeetCode, GitHub, CodeChef, and other coding accounts" },
    { step: "02", title: "Build Profile", description: "Your verified resume is auto-generated with real performance data" },
    { step: "03", title: "Get Scored", description: "Receive normalized scores comparable across all students" },
    { step: "04", title: "Get Matched", description: "AI recommends jobs that fit your skills and preferences" },
  ]

  const collegeSteps = [
    { step: "01", title: "Onboard Students", description: "Upload student batches via CSV or integrate with your LMS" },
    { step: "02", title: "Track Progress", description: "Monitor real-time performance across all connected platforms" },
    { step: "03", title: "Manage Access", description: "Control which recruiters can access your student data" },
    { step: "04", title: "Analyze Results", description: "Get placement analytics and skill-gap reports" },
  ]

  const recruiterSteps = [
    { step: "01", title: "Post Requirements", description: "Define job requirements with tech stack and skill levels" },
    { step: "02", title: "AI Matching", description: "Our AI filters and ranks candidates based on verified data" },
    { step: "03", title: "Review & Shortlist", description: "Browse matched candidates with detailed skill breakdowns" },
    { step: "04", title: "Schedule & Hire", description: "Connect with candidates and manage the hiring pipeline" },
  ]

  return (
    <section id="how-it-works" className="py-24 px-6 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Simple workflows designed for each user type to get started quickly.
          </p>
        </div>

        <div className="grid gap-16 lg:gap-24">
          {/* Student Flow */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-8 text-center">Student Journey</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {studentSteps.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                    <h4 className="text-base font-semibold text-foreground mt-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  {index < studentSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* College Flow */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-8 text-center">College Journey</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {collegeSteps.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-accent/20">{item.step}</span>
                    <h4 className="text-base font-semibold text-foreground mt-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Flow */}
          <div>
            <h3 className="text-lg font-semibold text-chart-3 mb-8 text-center">Recruiter Journey</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recruiterSteps.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-chart-3/20">{item.step}</span>
                    <h4 className="text-base font-semibold text-foreground mt-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
