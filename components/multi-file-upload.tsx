"use client";

import { useDropzone } 
import {  useState } from "react";

interface FileUploadProps {
}

const MAX_VIDEO_AUDIO_SIZE = 1000 * 1024 * 1024;
const MAX_IMAGE_PDF_SIZE = 300 * 1024 * 1024;
const MAX_FILES = 10;

export default function UploadMultipleFIlesAtOnce({
}: FileUploadProps) {
  const [coverImage] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const { mutate } = useCreateMedia();

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"],
        "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
        "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/vnd.ms-excel": [".xls"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "text/plain": [".txt"],
        "text/csv": [".csv"],
      },
      maxFiles: MAX_FILES,
      multiple: true,
      validator: (file) => {
        const isVideo = file.type.startsWith("video/");
        const isAudio = file.type.startsWith("audio/");
        const isImage = file.type.startsWith("image/");
        const isPDF = file.type === "application/pdf";
        const isDocument = file.type.startsWith("application/");

        if ((isVideo || isAudio) && file.size > MAX_VIDEO_AUDIO_SIZE) {
          return {
            code: "file-too-large",
            message: `Videos/Audio must be less than 300MB`,
          };
        }

        if ((isImage || isPDF) && file.size > MAX_IMAGE_PDF_SIZE) {
          return {
            code: "file-too-large",
            message: `Images/PDFs must be less than 50MB`,
          };
        }

        if (isDocument && !isPDF && file.size > MAX_IMAGE_PDF_SIZE) {
          return {
            code: "file-too-large",
            message: `Documents must be less than 50MB`,
          };
        }

        return null;
      },
      onDrop: (acceptedFiles, rejectedFiles) => {
        setErrors([]);

        if (coverImage.length + acceptedFiles.length > MAX_FILES) {
          setErrors([
            `Maximum ${MAX_FILES} files allowed. You currently have ${coverImage.length} files and are trying to add ${acceptedFiles.length} more.`,
          ]);
          return;
        }

        if (rejectedFiles.length > 0) {
          const rejectionErrors = rejectedFiles.map(
            ({ file, errors }) =>
              `${file.name}: ${errors.map((e) => e.message).join(", ")}`
          );
          setErrors(rejectionErrors);
        }

        const newAcceptedFiles = [...acceptedFiles];

        const formData = new FormData();

        newAcceptedFiles.forEach((file) => {
          formData.append("files", file);
        });

        mutate(formData);
      },
    });


  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
            border-[1.5px]  border-dashed  rounded-lg p-12 text-center cursor-pointer
            transition-colors${
              isDragActive ? "border-[#0977BC] bg-blue-50" : "border-gray-300"
            }
            hover:border-gray-400
          `}
      >
        <input {...getInputProps()} />
        <div className="flex justify-center items-center mb-2">
          <UploadIcon />
        </div>
        {isDragActive ? (
          <p className="text-[#0977BC] font-medium">
            Drop files here to upload
          </p>
        ) : (
          <>
            <h3 className="text-[#151515] text-[14px] font-normal mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-[#333333] text-[14px] ">
              Supports images, videos, documents, and audio files.
            </p>
          </>
        )}
      </div>

      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="font-semibold text-red-700 mb-2">Upload Errors:</p>
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              • {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
