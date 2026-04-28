import ProgramOverview from "@/components/admin/prorams/program-overview";
import { Suspense } from "react";

export default function ProgramPage() {
  return (
    <div className="space-y-12">
      <Suspense fallback={<div>Loading programs...</div>}>
        <ProgramOverview />
      </Suspense>
    </div>
  )
}
