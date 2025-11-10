"use client"
import { LessonEditor } from "@/components/lesson-editor"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useParams } from "next/navigation"

export default function EditLessonPage() {
  const params = useParams()
  const rawLessonId = params.id
const lessonId = Array.isArray(rawLessonId) ? rawLessonId[0] : rawLessonId



  const initialData = {
    title: "Sample Lesson",
    subject: "Mathematics",
    grade: "Grade 9",
    content: `Editing lesson with ID: ${lessonId}`,
  }

  return (
    <DashboardLayout role="teacher">
      <LessonEditor lessonId={lessonId} initialData={initialData} />
    </DashboardLayout>
  )
}
