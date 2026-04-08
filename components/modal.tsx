"use client";

import { useModalStore } from "./store/use-modal-store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export const Modal = () => {
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modals.length > 0) {
        const lastModal = modals[modals.length - 1];
        if (!lastModal.options?.isMutation) {
          closeModal(lastModal.id);
        }
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [modals, closeModal]);

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map((modal, index) => (
        <div
          key={`${modal.id}_${index}`}
          className="fixed inset-0  flex items-center justify-center"
          style={{ zIndex: 50 + index }}
        >
          {/* Overlay */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none backdrop-blur-",
              modal.options?.isMutation ? "bg-[#1c1c1c]/40" : "bg-black/20",
            )}
            onClick={() => !modal.options?.isMutation && closeModal(modal.id)}
          />

          {/* Modal Content */}
          <div
            className={`relative z-10 m-4 ${
              modal.options?.variant === "lightbox"
                ? "w-full h-full flex items-center justify-center pointer-events-none" // Lightbox specific styles
                : "max-w-full w-full sm:w-9/12 md:w-10/12 md:max-w-[600px] h-auto max-h-[90vh] bg-white p-6 overflow-y-auto scrollbar-hide dark:bg-gray-900 rounded-sm" // Default styles
            } ${modal.options?.className || ""}`}
          >
            {/* Close Button logic remains handled by specific modal contents if needed, or we can add global close here if requested later */}

            {/* Children Content */}
            {!modal.options?.isMutation && (
              <div className="absolute top-6 right-6 md:hover:bg-muted rounded-full md:h-10 md:w-10 transition-all flex items-center justify-center cursor-pointer md:hover:shadow-lg ">
                <X onClick={() => closeModal(modal.id)} />
              </div>
            )}

            <div
              className={
                modal.options?.variant === "lightbox"
                  ? "pointer-events-auto"
                  : ""
              }
            >
              {modal.content}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
