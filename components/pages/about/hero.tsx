import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function AboutHero() {
  return (
    <section
      style={{
        backgroundImage: "url('/images/about-bg.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-[60dvh] w-full py-20"
    >
      <div className="h-full mx-auto w-11/12 flex flex-col justify-center">
        <div className="space-y-4">
          <h1 className="text-[#F9FDF9] font-semibold text-[80px] leading-[1.1em] ">
            About Sit-With-PD
          </h1>
          <p className="text-[20px] text-[#F7FBF6] w-8/12">
            A global therapeutic network dedicated to presence-based healing and
            authentic personal development.
          </p>
        </div>
      </div>
    </section>
  );
}
