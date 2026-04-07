import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function CampCtaBlock() {
  return (
    <section className="bg-footer-bg py-24 w-full text-center mt-12">
      <div className="container mx-auto px-4 md:px-8 flex flex-col gap-4 lg:w-[50%]  items-center">
        <h2 className="heading-2 text-[#EBECEB] ">
          Join the Next Camp Experience
        </h2>
        <p className="text-[#F7FBF6] text-[16px]  leading-[140%]  max-w-2xl ">
          Take time to slow down, reconnect, and grow in a space designed for
          your wellbeing
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-3">
          <Button variant={"regular"} className="rounded-[8px]">
            Join Now <CaretRight />{" "}
          </Button>
        </div>
      </div>
    </section>
  );
}
