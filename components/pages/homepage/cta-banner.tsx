import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function CtaBanner() {
  return (
    <section className="container mx-auto ">
      <div className="w-full bg-footer-bg rounded-[10px] lg:rounded-[20px] px-5 md:px-12 md:py-20 lg:py-5 py-5 flex flex-col lg:flex-row gap-6 overflow-hidden border border-[#2A5A51]">
        {/* Left Content */}
        <div className="flex-1  flex flex-col items-center lg:items-center text-center  justify-center">
          <h2 className="text-[#EBECEB] heading-2 mb-4 max-w-md">
            Join a Global Therapeutic Community
          </h2>
          <p className="text-[#F7FBF6] text-xl sm:text-base leading-relaxed  mb-5 t">
            Connect with thousands of individuals committed to presence-based
            healing, emotional growth, and authentic personal development across
            the globe.
          </p>
          <div>
            <Button
              variant="regular"
              className="bg-[#60935D] hover:bg-[#4E7D4C] text-white border-none h-11 px-6 text-sm font-medium gap-2"
            >
              Explore membership <CaretRight />
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full flex-1">
          <div className="w-full md:w-[507px]  md:mx-auto relative min-h-[300px] md:min-h-[446px]">
          <div
            className="absolute  inset-0 bg-gray-300 border border-[#DEDEDE] rounded-[16px]"
            style={{
              backgroundImage: "url('/images/join-us.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        </div>
      </div>
    </section>
  );
}
