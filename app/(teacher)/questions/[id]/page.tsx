"use client"

import { useParams } from "next/navigation"
import { QuestionForm } from "@/components/question-form"

export default function EditQuestionPage() {
  const params = useParams()
  const questionId = params.id as string

  return <QuestionForm questionId={questionId} />
}
