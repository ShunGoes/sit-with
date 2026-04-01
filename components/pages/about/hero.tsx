import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";
import Image from "next/image";

export function AboutHero() {
  return (
    <section>
      <div className="relative w-full min-h-svh h-svh lg:min-h-dvh lg:h-dvh flex items-center justify-center  py-24">
        <Image
          src={"/images/about-bg.webp"}
          alt={"about oage bg image"}
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/25" /> */}
        <div className="relative h-full w-[90%] mx-auto  flex flex-col gap-6 justify-center items-start max-w-7xl">
          <div className="space-y-4  ">
            <h1
              className={`text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05]  `}
            >
              About Sit-With-PD
            </h1>
            <p className="lg:text-[1.25rem] text-xl text-[#F7FBF6]  md:text-start  sm:w-10/12 md:w-9/12 ">
              A global therapeutic network dedicated to presence-based healing
              and authentic personal development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
