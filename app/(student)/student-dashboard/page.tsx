import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, BookOpen, Target, TrendingUp, Play, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Emma Wilson</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Average Score</span>
              <Target className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-accent mt-1">+5% this month</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Quizzes Completed</span>
              <Award className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-primary mt-1">3 pending</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Cards Due Today</span>
              <Brain className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-secondary mt-1">45 this week</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Study Streak</span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-accent mt-1">days in a row</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-auto p-6 flex flex-col items-start gap-2 hover:border-primary bg-transparent"
            >
              <Link href="/(student)/review">
                <Brain className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Start Review</div>
                  <div className="text-xs text-muted-foreground">12 cards due</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto p-6 flex flex-col items-start gap-2 hover:border-secondary bg-transparent"
            >
              <Link href="/(student)/dashboard">
                <BookOpen className="w-6 h-6 text-secondary" />
                <div className="text-left">
                  <div className="font-semibold">My Assignments</div>
                  <div className="text-xs text-muted-foreground">3 pending</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto p-6 flex flex-col items-start gap-2 hover:border-accent bg-transparent"
            >
              <Link href="/(student)/dashboard">
                <TrendingUp className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <div className="font-semibold">View Progress</div>
                  <div className="text-xs text-muted-foreground">Your stats</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>

        {/* Pending Assignments & Reviews */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Pending Assignments</h3>
            <div className="space-y-4">
              {[
                { title: "Chapter 5: Algebra Quiz", subject: "Mathematics", dueDate: "Dec 20", status: "Due Soon" },
                { title: "Midterm Review", subject: "Science", dueDate: "Dec 25", status: "In Progress" },
                { title: "Essay: World War II", subject: "History", dueDate: "Dec 22", status: "Not Started" },
              ].map((assignment, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-muted-foreground">{assignment.subject}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {assignment.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Review Schedule</h3>
            <div className="space-y-4">
              {[
                { date: "Today", cards: 12, subjects: ["Math", "Science"], icon: "🎯" },
                { date: "Tomorrow", cards: 8, subjects: ["History"], icon: "📅" },
                { date: "Dec 18", cards: 15, subjects: ["Math", "Literature"], icon: "📚" },
              ].map((review, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                      {review.icon}
                    </div>
                    <div>
                      <div className="font-medium">{review.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.cards} cards · {review.subjects.join(", ")}
                      </div>
                    </div>
                  </div>
                  {review.date === "Today" && (
                    <Button size="sm" asChild>
                      <Link href="/(student)/review">
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-6">Performance by Subject</h3>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", score: 89, trend: "+3%" },
              { subject: "Science", score: 85, trend: "+2%" },
              { subject: "History", score: 88, trend: "+5%" },
              { subject: "Literature", score: 84, trend: "-1%" },
            ].map((item) => (
              <div key={item.subject} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.score}%</span>
                    <span className={`text-xs ${item.trend.startsWith("+") ? "text-accent" : "text-destructive"}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
