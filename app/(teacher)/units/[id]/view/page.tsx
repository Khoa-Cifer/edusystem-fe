"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { UnitApi } from "@/axios/unit"

export default function ViewUnitPage() {
  const params = useParams()
  const router = useRouter()
  const unitId = params.id as string
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchUnit()
  }, [unitId])

  const fetchUnit = async () => {
    try {
      setLoading(true)
      
      const data = await UnitApi.getUnitById(unitId)

      if (data.isSuccess && data.result) {
        setUnit(data.result)
      } else {
        toast.error(data.message || "Failed to load unit")
        router.push("/units")
      }
    } catch (error: any) {
      console.error("Error fetching unit:", error)
      toast.error(error.response?.data?.message || "Failed to load unit")
      router.push("/units")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this unit? This action cannot be undone."
    )

    if (!confirmed) return

    setDeleting(true)
    try {
      const data = await UnitApi.deleteUnit(unitId)

      if (data.isSuccess) {
        toast.success(data.message || "Unit deleted successfully")
        router.push("/units")
      } else {
        toast.error(data.message || "Failed to delete unit")
      }
    } catch (error: any) {
      console.error("Error deleting unit:", error)
      toast.error(error.response?.data?.message || "An error occurred while deleting the unit")
    } finally {
      setDeleting(false)
    }
  }

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      beginner: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      elementary: "bg-green-500/20 text-green-400 border-green-500/30",
      intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "upper-intermediate": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      proficient: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return colors[level.toLowerCase()] || "bg-muted/10 text-muted-foreground border-muted/20"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading unit...</p>
      </div>
    )
  }

  if (!unit) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/units">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Unit Details</h1>
            <p className="text-sm text-muted-foreground">
              View unit information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/units/${unitId}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Unit
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            <Trash className="w-4 h-4 mr-2" />
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {/* Unit Information */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Unit Name
              </h3>
              <p className="text-lg font-semibold">{unit.unitName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Unit ID
              </h3>
              <p className="text-sm font-mono text-muted-foreground">
                {unit.unitId}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                English Level
              </h3>
              <Badge
                className={getLevelBadge(unit.englishLevel)}
                variant="outline"
              >
                {unit.englishLevel}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Order Index
              </h3>
              <Badge variant="outline">{unit.orderIndex}</Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h3>
              {unit.status === "1" ? (
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  Active
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Inactive
                </Badge>
              )}
            </div>

            {unit.teacherName && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Teacher
                </h3>
                <p className="text-sm">{unit.teacherName}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Learning Objectives
            </h3>
            <p className="text-sm leading-relaxed">
              {unit.learningObjectives || "No learning objectives provided"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-sm leading-relaxed">
              {unit.description || "No description provided"}
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Metadata
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created by: </span>
                <span className="font-medium">{unit.createBy}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created at: </span>
                <span>{unit.createTime}</span>
              </div>
              {unit.updateBy && (
                <>
                  <div>
                    <span className="text-muted-foreground">Updated by: </span>
                    <span className="font-medium">{unit.updateBy}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated at: </span>
                    <span>{unit.updateTime}</span>
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
