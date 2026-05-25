import ChatKnowledge from "@/components/admin/chat/chat-knowledge";
import { Suspense } from "react";

export const metadata = {
  title: "Chat Knowledge | Sit With PD Admin",
  description: "Manage the AI assistant's knowledge base",
};

export default function ChatKnowledgePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          Loading Chat Knowledge...
        </div>
      }
    >
      <ChatKnowledge />
    </Suspense>
  );
}
