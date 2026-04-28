import TestimonialsOverview from "@/components/admin/testimonials/testimonials-overview";
import { Suspense } from "react";

export default function TestimonialsPage() {
  return (
    <Suspense fallback={<div>Loading testimonials...</div>}>
      <TestimonialsOverview />
    </Suspense>
  );
}
