/**
 * ProgramDetailClient — Client component for the Program Details page.
 *
 * Architecture:
 * - Fetches the program via useGetProgramById to display existing weeks.
 * - Manages an array of DraftWeek objects in page-level useState.
 * - Draft weeks exist only in local state — no API call until "Publish" is clicked.
 * - Each modal (AddWeekModal, AddModuleModal) has its own scoped useForm instance.
 * - The "Publish" button triggers usePublishWeek which POSTs the week + modules.
 * - On publish success: the draft is removed from state, and the program query
 *   is invalidated so the published week appears in the "Program Weeks" list.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft } from "lucide-react";
import { useGetProgramById } from "@/lib/api/hooks/programs/programs.hooks";
import { useModalStore } from "@/components/store/use-modal-store";
import AddWeekModal from "@/components/admin/program-detail/add-week-modal";
import DraftWeekSection from "@/components/admin/program-detail/draft-week-section";
import ExistingWeekSection from "@/components/admin/program-detail/existing-week-section";
import type { DraftWeek, DraftModule } from "@/schemas/program-detail-schemas";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";

interface ProgramDetailClientProps {
  programId: string;
}

export default function ProgramDetailClient({
  programId,
}: ProgramDetailClientProps) {
  const { data: program, isLoading } = useGetProgramById(programId);
  const openModal = useModalStore((state) => state.openModal);

console.log(program)
  // Page-level draft state — weeks built locally before publishing
  const [draftWeeks, setDraftWeeks] = useState<DraftWeek[]>([]);

  // ---------- Draft week handlers ----------

  // passed to modal to add the form entries to draft state
  const handleAddWeek = (week: DraftWeek) => {
    setDraftWeeks((prev) => [...prev, week]);
  };

  const handleAddModule = (weekId: string, module: DraftModule) => {
    setDraftWeeks((prev) =>
      prev.map((w) =>
        w.id === weekId ? { ...w, modules: [...w.modules, module] } : w,
      ),
    );
  };

  const handleRemoveModule = (weekId: string, moduleIndex: number) => {
    setDraftWeeks((prev) =>
      prev.map((w) =>
        w.id === weekId
          ? { ...w, modules: w.modules.filter((_, i) => i !== moduleIndex) }
          : w,
      ),
    );
  };

  // Called after a successful publish — removes the draft from local state
  const handlePublishSuccess = (weekId: string) => {
    setDraftWeeks((prev) => prev.filter((w) => w.id !== weekId));
  };

  const handleOpenAddWeek = () => {
    openModal("add-week", <AddWeekModal onAddWeek={handleAddWeek} />);
  };

  // ---------- Derived values ----------

  // Existing weeks from the API (the "Program Weeks" list)
  const existingWeeks: any[] = (program?.data as any)?.weeks || [];

  // The week number for new drafts starts after the last existing + draft week
  const totalExistingWeeks = existingWeeks.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm text-[#667185]">Loading program...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back link + header */}
      <div>
        <div className="flex items-start justify-between">
          <DashboardHeaderText
            header={program?.data?.title || "Program Details"}
            subtext="Manage weekly content and modules"
            backLink="/admin/program"
            backLinkText="Back to Programs"
          />

          <Button type="button" variant="regular" onClick={handleOpenAddWeek}>
            <Plus className="h-4 w-4" />
            Add Week
          </Button>
        </div>
      </div>

      {/* ===== Existing Program Weeks (from API) ===== */}
      <div className="bg-white rounded-[12px] p-5 border border-[#EAECF0]">
        <h3 className="text-primary-text font-semibold text-base mb-4">
          Program Weeks
        </h3>

        {existingWeeks.length === 0 ? (
          <div className="flex items-center justify-center border border-dashed border-[#EAECF0] rounded-[10px] py-10">
            <p className="text-sm text-[#667185]">
              No weeks published yet. Add a week and publish it to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {existingWeeks.map((week: any, index: number) => (
              <ExistingWeekSection
                key={week.id || index}
                programId={programId}
                week={week}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* ===== Empty state when no drafts and no existing weeks have modules ===== */}
      {draftWeeks.length === 0 && (
        <div className="bg-white rounded-[12px] p-5 border border-dashed border-[#EAECF0]">
          <p className="text-sm text-[#667185] text-center py-4">
            Select a week to view and manage its modules
          </p>
        </div>
      )}

      {/* ===== Draft Week Sections (local state, not yet published) ===== */}
      {draftWeeks.map((week, index) => (
        <DraftWeekSection
          key={week.id}
          programId={programId}
          week={week}
          weekNumber={totalExistingWeeks + index + 1}
          onAddModule={handleAddModule}
          onRemoveModule={handleRemoveModule}
          onPublishSuccess={handlePublishSuccess}
        />
      ))}
    </div>
  );
}
