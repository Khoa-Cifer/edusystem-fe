import { DashboardLayout } from "@/components/dashboard-layout"
import { QuizBuilder } from "@/components/quiz-builder"

export default function NewQuizPage() {
  return (
    <DashboardLayout role="teacher">
      <QuizBuilder />
    </DashboardLayout>
  )
}
