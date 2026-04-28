import ConsultationOverview from '@/components/admin/consultation/consultation-overview'
import React, { Suspense } from 'react'

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div>Loading consultations...</div>}>
      <ConsultationOverview />
    </Suspense>
  )
}
