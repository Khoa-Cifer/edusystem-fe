import { DashboardLayout } from "@/components/dashboard-layout"
import { ReviewSession } from "@/components/review-session"

export default function ReviewSessionPage() {
  return (
    <DashboardLayout role="student">
      <ReviewSession />
    </DashboardLayout>
  )
}
