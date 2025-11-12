"use client"

import { useParams } from "next/navigation"
import { MatrixDetailForm } from "@/components/matrix-detail-form"

export default function EditMatrixDetailPage() {
  const params = useParams()
  const detailId = params.id as string

  return <MatrixDetailForm detailId={detailId} />
}
