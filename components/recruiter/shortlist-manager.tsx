"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Users,
  Calendar,
  Mail,
  Phone,
  MoreHorizontal,
  Trash2,
  ArrowRight,
  Video,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

const shortlists = [
  {
    id: 1,
    name: "SDE Intern 2025",
    description: "Software Development Engineer Intern positions",
    status: "active",
    candidates: [
      { id: 1, name: "Rahul Kumar", college: "IIT Delhi", stage: "Technical Interview", matchScore: 95, scheduledDate: "Jan 25, 2026" },
      { id: 2, name: "Priya Sharma", college: "NIT Trichy", stage: "HR Interview", matchScore: 92, scheduledDate: "Jan 24, 2026" },
      { id: 3, name: "Amit Patel", college: "BITS Pilani", stage: "Offer Sent", matchScore: 88, scheduledDate: null },
      { id: 4, name: "Sneha Gupta", college: "IIT Bombay", stage: "Technical Interview", matchScore: 91, scheduledDate: "Jan 26, 2026" },
    ],
    createdAt: "Jan 10, 2026",
  },
  {
    id: 2,
    name: "Full Stack Developer",
    description: "Full Stack development roles",
    status: "active",
    candidates: [
      { id: 5, name: "Vikram Singh", college: "DTU", stage: "Screening", matchScore: 87, scheduledDate: null },
      { id: 6, name: "Neha Verma", college: "IIIT Hyderabad", stage: "Technical Interview", matchScore: 89, scheduledDate: "Jan 27, 2026" },
    ],
    createdAt: "Jan 15, 2026",
  },
  {
    id: 3,
    name: "ML Engineer",
    description: "Machine Learning Engineer positions",
    status: "reviewing",
    candidates: [
      { id: 7, name: "Arjun Reddy", college: "IISc Bangalore", stage: "Screening", matchScore: 94, scheduledDate: null },
    ],
    createdAt: "Jan 18, 2026",
  },
]

const stages = ["Screening", "Technical Interview", "HR Interview", "Offer Sent", "Accepted", "Rejected"]

export function ShortlistManager() {
  const [selectedShortlist, setSelectedShortlist] = useState(shortlists[0])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Screening":
        return "bg-blue-500/10 text-blue-500"
      case "Technical Interview":
        return "bg-purple-500/10 text-purple-500"
      case "HR Interview":
        return "bg-yellow-500/10 text-yellow-500"
      case "Offer Sent":
        return "bg-green-500/10 text-green-500"
      case "Accepted":
        return "bg-primary/10 text-primary"
      case "Rejected":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-secondary text-muted-foreground"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500">Active</Badge>
      case "reviewing":
        return <Badge className="bg-yellow-500/10 text-yellow-500">Reviewing</Badge>
      case "closed":
        return <Badge variant="secondary">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const openScheduleDialog = (candidate: any) => {
    setSelectedCandidate(candidate)
    setScheduleDialogOpen(true)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Your Shortlists</h2>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Shortlist</DialogTitle>
                <DialogDescription>
                  Create a new shortlist to organize candidates
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Shortlist Name</Label>
                  <Input placeholder="e.g., SDE Intern 2025" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe this shortlist..." rows={3} />
                </div>
                <Button className="w-full" onClick={() => setCreateDialogOpen(false)}>
                  Create Shortlist
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {shortlists.map((list) => (
            <Card
              key={list.id}
              className={`cursor-pointer bg-card transition-colors hover:bg-secondary/50 ${
                selectedShortlist.id === list.id ? "border-primary" : ""
              }`}
              onClick={() => setSelectedShortlist(list)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{list.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {list.candidates.length} candidates
                    </p>
                  </div>
                  {getStatusBadge(list.status)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{selectedShortlist.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{selectedShortlist.description}</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(selectedShortlist.status)}
              <Button variant="outline" size="icon" className="bg-transparent">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center justify-between rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-6">
                {stages.slice(0, 4).map((stage, index) => {
                  const count = selectedShortlist.candidates.filter((c) => c.stage === stage).length
                  return (
                    <div key={stage} className="flex items-center gap-2">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-foreground">{count}</p>
                        <p className="text-xs text-muted-foreground">{stage}</p>
                      </div>
                      {index < 3 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              {selectedShortlist.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {candidate.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.college}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className="bg-primary/10 text-primary">
                      {candidate.matchScore}% match
                    </Badge>
                    <Badge className={getStageColor(candidate.stage)}>{candidate.stage}</Badge>
                    {candidate.scheduledDate && (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {candidate.scheduledDate}
                      </span>
                    )}
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openScheduleDialog(candidate)}
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Select defaultValue={candidate.stage}>
                        <SelectTrigger className="h-8 w-32 bg-transparent text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {stages.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Schedule an interview with {selectedCandidate?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Interview Type</Label>
              <Select defaultValue="technical">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Interview</SelectItem>
                  <SelectItem value="hr">HR Interview</SelectItem>
                  <SelectItem value="system-design">System Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Meeting Link</Label>
              <Input placeholder="https://meet.google.com/..." />
            </div>
            <div className="space-y-2">
              <Label>Notes for Candidate</Label>
              <Textarea placeholder="Any instructions or preparation notes..." rows={2} />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setScheduleDialogOpen(false)}>
                Schedule & Send Invite
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
