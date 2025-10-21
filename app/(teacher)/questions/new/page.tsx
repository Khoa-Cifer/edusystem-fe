import { DashboardLayout } from "@/components/dashboard-layout"
import { QuestionForm } from "@/components/question-form"

export default function NewQuestionPage() {
  return (
    <DashboardLayout role="teacher">
      <QuestionForm />
    </DashboardLayout>
  )
}
