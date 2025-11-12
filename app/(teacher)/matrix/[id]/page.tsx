"use client"

import { useParams } from "next/navigation"
import { MatrixForm } from "@/components/matrix-form"

export default function EditMatrixPage() {
  const params = useParams()
  const matrixId = params.id as string

  return <MatrixForm matrixId={matrixId} />
}
