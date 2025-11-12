"use client"

import { useParams } from "next/navigation"
import { LessonContentForm } from "@/components/lesson-content-form"

export default function AddLessonContentPage() {
  const params = useParams()
  const lessonId = params.id as string

  return <LessonContentForm lessonId={lessonId} />
}
