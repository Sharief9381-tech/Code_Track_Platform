import { Code2, Github, Terminal, Braces, Hash, FileCode } from "lucide-react"

export function Platforms() {
  const platforms = [
    { name: "LeetCode", icon: Code2, color: "text-chart-3" },
    { name: "GitHub", icon: Github, color: "text-foreground" },
    { name: "CodeChef", icon: Braces, color: "text-chart-5" },
    { name: "Codeforces", icon: Hash, color: "text-chart-4" },
    { name: "HackerRank", icon: Terminal, color: "text-primary" },
    { name: "GeeksforGeeks", icon: FileCode, color: "text-primary" },
  ]

  return (
    <section id="platforms" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Integrated Platforms
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We pull data from all major coding platforms to give you a complete picture.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <platform.icon className={`h-8 w-8 ${platform.color}`} />
              <span className="mt-3 text-sm font-medium text-foreground">{platform.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            More platforms coming soon. Request an integration at{" "}
            <a href="mailto:support@codetrack.io" className="text-primary hover:underline">
              support@codetrack.io
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
