"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Extract YouTube video ID from URL
const extractYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
};

const YOUTUBE_URL = "https://youtu.be/9-KZWH3NzTY?feature=shared";
const VIDEO_ID = extractYouTubeId(YOUTUBE_URL);

export function AboutHero() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  }

  return (
    <section className="relative w-full bg-[#0a0a0a]">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="relative w-full aspect-video">
          {!isPlaying ? (
            // Lightweight thumbnail placeholder — loads instantly, no iframe overhead
            <button
              onClick={handlePlay}
              className="group relative w-full h-full cursor-pointer border-none bg-transparent p-0"
              aria-label="Play video about Sit-With-PD"
            >
              {/* YouTube thumbnail — lightweight img, no API script loaded */}
              <Image
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="About Sit-With-PD video"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/30 transition-opacity duration-300 group-hover:from-black/60 group-hover:via-black/10" />

              {/* Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                  <Play className="w-8 h-8 lg:w-10 lg:h-10 text-[#445b1c] fill-[#445b1c] ml-1" />
                </div>
              </div>

            
            </button>
          ) : (
            // Full YouTube iframe — only loaded after user clicks play
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="About Sit-With-PD"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
}
