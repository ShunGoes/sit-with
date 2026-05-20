"use client"

import { Button } from "@/components/ui/button";
import { useModalStore } from "../store/use-modal-store";
import Chat from ".";
import { MessageCircle } from "lucide-react";

export default function ChatWrapper() {
  const openModal = useModalStore((state) => state.openModal);

  function handleOpenModal() {
    openModal("chat", <Chat />, {
      className: "!p-0 !overflow-hidden flex flex-col h-[85vh] md:h-[650px] !max-h-[85vh] w-full sm:!w-[500px] md:!w-[500px] !max-w-[95vw] sm:!max-w-[500px] rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-2xl",
    });
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleOpenModal}
        size="icon"
        className="h-14 w-14 rounded-full bg-brand-green hover:bg-[#527d42] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-none"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
