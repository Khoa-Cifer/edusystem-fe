"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit2 } from "lucide-react"
import { Teacher } from "@/interfaces/teacher"
import { TeacherApi } from "@/axios/teacher"

export function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await TeacherApi.getTeachers({
          pageNumber: currentPage,
          pageSize,
          filterQuery: searchTerm,
        })

        if (response.isSuccess && response.result) {
          setTeachers(response.result.data)
          setTotalPages(response.result.totalPages)
        } else {
          setError("Failed to load teachers")
        }
      } catch (err) {
        console.error("[v0] Error loading teachers:", err)
        setError("Error loading teachers. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadTeachers()
  }, [currentPage, searchTerm])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter((t) => t.teacherId !== id))
  }

  if (error) {
    return (
      <Card className="p-8 text-center bg-card border-border">
        <p className="text-destructive">{error}</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search teachers by name, email, or department..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-md bg-card border-border"
      />

      <div className="grid gap-4">
        {loading ? (
          <Card className="p-8 text-center bg-card border-border">
            <p className="text-muted-foreground">Loading teachers...</p>
          </Card>
        ) : teachers.length === 0 ? (
          <Card className="p-8 text-center bg-card border-border">
            <p className="text-muted-foreground">No teachers found</p>
          </Card>
        ) : (
          teachers.map((teacher) => (
            <Card
              key={teacher.teacherId}
              className="p-4 bg-card border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-card-foreground">{teacher.applicationUser?.fullName || "N/A"}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.applicationUser?.email || "N/A"}</p>
                    {teacher.applicationUser?.phoneNumber && (
                      <p className="text-sm text-muted-foreground">{teacher.applicationUser.phoneNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground pt-2">
                    {teacher.department && <span>Department: {teacher.department}</span>}
                    {teacher.position && <span>Position: {teacher.position}</span>}
                    {teacher.specialization && <span>Specialization: {teacher.specialization}</span>}
                    {teacher.degree && <span>Degree: {teacher.degree}</span>}
                    {teacher.hireDate && <span>Hire Date: {new Date(teacher.hireDate).toLocaleDateString()}</span>}
                    {teacher.teachingExperience && <span>Experience: {teacher.teachingExperience}</span>}
                    {teacher.englishProficiency && <span>English: {teacher.englishProficiency}</span>}
                    {teacher.officePhone && <span>Office: {teacher.officePhone}</span>}
                  </div>

                  {teacher.bio && <p className="text-xs text-muted-foreground italic pt-2">{teacher.bio}</p>}
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDelete(teacher.teacherId)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
