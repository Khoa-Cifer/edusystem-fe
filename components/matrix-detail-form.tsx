"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
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
import { MatrixDetailApi } from "@/axios/matrix-detail"

interface MatrixDetailFormProps {
  detailId?: string
  matrixId?: string
}

export function MatrixDetailForm({ detailId, matrixId }: MatrixDetailFormProps) {
  const router = useRouter()
  const isEditMode = !!detailId
  const [loading, setLoading] = useState(false)
  const [currentMatrixId, setCurrentMatrixId] = useState<string>(matrixId || "")
  const [formData, setFormData] = useState({
    level: 1,
    questionType: 1,
    skillType: "",
    questionCount: 1,
    scorePerQuestion: 1,
    status: "1",
  })

  useEffect(() => {
    if (isEditMode) {
      fetchDetailData()
    }
  }, [detailId])

  const fetchDetailData = async () => {
    try {
      setLoading(true)
      
      const data = await MatrixDetailApi.getMatrixDetailById(detailId!)

      if (data.isSuccess && data.result) {
        const detail = data.result
        setCurrentMatrixId(detail.matrixId)
        setFormData({
          level: detail.level || 1,
          questionType: detail.questionType || 1,
          skillType: detail.skillType || "",
          questionCount: detail.questionCount || 1,
          scorePerQuestion: detail.scorePerQuestion || 1,
          status: detail.status || "1",
        })
        //toast.success("Matrix detail loaded successfully")
      } else {
        toast.error(data.message || "Failed to load matrix detail")
        router.back()
      }
    } catch (error: any) {
      console.error("Error fetching matrix detail:", error)
      toast.error(error.response?.data?.message || "Failed to load matrix detail")
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDetail = async () => {
    // Validation
    if (!formData.skillType.trim()) {
      toast.error("Please enter skill type")
      return
    }
    if (formData.questionCount < 1) {
      toast.error("Question count must be at least 1")
      return
    }
    if (formData.scorePerQuestion < 1) {
      toast.error("Score per question must be at least 1")
      return
    }

    setLoading(true)

    try {
      let data;
      
      if (isEditMode) {
        const requestBody = {
          detailId: detailId!,
          level: formData.level,
          questionType: formData.questionType,
          skillType: formData.skillType,
          questionCount: formData.questionCount,
          scorePerQuestion: formData.scorePerQuestion,
          status: formData.status,
        }
        data = await MatrixDetailApi.updateMatrixDetail(detailId!, requestBody)
      } else {
        const requestBody = {
          matrixId: currentMatrixId,
          level: formData.level,
          questionType: formData.questionType,
          skillType: formData.skillType,
          questionCount: formData.questionCount,
          scorePerQuestion: formData.scorePerQuestion,
        }
        data = await MatrixDetailApi.createMatrixDetail(requestBody)
      }

      if (data.isSuccess) {
        toast.success(
          data.message ||
            `Matrix detail ${isEditMode ? "updated" : "created"} successfully`
        )
        router.push(`/matrix/${currentMatrixId}/view`)
      } else {
        toast.error(
          data.message || `Failed to ${isEditMode ? "update" : "create"} matrix detail`
        )
      }
    } catch (error: any) {
      console.error("Error saving matrix detail:", error)
      toast.error(error.response?.data?.message || "An error occurred while saving the matrix detail")
    } finally {
      setLoading(false)
    }
  }

  if (isEditMode && loading && !formData.skillType) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading matrix detail...</p>
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
              {isEditMode ? "Edit Matrix Detail" : "Add Matrix Detail"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode
                ? "Update matrix detail configuration"
                : "Create a new matrix detail configuration"}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveDetail} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditMode ? "Update Detail" : "Create Detail"}
        </Button>
      </div>

      {/* Form */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level *</Label>
              <Select
                value={formData.level.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, level: Number.parseInt(value) })
                }
              >
                <SelectTrigger id="level" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Level 1</SelectItem>
                  <SelectItem value="2">Level 2</SelectItem>
                  <SelectItem value="3">Level 3</SelectItem>
                  <SelectItem value="4">Level 4</SelectItem>
                  <SelectItem value="5">Level 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionType">Question Type *</Label>
              <Select
                value={formData.questionType.toString()}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    questionType: Number.parseInt(value),
                  })
                }
              >
                <SelectTrigger id="questionType" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Multiple Choice</SelectItem>
                  <SelectItem value="2">True/False</SelectItem>
                  <SelectItem value="3">Short Answer</SelectItem>
                  <SelectItem value="4">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillType">Skill Type *</Label>
            <Input
              id="skillType"
              placeholder="e.g., Python Skill, Reading Comprehension"
              value={formData.skillType}
              onChange={(e) =>
                setFormData({ ...formData, skillType: e.target.value })
              }
              className="bg-background"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="questionCount">Question Count *</Label>
              <Input
                id="questionCount"
                type="number"
                min="1"
                value={formData.questionCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    questionCount: Number.parseInt(e.target.value) || 1,
                  })
                }
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scorePerQuestion">Score Per Question *</Label>
              <Input
                id="scorePerQuestion"
                type="number"
                min="1"
                value={formData.scorePerQuestion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    scorePerQuestion: Number.parseInt(e.target.value) || 1,
                  })
                }
                className="bg-background"
              />
            </div>
          </div>

          {isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Calculated Total */}
          <div className="p-4 bg-muted/50 rounded-md">
            <div className="text-sm text-muted-foreground">Total Score</div>
            <div className="text-2xl font-bold">
              {formData.questionCount * formData.scorePerQuestion}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
