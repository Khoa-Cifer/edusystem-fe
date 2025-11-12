"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { QuizApi } from "@/axios/quiz"
import { MatrixApi } from "@/axios/matrix"

interface QuizFormProps {
  quizId?: string
}

export function QuizForm({ quizId }: QuizFormProps) {
  const router = useRouter()
  const isEditMode = !!quizId
  const [loading, setLoading] = useState(false)
  const [matrices, setMatrices] = useState<any[]>([])
  const [formData, setFormData] = useState({
    matrixId: "",
    quizName: "",
    englishLevel: "Easy",
    skill: "Easy",
    description: "",
    duration: 30,
    passingScore: 5,
  })

  useEffect(() => {
    fetchMatrices()
    if (isEditMode) {
      fetchQuizData()
    }
  }, [quizId])

  const fetchMatrices = async () => {
    try {
      const data = await MatrixApi.getMatrices({ pageNumber: 1, pageSize: 100 })
      if (data.isSuccess && data.result) {
        setMatrices(data.result.data)
      }
    } catch (error) {
      console.error("Error fetching matrices:", error)
    }
  }

  const fetchQuizData = async () => {
    try {
      setLoading(true)
      
      const data = await QuizApi.getQuizById(quizId!)

      if (data.isSuccess && data.result) {
        const quiz = data.result
        setFormData({
          matrixId: quiz.matrixId || "",
          quizName: quiz.quizName || "",
          englishLevel: quiz.englishLevel || "Easy",
          skill: quiz.skill || "Easy",
          description: quiz.description || "",
          duration: quiz.duration || 30,
          passingScore: quiz.passingScore || 5,
        })
      } else {
        toast.error(data.message || "Failed to load quiz")
        router.push("/quizzes")
      }
    } catch (error: any) {
      console.error("Error fetching quiz:", error)
      toast.error(error.response?.data?.message || "Failed to load quiz data")
      router.push("/quizzes")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveQuiz = async () => {
    // Validation
    if (!formData.quizName.trim()) {
      toast.error("Please enter quiz name")
      return
    }
    if (!formData.matrixId) {
      toast.error("Please select a matrix")
      return
    }

    setLoading(true)

    try {
      let data;
      
      if (isEditMode) {
        const requestBody = {
          quizId: quizId!,
          matrixId: formData.matrixId,
          quizName: formData.quizName,
          englishLevel: formData.englishLevel,
          skill: formData.skill,
          description: formData.description,
          duration: formData.duration,
          passingScore: formData.passingScore,
        }
        data = await QuizApi.updateQuiz(quizId!, requestBody)
      } else {
        const requestBody = {
          matrixId: formData.matrixId,
          quizName: formData.quizName,
          englishLevel: formData.englishLevel,
          skill: formData.skill,
          description: formData.description,
          duration: formData.duration,
          passingScore: formData.passingScore,
        }
        data = await QuizApi.createQuiz(requestBody)
      }

      if (data.isSuccess) {
        toast.success(
          data.message || `Quiz ${isEditMode ? "updated" : "created"} successfully`
        )
        router.push("/quizzes")
      } else {
        toast.error(data.message || `Failed to ${isEditMode ? "update" : "create"} quiz`)
      }
    } catch (error: any) {
      console.error("Error saving quiz:", error)
      toast.error(error.response?.data?.message || "An error occurred while saving the quiz")
    } finally {
      setLoading(false)
    }
  }

  if (isEditMode && loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading quiz...</p>
      </div>
    )
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
            <h1 className="text-2xl font-bold">
              {isEditMode ? "Edit Quiz" : "Create New Quiz"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode ? "Update quiz details" : "Add a new quiz"}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveQuiz} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditMode ? "Update Quiz" : "Save Quiz"}
        </Button>
      </div>

      {/* Form */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quizName">Quiz Name *</Label>
            <Input
              id="quizName"
              placeholder="e.g., Python Quiz"
              value={formData.quizName}
              onChange={(e) => setFormData({ ...formData, quizName: e.target.value })}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="matrixId">Matrix *</Label>
            <Select
              value={formData.matrixId}
              onValueChange={(value) =>
                setFormData({ ...formData, matrixId: value })
              }
            >
              <SelectTrigger id="matrixId" className="bg-background">
                <SelectValue placeholder="Select a matrix" />
              </SelectTrigger>
              <SelectContent>
                {matrices.map((matrix) => (
                  <SelectItem key={matrix.matrixId} value={matrix.matrixId}>
                    {matrix.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="englishLevel">English Level *</Label>
              <Select
                value={formData.englishLevel}
                onValueChange={(value) =>
                  setFormData({ ...formData, englishLevel: value })
                }
              >
                <SelectTrigger id="englishLevel" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill">Skill Level *</Label>
              <Select
                value={formData.skill}
                onValueChange={(value) =>
                  setFormData({ ...formData, skill: value })
                }
              >
                <SelectTrigger id="skill" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: Number.parseInt(e.target.value) || 30 })
                }
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passingScore">Passing Score *</Label>
              <Input
                id="passingScore"
                type="number"
                min="0"
                value={formData.passingScore}
                onChange={(e) =>
                  setFormData({ ...formData, passingScore: Number.parseInt(e.target.value) || 5 })
                }
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter quiz description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-background min-h-[120px] resize-none"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
