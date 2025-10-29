"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit2, Loader2 } from "lucide-react"
import { Student } from "@/interfaces/student"
import { StudentApi } from "@/axios/student"

export function StudentsList() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await StudentApi.getStudents({
          pageNumber: currentPage,
          pageSize,
          filterQuery: searchTerm || "fullName",
        })

        if (response.isSuccess && response.result != null) {
          setStudents(response.result.data)
          setTotalPages(response.result.totalPages)
        } else {
          setError(response.message || "Failed to fetch students")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("[v0] Failed to load students:", err)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [currentPage, pageSize, searchTerm])

  const handleDelete = (studentId: string) => {
    // TODO: Implement delete API call
    setStudents(students.filter((s) => s.studentId !== studentId))
  }

  const handleEdit = (studentId: string) => {
    // TODO: Implement edit functionality
    console.log("Edit student:", studentId)
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search students by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1)
        }}
        className="max-w-md bg-card border-border"
      />

      {error && (
        <Card className="p-4 bg-red-950/20 border-red-900/50">
          <p className="text-red-400">{error}</p>
        </Card>
      )}

      {loading ? (
        <Card className="p-8 text-center bg-card border-border">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4">
            {students.length === 0 ? (
              <Card className="p-8 text-center bg-card border-border">
                <p className="text-muted-foreground">No students found</p>
              </Card>
            ) : (
              students.map((student) => (
                <Card
                  key={student.studentId}
                  className="p-4 bg-card border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">{student.applicationUser.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{student.applicationUser.email}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>ID: {student.studentId}</span>
                        <span>Phone: {student.applicationUser.phoneNumber}</span>
                        <span>Status: {student.applicationUser.status}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={() => handleEdit(student.studentId)}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleDelete(student.studentId)}
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
            <div className="flex items-center justify-between mt-6">
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
        </>
      )}
    </div>
  )
}
