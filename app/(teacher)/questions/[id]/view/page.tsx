"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Plus, Trash, Check, X } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { QuestionApi } from "@/axios/question"
import { AnswerApi } from "@/axios/answer"

export default function ViewQuestionPage() {
  const params = useParams()
  const router = useRouter()
  const questionId = params.id as string
  const [loading, setLoading] = useState(true)
  const [question, setQuestion] = useState<any>(null)
  const [answers, setAnswers] = useState<any[]>([])
  const [answersLoading, setAnswersLoading] = useState(true)
  const [deletingAnswerId, setDeletingAnswerId] = useState<string | null>(null)

  useEffect(() => {
    fetchQuestion()
    fetchAnswers()
  }, [questionId])

  const fetchQuestion = async () => {
    try {
      setLoading(true)
      
      const data = await QuestionApi.getQuestionById(questionId)

      if (data.isSuccess && data.result) {
        setQuestion(data.result)
      } else {
        toast.error(data.message || "Failed to load question")
        router.push("/questions")
      }
    } catch (error: any) {
      console.error("Error fetching question:", error)
      toast.error(error.response?.data?.message || "Failed to load question")
      router.push("/questions")
    } finally {
      setLoading(false)
    }
  }

  const fetchAnswers = async () => {
    try {
      setAnswersLoading(true)
      
      const data = await AnswerApi.getAnswersByQuestionId(questionId)

      if (data.isSuccess && data.result) {
        setAnswers(data.result)
      }
    } catch (error: any) {
      console.error("Error fetching answers:", error)
      toast.error(error.response?.data?.message || "Failed to load answers")
    } finally {
      setAnswersLoading(false)
    }
  }

  const handleDeleteAnswer = async (answerId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this answer? This action cannot be undone."
    )

    if (!confirmed) return

    setDeletingAnswerId(answerId)
    try {
      const data = await AnswerApi.deleteAnswer(answerId)

      if (data.isSuccess) {
        toast.success(data.message || "Answer deleted successfully")
        fetchAnswers()
      } else {
        toast.error(data.message || "Failed to delete answer")
      }
    } catch (error: any) {
      console.error("Error deleting answer:", error)
      toast.error(error.response?.data?.message || "An error occurred while deleting the answer")
    } finally {
      setDeletingAnswerId(null)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading question...</p>
      </div>
    )
  }

  if (!question) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/questions">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Question Details</h1>
            <p className="text-sm text-muted-foreground">
              View question information
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/questions/${questionId}`}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Question
          </Link>
        </Button>
      </div>

      {/* Question Info */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Question Content
            </h3>
            <p className="text-lg">{question.content}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Question Type
              </h3>
              <Badge>{question.questionType}</Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Difficulty Level
              </h3>
              <Badge variant="outline">{question.level}</Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Skill Type
              </h3>
              <p>{question.skillType}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                English Level
              </h3>
              <p>{question.englishLevel}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Score
              </h3>
              <p>{question.score} points</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h3>
              <Badge variant={question.status === "1" ? "default" : "secondary"}>
                {question.status === "1" ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created by: </span>
                <span className="font-medium">{question.createdBy}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created at: </span>
                <span>{formatDate(question.createdTime)}</span>
              </div>
              {question.updatedBy && (
                <>
                  <div>
                    <span className="text-muted-foreground">Updated by: </span>
                    <span className="font-medium">{question.updatedBy}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated at: </span>
                    <span>{formatDate(question.updatedTime)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Answers Section */}
      <Card className="p-6 bg-card border-border">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Answers</h2>
            <p className="text-sm text-muted-foreground">
              Answer options for this question ({answers.length} answers)
            </p>
          </div>
          <Button asChild>
            <Link href={`/questions/${questionId}/add-answer`}>
              <Plus className="w-4 h-4 mr-2" />
              Add Answer
            </Link>
          </Button>
        </div>

        {answersLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading answers...</p>
          </div>
        ) : answers.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">No answers found for this question</p>
          </div>
        ) : (
          <div className="space-y-3">
            {answers.map((answer) => (
              <Card
                key={answer.answerId}
                className="p-4 bg-background border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {answer.isCorrect ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <Check className="w-3 h-3 mr-1" />
                          Correct Answer
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          <X className="w-3 h-3 mr-1" />
                          Incorrect
                        </Badge>
                      )}
                      {answer.status === "1" ? (
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </div>

                    <p className="font-medium mb-2">{answer.content}</p>

                    {answer.explanation && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Explanation:</span> {answer.explanation}
                      </p>
                    )}

                    <div className="mt-2 text-xs text-muted-foreground">
                      Created by {answer.createdBy} • {new Date(answer.createdTime).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/answers/${answer.answerId}`}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAnswer(answer.answerId)}
                      disabled={deletingAnswerId === answer.answerId}
                    >
                      <Trash className="w-4 h-4 mr-1 text-destructive" />
                      {deletingAnswerId === answer.answerId ? "..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
