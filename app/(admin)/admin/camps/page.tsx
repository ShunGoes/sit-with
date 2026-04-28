import CampsOverview from "@/components/admin/camps/camps-overview";
import { Suspense } from "react";

export default function CampsPage() {
  return (
    <Suspense fallback={<div>Loading camps...</div>}>
      <CampsOverview />
    </Suspense>
  );
}
