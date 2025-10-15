import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Eye } from "lucide-react"

export function StudentPerformanceTable() {
  const students = [
    {
      name: "Emma Wilson",
      initials: "EW",
      avgScore: 92,
      quizzesCompleted: 18,
      lastActive: "2 hours ago",
      trend: 5,
    },
    {
      name: "James Chen",
      initials: "JC",
      avgScore: 88,
      quizzesCompleted: 16,
      lastActive: "1 day ago",
      trend: 3,
    },
    {
      name: "Sarah Johnson",
      initials: "SJ",
      avgScore: 85,
      quizzesCompleted: 17,
      lastActive: "5 hours ago",
      trend: -2,
    },
    {
      name: "Michael Brown",
      initials: "MB",
      avgScore: 78,
      quizzesCompleted: 15,
      lastActive: "3 days ago",
      trend: 1,
    },
    {
      name: "Emily Davis",
      initials: "ED",
      avgScore: 56,
      quizzesCompleted: 12,
      lastActive: "1 week ago",
      trend: -8,
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Avg Score</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quizzes</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Active</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">{student.initials}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student.name}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{student.avgScore}%</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      student.avgScore >= 80
                        ? "text-accent border-accent"
                        : student.avgScore >= 60
                          ? "text-chart-3 border-chart-3"
                          : "text-destructive border-destructive"
                    }`}
                  >
                    {student.avgScore >= 80 ? "Excellent" : student.avgScore >= 60 ? "Good" : "At Risk"}
                  </Badge>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-muted-foreground">{student.quizzesCompleted}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-1">
                  {student.trend >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-accent" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <span className={student.trend >= 0 ? "text-accent" : "text-destructive"}>
                    {student.trend >= 0 ? "+" : ""}
                    {student.trend}%
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-muted-foreground">{student.lastActive}</span>
              </td>
              <td className="py-4 px-4 text-right">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
