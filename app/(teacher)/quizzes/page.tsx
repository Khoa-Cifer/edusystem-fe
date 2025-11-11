import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Clock, Users, BarChart3, Play } from "lucide-react";
import Link from "next/link";

export default function QuizzesPage() {
  const quizzes = [
    {
      id: 1,
      title: "Chapter 5: Algebra Basics",
      subject: "Mathematics",
      questions: 20,
      duration: 45,
      students: 45,
      avgScore: 87,
      status: "Active",
      dueDate: "Dec 20, 2025",
    },
    {
      id: 2,
      title: "Midterm Review",
      subject: "Science",
      questions: 35,
      duration: 60,
      students: 52,
      avgScore: 82,
      status: "Active",
      dueDate: "Dec 25, 2025",
    },
    {
      id: 3,
      title: "Geometry Quiz 3",
      subject: "Mathematics",
      questions: 15,
      duration: 30,
      students: 48,
      avgScore: 91,
      status: "Completed",
      dueDate: "Dec 10, 2025",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quizzes</h1>
          <p className="text-muted-foreground">
            Create and manage your quizzes
          </p>
        </div>
        <Button asChild>
          <Link href="/quizzes/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Quiz
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 bg-card border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes..."
            className="pl-9 bg-background"
          />
        </div>
      </Card>

      {/* Quizzes List */}
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="p-6 bg-card border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {quiz.subject}
                    </Badge>
                  </div>
                  <Badge
                    variant={quiz.status === "Active" ? "default" : "outline"}
                    className={quiz.status === "Active" ? "bg-accent" : ""}
                  >
                    {quiz.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{quiz.questions}</div>
                      <div className="text-xs text-muted-foreground">
                        Questions
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium">{quiz.duration} min</div>
                      <div className="text-xs text-muted-foreground">
                        Duration
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">{quiz.students}</div>
                      <div className="text-xs text-muted-foreground">
                        Students
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 bg-chart-3/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-chart-3" />
                    </div>
                    <div>
                      <div className="font-medium">{quiz.avgScore}%</div>
                      <div className="text-xs text-muted-foreground">
                        Avg Score
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                  Due: {quiz.dueDate}
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href={`/quizzes/${quiz.id}`}>View</Link>
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Results
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
