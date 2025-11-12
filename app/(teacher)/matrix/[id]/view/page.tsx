"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Eye, Trash, Plus } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { MatrixApi } from "@/axios/matrix"
import { MatrixDetailApi } from "@/axios/matrix-detail"

interface MatrixDetail {
  detailId: string
  matrixId: string
  level: number
  questionType: number
  skillType: string
  questionCount: number
  scorePerQuestion: number
  status: string
  createdBy: string
  createdTime: string
  updatedBy: string | null
  updatedTime: string | null
}

export default function ViewMatrixPage() {
  const params = useParams()
  const router = useRouter()
  const matrixId = params.id as string
  const [loading, setLoading] = useState(true)
  const [matrix, setMatrix] = useState<any>(null)
  const [matrixDetails, setMatrixDetails] = useState<MatrixDetail[]>([])
  const [detailsLoading, setDetailsLoading] = useState(true)
  const [deletingDetailId, setDeletingDetailId] = useState<string | null>(null)

  useEffect(() => {
    fetchMatrix()
    fetchMatrixDetails()
  }, [matrixId])

  const fetchMatrix = async () => {
    try {
      setLoading(true)
      
      const data = await MatrixApi.getMatrixById(matrixId)

      if (data.isSuccess && data.result) {
        setMatrix(data.result)
      } else {
        toast.error(data.message || "Failed to load matrix")
        router.push("/matrix")
      }
    } catch (error: any) {
      console.error("Error fetching matrix:", error)
      toast.error(error.response?.data?.message || "Failed to load matrix")
      router.push("/matrix")
    } finally {
      setLoading(false)
    }
  }

  const fetchMatrixDetails = async () => {
    try {
      setDetailsLoading(true)
      
      const data = await MatrixDetailApi.getMatrixDetails({
        pageNumber: 1,
        pageSize: 100,
      })

      if (data.isSuccess && data.result) {
        // Filter details by matrixId
        const filteredDetails = data.result.data.filter(
          (detail: MatrixDetail) => detail.matrixId === matrixId
        )
        setMatrixDetails(filteredDetails)
      }
    } catch (error: any) {
      console.error("Error fetching matrix details:", error)
      toast.error(error.response?.data?.message || "Failed to load matrix details")
    } finally {
      setDetailsLoading(false)
    }
  }

  const handleDeleteDetail = async (detailId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this matrix detail? This action cannot be undone."
    )

    if (!confirmed) return

    setDeletingDetailId(detailId)
    try {
      const data = await MatrixDetailApi.deleteMatrixDetail(detailId)

      if (data.isSuccess) {
        toast.success(data.message || "Matrix detail deleted successfully")
        // Refresh matrix details
        fetchMatrixDetails()
      } else {
        toast.error(data.message || "Failed to delete matrix detail")
      }
    } catch (error: any) {
      console.error("Error deleting matrix detail:", error)
      toast.error(error.response?.data?.message || "An error occurred while deleting the matrix detail")
    } finally {
      setDeletingDetailId(null)
    }
  }

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      easy: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      hard: "bg-red-500/20 text-red-400 border-red-500/30",
      beginner: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      expert: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return (
      colors[level.toLowerCase()] ||
      "bg-muted/10 text-muted-foreground border-muted/20"
    )
  }

  const getSkillColor = (skill: string) => {
    const colors: Record<string, string> = {
      reading: "bg-accent/10 text-accent border-accent/20",
      writing: "bg-chart-3/10 text-chart-3 border-chart-3/20",
      speaking: "bg-primary/10 text-primary border-primary/20",
      listening: "bg-secondary/10 text-secondary border-secondary/20",
    }
    return (
      colors[skill.toLowerCase()] ||
      "bg-muted/10 text-muted-foreground border-muted/20"
    )
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
        <p className="text-muted-foreground">Loading matrix...</p>
      </div>
    )
  }

  if (!matrix) {
    return null
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
            <h1 className="text-2xl font-bold">Matrix Details</h1>
            <p className="text-sm text-muted-foreground">
              View matrix information
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/matrix/${matrixId}`}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Matrix
          </Link>
        </Button>
      </div>

      {/* Matrix Information */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Matrix Name
              </h3>
              <p className="text-lg font-semibold">{matrix.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Matrix ID
              </h3>
              <p className="text-sm font-mono text-muted-foreground">
                {matrix.matrixId}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                English Level
              </h3>
              <Badge
                className={getLevelBadge(matrix.englishLevel)}
                variant="outline"
              >
                {matrix.englishLevel}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Skill Focus
              </h3>
              <Badge
                className={getSkillColor(matrix.skillFocus)}
                variant="outline"
              >
                {matrix.skillFocus}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h3>
              {matrix.status === "1" ? (
                <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
                  Active
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Inactive
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-sm leading-relaxed">
              {matrix.description || "No description provided"}
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
                <span className="font-medium">{matrix.createdBy}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created at: </span>
                <span>{matrix.createdTime}</span>
              </div>
              {matrix.updatedBy && (
                <>
                  <div>
                    <span className="text-muted-foreground">Updated by: </span>
                    <span className="font-medium">{matrix.updatedBy}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated at: </span>
                    <span>{matrix.updatedTime}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Matrix Details */}
      <Card className="p-6 bg-card border-border">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Matrix Details</h2>
            <p className="text-sm text-muted-foreground">
              Configuration details for this matrix ({matrixDetails.length} items)
            </p>
          </div>
          <Button asChild>
            <Link href={`/matrix/${matrixId}/add-detail`}>
              <Plus className="w-4 h-4 mr-2" />
              Add Detail
            </Link>
          </Button>
        </div>

        {detailsLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading details...</p>
          </div>
        ) : matrixDetails.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">No details found for this matrix</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Level
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Question Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Skill Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Question Count
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Score/Question
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Total Score
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {matrixDetails.map((detail) => (
                  <tr
                    key={detail.detailId}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <Badge variant="outline">
                        {getLevelText(detail.level)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">
                        {getQuestionTypeText(detail.questionType)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{detail.skillType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">
                        {detail.questionCount}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">
                        {detail.scorePerQuestion}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold">
                        {detail.questionCount * detail.scorePerQuestion}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {detail.status === "1" ? (
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/matrix-detail/${detail.detailId}/view`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/matrix-detail/${detail.detailId}`}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDetail(detail.detailId)}
                          disabled={deletingDetailId === detail.detailId}
                        >
                          <Trash className="w-4 h-4 mr-1 text-destructive" />
                          {deletingDetailId === detail.detailId
                            ? "..."
                            : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
