"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { AnswerApi } from "@/axios/answer"

interface AnswerFormProps {
  answerId?: string
  questionId?: string
}

export function AnswerForm({ answerId, questionId }: AnswerFormProps) {
  const router = useRouter()
  const isEditMode = !!answerId
  const [loading, setLoading] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(questionId || "")
  const [formData, setFormData] = useState({
    content: "",
    isCorrect: false,
    explanation: "",
  })

  useEffect(() => {
    if (isEditMode) {
      fetchAnswerData()
    }
  }, [answerId])

  const fetchAnswerData = async () => {
    try {
      setLoading(true)
      
      const data = await AnswerApi.getAnswerById(answerId!)

      if (data.isSuccess && data.result) {
        const answer = data.result
        setCurrentQuestionId(answer.questionId)
        setFormData({
          content: answer.content || "",
          isCorrect: answer.isCorrect || false,
          explanation: answer.explanation || "",
        })
      } else {
        toast.error(data.message || "Failed to load answer")
        router.back()
      }
    } catch (error: any) {
      console.error("Error fetching answer:", error)
      toast.error(error.response?.data?.message || "Failed to load answer")
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAnswer = async () => {
    // Validation
    if (!formData.content.trim()) {
      toast.error("Please enter answer content")
      return
    }

    setLoading(true)

    try {
      let data;
      
      if (isEditMode) {
        const requestBody = {
          answerId: answerId!,
          content: formData.content,
          isCorrect: formData.isCorrect,
          explanation: formData.explanation,
        }
        data = await AnswerApi.updateAnswer(answerId!, requestBody)
      } else {
        const requestBody = {
          questionId: currentQuestionId,
          content: formData.content,
          isCorrect: formData.isCorrect,
          explanation: formData.explanation,
        }
        data = await AnswerApi.createAnswer(requestBody)
      }

      if (data.isSuccess) {
        toast.success(
          data.message ||
            `Answer ${isEditMode ? "updated" : "created"} successfully`
        )
        router.push(`/questions/${currentQuestionId}/view`)
      } else {
        toast.error(
          data.message || `Failed to ${isEditMode ? "update" : "create"} answer`
        )
      }
    } catch (error: any) {
      console.error("Error saving answer:", error)
      toast.error(error.response?.data?.message || "An error occurred while saving the answer")
    } finally {
      setLoading(false)
    }
  }

  if (isEditMode && loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading answer...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditMode ? "Edit Answer" : "Add Answer"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode
                ? "Update answer details"
                : "Create a new answer option"}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveAnswer} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditMode ? "Update Answer" : "Create Answer"}
        </Button>
      </div>

      {/* Form */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Answer Content *</Label>
            <Textarea
              id="content"
              placeholder="Enter answer content..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="bg-background min-h-[100px] resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isCorrect"
              checked={formData.isCorrect}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isCorrect: checked as boolean })
              }
            />
            <Label
              htmlFor="isCorrect"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              This is the correct answer
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation (Optional)</Label>
            <Textarea
              id="explanation"
              placeholder="Explain why this answer is correct/incorrect..."
              value={formData.explanation}
              onChange={(e) =>
                setFormData({ ...formData, explanation: e.target.value })
              }
              className="bg-background min-h-[100px] resize-none"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
