"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function DashboardRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Don't redirect if user explicitly wants to see the homepage
    const showHomepage = searchParams.get('home') === 'true'
    if (showHomepage) return

    const checkAuthAndRedirect = async () => {
      try {
        const response = await fetch("/api/auth/user")
        if (response.ok) {
          const { user } = await response.json()
          router.push(`/${user.role}/dashboard`)
        }
      } catch (error) {
        // User not authenticated, stay on landing page
        console.log("User not authenticated")
      }
    }

    checkAuthAndRedirect()
  }, [router, searchParams])

  return null
}