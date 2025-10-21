import { AdminLayout } from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, UserPlus } from "lucide-react"

export default function SystemActivity() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">System Activity</h1>
          <p className="text-muted-foreground">Real-time monitoring of platform activities</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Timeline */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-6">Recent System Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    type: "user_login",
                    user: "Emma Davis",
                    action: "logged in",
                    time: "2 minutes ago",
                    icon: CheckCircle,
                    color: "text-accent",
                  },
                  {
                    type: "quiz_created",
                    user: "Dr. Emily Chen",
                    action: "created a new quiz",
                    time: "15 minutes ago",
                    icon: CheckCircle,
                    color: "text-primary",
                  },
                  {
                    type: "user_registered",
                    user: "New Student",
                    action: "registered an account",
                    time: "1 hour ago",
                    icon: UserPlus,
                    color: "text-secondary",
                  },
                  {
                    type: "lesson_shared",
                    user: "James Wilson",
                    action: "shared a lesson plan",
                    time: "3 hours ago",
                    icon: CheckCircle,
                    color: "text-accent",
                  },
                  {
                    type: "system_alert",
                    user: "System",
                    action: "database backup completed",
                    time: "5 hours ago",
                    icon: Clock,
                    color: "text-chart-3",
                  },
                ].map((activity, i) => {
                  const Icon = activity.icon
                  return (
                    <div key={i} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className={`mt-1 ${activity.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          <span className="text-muted-foreground"> {activity.action}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Activity Stats */}
          <div className="space-y-4">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">New Users</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Quizzes Taken</span>
                    <span className="font-semibold">48</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: "80%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Lessons Created</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "40%" }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Server</span>
                  <Badge className="bg-accent/10 text-accent border-accent/20">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <Badge className="bg-accent/10 text-accent border-accent/20">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Storage</span>
                  <Badge className="bg-accent/10 text-accent border-accent/20">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email Service</span>
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">Warning</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
