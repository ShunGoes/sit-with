import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";
import { Pill } from "@/components/ui/pill";
import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full">
      <div className="relative w-full min-h-svh lg:min-h-dvh flex items-center justify-center  py-24">
        <Image
          src={"/images/camp-hero.webp"}
          alt={"Camp page background image"}
          fill
          className="object-cover object-[70%_center] md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative h-full w-[90%] lg:w-[80%] mx-auto flex flex-col gap-6 justify-center items-start max-w-6xl">
          <div className="space-y-4 lg:text-center ">
            <h1
              className={`text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05] lg:text-center `}
            >
              One-on-One Professional Consultation
            </h1>
           
          </div>
          <div className="py-5 bg-[#A8D67599] w-full text-center rounded-[10px] ">
            <p className="text-[#0C240A] text-sm">Start your journey today</p>
            <p className="text-[#0C240A] font-semibold text-[1.875rem] ">
              $99 per session
            </p>
            <p className="text-[#0C240A] text-base font-medium">
              Start your journey today
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-start md:justify-start lg:justify-center w-full gap-4 mt-4">
            <Button variant={"regular"}>
              Book Now <CaretRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
