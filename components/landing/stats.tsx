export function Stats() {
  const stats = [
    { value: "98%", label: "Placement Rate Increase", company: "IIT Delhi" },
    { value: "3x", label: "Faster Hiring Process", company: "Tech Corp" },
    { value: "85%", label: "Better Candidate Fit", company: "StartupXYZ" },
    { value: "60%", label: "Time Saved on Screening", company: "Enterprise Co" },
  ]

  return (
    <section className="py-16 border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">{stat.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
