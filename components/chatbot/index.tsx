"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Sparkles, SendHorizontal, AlertCircle, Square, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useModalStore } from "../store/use-modal-store";
import {
  useGetChatConfig,
  useCreateChatSession,
} from "@/lib/api/hooks/chat/chat.hooks";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: { label: string; path: string }[];
};

const PROMPT_ICONS = ["🌱", "📅", "⛺", "📚", "💬", "🔍", "❓", "🧘"];

export default function Chat() {
  // Group 1 — chat operation state
  const [chatState, setChatState] = useState<{
    status: "idle" | "loading" | "streaming" | "error";
    error: string | null;
    sessionId: string | null;
  }>({
    status: "idle",
    error: null,
    sessionId: null,
  });

  // Group 2 — config from backend
  const [uiConfig, setUiConfig] = useState<{
    intro: string;
    disclaimerShort: string;
    suggestedPrompts: string[];
    streamingEnabled: boolean;
  } | null>(null);

  // Individual states
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const closeModal = useModalStore((state) => state.closeModal);

  const { data: configData, isError: isConfigError, error: configError } = useGetChatConfig();
  const { mutateAsync: createSession } = useCreateChatSession();

  // Robust body scroll lock for all platforms (including iOS Safari)
  useEffect(() => {
    const scrollY = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    // Lock
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      // Restore
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Initialization: Fetch config and create session
  // We use a single useEffect here because the session creation depends on the config being available
  // and we want to ensure everything happens in a controlled sequence on mount.
  useEffect(() => {
    const initializeChat = async () => {
      // 1. Fetch config (handled by useGetChatConfig, but we act when it arrives)
      if (configData) {
        // 2. Store config in uiConfig state
        setUiConfig({
          intro: configData.data.intro,
          disclaimerShort: configData.data.disclaimerShort,
          suggestedPrompts: configData.data.suggestedPrompts,
          streamingEnabled: configData.data.streamingEnabled,
        });

        // 3. Set first assistant message using config.intro
        if (messages.length === 0 && configData.data.intro) {
          setMessages([
            {
              id: "intro-msg",
              role: "assistant",
              content: configData.data.intro,
            },
          ]);
        }

        // 4. Create chat session
        try {
          const sessionResponse = await createSession();
          // 5. Store sessionId
          setChatState((prev) => ({
            ...prev,
            sessionId: sessionResponse.data.sessionId,
          }));
        } catch (err: any) {
          setChatState((prev) => ({
            ...prev,
            status: "error",
            error:
              "Could not start the assistant. Please close and reopen the chat.",
          }));
        }
      }
    };

    initializeChat();

    if (isConfigError) {
      setChatState((prev) => ({
        ...prev,
        status: "error",
        error: configError?.message,
      }));
    }
  }, [configData, isConfigError, createSession]);

  // Automatically scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatState.status]);

  // Handle sending messages
  const handleSend = async (text: string) => {
    // Guard clauses
    if (!text.trim()) return;
    if (chatState.status === "loading" || chatState.status === "streaming")
      return;
    if (!chatState.sessionId) return;

    // 1. Add user message immediately
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);

    // 2. Store for regenerate
    setLastUserMessage(text);

    // 3. Clear input
    setInput("");

    // 4. Set loading state
    setChatState((prev) => ({ ...prev, status: "loading", error: null }));

    // 5. Create abort controller
    abortControllerRef.current = new AbortController();

    // 6. Add empty assistant message placeholder
    const assistantMessageId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      },
    ]);

    try {
      const response = await fetch(
        `/api/chat/sessions/${chatState.sessionId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          signal: abortControllerRef.current.signal,
          body: JSON.stringify({ message: text, stream: true }),
        },
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.message || "Something went wrong. Please try again.",
        );
      }

      // 7. Set streaming status
      setChatState((prev) => ({ ...prev, status: "streaming" }));

      // 8. Read SSE stream
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const dataStr = line.replace("data: ", "").trim();
          if (dataStr === "[DONE]") {
            setChatState((prev) => ({ ...prev, status: "idle" }));
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            let chunkText = "";

            // Check for text updates in common SSE formats
            if (typeof parsed === "string") {
              chunkText = parsed;
            } else if (parsed.content) {
              chunkText = parsed.content;
            } else if (parsed.delta) {
              chunkText = parsed.delta;
            } else if (parsed.data?.reply?.content) {
              chunkText = parsed.data.reply.content;
            }

            // Check for links, sources or related structured data
            const rawLinks =
              parsed.links || parsed.sources || parsed.data?.reply?.links;
            if (rawLinks && Array.isArray(rawLinks)) {
              const formattedLinks = rawLinks.map((l: any) => ({
                label: l.label || l.title || "Link",
                path: l.path || l.url || "#",
              }));
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, links: formattedLinks }
                    : msg,
                ),
              );
            }

            // Only append if we actually found a text chunk
            if (chunkText) {
              assistantContent += chunkText;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: assistantContent }
                    : msg,
                ),
              );
            }
          } catch (e) {
            // If it's not JSON, it might just be the raw content
            // We only append it if it doesn't look like JSON to avoid UI pollution
            if (!dataStr.startsWith("{") && !dataStr.startsWith("[")) {
              assistantContent += dataStr;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: assistantContent }
                    : msg,
                ),
              );
            }
          }
        }
      }

      setChatState((prev) => ({ ...prev, status: "idle" }));
    } catch (err: any) {
      if (err.name === "AbortError") {
        setChatState((prev) => ({ ...prev, status: "idle" }));
        return;
      }
      setChatState((prev) => ({
        ...prev,
        status: "error",
        error: err.message || "Something went wrong. Please try again.",
      }));
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setChatState((prev) => ({ ...prev, status: "idle" }));
  };

  const handleRegenerate = () => {
    setChatState((prev) => ({ ...prev, error: null }));
    // Remove the failed assistant message and resend
    setMessages((prev) => prev.slice(0, -1));
    handleSend(lastUserMessage);
  };

  const handleSuggestedPrompt = (text: string) => {
    handleSend(text);
  };

  const renderContent = (content: string) => {
    // Basic markdown link parsing: [label](path)
    const parts = content.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            className="text-brand-green font-medium underline hover:opacity-80 transition break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[1]}
          </a>
        );
      }
      return part;
    });
  };

  const suggestedPrompts = useMemo(() => {
    if (!uiConfig?.suggestedPrompts) return [];
    return uiConfig.suggestedPrompts.map((text, index) => ({
      text,
      icon: PROMPT_ICONS[index % PROMPT_ICONS.length],
    }));
  }, [uiConfig]);

  return (
    <div className="flex flex-col h-full max-h-dvh w-full bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 overflow-hidden">
      {/* Sleek Custom Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10 shrink-0">
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
        <div className="w-12  bg-black" />
        <div>
          <Button
            className="text-primary-text border-none"
            variant={"outline"}
            onClick={() => closeModal("chat")}
          >
            <X />
          </Button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 dark:bg-zinc-950/20 scrollbar-hide overscroll-contain">
        {messages.length === 0 && !chatState.error ? (
          /* Premium Onboarding Welcome State */
          <div className="flex flex-col items-center justify-center h-full text-center p-6 my-auto">
            <div className="w-[140px] aspect-video relative">
              <Image
                src="/images/light-mode-logo.png"
                alt="Sit With PD Logo"
                fill
                className="object-contain"
              />
            </div>
            {/* Suggested prompts if session is still loading/on display */}
            {suggestedPrompts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md mt-6">
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
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1.5`}
                >
                  {/* Bubble */}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm border whitespace-pre-wrap wrap-break-word overflow-hidden ${
                      isUser
                        ? "bg-brand-green text-white border-brand-green rounded-tr-sm"
                        : "bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 border-gray-100 dark:border-zinc-800/80 rounded-tl-sm"
                    }`}
                  >
                    <span>{renderContent(message.content)}</span>
                    {/* Render links below assistant message content */}
                    {!isUser && message.links && message.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.path}
                            className="text-xs text-brand-green underline hover:opacity-80 transition"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Speaker Label */}
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500 px-1">
                    {isUser ? "You" : "Sit With PD"}
                  </span>
                </div>
              );
            })}

            {/* Suggested prompts shown after the intro message if user hasn't messaged yet */}
            {messages.length === 1 &&
              !chatState.status.includes("streaming") &&
              suggestedPrompts.length > 0 && (
                <div className="flex flex-col items-center justify-center p-6 my-auto pt-2">
                  <div className="w-[100px] aspect-video relative opacity-50 mb-4">
                    <Image
                      src="/images/light-mode-logo.png"
                      alt="Sit With PD Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
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
              )}
          </>
        )}

        {/* WhatsApp-style typing indicator */}
        {chatState.status === "loading" && (
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
        {chatState.status === "streaming" && (
          <div className="flex justify-center animate-fade-in py-1">
            <button
              type="button"
              onClick={handleStop}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-850 border border-gray-250 dark:border-zinc-700 rounded-full text-xs font-semibold text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
            >
              <Square className="h-3 w-3 fill-gray-600 dark:fill-zinc-300 stroke-none" />
              Stop Generating
            </button>
          </div>
        )}

        {/* Error notification and retry control */}
        {chatState.error && (
          <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-xl text-center gap-2 m-4 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              {chatState.error}
            </p>
            {/* Show retry button only if it was a message send error, not a session error */}
            {chatState.status === "error" && lastUserMessage && (
              <button
                type="button"
                onClick={handleRegenerate}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer hover:scale-102"
              >
                Retry Response
              </button>
            )}
          </div>
        )}

        {/* Scrolling target anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Sticky Footer */}
      <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-850">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="relative flex items-center"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={
              chatState.status === "loading" || chatState.status === "streaming"
            }
            placeholder="What's on your mind?"
            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:ring-1.5 focus:ring-brand-green/30 focus:border-brand-green disabled:opacity-50 transition-all text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={!input.trim() || chatState.status !== "idle"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-green hover:bg-[#527d42] text-white disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:text-gray-400 dark:disabled:text-zinc-600 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-400 dark:text-zinc-500 mt-2">
          {uiConfig?.disclaimerShort ||
            "Sit With PD assistant can make mistakes. Please verify important info."}
        </p>
      </div>
    </div>
  );
}
