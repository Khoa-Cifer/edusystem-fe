"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  Edit,
  Trash,
  Clock,
  Target,
  Plus,
  Check,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { QuizApi } from "@/axios/quiz"
import { QuizQuestionApi } from "@/axios/quiz-question"
import { QuestionApi } from "@/axios/question"
import { Question } from "@/interfaces/question"

export default function ViewQuizPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.id as string
  const [loading, setLoading] = useState(true)
  const [quiz, setQuiz] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([])
  const [availableQuestionsLoading, setAvailableQuestionsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("")
  const [addingQuestion, setAddingQuestion] = useState(false)
  const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(null)

  useEffect(() => {
    fetchQuiz()
    fetchQuizQuestions()
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

  const fetchQuizQuestions = async () => {
    try {
      setQuestionsLoading(true)
      const response = await QuizQuestionApi.getQuizQuestions(quizId)
      if (response.isSuccess && response.result) {
        // Handle both array response and nested result
        const questions = Array.isArray(response.result) 
          ? response.result 
          : (Array.isArray(response.result.data) ? response.result.data : [])
        setQuizQuestions(questions)
      }
    } catch (error: any) {
      console.error("Error fetching quiz questions:", error)
      toast.error(error.response?.data?.message || "Failed to load quiz questions")
    } finally {
      setQuestionsLoading(false)
    }
  }

  const fetchAvailableQuestions = async () => {
    try {
      setAvailableQuestionsLoading(true)
      const response = await QuestionApi.getQuestions({
        pageNumber: 1,
        pageSize: 100,
      })
      if (response.isSuccess && response.result) {
        // Filter out questions that are already in the quiz
        const existingQuestionIds = new Set(
          quizQuestions.map((q) => q.questionId)
        )
        const filtered = response.result.data.filter(
          (q: Question) => !existingQuestionIds.has(q.questionId)
        )
        setAvailableQuestions(filtered)
      }
    } catch (error: any) {
      console.error("Error fetching available questions:", error)
      toast.error(error.response?.data?.message || "Failed to load available questions")
    } finally {
      setAvailableQuestionsLoading(false)
    }
  }

  const handleAddQuestion = async () => {
    if (!selectedQuestionId) {
      toast.error("Please select a question")
      return
    }

    setAddingQuestion(true)
    try {
      // Get the next order number
      const nextOrder = quizQuestions.length + 1
      const response = await QuizQuestionApi.createQuizQuestions(
        quizId,
        selectedQuestionId,
        nextOrder
      )

      if (response.isSuccess) {
        toast.success("Question added to quiz successfully")
        setIsAddDialogOpen(false)
        setSelectedQuestionId("")
        fetchQuizQuestions()
      } else {
        toast.error(response.message || "Failed to add question to quiz")
      }
    } catch (error: any) {
      console.error("Error adding question:", error)
      toast.error(error.response?.data?.message || "Failed to add question to quiz")
    } finally {
      setAddingQuestion(false)
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this question from the quiz?"
    )

    if (!confirmed) return

    setDeletingQuestionId(questionId)
    try {
      // Try deleting by quiz and question combination first
      let response
      try {
        response = await QuizQuestionApi.deleteQuizQuestionByQuizAndQuestion(quizId, questionId)
      } catch (error: any) {
        // If that endpoint doesn't exist, try with just questionId
        // (assuming backend might use questionId as quizQuestionId)
        response = await QuizQuestionApi.deleteQuizQuestion(questionId)
      }

      if (response.isSuccess) {
        toast.success("Question removed from quiz successfully")
        fetchQuizQuestions()
      } else {
        toast.error(response.message || "Failed to remove question from quiz")
      }
    } catch (error: any) {
      console.error("Error deleting question:", error)
      toast.error(error.response?.data?.message || "Failed to remove question from quiz")
    } finally {
      setDeletingQuestionId(null)
    }
  }

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true)
    fetchAvailableQuestions()
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

      {/* Quiz Questions Section */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Quiz Questions</h3>
            <p className="text-sm text-muted-foreground">
              Manage questions in this quiz ({quizQuestions.length} questions)
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Question to Quiz</DialogTitle>
                <DialogDescription>
                  Select a question to add to this quiz
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {availableQuestionsLoading ? (
                  <p className="text-sm text-muted-foreground">Loading questions...</p>
                ) : availableQuestions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No available questions to add. All questions may already be in this quiz.
                  </p>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto space-y-2">
                    {availableQuestions.map((question) => (
                      <Card
                        key={question.questionId}
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedQuestionId === question.questionId
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedQuestionId(question.questionId)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className={getLevelBadge(question.level)}
                              >
                                {question.level}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {question.questionType}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {question.skillType}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium mb-1 line-clamp-2">
                              {question.content}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Score: {question.score} | English Level: {question.englishLevel}
                            </p>
                          </div>
                          {selectedQuestionId === question.questionId && (
                            <div className="ml-2">
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={addingQuestion}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddQuestion} disabled={addingQuestion || !selectedQuestionId}>
                  {addingQuestion ? "Adding..." : "Add Question"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {questionsLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading questions...
          </div>
        ) : quizQuestions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No questions in this quiz yet. Click "Add Question" to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {quizQuestions.map((quizQuestion, index) => {
              return (
                <Card
                  key={quizQuestion.questionId || `${quizQuestion.quizId}-${quizQuestion.questionId}`}
                  className="p-4 bg-muted/30 border-border"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          #{quizQuestion.questionOrder || index + 1}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {quizQuestion.questionType}
                        </Badge>
                        {quizQuestion.status && (
                          <Badge 
                            variant="outline" 
                            className={quizQuestion.status === "1" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-muted/10 text-muted-foreground border-muted/20"}
                          >
                            {quizQuestion.status === "1" ? "Active" : "Inactive"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium mb-1">
                        {quizQuestion.questionText}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {quizQuestion.createdBy && (
                          <>
                            <span>Created by: {quizQuestion.createdBy}</span>
                            {quizQuestion.createdTime && <span>·</span>}
                          </>
                        )}
                        {quizQuestion.createdTime && (
                          <span>
                            {new Date(quizQuestion.createdTime).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteQuestion(quizQuestion.questionId)}
                      disabled={deletingQuestionId === quizQuestion.questionId}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
