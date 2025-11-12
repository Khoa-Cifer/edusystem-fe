"use client"

import { useParams } from "next/navigation"
import { MatrixDetailForm } from "@/components/matrix-detail-form"

export default function AddMatrixDetailPage() {
  const params = useParams()
  const matrixId = params.id as string

  return <MatrixDetailForm matrixId={matrixId} />
}
