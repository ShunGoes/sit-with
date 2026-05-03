/**
 * DraftWeekCard — Renders the header card for a single draft week.
 *
 * Shows the week title, description, and a "Publish" button.
 * The Publish button triggers the mutation that sends this week's data to the API.
 * Shows a loading state while the mutation is in flight.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import type { DraftWeek } from "@/schemas/program-detail-schemas";

interface DraftWeekCardProps {
  week: DraftWeek;
  weekNumber: number;
  isPublishing: boolean;
  onPublish: () => void;
}

export default function DraftWeekCard({
  week,
  weekNumber,
  isPublishing,
  onPublish,
}: DraftWeekCardProps) {
  return (
    <div className="bg-dash-secondary-bg dark;border-none rounded-[12px] p-5 border border-[#EAECF0]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-primary-text font-semibold text-base">
            Week {weekNumber}: {week.weekTitle}
          </h3>
          {week.description && (
            <p className="text-sm text-[#667185]">{week.description}</p>
          )}
        </div>

        <Button
          type="button"
          variant="regular"
          size="sm"
          disabled={isPublishing}
          onClick={onPublish}
          className="min-w-[90px]"
        >
          {isPublishing ? <Spinner size={16} /> : "Publish"}
        </Button>
      </div>
    </div>
  );
}
