"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, FilePenLine, Trash2 } from "lucide-react";
import { useModalStore } from "@/components/store/use-modal-store";
import { Spinner } from "@/components/spinner";
import ModulesPanel from "./modules-panel";
import AddWeekModal from "./add-week-modal";
import AddModuleModal from "./add-module-modal";
import {
  useUpdateWeek,
  useDeleteWeek,
  useAddModuleToWeek,
  useUpdateModule,
  useDeleteModule,
} from "@/lib/api/hooks/programs/programs.hooks";
import { Badge } from "@/components/ui/badge";

interface ExistingWeekSectionProps {
  programId: string;
  week: any;
  index: number;
}

export default function ExistingWeekSection({
  programId,
  week,
  index,
}: ExistingWeekSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate: updateWeek, isPending: isUpdatingWeek } = useUpdateWeek(programId);
  const { mutate: deleteWeek, isPending: isDeletingWeek } = useDeleteWeek(programId);
  const { mutate: addModule, isPending: isAddingModule } = useAddModuleToWeek(programId);
  const { mutate: updateModule, isPending: isUpdatingModule } = useUpdateModule(programId);
  const { mutate: deleteModule, isPending: isDeletingModule } = useDeleteModule(programId);

  const isPending = isUpdatingWeek || isDeletingWeek || isAddingModule || isUpdatingModule || isDeletingModule;

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    } else {
        closeModal("loading");
    }
  }, [isPending, openModal, closeModal]);

  // --- Week Actions ---

  const handleEditWeek = () => {
    openModal(
      "edit-week",
      <AddWeekModal
        title="Edit Week"
        initialData={week}
        onAddWeek={(updatedWeekData) => {
          updateWeek({
            weekId: week.id,
            payload: {
              title: updatedWeekData.weekTitle,
              description: updatedWeekData.description,
              learningObjectives: updatedWeekData.learningObjectives,
            },
          });
        }}
      />
    );
  };

  const handleDeleteWeek = () => {
    if (window.confirm("Are you sure you want to delete this week? All modules inside will also be deleted.")) {
        deleteWeek(week.id);
    }
  };

  // --- Module Actions ---

  const handleAddModule = () => {
    openModal(
      "add-module",
      <AddModuleModal
        title="Add New Module"
        onAddModule={(moduleData) => {
          addModule({
            weekId: week.id,
            payload: {
               title: moduleData.title,
               description: moduleData.description,
               type: moduleData.type,
               duration: moduleData.duration,
               contentUrl: moduleData.contentUrl,
               embedCode: moduleData.embedCode
            },
          });
        }}
      />
    );
  };

  const handleEditModule = (moduleIndex: number) => {
    const mod = week.modules[moduleIndex];
    openModal(
      "edit-module",
      <AddModuleModal
        title="Edit Module"
        initialData={mod}
        onAddModule={(moduleData) => {
          updateModule({
            weekId: week.id,
            moduleId: mod.id,
            payload: {
               title: moduleData.title,
               description: moduleData.description,
               type: moduleData.type,
               duration: moduleData.duration,
               contentUrl: moduleData.contentUrl,
               embedCode: moduleData.embedCode
            },
          });
        }}
      />
    );
  };

  const handleDeleteModule = (moduleIndex: number) => {
    const mod = week.modules[moduleIndex];
    if (window.confirm(`Are you sure you want to delete the module: ${mod.title || mod.moduleTitle}?`)) {
        deleteModule({ weekId: week.id, moduleId: mod.id });
    }
  };

  return (
    <div className="bg-dash-secondary-bg rounded-[12px] p-5 border border-[#EAECF0] mb-4">
      {/* Week Header */}
      <div className="flex flex-col-reverse gap-3 md:flex-row items-start justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-secondary-text">
            Week {index + 1}
          </p>
          <p className="text-sm text-primary-text">
            {week.title || week.weekTitle || "Untitled"}
          </p>
          <p className="text-xs text-regular-button font-semibold">
            {week.modules?.length || 0} module
            {(week.modules?.length || 0) !== 1 ? "s" : ""}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant={week ? "success" : "default"} className="">
            {week.status || "Published"}
          </Badge>
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
             <button
                type="button"
                onClick={handleEditWeek}
                className="text-blue-500 hover:text-blue-700 cursor-pointer p-1"
                title="Edit week"
              >
               <FilePenLine size={16} />
              </button>
              <button
                type="button"
                onClick={handleDeleteWeek}
                className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                title="Delete week"
              >
                <Trash2 size={16} />
              </button>
          </div>
          <button className="text-[#667185]">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-[#EAECF0]">
          <ModulesPanel
            modules={week.modules || []}
            onAddModule={handleAddModule}
            onEditModule={handleEditModule}
            onRemoveModule={handleDeleteModule}
          />
        </div>
      )}
    </div>
  );
}
