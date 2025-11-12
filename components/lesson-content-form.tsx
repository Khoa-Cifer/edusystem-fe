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
import { toast } from "sonner"
import { LessonContentApi } from "@/axios/lesson-content"

interface LessonContentFormProps {
  contentId?: string
  lessonId?: string
}

export function LessonContentForm({ contentId, lessonId }: LessonContentFormProps) {
  const router = useRouter()
  const isEditMode = !!contentId
  const [loading, setLoading] = useState(false)
  const [currentLessonId, setCurrentLessonId] = useState<string>(lessonId || "")
  const [formData, setFormData] = useState({
    resourceType: "Video",
    resourceUrl: "",
    description: "",
  })

  useEffect(() => {
    if (isEditMode) {
      fetchContentData()
    }
  }, [contentId])

  const fetchContentData = async () => {
    try {
      setLoading(true)
      
      const data = await LessonContentApi.getLessonContentById(contentId!)

      if (data.isSuccess && data.result) {
        const content = data.result
        setCurrentLessonId(content.lessonId)
        setFormData({
          resourceType: content.resourceType || "Video",
          resourceUrl: content.resourceUrl || "",
          description: content.description || "",
        })
        // toast.success("Lesson content loaded successfully") // Optional
      } else {
        toast.error(data.message || "Failed to load lesson content")
        router.back()
      }
    } catch (error: any) {
      console.error("Error fetching lesson content:", error)
      toast.error(error.response?.data?.message || "Failed to load lesson content")
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleSaveContent = async () => {
    // Validation
    if (!formData.resourceUrl.trim()) {
      toast.error("Please enter resource URL")
      return
    }
    if (!formData.resourceType.trim()) {
      toast.error("Please select resource type")
      return
    }

    setLoading(true)

    try {
      let data;
      
      if (isEditMode) {
        const requestBody = {
          lessonContentId: contentId!,
          lessonId: currentLessonId,
          resourceType: formData.resourceType,
          resourceUrl: formData.resourceUrl,
          description: formData.description,
        }
        data = await LessonContentApi.updateLessonContent(contentId!, requestBody)
      } else {
        const requestBody = {
          lessonId: currentLessonId,
          resourceType: formData.resourceType,
          resourceUrl: formData.resourceUrl,
          description: formData.description,
        }
        data = await LessonContentApi.createLessonContent(requestBody)
      }

      if (data.isSuccess) {
        toast.success(
          data.message ||
            `Lesson content ${isEditMode ? "updated" : "created"} successfully`
        )
        router.push(`/lessons/${currentLessonId}`)
      } else {
        toast.error(
          data.message || `Failed to ${isEditMode ? "update" : "create"} lesson content`
        )
      }
    } catch (error: any) {
      console.error("Error saving lesson content:", error)
      toast.error(error.response?.data?.message || "An error occurred while saving the lesson content")
    } finally {
      setLoading(false)
    }
  }

  if (isEditMode && loading && !formData.resourceUrl) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading lesson content...</p>
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
              {isEditMode ? "Edit Lesson Content" : "Add Lesson Content"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode
                ? "Update lesson content details"
                : "Create a new lesson content resource"}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveContent} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditMode ? "Update Content" : "Create Content"}
        </Button>
      </div>

      {/* Form */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resourceType">Resource Type *</Label>
            <Select
              value={formData.resourceType}
              onValueChange={(value) =>
                setFormData({ ...formData, resourceType: value })
              }
            >
              <SelectTrigger id="resourceType" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Document">Document</SelectItem>
                <SelectItem value="Essay">Essay</SelectItem>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="Link">Link</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resourceUrl">Resource URL *</Label>
            <Input
              id="resourceUrl"
              type="url"
              placeholder="https://example.com/resource"
              value={formData.resourceUrl}
              onChange={(e) =>
                setFormData({ ...formData, resourceUrl: e.target.value })
              }
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-background min-h-[100px] resize-none"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
