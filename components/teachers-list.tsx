"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Teacher } from "@/interfaces/teacher"
import { TeacherApi } from "@/axios/teacher"
import Image from "next/image"

export function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 100

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
    setTeachers((prev) => prev.filter((t) => t.teacherId !== id))
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
        placeholder="Search teachers by name, email, or code..."
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
              <div className="flex items-start gap-4">
                {teacher.imageUrl ? (
                  <Image
                    src={teacher.imageUrl}
                    alt={teacher.teacherName}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    {teacher.teacherName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      {teacher.teacherName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {teacher.teacherEmail}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground pt-2">
                    <span>Code: {teacher.teacherCode}</span>
                    <span>Status: {teacher.status === 1 ? "Active" : "Inactive"}</span>
                    {teacher.gender && <span>Gender: {teacher.gender}</span>}
                    {teacher.teacherDOB && (
                      <span>DOB: {new Date(teacher.teacherDOB).toLocaleDateString()}</span>
                    )}
                    {teacher.teachingExperience && (
                      <span>Experience: {teacher.teachingExperience} years</span>
                    )}
                    {teacher.address && <span>Address: {teacher.address}</span>}
                  </div>
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
