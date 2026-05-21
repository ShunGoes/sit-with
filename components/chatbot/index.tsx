"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Sparkles, SendHorizontal, AlertCircle, Square, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useModalStore } from "../store/use-modal-store";

export default function Chat() {
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    experimental_throttle: 50,
  });
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log("chatbot messages",messages)
  const closeModal = useModalStore(state => state.closeModal)

  // Automatically scroll to bottom on new messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const handleSuggestedPrompt = (text: string) => {
    sendMessage({ text });
  };

  const renderMessageContent = (message: any) => {
    if (message.parts && Array.isArray(message.parts)) {
      return message.parts.map((part: any, index: number) => {
        if (part.type === "text") {
          return <span key={index}>{part.text}</span>;
        }
        return null;
      });
    }
    return <span>{message.content}</span>;
  };

  const suggestedPrompts = [
    { text: "What is presence-based healing?", icon: "🌱" },
    { text: "How do I book a consultation?", icon: "📅" },
    { text: "Tell me about therapeutic camps.", icon: "⛺" },
    { text: "What programs do you offer?", icon: "📚" },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100">
      {/* Sleek Custom Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10">
        <div className="flex items-center gap-3 ">
          <div className="h-12 w-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green border border-brand-green/20">
            <Image
              src="/images/logo-icon.png"
              alt="Sit With PD Logo"
              width={30}
              height={30}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-[15px] leading-tight text-gray-900 dark:text-white">
              Sit With PD
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-medium text-gray-500 dark:text-zinc-400">
                Online Assistant
              </span>
            </div>
          </div>
        </div>
        {/* Generous space is left on the right to cleanly fit the modal close button */}
        <div className="w-12  bg-black" />
        <div>
            <Button className="text-primary-text border-none" variant={"outline"} onClick={() => closeModal("chat")}>
                <X />
            </Button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 dark:bg-zinc-950/20 scrollbar-hide">
        {messages.length === 0 ? (
          /* Premium Onboarding Welcome State */
          <div className="flex flex-col items-center  justify-center h-full text-center p-6 my-auto">
            <div className="w-[140px] aspect-video relative  ">
              <Image
                src="/images/light-mode-logo.png"
                alt="Sit With PD Logo"
                fill
                className="object-contain "
              />
            </div>
            {/* <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
              Welcome to Sit With PD
            </h3> */}
            <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
              Hi! I'm here to support your journey. Ask me anything about our
              presence-based healing, camps, programs, or consultation bookings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedPrompt(prompt.text)}
                  className="flex items-center gap-2 px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 hover:border-brand-green/50 dark:hover:border-brand-green/50 hover:bg-brand-green/5 dark:hover:bg-brand-green/5 rounded-xl text-xs font-medium text-left text-gray-700 dark:text-zinc-300 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md cursor-pointer"
                >
                  <span className="text-sm">{prompt.icon}</span>
                  <span>{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isUser = message.role === "user";
            return (
              <div
                key={message.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1.5`}
              >
                {/* Bubble */}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm border whitespace-pre-wrap ${
                    isUser
                      ? "bg-brand-green text-white border-brand-green rounded-tr-sm"
                      : "bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 border-gray-100 dark:border-zinc-800/80 rounded-tl-sm"
                  }`}
                >
                  {renderMessageContent(message)}
                </div>
                {/* Speaker Label */}
                <span className="text-[10px] text-gray-400 dark:text-zinc-500 px-1">
                  {isUser ? "You" : "Sit With PD"}
                </span>
              </div>
            );
          })
        )}

        {/* WhatsApp-style typing indicator */}
        {status === "submitted" && (
          <div className="flex flex-col items-start gap-1.5 self-start mr-auto animate-fade-in">
            <div className="px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1 w-16 justify-center">
              <span
                className="w-1.5 h-1.5 bg-[#60935D] rounded-full animate-bounce"
                style={{ animationDelay: "0ms", animationDuration: "0.8s" }}
              />
              <span
                className="w-1.5 h-1.5 bg-[#60935D] rounded-full animate-bounce"
                style={{ animationDelay: "150ms", animationDuration: "0.8s" }}
              />
              <span
                className="w-1.5 h-1.5 bg-[#60935D] rounded-full animate-bounce"
                style={{ animationDelay: "300ms", animationDuration: "0.8s" }}
              />
            </div>
            <span className="text-[10px] text-gray-400 dark:text-zinc-500 px-1">
              Sit With PD is typing
            </span>
          </div>
        )}

        {/* Floating stop/streaming control at the bottom of the message container */}
        {status === "streaming" && (
          <div className="flex justify-center animate-fade-in py-1">
            <button
              type="button"
              onClick={() => stop()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-850 border border-gray-250 dark:border-zinc-700 rounded-full text-xs font-semibold text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
            >
              <Square className="h-3 w-3 fill-gray-600 dark:fill-zinc-300 stroke-none" />
              Stop Generating
            </button>
          </div>
        )}

        {/* Error notification and retry control */}
        {error && (
          <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-xl text-center gap-2 m-4 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              An error occurred while connecting to the assistant.
            </p>
            <button
              type="button"
              onClick={() => regenerate()}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer hover:scale-102"
            >
              Retry Response
            </button>
          </div>
        )}

        {/* Scrolling target anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Sticky Footer */}
      <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-850">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={
              status !== "ready" &&
              status !== "submitted" &&
              status !== "streaming"
            }
            placeholder="What's on your mind?"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:ring-1.5 focus:ring-brand-green/30 focus:border-brand-green disabled:opacity-50 transition-all text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={!input.trim() || status !== "ready"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-green hover:bg-[#527d42] text-white disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-400 dark:disabled:text-zinc-600 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-400 dark:text-zinc-500 mt-2">
          Sit With PD assistant can make mistakes. Please verify important info.
        </p>
      </div>
    </div>
  );
}
