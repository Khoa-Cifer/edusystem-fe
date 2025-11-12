"use client"

import { useParams } from "next/navigation"
import { AnswerForm } from "@/components/answer-form"

export default function AddAnswerPage() {
  const params = useParams()
  const questionId = params.id as string

  return <AnswerForm questionId={questionId} />
}
