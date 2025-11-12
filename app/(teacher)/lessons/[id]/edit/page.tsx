"use client"

import { useParams } from "next/navigation"
import { LessonForm } from "@/components/lesson-form"

export default function EditLessonPage() {
  const params = useParams()
  const lessonId = params.id as string

  return <LessonForm lessonId={lessonId} />
}
