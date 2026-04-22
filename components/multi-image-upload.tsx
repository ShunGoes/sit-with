"use client";

import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { X, ImageIcon, UploadCloud, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MultiImageUploadProps {
  onUpload: (files: File[]) => void;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  maxFiles?: number;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_MAX_FILES = 10;

export default function MultiImageUpload({
  onUpload,
  isLoading = false,
  className = "",
  disabled = false,
  maxFiles = DEFAULT_MAX_FILES,
}: MultiImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Manage preview URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const updatePreviews = (files: File[]) => {
    // Revoke old object URLs
    previewUrls.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });

    // Create new preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newPreviews);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"],
    },
    maxFiles,
    maxSize: DEFAULT_MAX_SIZE,
    multiple: true,
    disabled: disabled || isLoading,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const firstError = rejectedFiles[0].errors[0];
        if (firstError.code === "file-too-large") {
          setError(
            `Images must be smaller than ${Math.round(DEFAULT_MAX_SIZE / (1024 * 1024))}MB each`
          );
        } else if (firstError.code === "file-invalid-type") {
          setError("Please upload valid image files");
        } else if (firstError.code === "too-many-files") {
          setError(`You can upload a maximum of ${maxFiles} images`);
        } else {
          setError(firstError.message);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const newFiles = [...selectedFiles, ...acceptedFiles];
        if (newFiles.length > maxFiles) {
          setError(`You can upload a maximum of ${maxFiles} images`);
          return;
        }
        setSelectedFiles(newFiles);
        updatePreviews(newFiles);
      }
    },
  });

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    updatePreviews(newFiles);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one image");
      return;
    }
    onUpload(selectedFiles);
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
    updatePreviews([]);
    setError(null);
  };

  return (
    <div className={`w-full ${className}`}>
      {selectedFiles.length === 0 ? (
        // Upload State
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[200px] w-full
            ${
              isDragActive
                ? "border-[#0977BC] bg-blue-50/50"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300"
            }
            ${isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
          `}
        >
          <input {...getInputProps()} />

          <div
            className={`flex justify-center items-center mb-4 rounded-full p-4 ${
              isDragActive
                ? "bg-blue-100 text-[#0977BC]"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <UploadCloud size={32} strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <h3 className="text-[#151515] text-base font-semibold">
              {isDragActive
                ? "Drop your images here"
                : "Click or drag & drop images"}
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              PNG, JPG, JPEG, GIF, SVG (Max {Math.round(DEFAULT_MAX_SIZE / (1024 * 1024))}
              MB each, up to {maxFiles} images)
            </p>
          </div>
        </div>
      ) : (
        // Preview State
        <div className="space-y-4">
          {/* Preview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div
                key={index}
                className="relative group rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-sm aspect-square flex items-center justify-center"
              >
                {url ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-contain"
                      unoptimized={url.startsWith("blob:")}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <ImageIcon size={32} strokeWidth={1} />
                    <span className="text-xs">Preview unavailable</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 p-1.5 rounded-full shadow-md transition-all border border-gray-100"
                  title="Remove image"
                >
                  <X size={16} />
                </button>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Upload Controls */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <p className="text-sm text-gray-600">
              {selectedFiles.length} image{selectedFiles.length !== 1 ? "s" : ""} selected
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClearAll}
                disabled={isLoading}
              >
                Clear All
              </Button>
              <Button
                type="button"
                variant="regular"
                onClick={handleUpload}
                disabled={isLoading || selectedFiles.length === 0}
              >
                {isLoading ? "Uploading..." : "Upload Images"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-1">
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
