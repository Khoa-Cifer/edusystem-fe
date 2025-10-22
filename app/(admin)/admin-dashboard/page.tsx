import { AdminLayout } from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Activity, AlertCircle, Download, CheckCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and quick stats</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Total Users</span>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">1,248</div>
            <div className="flex items-center gap-1 text-sm text-accent">
              <TrendingUp className="w-4 h-4" />
              <span>+48 this month</span>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Active Sessions</span>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">342</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Currently online</span>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">System Health</span>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">99.8%</div>
            <div className="flex items-center gap-1 text-sm text-accent">
              <span>Uptime</span>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Pending Issues</span>
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">3</div>
            <div className="flex items-center gap-1 text-sm text-destructive">
              <span>Require attention</span>
            </div>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Activity className="w-4 h-4 mr-2" />
                View System Activity
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <AlertCircle className="w-4 h-4 mr-2" />
                Review Pending Issues
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Server</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-accent">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-accent">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-accent">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email Service</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full" />
                  <span className="text-sm text-destructive">Warning</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
