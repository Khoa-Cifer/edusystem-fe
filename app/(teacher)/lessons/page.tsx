import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Search, Share2, Copy, MoreVertical, Filter } from "lucide-react"
import Link from "next/link"

export default function LessonsPage() {
  const lessons = [
    {
      id: 1,
      title: "Introduction to Algebra",
      subject: "Mathematics",
      grade: "Grade 9",
      lastEdited: "2 hours ago",
      isShared: true,
      sharedWith: 3,
    },
    {
      id: 2,
      title: "World War II Overview",
      subject: "History",
      grade: "Grade 11",
      lastEdited: "1 day ago",
      isShared: false,
      sharedWith: 0,
    },
    {
      id: 3,
      title: "Photosynthesis Process",
      subject: "Biology",
      grade: "Grade 10",
      lastEdited: "3 days ago",
      isShared: true,
      sharedWith: 5,
    },
    {
      id: 4,
      title: "Shakespeare's Hamlet",
      subject: "Literature",
      grade: "Grade 12",
      lastEdited: "1 week ago",
      isShared: false,
      sharedWith: 0,
    },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lesson Plans</h1>
            <p className="text-muted-foreground">Create and manage your lesson plans</p>
          </div>
          <Button asChild>
            <Link href="/lessons/new">
              <Plus className="w-4 h-4 mr-2" />
              New Lesson
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 bg-card border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search lessons..." className="pl-9 bg-background" />
            </div>
            <Button variant="outline" className="bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{lesson.title}</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  {lesson.subject}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {lesson.grade}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{lesson.lastEdited}</span>
                {lesson.isShared && (
                  <div className="flex items-center gap-1 text-accent">
                    <Share2 className="w-3 h-3" />
                    <span>{lesson.sharedWith}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                  <Link href={`/lessons/${lesson.id}`}>Edit</Link>
                </Button>
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Templates Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Lesson Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Standard Lesson", "Lab Activity", "Discussion", "Assessment"].map((template) => (
              <Card
                key={template}
                className="p-6 bg-card border-border border-dashed hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">{template}</h3>
                  <p className="text-xs text-muted-foreground">Use this template</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
