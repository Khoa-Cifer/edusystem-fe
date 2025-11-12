"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { LessonApi } from "@/axios/lesson"

interface LessonFormProps {
  lessonId?: string
}

export function LessonForm({ lessonId }: LessonFormProps) {
  const router = useRouter()
  const isEditMode = !!lessonId
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEditMode)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
  })

  useEffect(() => {
    if (isEditMode) {
      fetchLessonData()
    }
  }, [lessonId])

  const fetchLessonData = async () => {
    try {
      setInitialLoading(true)
      
      const data = await LessonApi.getLessonById(lessonId!)

      console.log("===== EDIT LESSON DATA =====")
      console.log("Response:", data)
      console.log("Lesson:", data.result)
      console.log("============================")

      if (data.isSuccess && data.result) {
        const lesson = data.result
        setFormData({
          name: lesson.name || lesson.title || lesson.lessonName || "",
          title: lesson.title || lesson.name || "",
          description: lesson.description || "",
        })
      } else {
        toast.error(data.message || "Failed to load lesson")
        router.push("/lessons")
      }
    } catch (error: any) {
      console.error("Error fetching lesson:", error)
      toast.error(error.response?.data?.message || "Failed to load lesson data")
      router.push("/lessons")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSaveLesson = async () => {
    // Validation
    if (!formData.name.trim() && !formData.title.trim()) {
      toast.error("Please enter lesson name or title")
      return
    }

    setLoading(true)

    try {
      let data;
      
      if (isEditMode) {
        const requestBody = {
          lessonId: lessonId!,
          name: formData.name || formData.title,
          title: formData.title || formData.name,
          description: formData.description,
        }
        
        console.log("===== UPDATE REQUEST =====")
        console.log("Request body:", requestBody)
        console.log("=========================")
        
        data = await LessonApi.updateLesson(lessonId!, requestBody)
      } else {
        const requestBody = {
          name: formData.name || formData.title,
          title: formData.title || formData.name,
          description: formData.description,
        }
        data = await LessonApi.createLesson(requestBody)
      }

      if (data.isSuccess) {
        toast.success(
          data.message || `Lesson ${isEditMode ? "updated" : "created"} successfully`
        )
        router.push(`/lessons/${lessonId || data.result?.lessonId}`)
      } else {
        toast.error(data.message || `Failed to ${isEditMode ? "update" : "create"} lesson`)
      }
    } catch (error: any) {
      console.error("Error saving lesson:", error)
      toast.error(error.response?.data?.message || "An error occurred while saving the lesson")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading lesson...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={isEditMode ? `/lessons/${lessonId}` : "/lessons"}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditMode ? "Edit Lesson" : "Create New Lesson"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode ? "Update lesson details" : "Add a new lesson"}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveLesson} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditMode ? "Update Lesson" : "Save Lesson"}
        </Button>
      </div>

      {/* Form */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Lesson Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Introduction to Programming"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              id="title"
              placeholder="e.g., Lesson 1: Basics"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter lesson description..."
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
