import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, TrendingUp, Clock, Play, Settings } from "lucide-react"
import Link from "next/link"

export default function ReviewPage() {
  const reviewStats = {
    dueToday: 12,
    dueThisWeek: 45,
    totalCards: 156,
    averageRetention: 87,
  }

  const subjects = [
    { name: "Mathematics", dueCards: 8, totalCards: 45, color: "bg-primary" },
    { name: "Science", dueCards: 3, totalCards: 32, color: "bg-secondary" },
    { name: "History", dueCards: 1, totalCards: 28, color: "bg-accent" },
    { name: "Literature", dueCards: 0, totalCards: 51, color: "bg-chart-3" },
  ]

  const upcomingReviews = [
    { date: "Today", cards: 12, subjects: ["Math", "Science"] },
    { date: "Tomorrow", cards: 8, subjects: ["History"] },
    { date: "Dec 18", cards: 15, subjects: ["Math", "Literature"] },
    { date: "Dec 20", cards: 10, subjects: ["Science", "History"] },
  ]

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Smart Review</h1>
            <p className="text-muted-foreground">Spaced repetition learning system</p>
          </div>
          <Button variant="outline" className="bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Due Today</span>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold text-primary">{reviewStats.dueToday}</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">This Week</span>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">{reviewStats.dueThisWeek}</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Cards</span>
              <Brain className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">{reviewStats.totalCards}</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Retention</span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold text-accent">{reviewStats.averageRetention}%</div>
          </Card>
        </div>

        {/* Start Review CTA */}
        {reviewStats.dueToday > 0 && (
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ready to review?</h2>
                <p className="text-muted-foreground">
                  You have {reviewStats.dueToday} cards due today. Start your review session now!
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/review/session">
                  <Play className="w-5 h-5 mr-2" />
                  Start Review
                </Link>
              </Button>
            </div>
          </Card>
        )}

        {/* Subject Breakdown */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Review by Subject</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <Card key={subject.name} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${subject.color}/10 rounded-lg flex items-center justify-center`}>
                      <Brain className={`w-6 h-6 ${subject.color.replace("bg-", "text-")}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">{subject.totalCards} total cards</p>
                    </div>
                  </div>
                  {subject.dueCards > 0 && (
                    <Badge variant="default" className="bg-primary">
                      {subject.dueCards} due
                    </Badge>
                  )}
                </div>

                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div
                    className={`${subject.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(subject.dueCards / subject.totalCards) * 100}%` }}
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  disabled={subject.dueCards === 0}
                  asChild={subject.dueCards > 0}
                >
                  {subject.dueCards > 0 ? (
                    <Link href={`/review/session?subject=${subject.name.toLowerCase()}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Review {subject.name}
                    </Link>
                  ) : (
                    <>No cards due</>
                  )}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Reviews */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Reviews</h2>
          <Card className="p-6 bg-card border-border">
            <div className="space-y-4">
              {upcomingReviews.map((review, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{review.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.cards} cards · {review.subjects.join(", ")}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{review.cards}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
