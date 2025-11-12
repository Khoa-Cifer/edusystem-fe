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
import { MatrixApi } from "@/axios/matrix"

interface MatrixFormProps {
  matrixId?: string
}

export function MatrixForm({ matrixId }: MatrixFormProps) {
  const router = useRouter()
  const isEditMode = !!matrixId
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    englishLevel: "Easy",
    skillFocus: "",
    description: "",
  })

  useEffect(() => {
    if (isEditMode) {
      fetchMatrixData()
    }
  }, [matrixId])

  const fetchMatrixData = async () => {
    try {
      setLoading(true)
      
      const data = await MatrixApi.getMatrixById(matrixId!)

      if (data.isSuccess && data.result) {
        const matrix = data.result
        setFormData({
          name: matrix.name || "",
          englishLevel: matrix.englishLevel || "Easy",
          skillFocus: matrix.skillFocus || "",
          description: matrix.description || "",
        })
      } else {
        toast.error(data.message || "Failed to load matrix")
        router.push("/matrix")
      }
    } catch (error: any) {
      console.error("Error fetching matrix:", error)
      toast.error(error.response?.data?.message || "Failed to load matrix data")
      router.push("/matrix")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMatrix = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter matrix name")
      return
    }
    if (!formData.skillFocus.trim()) {
      toast.error("Please enter skill focus")
      return
    }

    setLoading(true)

    try {
      let data;
      
      if (isEditMode) {
        const requestBody = {
          matrixId: matrixId!,
          name: formData.name,
          englishLevel: formData.englishLevel,
          skillFocus: formData.skillFocus,
          description: formData.description,
        }
        data = await MatrixApi.updateMatrix(matrixId!, requestBody)
      } else {
        const requestBody = {
          name: formData.name,
          englishLevel: formData.englishLevel,
          skillFocus: formData.skillFocus,
          description: formData.description,
        }
        data = await MatrixApi.createMatrix(requestBody)
      }

      if (data.isSuccess) {
        toast.success(
          data.message || `Matrix ${isEditMode ? "updated" : "created"} successfully`
        )
        router.push("/matrix")
      } else {
        toast.error(data.message || `Failed to ${isEditMode ? "update" : "create"} matrix`)
      }
    } catch (error: any) {
      console.error("Error saving matrix:", error)
      toast.error(error.response?.data?.message || "An error occurred while saving the matrix")
    } finally {
      setLoading(false)
    }
  }

  if (isEditMode && loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading matrix...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/matrix">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditMode ? "Edit Matrix" : "Create New Matrix"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode ? "Update matrix details" : "Add a new learning matrix"}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveMatrix} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditMode ? "Update Matrix" : "Save Matrix"}
        </Button>
      </div>

      {/* Form */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Matrix Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Advanced Reading Skills"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background"
            />
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
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillFocus">Skill Focus *</Label>
              <Input
                id="skillFocus"
                placeholder="e.g., Reading, Writing, Speaking, Listening"
                value={formData.skillFocus}
                onChange={(e) =>
                  setFormData({ ...formData, skillFocus: e.target.value })
                }
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter matrix description..."
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
