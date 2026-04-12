"use client";

import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { X, ImageIcon, UploadCloud } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageUpload({
  value,
  onChange,
  maxSize = DEFAULT_MAX_SIZE,
  className = "",
  disabled = false,
}: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Safely manage object URLs to avoid memory leaks and React Strict Mode bugs
  useEffect(() => {
    let objectUrl: string | null = null;

    if (value && value instanceof File) {
      objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
    } else if (typeof value === "string") {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"],
    },
    maxFiles: 1,
    maxSize,
    multiple: false,
    disabled: disabled || !!value,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const firstError = rejectedFiles[0].errors[0];
        if (firstError.code === "file-too-large") {
          setError(
            `Image must be smaller than ${Math.round(maxSize / (1024 * 1024))}MB`,
          );
        } else if (firstError.code === "file-invalid-type") {
          setError("Please upload a valid image file");
        } else {
          setError(firstError.message);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onChange?.(acceptedFiles[0]);
      }
    },
  });

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    setError(null);
  };

  return (
    <div className={`w-full ${className}`}>
      {value ? (
        // Preview State
        <div className="relative group rounded-xl border border-gray-200 bg-gray-50 overflow-hidden shadow-sm aspect-video sm:aspect-2/1 w-full max-w-2xl mx-auto flex items-center justify-center">
          {previewUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized={previewUrl.startsWith("blob:")}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <ImageIcon size={48} strokeWidth={1} />
              <span className="text-sm">Preview unavailable</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleClear}
            className="absolute top-3 right-3 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 p-2 rounded-full shadow-md transition-all border border-gray-100"
            title="Remove image"
          >
            <X size={18} />
          </button>

          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
            <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-medium text-gray-700 shadow-sm">
              Click &apos;X&apos; to change image
            </span>
          </div>
        </div>
      ) : (
        // Upload State
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[200px] w-full max-w-2xl mx-auto
            ${
              isDragActive
                ? "border-[#0977BC] bg-blue-50/50"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300"
            }
            ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
          `}
        >
          <input {...getInputProps()} />

          <div
            className={`flex justify-center items-center mb-4 rounded-full p-4 ${isDragActive ? "bg-blue-100 text-[#0977BC]" : "bg-gray-100 text-gray-400"}`}
          >
            <UploadCloud size={32} strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <h3 className="text-[#151515] text-base font-semibold">
              {isDragActive
                ? "Drop your image here"
                : "Click or drag & drop image"}
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              PNG, JPG, JPEG, or SVG (Max {Math.round(maxSize / (1024 * 1024))}
              MB)
            </p>
          </div>
        </div>
      )}

      {/* error messages */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-1 max-w-2xl mx-auto">
          <p className="text-sm font-medium text-red-600 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
