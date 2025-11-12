"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { MatrixDetailApi } from "@/axios/matrix-detail"

export default function ViewMatrixDetailPage() {
  const params = useParams()
  const router = useRouter()
  const detailId = params.id as string
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchDetail()
  }, [detailId])

  const fetchDetail = async () => {
    try {
      setLoading(true)

      const data = await MatrixDetailApi.getMatrixDetailById(detailId)

      if (data.isSuccess && data.result) {
        setDetail(data.result)
      } else {
        toast.error(data.message || "Failed to load matrix detail")
        router.back()
      }
    } catch (error: any) {
      console.error("Error fetching matrix detail:", error)
      toast.error(
        error.response?.data?.message || "Failed to load matrix detail"
      )
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this matrix detail? This action cannot be undone."
    )

    if (!confirmed) return

    setDeleting(true)
    try {
      const data = await MatrixDetailApi.deleteMatrixDetail(detailId)

      if (data.isSuccess) {
        toast.success(data.message || "Matrix detail deleted successfully")
        // Navigate back to matrix view page
        if (detail?.matrixId) {
          router.push(`/matrix/${detail.matrixId}/view`)
        } else {
          router.back()
        }
      } else {
        toast.error(data.message || "Failed to delete matrix detail")
      }
    } catch (error: any) {
      console.error("Error deleting matrix detail:", error)
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the matrix detail"
      )
    } finally {
      setDeleting(false)
    }
  }

  const getLevelText = (level: number) => {
    const levels: Record<number, string> = {
      1: "Level 1",
      2: "Level 2",
      3: "Level 3",
      4: "Level 4",
      5: "Level 5",
    }
    return levels[level] || `Level ${level}`
  }

  const getQuestionTypeText = (type: number) => {
    const types: Record<number, string> = {
      1: "Multiple Choice",
      2: "True/False",
      3: "Short Answer",
      4: "Essay",
    }
    return types[type] || `Type ${type}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading matrix detail...</p>
      </div>
    )
  }

  if (!detail) {
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
            <h1 className="text-2xl font-bold">Matrix Detail</h1>
            <p className="text-sm text-muted-foreground">
              View matrix detail information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/matrix-detail/${detailId}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Detail
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

      {/* Detail Information */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Detail ID
              </h3>
              <p className="text-sm font-mono text-muted-foreground">
                {detail.detailId}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Matrix ID
              </h3>
              <p className="text-sm font-mono text-muted-foreground">
                {detail.matrixId}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Level
              </h3>
              <Badge variant="outline">{getLevelText(detail.level)}</Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Question Type
              </h3>
              <Badge variant="outline">
                {getQuestionTypeText(detail.questionType)}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Skill Type
              </h3>
              <p className="text-lg font-semibold">{detail.skillType}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h3>
              {detail.status === "1" ? (
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

          {/* Scoring Info */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Scoring Configuration
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-muted/50">
                <div className="text-sm text-muted-foreground">
                  Question Count
                </div>
                <div className="text-2xl font-bold">{detail.questionCount}</div>
              </Card>
              <Card className="p-4 bg-muted/50">
                <div className="text-sm text-muted-foreground">
                  Score Per Question
                </div>
                <div className="text-2xl font-bold">
                  {detail.scorePerQuestion}
                </div>
              </Card>
              <Card className="p-4 bg-primary/10">
                <div className="text-sm text-muted-foreground">Total Score</div>
                <div className="text-2xl font-bold text-primary">
                  {detail.questionCount * detail.scorePerQuestion}
                </div>
              </Card>
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Metadata
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created by: </span>
                <span className="font-medium">{detail.createdBy}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created at: </span>
                <span>{new Date(detail.createdTime).toLocaleString()}</span>
              </div>
              {detail.updatedBy && (
                <>
                  <div>
                    <span className="text-muted-foreground">Updated by: </span>
                    <span className="font-medium">{detail.updatedBy}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated at: </span>
                    <span>{new Date(detail.updatedTime).toLocaleString()}</span>
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
