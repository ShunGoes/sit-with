import ConsultationServicesOverview from "@/components/admin/consultation/consultation-services-overview";
import { Suspense } from "react";

export default function ConsultationServicesPage() {
  return (
    <div className="space-y-12">
      <Suspense fallback={<div>Loading consultation services...</div>}>
        <ConsultationServicesOverview />
      </Suspense>
    </div>
  );
}
