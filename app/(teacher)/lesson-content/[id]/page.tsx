"use client"

import { useParams } from "next/navigation"
import { LessonContentForm } from "@/components/lesson-content-form"

export default function EditLessonContentPage() {
  const params = useParams()
  const contentId = params.id as string

  return <LessonContentForm contentId={contentId} />
}
