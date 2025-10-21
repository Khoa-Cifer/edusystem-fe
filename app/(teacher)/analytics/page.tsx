import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Target, Award, AlertCircle } from "lucide-react"
import { AnalyticsChart } from "@/components/analytics-chart"
import { StudentPerformanceTable } from "@/components/student-performance-table"

export default function AnalyticsPage() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track student progress and performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="math-9">Math Grade 9</SelectItem>
                <SelectItem value="math-10">Math Grade 10</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30">
              <SelectTrigger className="w-[140px] bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Average Score</span>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">84.5%</div>
            <div className="flex items-center gap-1 text-sm text-accent">
              <TrendingUp className="w-4 h-4" />
              <span>+3.2% from last month</span>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Completion Rate</span>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">92%</div>
            <div className="flex items-center gap-1 text-sm text-accent">
              <TrendingUp className="w-4 h-4" />
              <span>+5% from last month</span>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Active Students</span>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">248</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Out of 268 total</span>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">At Risk</span>
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">12</div>
            <div className="flex items-center gap-1 text-sm text-destructive">
              <TrendingDown className="w-4 h-4" />
              <span>Below 60% average</span>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Performance Trends</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="difficulty">Question Difficulty</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-6">Average Score Over Time</h3>
              <AnalyticsChart type="line" />
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold mb-6">Score Distribution</h3>
                <AnalyticsChart type="bar" />
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold mb-6">Subject Performance</h3>
                <div className="space-y-4">
                  {[
                    { subject: "Mathematics", score: 87, change: 3 },
                    { subject: "Science", score: 84, change: -1 },
                    { subject: "History", score: 89, change: 5 },
                    { subject: "Literature", score: 82, change: 2 },
                  ].map((item) => (
                    <div key={item.subject} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.subject}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{item.score}%</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${item.change >= 0 ? "text-accent border-accent" : "text-destructive border-destructive"}`}
                          >
                            {item.change >= 0 ? "+" : ""}
                            {item.change}%
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-6">Daily Active Students</h3>
              <AnalyticsChart type="area" />
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold mb-6">Study Time by Day</h3>
                <AnalyticsChart type="bar" />
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold mb-6">Quiz Completion Rate</h3>
                <div className="flex items-center justify-center h-[200px]">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">92%</div>
                    <p className="text-muted-foreground">Average completion rate</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="difficulty" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-6">Question Success Rate by Difficulty</h3>
              <AnalyticsChart type="bar" />
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-6">Most Challenging Questions</h3>
              <div className="space-y-3">
                {[
                  { question: "Solve the quadratic equation: x² + 5x + 6 = 0", successRate: 45, attempts: 89 },
                  { question: "Explain the process of photosynthesis", successRate: 52, attempts: 76 },
                  { question: "What year did World War II end?", successRate: 58, attempts: 102 },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="font-medium line-clamp-2 flex-1">{item.question}</p>
                      <Badge
                        variant="outline"
                        className={
                          item.successRate < 50
                            ? "text-destructive border-destructive"
                            : item.successRate < 70
                              ? "text-chart-3 border-chart-3"
                              : "text-accent border-accent"
                        }
                      >
                        {item.successRate}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.attempts} attempts</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Student Performance Table */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-6">Student Performance</h3>
          <StudentPerformanceTable />
        </Card>
      </div>
    </DashboardLayout>
  )
}
