import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
          Ready to Transform Your Hiring?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of students, colleges, and companies already using CodeTrack 
          to make data-driven hiring decisions.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup?role=student">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              I'm a Student
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/signup?role=college">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              I'm a College
            </Button>
          </Link>
          <Link href="/signup?role=recruiter">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              I'm a Recruiter
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
