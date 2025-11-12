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
import { UnitApi } from "@/axios/unit"

interface UnitFormProps {
  unitId?: string
}

export function UnitForm({ unitId }: UnitFormProps) {
  const router = useRouter()
  const isEditMode = !!unitId
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    unitName: "",
    englishLevel: "Beginner",
    description: "",
    learningObjectives: "",
    orderIndex: 1,
  })

  useEffect(() => {
    if (isEditMode) {
      fetchUnitData()
    }
  }, [unitId])

  const fetchUnitData = async () => {
    try {
      setLoading(true)
      
      const data = await UnitApi.getUnitById(unitId!)

      if (data.isSuccess && data.result) {
        const unit = data.result
        setFormData({
          unitName: unit.unitName || "",
          englishLevel: unit.englishLevel || "Beginner",
          description: unit.description || "",
          learningObjectives: unit.learningObjectives || "",
          orderIndex: unit.orderIndex || 1,
        })
      } else {
        toast.error(data.message || "Failed to load unit")
        router.push("/units")
      }
    } catch (error: any) {
      console.error("Error fetching unit:", error)
      toast.error(error.response?.data?.message || "Failed to load unit data")
      router.push("/units")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveUnit = async () => {
    // Validation
    if (!formData.unitName.trim()) {
      toast.error("Please enter unit name")
      return
    }
    if (!formData.learningObjectives.trim()) {
      toast.error("Please enter learning objectives")
      return
    }

    setLoading(true)

    try {
      let data;
      
      if (isEditMode) {
        const requestBody = {
          unitId: unitId!,
          unitName: formData.unitName,
          englishLevel: formData.englishLevel,
          description: formData.description,
          learningObjectives: formData.learningObjectives,
          orderIndex: formData.orderIndex,
        }
        data = await UnitApi.updateUnit(unitId!, requestBody)
      } else {
        const requestBody = {
          unitName: formData.unitName,
          englishLevel: formData.englishLevel,
          description: formData.description,
          learningObjectives: formData.learningObjectives,
          orderIndex: formData.orderIndex,
        }
        data = await UnitApi.createUnit(requestBody)
      }

      if (data.isSuccess) {
        toast.success(
          data.message || `Unit ${isEditMode ? "updated" : "created"} successfully`
        )
        router.push("/units")
      } else {
        toast.error(data.message || `Failed to ${isEditMode ? "update" : "create"} unit`)
      }
    } catch (error: any) {
      console.error("Error saving unit:", error)
      toast.error(error.response?.data?.message || "An error occurred while saving the unit")
    } finally {
      setLoading(false)
    }
  }

  if (isEditMode && loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading unit...</p>
      </div>
    )
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
            <h1 className="text-2xl font-bold">
              {isEditMode ? "Edit Unit" : "Create New Unit"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode ? "Update unit details" : "Add a new learning unit"}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveUnit} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditMode ? "Update Unit" : "Save Unit"}
        </Button>
      </div>

      {/* Form */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unitName">Unit Name *</Label>
            <Input
              id="unitName"
              placeholder="e.g., Listening and Comprehension"
              value={formData.unitName}
              onChange={(e) => setFormData({ ...formData, unitName: e.target.value })}
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
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Elementary">Elementary</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Upper-Intermediate">Upper-Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Proficient">Proficient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderIndex">Order Index *</Label>
              <Input
                id="orderIndex"
                type="number"
                min="1"
                value={formData.orderIndex}
                onChange={(e) =>
                  setFormData({ ...formData, orderIndex: Number.parseInt(e.target.value) || 1 })
                }
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="learningObjectives">Learning Objectives *</Label>
            <Textarea
              id="learningObjectives"
              placeholder="Enter learning objectives..."
              value={formData.learningObjectives}
              onChange={(e) =>
                setFormData({ ...formData, learningObjectives: e.target.value })
              }
              className="bg-background min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter unit description..."
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
