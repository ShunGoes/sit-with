import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";
import Image from "next/image";

export function CampHero() {
  return (
    <section className="w-full">
      <div className="relative w-full min-h-dvh  flex items-center justify-center  py-24">
        <Image
          src={"/images/camp-hero.webp"}
          alt={"Camp page background image"}
          fill
          className="object-cover object-[70%_center] md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative h-full w-[90%] lg:w-[70%] mx-auto  flex flex-col gap-6 justify-center items-start max-w-7xl">
          <div className="space-y-4 lg:text-center ">
            <h1
              className={`text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05] lg:text-center `}
            >
              Sit-With-PD Annual Camping Programme
            </h1>
            <p className="lg:text-[1.25rem] text-xl text-[#F7FBF6] lg:text-center md:text-start lg:w-full sm:w-10/12 md:w-9/12 ">
              A presence-based retreat designed to help you pause, reflect, and
              reconnect with yourself in a calm and supportive environment
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-start md:justify-start lg:justify-center w-full gap-4 mt-4">
            <Button variant={"regular"}>
              Apply Now <CaretRight />
            </Button>
            <Button variant={"outline"}>Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
