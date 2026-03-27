import { Pill } from "@/components/ui/pill";
import Image from "next/image";

export function GlimpseGallery() {
  const images = [
    {
      src: "/images/glimpse-1.png", // using placeholder images
      title: "Nature Walks",
      subtitle: "Connect with the outdoors",
    },
    {
      src: "/images/glimpse-2.png",
      title: "Journaling",
      subtitle: "Time for quiet reflection",
    },
    {
      src: "/images/glimpse-3.png",
      title: "Group Sessions",
      subtitle: "Share and grow together",
    },
    {
      src: "/images/glimpse-4.png",
      title: "Quiet Meditation",
      subtitle: "Find your inner peace",
    },
  ];

  return (
    <section className="container mx-auto bg-[#F0F4F0] px-4 md:px-8 py-24 flex flex-col items-center">
      <Pill text="Camp Experience" />
      <h2 className="heading-2 text-center mb-16">
        A Glimpse Into the Experience
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative w-ull h-[368px] rounded-[16px] overflow-hidden bg-gray-200 cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div> */}
            {/* <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-semibold text-lg mb-1">
                {img.title}
              </h3>
              <p className="text-white/80 text-sm">{img.subtitle}</p>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
}
