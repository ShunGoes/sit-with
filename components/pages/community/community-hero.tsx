"use client";


import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function CommunityHero() {
  return (
    <section className="w-full">
      <div className="relative w-full min-h-svh lg:min-h-[80dvh] flex items-center justify-center  py-24">
        <Image
          src={"/images/community-bg.png"}
          alt={"Camp page background image"}
          fill
          className="object-cover object-[70%_center] md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative h-full w-[90%] lg:w-[80%] mx-auto flex flex-col gap-6 justify-center items-start max-w-6xl">
          <div className="space-y-4 lg:text-center ">
            <h1
              className={`text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05] sm:text-center `}
            >
              Join Our Community
            </h1>
            <p className="text-[#F7FBF6] text-xl lg:w-[90%] mx-auto text-center">
              Our community is diverse, dynamic, and purpose-driven, designed to
              welcome individuals from all walks of life who are passionate
              about growth, impact, and transformation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-start sm:justify-center w-full gap-4 mt-2">
            <Button
              onClick={() =>
                document
                  .getElementById("communities")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant={"regular"}
            >
              Explore commnunities
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
