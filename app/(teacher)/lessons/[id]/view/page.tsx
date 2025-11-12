"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Eye, Trash, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { LessonApi } from "@/axios/lesson"
import { LessonContentApi } from "@/axios/lesson-content"

interface LessonContent {
  lessonContentId: string
  lessonId: string
  resourceType: string
  resourceUrl: string
  description: string
  status: string
  createdBy: string
  createdTime: string
  updatedBy: string | null
  updatedTime: string | null
}

export default function ViewLessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.id as string
  const [loading, setLoading] = useState(true)
  const [lesson, setLesson] = useState<any>(null)
  const [lessonContents, setLessonContents] = useState<LessonContent[]>([])
  const [contentsLoading, setContentsLoading] = useState(true)
  const [deletingContentId, setDeletingContentId] = useState<string | null>(null)

  useEffect(() => {
    fetchLesson()
    fetchLessonContents()
  }, [lessonId])

  const fetchLesson = async () => {
    try {
      setLoading(true)
      
      const data = await LessonApi.getLessonById(lessonId)

      if (data.isSuccess && data.result) {
        setLesson(data.result)
      } else {
        toast.error(data.message || "Failed to load lesson")
        router.push("/lessons")
      }
    } catch (error: any) {
      console.error("Error fetching lesson:", error)
      toast.error(error.response?.data?.message || "Failed to load lesson")
      router.push("/lessons")
    } finally {
      setLoading(false)
    }
  }

  const fetchLessonContents = async () => {
    try {
      setContentsLoading(true)
      
      const data = await LessonContentApi.getLessonContentsByLessonId(lessonId, {
        pageNumber: 1,
        pageSize: 100,
      })

      if (data.isSuccess && data.result) {
        setLessonContents(data.result.data || [])
      }
    } catch (error: any) {
      console.error("Error fetching lesson contents:", error)
      toast.error(error.response?.data?.message || "Failed to load lesson contents")
    } finally {
      setContentsLoading(false)
    }
  }

  const handleDeleteContent = async (contentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lesson content? This action cannot be undone."
    )

    if (!confirmed) return

    setDeletingContentId(contentId)
    try {
      const data = await LessonContentApi.deleteLessonContent(contentId)

      if (data.isSuccess) {
        toast.success(data.message || "Lesson content deleted successfully")
        fetchLessonContents()
      } else {
        toast.error(data.message || "Failed to delete lesson content")
      }
    } catch (error: any) {
      console.error("Error deleting lesson content:", error)
      toast.error(error.response?.data?.message || "An error occurred while deleting the lesson content")
    } finally {
      setDeletingContentId(null)
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
        <p className="text-muted-foreground">Loading lesson...</p>
      </div>
    )
  }

  if (!lesson) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/lessons">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Lesson Details</h1>
            <p className="text-sm text-muted-foreground">
              View lesson information
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/lessons/${lessonId}`}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Lesson
          </Link>
        </Button>
      </div>

      {/* Lesson Information */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Lesson Name
              </h3>
              <p className="text-lg font-semibold">{lesson.name || lesson.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Lesson ID
              </h3>
              <p className="text-sm font-mono text-muted-foreground">
                {lesson.lessonId}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h3>
              {lesson.status === "1" ? (
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

          {lesson.description && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h3>
              <p className="text-sm leading-relaxed">
                {lesson.description}
              </p>
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Metadata
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created by: </span>
                <span className="font-medium">{lesson.createdBy}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created at: </span>
                <span>{new Date(lesson.createdTime).toLocaleString()}</span>
              </div>
              {lesson.updatedBy && (
                <>
                  <div>
                    <span className="text-muted-foreground">Updated by: </span>
                    <span className="font-medium">{lesson.updatedBy}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated at: </span>
                    <span>{new Date(lesson.updatedTime).toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Lesson Contents */}
      <Card className="p-6 bg-card border-border">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Lesson Contents</h2>
            <p className="text-sm text-muted-foreground">
              Resources for this lesson ({lessonContents.length} items)
            </p>
          </div>
          <Button asChild>
            <Link href={`/lessons/${lessonId}/add-content`}>
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Link>
          </Button>
        </div>

        {contentsLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading contents...</p>
          </div>
        ) : lessonContents.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">No contents found for this lesson</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lessonContents.map((content) => (
              <Card
                key={content.lessonContentId}
                className="p-4 bg-background border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={getResourceTypeColor(content.resourceType)}
                      >
                        {content.resourceType}
                      </Badge>
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

                    <p className="font-medium mb-2">{content.description}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ExternalLink className="w-4 h-4" />
                      <a
                        href={content.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary truncate"
                      >
                        {content.resourceUrl}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/lesson-content/${content.lessonContentId}`}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteContent(content.lessonContentId)}
                      disabled={deletingContentId === content.lessonContentId}
                    >
                      <Trash className="w-4 h-4 mr-1 text-destructive" />
                      {deletingContentId === content.lessonContentId ? "..." : "Delete"}
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
