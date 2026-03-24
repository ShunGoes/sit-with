import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function Hero() {
  return (
    <section
      style={{
        backgroundImage: "url('/images/homepage-bg.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-[80dvh] w-full grid grid-cols-1 md:grid-cols-2 py-24"
    >
      <div className="h-full col-span-1 mx-auto px-6 md:px-20 flex flex-col gap-6 justify-center items-center">
        <div className="space-y-4">
          <h1 className="text-[#F9FDF9] font-semibold text-[80px] leading-[1.1em] ">
            Presence Changes Everything
          </h1>
          <p className="text-[20px] text-[#F7FBF6] ">
            Join a global therapeutic network dedicated to presence-based
            healing, personal development, and emotional transformation.
          </p>
        </div>
        <div className="flex justify-start w-full gap-4">
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
