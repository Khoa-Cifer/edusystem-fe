import { DashboardLayout } from "@/components/dashboard-layout"
import { LessonEditor } from "@/components/lesson-editor"

export default function EditLessonPage() {
  return (
    <DashboardLayout role="teacher">
      <LessonEditor
        initialData={{
          title: "Introduction to Algebra",
          subject: "Mathematics",
          grade: "Grade 9",
          content: "Sample lesson content...",
        }}
      />
    </DashboardLayout>
  )
}
