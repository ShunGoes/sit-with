import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function ConsultationCta() {
  return (
    <section className="bg-footer-bg py-24 w-full text-center mt-12">
      <div className="container mx-auto px-4 md:px-8 flex flex-col gap-4 lg:w-[50%] items-center">
        <h2 className="heading-2 text-[#EBECEB] ">
          Join a Global Therapeutic Community
        </h2>
        <p className="text-[#F7FBF6] text-base leading-[140%] max-w-2xl ">
          Connect with thousands of individuals committed to presence-based healing, emotional capacity, and authentic personal development on this journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-3">
          <Button variant={"regular"} className="rounded-[8px]">
            Explore communities <CaretRight />{" "}
          </Button>
        </div>
      </div>
    </section>
  );
}
