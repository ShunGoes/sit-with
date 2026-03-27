"use client"

import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function Hero() {
  return (
    <section className="bg-[url('/images/homepage-bg.png')] bg-cover bg-[75%_center] md:bg-center bg-no-repeat min-h-[80dvh] lg:min-h-[80dvh] w-full flex items-center justify-center md:grid md:grid-cols-3  lg::grid-cols-2 py-24">
      <div className="h-full md:col-span-2 lg:col-span-1 mx-auto px-10  md:p-15 lg:px-20 flex flex-col gap-6 justify-center items-center ">
        <div className="space-y-4">
          <h1 className="text-[#F9FDF9] font-semibold text-[50px] lg:text-[80px] leading-[1.1em] ">
            Presences Changes Everything
          </h1>
          <p className="lg:text-[20px] text-base text-[#F7FBF6] sm:w-10/12 md:w-full ">
            Join a global therapeutic network dedicated to presence-based
            healing, personal development, and emotional transformation.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-start w-full gap-4 lg:w-full ">
          <Button variant={"regular"}>
            Explore Programs <CaretRight />{" "}
          </Button>
          <Button variant={"outline"}>Book Consultation</Button>
        </div>
      </div>
      <div className="col-span-1 h-full"></div>
    </section>
  );
}
