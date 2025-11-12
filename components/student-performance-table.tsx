import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Student } from "@/interfaces/student"

interface StudentPerformanceTableProps {
  students: Student[]
}

export function StudentPerformanceTable({ students }: StudentPerformanceTableProps) {
  const getInitials = (name: string | undefined) => {
    if (!name) return "N/A"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  if (!students || students.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No students found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student Code</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Class</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Grade</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const fullName = student.applicationUser?.fullName || "N/A"
            const initials = getInitials(fullName)
            const isActive = student.status === 1

            return (
              <tr key={student.studentId} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{fullName}</span>
                      <span className="text-xs text-muted-foreground">{student.applicationUser?.email || ""}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium">{student.studentCode || "N/A"}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-muted-foreground">{student.class || "N/A"}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-muted-foreground">{student.grade || "N/A"}</span>
                </td>
                <td className="py-4 px-4">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      isActive
                        ? "text-accent border-accent"
                        : "text-destructive border-destructive"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
