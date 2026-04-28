import ParticipantsOverview from "@/components/admin/participants/participants-overview";
import { Suspense } from "react";

export default function ParticipantsPage() {
  return (
    <Suspense fallback={<div>Loading participants...</div>}>
      <ParticipantsOverview />
    </Suspense>
  )
}
