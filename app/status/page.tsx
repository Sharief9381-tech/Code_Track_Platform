"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Database, Server, Users, Loader2 } from "lucide-react"

interface SystemStatus {
  api: 'healthy' | 'error' | 'loading'
  database: 'connected' | 'disconnected' | 'loading'
  environment: 'configured' | 'missing' | 'loading'
  fallback: 'active' | 'inactive' | 'loading'
}

interface TestResult {
  name: string
  status: 'success' | 'error' | 'loading'
  message: string
  details?: string
}

export default function StatusPage() {
  const [status, setStatus] = useState<SystemStatus>({
    api: 'loading',
    database: 'loading',
    environment: 'loading',
    fallback: 'loading'
  })
  
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)

  useEffect(() => {
    checkSystemStatus()
  }, [])

  const checkSystemStatus = async () => {
    // Check API Health
    try {
      const apiResponse = await fetch('/api/health')
      setStatus(prev => ({ 
        ...prev, 
        api: apiResponse.ok ? 'healthy' : 'error' 
      }))
    } catch {
      setStatus(prev => ({ ...prev, api: 'error' }))
    }

    // Check Database
    try {
      const dbResponse = await fetch('/api/test-db')
      const dbData = await dbResponse.json()
      setStatus(prev => ({ 
        ...prev, 
        database: dbResponse.ok ? 'connected' : 'disconnected' 
      }))
    } catch {
      setStatus(prev => ({ ...prev, database: 'disconnected' }))
    }

    // Check Environment
    try {
      const envResponse = await fetch('/api/check-env')
      const envData = await envResponse.json()
      const hasRequiredEnv = envData.environment?.MONGODB_URI === 'SET'
      setStatus(prev => ({ 
        ...prev, 
        environment: hasRequiredEnv ? 'configured' : 'missing' 
      }))
    } catch {
      setStatus(prev => ({ ...prev, environment: 'missing' }))
    }

    // Determine fallback status
    setStatus(prev => ({ 
      ...prev, 
      fallback: prev.database === 'disconnected' ? 'active' : 'inactive' 
    }))
  }

  const runComprehensiveTests = async () => {
    setIsRunningTests(true)
    setTests([])

    const testCases = [
      {
        name: 'API Health Check',
        endpoint: '/api/health',
        method: 'GET'
      },
      {
        name: 'Environment Variables',
        endpoint: '/api/check-env',
        method: 'GET'
      },
      {
        name: 'Database Connection',
        endpoint: '/api/test-db',
        method: 'GET'
      },
      {
        name: 'Fallback Signup',
        endpoint: '/api/auth/signup-fallback',
        method: 'POST',
        body: {
          name: 'Test User',
          email: `test-${Date.now()}@example.com`,
          password: 'password123',
          role: 'student',
          collegeName: 'Test College',
          branch: 'CSE',
          graduationYear: '2026'
        }
      },
      {
        name: 'User Authentication',
        endpoint: '/api/auth/user',
        method: 'GET'
      }
    ]

    for (const test of testCases) {
      setTests(prev => [...prev, {
        name: test.name,
        status: 'loading',
        message: 'Running...'
      }])

      try {
        const response = await fetch(test.endpoint, {
          method: test.method,
          headers: test.body ? { 'Content-Type': 'application/json' } : {},
          body: test.body ? JSON.stringify(test.body) : undefined
        })

        const data = await response.json()

        setTests(prev => prev.map(t => 
          t.name === test.name ? {
            ...t,
            status: response.ok ? 'success' : 'error',
            message: response.ok ? 'Success' : data.error || 'Failed',
            details: JSON.stringify(data, null, 2)
          } : t
        ))
      } catch (error) {
        setTests(prev => prev.map(t => 
          t.name === test.name ? {
            ...t,
            status: 'error',
            message: error instanceof Error ? error.message : 'Network error',
            details: error instanceof Error ? error.stack : 'Unknown error'
          } : t
        ))
      }

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setIsRunningTests(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
      case 'configured':
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
      case 'disconnected':
      case 'missing':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'active':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'healthy': 'default',
      'connected': 'default',
      'configured': 'default',
      'success': 'default',
      'error': 'destructive',
      'disconnected': 'destructive',
      'missing': 'destructive',
      'active': 'secondary',
      'inactive': 'outline',
      'loading': 'outline'
    }
    
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">CodeTrack System Status</h1>
          <p className="text-muted-foreground mt-2">
            Monitor the health and configuration of your CodeTrack platform
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Status</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getStatusIcon(status.api)}
                {getStatusBadge(status.api)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getStatusIcon(status.database)}
                {getStatusBadge(status.database)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Environment</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getStatusIcon(status.environment)}
                {getStatusBadge(status.environment)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fallback Mode</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getStatusIcon(status.fallback)}
                {getStatusBadge(status.fallback)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current configuration and operational mode
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Database Status</h4>
                <p className="text-sm text-muted-foreground">
                  {status.database === 'connected' 
                    ? 'MongoDB is connected and operational'
                    : 'MongoDB is not available. Using in-memory fallback storage.'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Authentication Mode</h4>
                <p className="text-sm text-muted-foreground">
                  {status.fallback === 'active'
                    ? 'Using fallback authentication (data resets on restart)'
                    : 'Using persistent database authentication'
                  }
                </p>
              </div>
            </div>
            
            {status.fallback === 'active' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">Fallback Mode Active</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  The system is running in fallback mode with in-memory storage. 
                  All data will be lost when the server restarts. 
                  Set up MongoDB to enable persistent storage.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Suite */}
        <Card>
          <CardHeader>
            <CardTitle>Comprehensive Tests</CardTitle>
            <CardDescription>
              Run a full test suite to verify all system components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={runComprehensiveTests} 
              disabled={isRunningTests}
              className="w-full"
            >
              {isRunningTests ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Tests...
                </>
              ) : (
                'Run Comprehensive Tests'
              )}
            </Button>

            {tests.length > 0 && (
              <div className="space-y-2">
                {tests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-muted-foreground">{test.message}</p>
                      </div>
                    </div>
                    {getStatusBadge(test.status)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" asChild>
                <a href="/signup-demo">Try Demo Signup</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/test-auth">Debug Tools</a>
              </Button>
              <Button variant="outline" onClick={checkSystemStatus}>
                Refresh Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}