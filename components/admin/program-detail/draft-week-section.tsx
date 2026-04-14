/**
 * DraftWeekSection — Composes DraftWeekCard + ModulesPanel for a single draft week.
 *
 * Architecture:
 * - Receives the DraftWeek data, weekNumber, and callbacks from the page.
 * - Opens modals via the Zustand modal store.
 * - Handles the publish mutation: on success, calls onPublishSuccess to
 *   remove this week from the page-level draft state.
 */

"use client";

import { useModalStore } from "@/components/store/use-modal-store";
import { usePublishWeek } from "@/lib/api/hooks/programs/programs.hooks";
import type { DraftWeek, DraftModule } from "@/schemas/program-detail-schemas";
import DraftWeekCard from "./draft-week-card";
import ModulesPanel from "./modules-panel";
import AddModuleModal from "./add-module-modal";

interface DraftWeekSectionProps {
  programId: string;
  week: DraftWeek;
  weekNumber: number;
  onAddModule: (weekId: string, module: DraftModule) => void;
  onRemoveModule: (weekId: string, moduleIndex: number) => void;
  onPublishSuccess: (weekId: string) => void;
}

export default function DraftWeekSection({
  programId,
  week,
  weekNumber,
  onAddModule,
  onRemoveModule,
  onPublishSuccess,
}: DraftWeekSectionProps) {
  const openModal = useModalStore((state) => state.openModal);
  const { mutate, isPending } = usePublishWeek(programId);

  const handlePublish = () => {
    // Build the API payload — strip the local-only `id` field
    const payload = {
      weekTitle: week.weekTitle,
      description: week.description,
      learningObjectives: week.learningObjectives,
      modules: week.modules,
    };

    mutate(payload, {
      onSuccess: () => {
        onPublishSuccess(week.id);
      },
    });
  };

  const handleOpenAddModule = () => {
    openModal(
      "add-module",
      <AddModuleModal
        onAddModule={(module) => onAddModule(week.id, module)}
      />
    );
  };

  return (
    <div className="space-y-4">
      <DraftWeekCard
        week={week}
        weekNumber={weekNumber}
        isPublishing={isPending}
        onPublish={handlePublish}
      />
      <ModulesPanel
        modules={week.modules}
        onAddModule={handleOpenAddModule}
        onRemoveModule={(moduleIndex) => onRemoveModule(week.id, moduleIndex)}
      />
    </div>
  );
}
