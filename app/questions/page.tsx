import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreVertical, Edit, Trash } from "lucide-react"
import Link from "next/link"

export default function QuestionsPage() {
  const questions = [
    {
      id: 1,
      type: "MCQ",
      question: "What is the derivative of x²?",
      subject: "Mathematics",
      topic: "Calculus",
      difficulty: "Medium",
      usedIn: 3,
    },
    {
      id: 2,
      type: "True/False",
      question: "Photosynthesis occurs in the mitochondria.",
      subject: "Biology",
      topic: "Cell Biology",
      difficulty: "Easy",
      usedIn: 5,
    },
    {
      id: 3,
      type: "Short Answer",
      question: "Explain the water cycle in 2-3 sentences.",
      subject: "Science",
      topic: "Earth Science",
      difficulty: "Medium",
      usedIn: 2,
    },
    {
      id: 4,
      type: "MCQ",
      question: "Which year did World War II end?",
      subject: "History",
      topic: "Modern History",
      difficulty: "Easy",
      usedIn: 8,
    },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Question Bank</h1>
            <p className="text-muted-foreground">Manage your question library</p>
          </div>
          <Button asChild>
            <Link href="/questions/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-card border-border">
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Total Questions</div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">MCQ</div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-2xl font-bold">42</div>
            <div className="text-sm text-muted-foreground">True/False</div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-2xl font-bold">25</div>
            <div className="text-sm text-muted-foreground">Short Answer</div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 bg-card border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search questions..." className="pl-9 bg-background" />
            </div>
            <Button variant="outline" className="bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Questions List */}
        <div className="space-y-3">
          {questions.map((question) => (
            <Card key={question.id} className="p-5 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        question.type === "MCQ" ? "default" : question.type === "True/False" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {question.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        question.difficulty === "Easy"
                          ? "border-accent text-accent"
                          : question.difficulty === "Medium"
                            ? "border-chart-3 text-chart-3"
                            : "border-destructive text-destructive"
                      }`}
                    >
                      {question.difficulty}
                    </Badge>
                  </div>

                  <p className="font-medium mb-2 line-clamp-2">{question.question}</p>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>{question.subject}</span>
                    <span>·</span>
                    <span>{question.topic}</span>
                    <span>·</span>
                    <span>Used in {question.usedIn} quizzes</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
