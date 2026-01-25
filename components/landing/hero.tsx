import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground mb-8">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>AI-Powered Recruitment Platform</span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
          The Complete Platform for{" "}
          <span className="text-primary">Coding Performance</span>
        </h1>
        
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Unify coding performance tracking, college placement analytics, and AI-powered 
          recruitment to connect the right students with the right companies.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="gap-2 text-base">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg" className="text-base bg-transparent">
              Watch Demo
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">50K+</p>
            <p className="text-sm text-muted-foreground">Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">200+</p>
            <p className="text-sm text-muted-foreground">Colleges</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">500+</p>
            <p className="text-sm text-muted-foreground">Companies</p>
          </div>
        </div>
      </div>
    </section>
  )
}
