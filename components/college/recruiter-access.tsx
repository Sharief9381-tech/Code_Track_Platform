"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Shield,
  Eye,
  Download,
  Mail,
  UserPlus,
  Settings,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

const recruiters = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Google",
    email: "sarah@google.com",
    accessLevel: "full",
    status: "active",
    lastAccess: "2 hours ago",
    canViewProfiles: true,
    canDownloadResumes: true,
    canContactStudents: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Microsoft",
    email: "michael@microsoft.com",
    accessLevel: "limited",
    status: "active",
    lastAccess: "1 day ago",
    canViewProfiles: true,
    canDownloadResumes: false,
    canContactStudents: true,
  },
  {
    id: 3,
    name: "Emily Davis",
    company: "Amazon",
    email: "emily@amazon.com",
    accessLevel: "full",
    status: "pending",
    lastAccess: "Never",
    canViewProfiles: true,
    canDownloadResumes: true,
    canContactStudents: true,
  },
  {
    id: 4,
    name: "Robert Wilson",
    company: "Flipkart",
    email: "robert@flipkart.com",
    accessLevel: "limited",
    status: "revoked",
    lastAccess: "1 week ago",
    canViewProfiles: false,
    canDownloadResumes: false,
    canContactStudents: false,
  },
]

const accessRequests = [
  {
    id: 1,
    name: "Jennifer Lee",
    company: "Meta",
    email: "jennifer@meta.com",
    requestDate: "Jan 18, 2026",
    message: "Interested in recruiting top CS talent for our engineering team.",
  },
  {
    id: 2,
    name: "David Kim",
    company: "Netflix",
    email: "david@netflix.com",
    requestDate: "Jan 17, 2026",
    message: "Looking for data science interns for summer 2026.",
  },
]

export function RecruiterAccess() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="gap-1 bg-green-500/10 text-green-500">
            <CheckCircle className="h-3 w-3" />
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge className="gap-1 bg-yellow-500/10 text-yellow-500">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "revoked":
        return (
          <Badge className="gap-1 bg-red-500/10 text-red-500">
            <XCircle className="h-3 w-3" />
            Revoked
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getAccessBadge = (level: string) => {
    return level === "full" ? (
      <Badge className="bg-primary/10 text-primary">Full Access</Badge>
    ) : (
      <Badge variant="secondary">Limited</Badge>
    )
  }

  return (
    <Tabs defaultValue="recruiters" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="bg-secondary">
          <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
          <TabsTrigger value="requests">
            Access Requests
            <Badge className="ml-2 bg-primary/20 text-primary">{accessRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
        </TabsList>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Recruiter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Recruiter</DialogTitle>
              <DialogDescription>
                Send an invitation to a recruiter to access your student data
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Recruiter Email</Label>
                <Input placeholder="recruiter@company.com" />
              </div>
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input placeholder="Company Name" />
              </div>
              <div className="space-y-2">
                <Label>Access Level</Label>
                <Select defaultValue="limited">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Access</SelectItem>
                    <SelectItem value="limited">Limited Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Permissions</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-normal">View Student Profiles</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="font-normal">Download Resumes</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="font-normal">Contact Students Directly</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              <Button className="w-full" onClick={() => setAddDialogOpen(false)}>
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <TabsContent value="recruiters" className="space-y-4">
        {recruiters.map((recruiter) => (
          <Card key={recruiter.id} className="bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {recruiter.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{recruiter.name}</h3>
                      {getStatusBadge(recruiter.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {recruiter.company} • {recruiter.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {getAccessBadge(recruiter.accessLevel)}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Eye className={`h-4 w-4 ${recruiter.canViewProfiles ? "text-green-500" : "text-muted-foreground"}`} />
                      Profiles
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Download className={`h-4 w-4 ${recruiter.canDownloadResumes ? "text-green-500" : "text-muted-foreground"}`} />
                      Resumes
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Mail className={`h-4 w-4 ${recruiter.canContactStudents ? "text-green-500" : "text-muted-foreground"}`} />
                      Contact
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Last access: {recruiter.lastAccess}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Settings className="h-4 w-4" />
                      Edit
                    </Button>
                    {recruiter.status !== "revoked" && (
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="requests" className="space-y-4">
        {accessRequests.map((request) => (
          <Card key={request.id} className="bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-chart-3/10 text-chart-3">
                      {request.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{request.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.company} • {request.email}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{request.message}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Requested on {request.requestDate}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent text-destructive">
                    <XCircle className="h-4 w-4" />
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Data Visibility Settings</CardTitle>
            <CardDescription>Control what information recruiters can access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Student Contact Information</p>
                <p className="text-sm text-muted-foreground">
                  Allow recruiters to view student phone numbers and emails
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Coding Platform Stats</p>
                <p className="text-sm text-muted-foreground">
                  Show detailed coding stats from LeetCode, GitHub, etc.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Resume Downloads</p>
                <p className="text-sm text-muted-foreground">
                  Allow recruiters to download student resumes
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Direct Messaging</p>
                <p className="text-sm text-muted-foreground">
                  Allow recruiters to contact students directly
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Minimum Eligibility Criteria</CardTitle>
            <CardDescription>
              Set minimum requirements for students to be visible to recruiters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Minimum CGPA</Label>
                <Input type="number" step="0.1" placeholder="7.0" defaultValue="7.0" />
              </div>
              <div className="space-y-2">
                <Label>Minimum Problems Solved</Label>
                <Input type="number" placeholder="50" defaultValue="50" />
              </div>
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <Input type="number" placeholder="1200" defaultValue="1200" />
              </div>
              <div className="space-y-2">
                <Label>Active Backlogs</Label>
                <Select defaultValue="0">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Backlogs</SelectItem>
                    <SelectItem value="1">Max 1</SelectItem>
                    <SelectItem value="2">Max 2</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button>Save Criteria</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
