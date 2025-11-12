"use client"

import { useParams } from "next/navigation"
import { AnswerForm } from "@/components/answer-form"

export default function EditAnswerPage() {
  const params = useParams()
  const answerId = params.id as string

  return <AnswerForm answerId={answerId} />
}
