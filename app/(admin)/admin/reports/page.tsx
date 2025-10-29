import { AdminLayout } from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Reports() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Platform performance and engagement metrics</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">This Month</span>
                  <span className="text-2xl font-bold">+48</span>
                </div>
                <p className="text-xs text-accent">+12% from last month</p>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Teachers</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students</span>
                  <span className="font-semibold">1,092</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Platform Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Avg. Daily Active Users</span>
                  <span className="text-2xl font-bold">342</span>
                </div>
                <p className="text-xs text-accent">+8% from last week</p>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Total Quizzes</span>
                  <span className="font-semibold">284</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Lessons</span>
                  <span className="font-semibold">412</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-6">Engagement Metrics</h3>
          <div className="space-y-4">
            {[
              { metric: "Quiz Completion Rate", value: "92%", trend: "+3%" },
              { metric: "Lesson View Rate", value: "87%", trend: "+5%" },
              { metric: "Review Session Participation", value: "78%", trend: "+2%" },
              { metric: "Average Session Duration", value: "24 min", trend: "+4 min" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <span className="font-medium">{item.metric}</span>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">{item.value}</span>
                  <Badge variant="outline" className="text-accent border-accent">
                    {item.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
