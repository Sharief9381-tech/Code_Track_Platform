"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, ExternalLink, Loader2, RefreshCw, Trash2, X, Plus, AlertCircle, Trophy, GitBranch, Code } from "lucide-react"
import type { StudentProfile } from "@/lib/types"

interface PlatformsManagerProps {
  student: StudentProfile
}

const platforms = [
  {
    id: "leetcode",
    name: "LeetCode",
    description: "Practice coding problems and prepare for interviews",
    color: "#FFA116",
    url: "https://leetcode.com",
    features: ["Problem Solving", "Interview Prep", "Contests"],
    icon: Code,
    instructions: "Enter your LeetCode username or profile URL (e.g., 'john_doe' or 'https://leetcode.com/u/john_doe/')",
    placeholder: "e.g., john_doe or https://leetcode.com/u/john_doe/",
    isCustom: false,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Showcase your projects and contributions",
    color: "#238636",
    url: "https://github.com",
    features: ["Projects", "Contributions", "Collaboration"],
    icon: GitBranch,
    instructions: "Enter your GitHub username or profile URL (e.g., 'johndoe' or 'https://github.com/johndoe')",
    placeholder: "e.g., johndoe or https://github.com/johndoe",
    isCustom: false,
  },
  {
    id: "codeforces",
    name: "Codeforces",
    description: "Competitive programming and algorithmic contests",
    color: "#1890FF",
    url: "https://codeforces.com",
    features: ["Competitive", "Contests", "Rating"],
    icon: Trophy,
    instructions: "Enter your Codeforces handle or profile URL (e.g., 'tourist' or 'https://codeforces.com/profile/tourist')",
    placeholder: "e.g., tourist or https://codeforces.com/profile/tourist",
    isCustom: false,
  },
  {
    id: "codechef",
    name: "CodeChef",
    description: "Monthly contests and practice problems",
    color: "#5B4638",
    url: "https://codechef.com",
    features: ["Contests", "Practice", "Learning"],
    icon: Code,
    instructions: "Enter your CodeChef username or profile URL (e.g., 'admin' or 'https://codechef.com/users/admin'). Note: Due to API limitations, problem counts may not be available.",
    placeholder: "e.g., admin or https://codechef.com/users/admin",
    isCustom: false,
  },
]

// Popular coding platforms for search
const popularPlatforms = [
  { name: "HackerRank", url: "https://hackerrank.com", description: "Coding challenges and skill assessments" },
  { name: "HackerEarth", url: "https://hackerearth.com", description: "Programming challenges and hackathons" },
  { name: "AtCoder", url: "https://atcoder.jp", description: "Japanese competitive programming platform" },
  { name: "TopCoder", url: "https://topcoder.com", description: "Competitive programming and crowdsourcing" },
  { name: "SPOJ", url: "https://spoj.com", description: "Sphere Online Judge - programming problems" },
  { name: "CodeWars", url: "https://codewars.com", description: "Coding challenges and kata" },
  { name: "Exercism", url: "https://exercism.org", description: "Code practice and mentorship" },
  { name: "Project Euler", url: "https://projecteuler.net", description: "Mathematical programming challenges" },
  { name: "Kattis", url: "https://kattis.com", description: "Programming contest platform" },
  { name: "UVa Online Judge", url: "https://uva.onlinejudge.org", description: "Classic programming problems" },
  { name: "Timus", url: "https://acm.timus.ru", description: "Russian programming contest archive" },
  { name: "USACO", url: "https://usaco.org", description: "USA Computing Olympiad" },
  { name: "GeeksforGeeks", url: "https://geeksforgeeks.org", description: "Programming tutorials and practice" },
  { name: "InterviewBit", url: "https://interviewbit.com", description: "Interview preparation platform" },
  { name: "Pramp", url: "https://pramp.com", description: "Mock technical interviews" },
  { name: "CodinGame", url: "https://codingame.com", description: "Coding games and challenges" },
  { name: "Kaggle", url: "https://kaggle.com", description: "Data science competitions" },
  { name: "Brilliant", url: "https://brilliant.org", description: "Math and science problem solving" },
  { name: "FreeCodeCamp", url: "https://freecodecamp.org", description: "Learn to code for free" },
  { name: "Codility", url: "https://codility.com", description: "Programming skills assessment" },
]

