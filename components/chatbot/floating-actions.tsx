"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useModalStore } from "@/components/store/use-modal-store";
import Chat from "@/components/chatbot";

// WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WHATSAPP_LINK = "https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK"; 

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openModal = useModalStore((state) => state.openModal);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleOpenChat() {
    setIsOpen(false);
    openModal("chat", <Chat />, {
      className:
        "!p-0 !overflow-hidden flex flex-col h-[85vh] md:h-[650px] !max-h-[85vh] w-full sm:!w-[500px] md:!w-[500px] !max-w-[95vw] sm:!max-w-[500px] rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-2xl",
    });
  }

  function handleWhatsApp() {
    setIsOpen(false);
    window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
  }

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded action items */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* WhatsApp Action */}
        <button
          onClick={handleWhatsApp}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label="Join our WhatsApp community"
        >
          <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-medium text-[#344054] shadow-md border border-[#EAECF0] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp Community
          </span>
          <div className="h-12 w-12 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center">
            <WhatsAppIcon />
          </div>
        </button>

        {/* Chat Action */}
        <button
          onClick={handleOpenChat}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label="Open chatbot"
        >
          <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-medium text-[#344054] shadow-md border border-[#EAECF0] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with us
          </span>
          <div className="h-12 w-12 rounded-full bg-brand-green hover:bg-[#527d42] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center">
            <MessageCircle className="h-5 w-5" />
          </div>
        </button>
      </div>

      {/* Main FAB Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border-none ${
          isOpen
            ? "bg-[#344054] text-white rotate-0"
            : "bg-brand-green hover:bg-[#527d42] text-white"
        }`}
        aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300" />
        ) : (
          <MessageCircle className="h-6 w-6 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
