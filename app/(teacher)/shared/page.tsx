import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Search, Copy, Eye, Heart } from "lucide-react"

export default function SharedLessonsPage() {
  const sharedLessons = [
    {
      id: 1,
      title: "Advanced Calculus Techniques",
      author: "Dr. Emily Chen",
      authorInitials: "EC",
      subject: "Mathematics",
      grade: "Grade 12",
      likes: 24,
      views: 156,
      sharedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Climate Change and Its Effects",
      author: "Prof. Michael Brown",
      authorInitials: "MB",
      subject: "Science",
      grade: "Grade 10",
      likes: 18,
      views: 98,
      sharedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Renaissance Art History",
      author: "Sarah Williams",
      authorInitials: "SW",
      subject: "History",
      grade: "Grade 11",
      likes: 31,
      views: 203,
      sharedDate: "3 days ago",
    },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Shared Lessons</h1>
          <p className="text-muted-foreground">Discover and use lesson plans shared by other teachers</p>
        </div>

        {/* Search */}
        <Card className="p-4 bg-card border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search shared lessons..." className="pl-9 bg-background" />
          </div>
        </Card>

        {/* Shared Lessons List */}
        <div className="space-y-4">
          {sharedLessons.map((lesson) => (
            <Card key={lesson.id} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {lesson.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{lesson.author}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">{lesson.sharedDate}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {lesson.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {lesson.grade}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{lesson.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{lesson.views}</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <Button variant="outline" className="bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
