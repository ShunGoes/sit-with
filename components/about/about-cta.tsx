import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function AboutCta() {
  return (
    <section className="bg-[#1A3831] py-24 w-full text-center">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
        <h2 className="text-[32px] md:text-[40px] font-medium text-white mb-4">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-[#A8D675] text-[16px] leading-relaxed mb-10 max-w-lg">
          Discover our courses and coaching to start your personal
          transformation journey today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            variant="regular"
            className="bg-[#60935D] hover:bg-[#4E7D4C] text-white border-none h-11 px-6 text-sm font-medium gap-2"
          >
            Explore Programs <CaretRight />
          </Button>
          <Button
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white/10 h-11 px-6 text-sm font-medium"
          >
            Book consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
