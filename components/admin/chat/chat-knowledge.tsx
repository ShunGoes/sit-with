"use client";

import { useState, useRef } from "react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useReindexChatKnowledge } from "@/lib/api/hooks/admin/chat.hooks";
import { Spinner } from "@/components/spinner";

export default function ChatKnowledge() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: reindex, isPending } = useReindexChatKnowledge();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReindex = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    reindex(formData, {
      onSuccess: () => {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center">
        <DashboardHeaderText
          header="Chat Knowledge"
          subtext="Manage the AI assistant's knowledge base"
        />
      </div>

      <div className="max-w-2xl">
        <div className="bg-dash-secondary-bg rounded-[16px] p-8 border border-border">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-primary-text">
              Upload Knowledge Document
            </h3>
            <p className="text-sm text-secondary-text">
              Upload a document to update the chatbot's knowledge. Supported
              formats: .pdf, .doc, .docx, .txt
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-[12px] p-10 
                flex flex-col items-center justify-center gap-3 cursor-pointer
                transition-all duration-200
                ${
                  file
                    ? "border-brand-green bg-brand-green/5"
                    : "border-gray-200 dark:border-zinc-800 hover:border-brand-green/50 hover:bg-gray-50 dark:hover:bg-zinc-900"
                }
              `}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />

              {!file ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-dash-primary-bg flex items-center justify-center text-secondary-text">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-primary-text">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-secondary-text mt-1">
                      PDF, DOC, DOCX or TXT (max. 10MB)
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4 w-full bg-white dark:bg-zinc-950 p-4 rounded-lg border border-brand-green/20 shadow-sm relative animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-text truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-secondary-text">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <X size={18} className="text-secondary-text" />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                onClick={handleReindex}
                disabled={!file || isPending}
                variant="regular"
                className="w-full flex items-center justify-center gap-2 h-12 text-sm font-medium"
              >
                {isPending ? (
                  <>
                    <Spinner size={18} />
                    <span>Reindexing...</span>
                  </>
                ) : (
                  <span>Reindex Now</span>
                )}
              </Button>
            </div>

            {/* Helper text about the process */}
            <div className="flex gap-3 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
              <AlertCircle
                size={18}
                className="text-blue-500 shrink-0 mt-0.5"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                Reindexing will process the document and update the AI's
                response logic. This usually takes 30-60 seconds depending on
                document size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
