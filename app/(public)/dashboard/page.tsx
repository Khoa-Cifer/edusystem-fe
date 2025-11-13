import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, FileQuestion, BarChart3, Plus, Clock, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Students</span>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">248</div>
            <p className="text-xs text-accent mt-1">+12 this month</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Quizzes</span>
              <FileQuestion className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">18</div>
            <p className="text-xs text-primary mt-1">5 due this week</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Avg. Score</span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">84%</div>
            <p className="text-xs text-accent mt-1">+3% from last month</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Lesson Plans</span>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">12 shared</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-auto p-6 flex flex-col items-start gap-2 hover:border-primary bg-transparent"
            >
              <Link href="/lessons/new">
                <BookOpen className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Create Lesson</div>
                  <div className="text-xs text-muted-foreground">Plan a new lesson</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto p-6 flex flex-col items-start gap-2 hover:border-secondary bg-transparent"
            >
              <Link href="/quizzes/new">
                <FileQuestion className="w-6 h-6 text-secondary" />
                <div className="text-left">
                  <div className="font-semibold">Create Quiz</div>
                  <div className="text-xs text-muted-foreground">Build a new quiz</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto p-6 flex flex-col items-start gap-2 hover:border-accent bg-transparent"
            >
              <Link href="/questions/new">
                <Plus className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <div className="font-semibold">Add Question</div>
                  <div className="text-xs text-muted-foreground">To question bank</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto p-6 flex flex-col items-start gap-2 hover:border-chart-3 bg-transparent"
            >
              <Link href="/analytics">
                <BarChart3 className="w-6 h-6 text-chart-3" />
                <div className="text-left">
                  <div className="font-semibold">View Analytics</div>
                  <div className="text-xs text-muted-foreground">Student progress</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Recent Quizzes</h3>
            <div className="space-y-4">
              {[
                { title: "Chapter 5: Algebra Basics", students: 45, avgScore: 87, dueDate: "2 days" },
                { title: "Midterm Review", students: 52, avgScore: 82, dueDate: "5 days" },
                { title: "Geometry Quiz 3", students: 48, avgScore: 91, dueDate: "Completed" },
              ].map((quiz, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium">{quiz.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {quiz.students} students · Avg: {quiz.avgScore}%
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {quiz.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Upcoming Reviews</h3>
            <div className="space-y-4">
              {[
                { student: "Emma Wilson", topic: "Quadratic Equations", cards: 12, due: "Today" },
                { student: "James Chen", topic: "Trigonometry", cards: 8, due: "Tomorrow" },
                { student: "Sarah Johnson", topic: "Calculus Basics", cards: 15, due: "In 2 days" },
              ].map((review, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{review.student}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.topic} · {review.cards} cards
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{review.due}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
