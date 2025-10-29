"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit2 } from "lucide-react"

interface Teacher {
  id: string
  name: string
  email: string
  department: string
  joinDate: string
}

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Michael Brown",
    email: "michael@example.com",
    department: "Mathematics",
    joinDate: "2023-08-01",
  },
  {
    id: "2",
    name: "Prof. Sarah Davis",
    email: "sarah@example.com",
    department: "English",
    joinDate: "2023-09-15",
  },
  {
    id: "3",
    name: "Dr. James Wilson",
    email: "james@example.com",
    department: "Science",
    joinDate: "2023-10-01",
  },
]

export function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search teachers by name, email, or department..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md bg-card border-border"
      />

      <div className="grid gap-4">
        {filteredTeachers.length === 0 ? (
          <Card className="p-8 text-center bg-card border-border">
            <p className="text-muted-foreground">No teachers found</p>
          </Card>
        ) : (
          filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="p-4 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.email}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Department: {teacher.department}</span>
                    <span>Joined: {teacher.joinDate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="gap-2" onClick={() => handleDelete(teacher.id)}>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
