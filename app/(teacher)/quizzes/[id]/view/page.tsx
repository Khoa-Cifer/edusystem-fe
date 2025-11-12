"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Trash, Clock, Target } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { QuizApi } from "@/axios/quiz"

export default function ViewQuizPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.id as string
  const [loading, setLoading] = useState(true)
  const [quiz, setQuiz] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchQuiz()
  }, [quizId])

  const fetchQuiz = async () => {
    try {
      setLoading(true)
      
      const data = await QuizApi.getQuizById(quizId)

      if (data.isSuccess && data.result) {
        setQuiz(data.result)
      } else {
        toast.error(data.message || "Failed to load quiz")
        router.push("/quizzes")
      }
    } catch (error: any) {
      console.error("Error fetching quiz:", error)
      toast.error(error.response?.data?.message || "Failed to load quiz")
      router.push("/quizzes")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz? This action cannot be undone."
    )

    if (!confirmed) return

    setDeleting(true)
    try {
      const data = await QuizApi.deleteQuiz(quizId)

      if (data.isSuccess) {
        toast.success(data.message || "Quiz deleted successfully")
        router.push("/quizzes")
      } else {
        toast.error(data.message || "Failed to delete quiz")
      }
    } catch (error: any) {
      console.error("Error deleting quiz:", error)
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the quiz"
      )
    } finally {
      setDeleting(false)
    }
  }

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      easy: "bg-green-500/20 text-green-400 border-green-500/30",
      medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      hard: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return colors[level.toLowerCase()] || "bg-muted/10 text-muted-foreground border-muted/20"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading quiz...</p>
      </div>
    )
  }

  if (!quiz) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/quizzes">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Quiz Details</h1>
            <p className="text-sm text-muted-foreground">
              View quiz information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/quizzes/${quizId}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Quiz
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            <Trash className="w-4 h-4 mr-2" />
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {/* Quiz Information */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Quiz Name
              </h3>
              <p className="text-lg font-semibold">{quiz.quizName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Quiz ID
              </h3>
              <p className="text-sm font-mono text-muted-foreground">
                {quiz.quizId}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                English Level
              </h3>
              <Badge
                variant="outline"
                className={getLevelBadge(quiz.englishLevel)}
              >
                {quiz.englishLevel}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Skill Level
              </h3>
              <Badge
                variant="outline"
                className={getLevelBadge(quiz.skill)}
              >
                {quiz.skill}
              </Badge>
            </div>

            {quiz.teacherName && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Teacher
                </h3>
                <p className="text-sm">{quiz.teacherName}</p>
              </div>
            )}
          </div>

          {quiz.description && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h3>
              <p className="text-sm leading-relaxed">
                {quiz.description}
              </p>
            </div>
          )}

          {/* Quiz Configuration */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Quiz Configuration
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="text-xl font-bold">{quiz.duration} minutes</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Passing Score</div>
                    <div className="text-xl font-bold">{quiz.passingScore}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
