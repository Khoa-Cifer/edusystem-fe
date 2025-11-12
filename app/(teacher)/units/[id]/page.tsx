"use client"

import { useParams } from "next/navigation"
import { UnitForm } from "@/components/unit-form"

export default function EditUnitPage() {
  const params = useParams()
  const unitId = params.id as string

  return <UnitForm unitId={unitId} />
}