export function PlatformsManager({ student }: PlatformsManagerProps) {
  const [linkedPlatforms, setLinkedPlatforms] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(student.linkedPlatforms || {}).map(([key, value]) => [
        key, 
        typeof value === 'string' ? value : value?.username || ''
      ])
    )
  )
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [verifying, setVerifying] = useState<Record<string, boolean>>({})
  const [verified, setVerified] = useState<Record<string, boolean>>({})
  const [platformStats, setPlatformStats] = useState<Record<string, any>>({})
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [showCustomDialog, setShowCustomDialog] = useState(false)
  const [customPlatforms, setCustomPlatforms] = useState<any[]>([])
  
  // Custom platform form state
  const [customPlatformUrl, setCustomPlatformUrl] = useState("")
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    // Filter popular platforms based on search query
    const filtered = popularPlatforms.filter(platform =>
      platform.name.toLowerCase().includes(query.toLowerCase()) ||
      platform.description.toLowerCase().includes(query.toLowerCase())
    )
    
    setSearchResults(filtered.slice(0, 8)) // Limit to 8 results
    setIsSearching(false)
  }

  const handlePlatformSelect = (platform: { name: string; url: string; description: string }) => {
    // Don't open the website, instead create a custom platform and go directly to username dialog
    
    // Extract platform name from URL
    try {
      const url = new URL(platform.url)
      const hostname = url.hostname.replace('www.', '')
      const platformName = hostname.split('.')[0]
      
      // Capitalize first letter
      const displayName = platform.name // Use the display name from search
      
      // Generate a unique ID for the custom platform
      const customId = `custom_${platformName.toLowerCase()}_${Date.now()}`
      
      // Determine features based on platform name
      let features = ["Custom Platform"]
      const lowerName = platformName.toLowerCase()
      
      if (lowerName.includes('hack') || lowerName.includes('code') || lowerName.includes('contest')) {
        features = ["Coding Challenges", "Practice"]
      } else if (lowerName.includes('judge') || lowerName.includes('oj')) {
        features = ["Online Judge", "Problems"]
      } else if (lowerName.includes('interview')) {
        features = ["Interview Prep", "Assessment"]
      } else if (lowerName.includes('learn') || lowerName.includes('tutorial')) {
        features = ["Learning", "Tutorials"]
      }
      
      const newCustomPlatform = {
        id: customId,
        name: displayName,
        description: platform.description,
        color: "#6366F1", // Default color for custom platforms
        url: platform.url,
        features: features,
        icon: Code,
        instructions: `Enter your ${displayName} username or profile URL`,
        placeholder: `e.g., your_username`,
        isCustom: true,
      }

      // Add to custom platforms
      setCustomPlatforms(prev => [...prev, newCustomPlatform])
      
      // Clear search and close search dialog
      setSearchQuery("")
      setSearchResults([])
      setShowAddDialog(false)
      
      // Directly open the username dialog for this platform
      setSelectedPlatform(customId)
    } catch (error) {
      console.error('Error creating custom platform:', error)
      alert("Error creating platform. Please try again.")
    }
  }

  const getStatsPreview = (platformId: string, stats: any): string => {
    if (!stats) return "No stats available"
    
    switch (platformId) {
      case "leetcode":
        return `• Problems solved: ${stats.totalSolved || 0}\n• Easy: ${stats.easySolved || 0}, Medium: ${stats.mediumSolved || 0}, Hard: ${stats.hardSolved || 0}`
      case "github":
        return `• Contributions: ${stats.totalContributions || 0}\n• Public repositories: ${stats.publicRepos || 0}\n• Followers: ${stats.followers || 0}`
      case "codeforces":
        return `• Rating: ${stats.rating || 0}\n• Problems solved: ${stats.problemsSolved || 0}`
      case "codechef":
        if (stats._apiLimited) {
          return `• Rating: ${stats.currentRating || 0}\n• Stars: ${stats.stars || "N/A"}\n• ⚠️ API Limited: Problems solved data unavailable due to service restrictions`
        }
        return `• Rating: ${stats.currentRating || 0}\n• Stars: ${stats.stars || "N/A"}\n• Problems solved: ${stats.problemsSolved || 0}`
      default:
        return "Stats loaded successfully"
    }
  }

  const extractUsername = (input: string, platformId: string): string => {
    const trimmed = input.trim()
    
    // Handle different URL formats for each platform
    switch (platformId) {
      case "leetcode":
        if (trimmed.includes("leetcode.com")) {
          const match = trimmed.match(/leetcode\.com\/(?:u\/)?([^\/\?]+)/)
          return match ? match[1] : trimmed
        }
        break
      case "github":
        if (trimmed.includes("github.com")) {
          const match = trimmed.match(/github\.com\/([^\/\?]+)/)
          return match ? match[1] : trimmed
        }
        break
      case "codeforces":
        if (trimmed.includes("codeforces.com")) {
          const match = trimmed.match(/codeforces\.com\/profile\/([^\/\?]+)/)
          return match ? match[1] : trimmed
        }
        break
      case "codechef":
        if (trimmed.includes("codechef.com")) {
          const match = trimmed.match(/codechef\.com\/users\/([^\/\?]+)/)
          return match ? match[1] : trimmed
        }
        break
      default:
        // For custom platforms, extract username from URL
        if (trimmed.startsWith('http')) {
          try {
            const url = new URL(trimmed)
            const pathname = url.pathname
            // Extract username from various URL patterns
            const patterns = [
              /\/([^\/]+)\/?$/, // Last segment
              /\/@([^\/]+)/, // @username pattern
              /\/users?\/([^\/]+)/, // /user/ or /users/ pattern
              /\/profile\/([^\/]+)/, // /profile/ pattern
              /\/u\/([^\/]+)/, // /u/ pattern
            ]
            
            for (const pattern of patterns) {
              const match = pathname.match(pattern)
              if (match && match[1] && match[1] !== '') {
                // Clean up the extracted username (remove @ symbol, file extensions, etc.)
                let username = match[1]
                if (username.startsWith('@')) {
                  username = username.substring(1)
                }
                // Remove file extensions
                username = username.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
                return username
              }
            }
            
            // If no pattern matches, return the last non-empty segment
            const segments = pathname.split('/').filter(s => s.length > 0)
            return segments.length > 0 ? segments[segments.length - 1] : trimmed
          } catch (error) {
            return trimmed
          }
        }
        return trimmed
    }
    
    return trimmed
  }

  const handleLink = async (platformId: string) => {
    if (!username.trim()) {
      alert("Please enter a username or profile URL")
      return
    }

    const extractedUsername = extractUsername(username, platformId)
    
    if (!extractedUsername) {
      alert("Please enter a valid username or profile URL")
      return
    }

    setLoading((prev) => ({ ...prev, [platformId]: true }))
    try {
      // Check if it's a custom platform
      const isCustomPlatform = customPlatforms.some(p => p.id === platformId)
      
      if (!isCustomPlatform) {
        // First verify the username exists and fetch stats for predefined platforms
        console.log(`Verifying ${platformId} username: ${extractedUsername}`)
        const verifyResponse = await fetch(
          `/api/platforms?platform=${platformId}&username=${extractedUsername}`
        )

        if (!verifyResponse.ok) {
          const errorData = await verifyResponse.json()
          let errorMessage = 'Username verification failed'
          
          if (verifyResponse.status === 404) {
            // For CodeChef, this might be due to API limitations, not actually user not found
            if (platformId === 'codechef') {
              console.log('CodeChef API failed, but allowing connection due to known API limitations')
              // Continue with linking even if verification fails for CodeChef
            } else {
              errorMessage = `Username "${extractedUsername}" not found on ${platforms.find(p => p.id === platformId)?.name}. Please check your username and try again.`
              alert(errorMessage)
              return
            }
          } else {
            errorMessage = errorData.error || 'Username not found on this platform'
            alert(errorMessage)
            return
          }
        } else {
          const { stats } = await verifyResponse.json()
          console.log(`${platformId} stats:`, stats)
          setPlatformStats((prev) => ({ ...prev, [platformId]: stats }))
        }
      }

      // Link the platform
      const response = await fetch("/api/student/link-platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          platform: platformId, 
          username: extractedUsername,
          isCustom: isCustomPlatform
        }),
      })

      if (response.ok) {
        setLinkedPlatforms((prev) => ({ ...prev, [platformId]: extractedUsername }))
        setEditingPlatform(null)
        setSelectedPlatform(null)
        setUsername("")
        setVerified((prev) => ({ ...prev, [platformId]: true }))
        setShowAddDialog(false)
        
        // Show success message
        const platformName = platforms.find(p => p.id === platformId)?.name || 
                           customPlatforms.find(p => p.id === platformId)?.name
        
        let successMessage = ''
        if (isCustomPlatform) {
          successMessage = `Successfully linked ${platformName}! 🎉\n\nCustom platform added to your profile.`
        } else if (platformId === 'codechef') {
          const stats = platformStats[platformId]
          if (stats?._apiLimited) {
            successMessage = `Successfully linked ${platformName}! 🎉\n\n⚠️ Due to CodeChef API limitations, your actual problem count won't be automatically fetched.\n\n✅ Next Step: Click the blue code icon (📝) on your CodeChef card to manually enter your stats (like your 480 problems solved).\n\nThis will ensure your complete progress is reflected in your analytics!`
          } else {
            successMessage = `Successfully linked ${platformName}! 🎉\n\nStats loaded:\n${getStatsPreview(platformId, platformStats[platformId])}`
          }
        } else {
          successMessage = `Successfully linked ${platformName}! 🎉\n\nStats loaded:\n${getStatsPreview(platformId, platformStats[platformId])}`
        }
        
        alert(successMessage)
        
        // Automatically sync aggregated stats for predefined platforms
        if (!isCustomPlatform) {
          try {
            await fetch('/api/student/sync-stats', { method: 'POST' })
            console.log('Aggregated stats synced successfully')
          } catch (error) {
            console.error('Failed to sync aggregated stats:', error)
          }
        }
      } else {
        const errorData = await response.json()
        alert(`Failed to link platform: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error linking platform:", error)
      alert("An error occurred while linking the platform. Please try again.")
    } finally {
      setLoading((prev) => ({ ...prev, [platformId]: false }))
    }
  }

  const handleAddCustomPlatform = async () => {
    if (!customPlatformUrl.trim()) {
      alert("Please enter a platform URL")
      return
    }

    try {
      // Extract platform name from URL
      const url = new URL(customPlatformUrl.trim())
      const hostname = url.hostname.replace('www.', '')
      const platformName = hostname.split('.')[0]
      
      // Capitalize first letter
      const displayName = platformName.charAt(0).toUpperCase() + platformName.slice(1)
      
      // Generate a unique ID for the custom platform
      const customId = `custom_${platformName.toLowerCase()}_${Date.now()}`
      
      // Determine features based on platform name
      let features = ["Custom Platform"]
      const lowerName = platformName.toLowerCase()
      
      if (lowerName.includes('hack') || lowerName.includes('code') || lowerName.includes('contest')) {
        features = ["Coding Challenges", "Practice"]
      } else if (lowerName.includes('judge') || lowerName.includes('oj')) {
        features = ["Online Judge", "Problems"]
      } else if (lowerName.includes('interview')) {
        features = ["Interview Prep", "Assessment"]
      } else if (lowerName.includes('learn') || lowerName.includes('tutorial')) {
        features = ["Learning", "Tutorials"]
      }
      
      const newCustomPlatform = {
        id: customId,
        name: displayName,
        description: `Custom platform: ${displayName}`,
        color: "#6366F1", // Default color for custom platforms
        url: customPlatformUrl.trim(),
        features: features,
        icon: Code,
        instructions: `Enter your ${displayName} username or profile URL`,
        placeholder: `e.g., your_username`,
        isCustom: true,
      }

      setCustomPlatforms(prev => [...prev, newCustomPlatform])
      
      // Reset form
      setCustomPlatformUrl("")
      setShowCustomDialog(false)
      
      // Automatically open the link dialog for the new custom platform
      setSelectedPlatform(customId)
      setShowAddDialog(true)
    } catch (error) {
      alert("Please enter a valid URL (e.g., https://hackerearth.com)")
    }
  }

  const handleUnlink = async (platformId: string) => {
    setLoading((prev) => ({ ...prev, [platformId]: true }))
    try {
      const response = await fetch("/api/student/link-platform", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: platformId }),
      })

      if (response.ok) {
        setLinkedPlatforms((prev) => {
          const newPlatforms = { ...prev }
          delete newPlatforms[platformId]
          return newPlatforms
        })
        setPlatformStats((prev) => {
          const newStats = { ...prev }
          delete newStats[platformId]
          return newStats
        })
        setVerified((prev) => ({ ...prev, [platformId]: false }))
      }
    } catch (error) {
      console.error("Error unlinking platform:", error)
    } finally {
      setLoading((prev) => ({ ...prev, [platformId]: false }))
    }
  }

  const verifyPlatform = async (platformId: string, platformUsername: string) => {
    setVerifying((prev) => ({ ...prev, [platformId]: true }))
    try {
      const response = await fetch(
        `/api/platforms?platform=${platformId}&username=${platformUsername}`
      )
      if (response.ok) {
        const { stats } = await response.json()
        setPlatformStats((prev) => ({ ...prev, [platformId]: stats }))
        setVerified((prev) => ({ ...prev, [platformId]: true }))
      } else {
        setVerified((prev) => ({ ...prev, [platformId]: false }))
      }
    } catch {
      setVerified((prev) => ({ ...prev, [platformId]: false }))
    } finally {
      setVerifying((prev) => ({ ...prev, [platformId]: false }))
    }
  }

  const openAddPlatformDialog = (platformId: string) => {
    setSelectedPlatform(platformId)
    setUsername("")
    setShowAddDialog(true)
  }

  const renderPlatformStats = (platformId: string, stats: any) => {
    if (!stats) return null

    switch (platformId) {
      case "leetcode":
        return (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-green-600">{stats.easySolved || 0}</div>
              <div className="text-muted-foreground">Easy</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-yellow-600">{stats.mediumSolved || 0}</div>
              <div className="text-muted-foreground">Medium</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-red-600">{stats.hardSolved || 0}</div>
              <div className="text-muted-foreground">Hard</div>
            </div>
          </div>
        )
      case "github":
        return (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-green-600">{stats.totalContributions || 0}</div>
              <div className="text-muted-foreground">Contributions</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{stats.publicRepos || 0}</div>
              <div className="text-muted-foreground">Repos</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{stats.followers || 0}</div>
              <div className="text-muted-foreground">Followers</div>
            </div>
          </div>
        )
      case "codeforces":
        return (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-green-600">{stats.problemsSolved || 0}</div>
              <div className="text-muted-foreground">Problems</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-600">{stats.rating || 0}</div>
              <div className="text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-600">{stats.maxRating || 0}</div>
              <div className="text-muted-foreground">Max Rating</div>
            </div>
          </div>
        )
      case "codechef":
        return (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-orange-600">{stats.problemsSolved || 0}</div>
              <div className="text-muted-foreground">Problems</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-600">{stats.currentRating || 0}</div>
              <div className="text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{stats.stars || "N/A"}</div>
              <div className="text-muted-foreground">Stars</div>
            </div>
            {stats._apiLimited && (
              <div className="col-span-3 text-center mt-2">
                <div className="text-xs text-amber-600 bg-amber-50 p-1 rounded">
                  ⚠️ API Limited - Stats may not reflect actual progress
                </div>
              </div>
            )}
          </div>
        )
      default:
        // For custom platforms, show basic info
        return (
          <div className="text-center py-2">
            <div className="text-sm text-muted-foreground">
              Custom platform profile linked
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Visit profile to view stats
            </div>
          </div>
        )
    }
  }

  useEffect(() => {
    // Verify all linked platforms on mount
    for (const [platformId, platformUsername] of Object.entries(linkedPlatforms)) {
      if (platformUsername) {
        // For custom platforms, mark as verified immediately since we can't fetch stats
        if (platformId.startsWith('custom_')) {
          setVerified((prev) => ({ ...prev, [platformId]: true }))
        } else {
          verifyPlatform(platformId, platformUsername)
        }
      }
    }
  }, [])

  const allPlatforms = [...platforms, ...customPlatforms]
  const linkedPlatformsList = allPlatforms.filter(p => linkedPlatforms[p.id])
  const availablePlatforms = platforms.filter(p => !linkedPlatforms[p.id])

  return (
    <div className="space-y-6">
      {/* Add Platform Button */}
      {(availablePlatforms.length > 0 || true) && (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Connected Platforms</h3>
            <p className="text-sm text-muted-foreground">
              Link your coding platforms to track your progress
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Platform
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Coding Platform</DialogTitle>
                <DialogDescription>
                  Search and select platforms to add to your profile
                </DialogDescription>
              </DialogHeader>
              
              {/* Search Bar */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platformSearch">Search Platforms</Label>
                  <Input
                    id="platformSearch"
                    placeholder="Search platforms to add (e.g., HackerRank, AtCoder, TopCoder...)"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      {isSearching ? "Searching..." : `Found ${searchResults.length} platforms`}
                    </div>
                    {searchResults.length > 0 && (
                      <div className="grid gap-2 max-h-48 overflow-y-auto">
                        {searchResults.map((platform, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="justify-start gap-3 h-auto p-3 text-left"
                            onClick={() => handlePlatformSelect(platform)}
                          >
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
                              <Plus className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{platform.name}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {platform.description}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                    {searchQuery && searchResults.length === 0 && !isSearching && (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>No platforms found for "{searchQuery}"</p>
                        <p className="text-xs mt-1">Try searching for: HackerRank, AtCoder, TopCoder, SPOJ, etc.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Predefined Platforms */}
                {!searchQuery && (
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">Popular Platforms</div>
                    <div className="grid gap-3">
                      {availablePlatforms.map((platform) => (
                        <Button
                          key={platform.id}
                          variant="outline"
                          className="justify-start gap-3 h-auto p-4"
                          onClick={() => openAddPlatformDialog(platform.id)}
                        >
                          <div
                            className="h-8 w-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: platform.color }}
                          >
                            <platform.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{platform.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {platform.description}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Platform Option */}
                {!searchQuery && (
                  <div className="border-t pt-3 mt-4">
                    <p className="text-xs text-muted-foreground mb-3">Don't see your platform?</p>
                    <Button
                      variant="outline"
                      className="justify-start gap-3 h-auto p-4 border-dashed w-full"
                      onClick={() => {
                        setShowAddDialog(false)
                        setShowCustomDialog(true)
                      }}
                    >
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Add Custom Platform</div>
                        <div className="text-xs text-muted-foreground">
                          Add any platform by entering its URL
                        </div>
                      </div>
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Platform Authentication Dialog */}
      {selectedPlatform && (
        <Dialog open={!!selectedPlatform} onOpenChange={() => setSelectedPlatform(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {(() => {
                  const platform = allPlatforms.find(p => p.id === selectedPlatform)
                  return platform ? (
                    <>
                      <div
                        className="h-6 w-6 rounded flex items-center justify-center"
                        style={{ backgroundColor: platform.color }}
                      >
                        <platform.icon className="h-3 w-3 text-white" />
                      </div>
                      Connect {platform.name}
                    </>
                  ) : null
                })()}
              </DialogTitle>
              <DialogDescription>
                {(() => {
                  const platform = allPlatforms.find(p => p.id === selectedPlatform)
                  return platform?.instructions || `Enter your username for this platform`
                })()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder={(() => {
                    const platform = allPlatforms.find(p => p.id === selectedPlatform)
                    return platform?.placeholder || "e.g., your_username"
                  })()}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && selectedPlatform) {
                      handleLink(selectedPlatform)
                    }
                  }}
                />
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium">How to find your username:</p>
                  <p>You can enter either your username or paste your full profile URL. We'll extract the username automatically.</p>
                  <p className="mt-1">Example: "john_doe" or "https://leetcode.com/u/john_doe/"</p>
                  {selectedPlatform === 'codechef' && (
                    <p className="mt-1 text-amber-700 bg-amber-50 p-2 rounded text-xs">
                      <strong>⚠️ CodeChef API Limitation:</strong> Due to third-party API restrictions, your actual problem count (like 480 problems) may not display correctly. Your profile will still be linked and rating information will be shown when available.
                    </p>
                  )}
                  {(() => {
                    const platform = allPlatforms.find(p => p.id === selectedPlatform)
                    return platform?.isCustom && (
                      <p className="mt-1 text-purple-700 bg-purple-50 p-1 rounded text-xs">
                        Note: This is a custom platform. Your profile will be linked for showcase purposes.
                      </p>
                    )
                  })()}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedPlatform(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => selectedPlatform && handleLink(selectedPlatform)}
                disabled={!username.trim() || loading[selectedPlatform || '']}
                className="min-w-[140px]"
              >
                {loading[selectedPlatform || ''] ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  'Connect Platform'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Custom Platform Dialog */}
      <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-6 w-6 rounded flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
                <Plus className="h-3 w-3 text-white" />
              </div>
              Add Custom Platform
            </DialogTitle>
            <DialogDescription>
              Enter the URL of any coding platform you want to add to your profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customUrl">Platform URL *</Label>
              <Input
                id="customUrl"
                placeholder="e.g., https://hackerearth.com, https://atcoder.jp, https://topcoder.com"
                value={customPlatformUrl}
                onChange={(e) => setCustomPlatformUrl(e.target.value)}
              />
            </div>
            <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5" />
              <div className="text-xs text-purple-800">
                <p className="font-medium">How it works:</p>
                <p>• Enter any coding platform URL (e.g., https://hackerearth.com)</p>
                <p>• We'll automatically detect the platform name</p>
                <p>• You can then link your profile on that platform</p>
                <p>• Custom platforms will be added to your profile showcase</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCustomDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCustomPlatform}
              disabled={!customPlatformUrl.trim()}
            >
              Add Platform
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Linked Platforms */}
      {linkedPlatformsList.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {linkedPlatformsList.map((platform) => {
            const linkedUsername = linkedPlatforms[platform.id]
            const isLoading = loading[platform.id]
            const isVerifying = verifying[platform.id]
            const isVerified = verified[platform.id]
            const stats = platformStats[platform.id]

            return (
              <Card key={platform.id} className="bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: platform.color }}
                      >
                        <platform.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <CardDescription className="text-sm">
                          @{linkedUsername}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={isVerified ? "default" : "secondary"}
                      className="gap-1"
                    >
                      {isVerifying ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : isVerified ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      {isVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Platform Stats */}
                  {isVerified && stats && (
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      {renderPlatformStats(platform.id, stats)}
                    </div>
                  )}

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {platform.features.map((feature: string) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href={platform.isCustom && linkedUsername?.startsWith('http') ? linkedUsername : `${platform.url}/${linkedUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      View Profile
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => verifyPlatform(platform.id, linkedUsername || '')}
                        disabled={isVerifying}
                        title="Refresh stats"
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${isVerifying ? "animate-spin" : ""}`}
                        />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            title="Unlink platform"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Unlink {platform.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove your {platform.name} account from
                              CodeTrack. You can always link it again later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleUnlink(platform.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Unlink
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Platforms Connected</h3>
            <p className="text-muted-foreground mb-4">
              Connect your coding platforms to start tracking your progress and showcase your skills
            </p>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Platform
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}