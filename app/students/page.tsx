import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Mail, MoreVertical } from "lucide-react"

export default function StudentsPage() {
  const students = [
    {
      name: "Emma Wilson",
      initials: "EW",
      email: "emma.wilson@school.edu",
      grade: "Grade 9",
      avgScore: 92,
      status: "Active",
    },
    {
      name: "James Chen",
      initials: "JC",
      email: "james.chen@school.edu",
      grade: "Grade 10",
      avgScore: 88,
      status: "Active",
    },
    {
      name: "Sarah Johnson",
      initials: "SJ",
      email: "sarah.j@school.edu",
      grade: "Grade 9",
      avgScore: 85,
      status: "Active",
    },
    {
      name: "Michael Brown",
      initials: "MB",
      email: "m.brown@school.edu",
      grade: "Grade 11",
      avgScore: 78,
      status: "Active",
    },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Students</h1>
            <p className="text-muted-foreground">Manage your students</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4 bg-card border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-9 bg-background" />
          </div>
        </Card>

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student, i) => (
            <Card key={i} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/10 text-primary">{student.initials}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <h3 className="font-semibold text-lg mb-1">{student.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Mail className="w-3 h-3" />
                <span className="truncate">{student.email}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{student.grade}</Badge>
                <Badge variant="outline" className="text-accent border-accent">
                  {student.status}
                </Badge>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Score</span>
                  <span className="text-lg font-semibold">{student.avgScore}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
