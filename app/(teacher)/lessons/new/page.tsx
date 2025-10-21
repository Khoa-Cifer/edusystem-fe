import { DashboardLayout } from "@/components/dashboard-layout"
import { LessonEditor } from "@/components/lesson-editor"

export default function NewLessonPage() {
  return (
    <DashboardLayout role="teacher">
      <LessonEditor />
    </DashboardLayout>
  )
}
