"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Trash, ExternalLink } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { LessonContentApi } from "@/axios/lesson-content"

export default function ViewLessonContentPage() {
  const params = useParams()
  const router = useRouter()
  const contentId = params.id as string
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [contentId])

  const fetchContent = async () => {
    try {
      setLoading(true)

      const data = await LessonContentApi.getLessonContentById(contentId)

      if (data.isSuccess && data.result) {
        setContent(data.result)
      } else {
        toast.error(data.message || "Failed to load lesson content")
        router.back()
      }
    } catch (error: any) {
      console.error("Error fetching lesson content:", error)
      toast.error(
        error.response?.data?.message || "Failed to load lesson content"
      )
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lesson content? This action cannot be undone."
    )

    if (!confirmed) return

    setDeleting(true)
    try {
      const data = await LessonContentApi.deleteLessonContent(contentId)

      if (data.isSuccess) {
        toast.success(data.message || "Lesson content deleted successfully")
        // Navigate back to lesson view page
        if (content?.lessonId) {
          router.push(`/lessons/${content.lessonId}`)
        } else {
          router.back()
        }
      } else {
        toast.error(data.message || "Failed to delete lesson content")
      }
    } catch (error: any) {
      console.error("Error deleting lesson content:", error)
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the lesson content"
      )
    } finally {
      setDeleting(false)
    }
  }

  const getResourceTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      video: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      document: "bg-green-500/20 text-green-400 border-green-500/30",
      essay: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      article: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      link: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      pdf: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return colors[type.toLowerCase()] || "bg-muted/10 text-muted-foreground border-muted/20"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading lesson content...</p>
      </div>
    )
  }

  if (!content) {
    return null
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
            <h1 className="text-2xl font-bold">Lesson Content Details</h1>
            <p className="text-sm text-muted-foreground">
              View lesson content information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/lesson-content/${contentId}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Content
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash className="w-4 h-4 mr-2" />
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {/* Content Information */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Content ID
              </h3>
              <p className="text-sm font-mono text-muted-foreground">
                {content.lessonContentId}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Lesson ID
              </h3>
              <p className="text-sm font-mono text-muted-foreground">
                {content.lessonId}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Resource Type
              </h3>
              <Badge
                variant="outline"
                className={getResourceTypeColor(content.resourceType)}
              >
                {content.resourceType}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h3>
              {content.status === "1" ? (
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  Active
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Inactive
                </Badge>
              )}
            </div>
          </div>

          {/* Resource URL */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Resource URL
            </h3>
            <div className="flex items-center gap-2">
              <a
                href={content.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                {content.resourceUrl}
              </a>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-sm leading-relaxed">
              {content.description || "No description provided"}
            </p>
          </div>

          {/* Metadata */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Metadata
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created by: </span>
                <span className="font-medium">{content.createdBy}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created at: </span>
                <span>{new Date(content.createdTime).toLocaleString()}</span>
              </div>
              {content.updatedBy && (
                <>
                  <div>
                    <span className="text-muted-foreground">Updated by: </span>
                    <span className="font-medium">{content.updatedBy}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated at: </span>
                    <span>{new Date(content.updatedTime).toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
