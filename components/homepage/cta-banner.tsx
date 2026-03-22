import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";

export function CtaBanner() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-12">
      <div className="w-full bg-footer-bg rounded-[24px] flex flex-col md:flex-row overflow-hidden border border-[#2A5A51]">
        {/* Left Content */}
        <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
          <h2 className="text-white text-[32px] md:text-[40px] font-medium leading-[1.1] mb-6 max-w-md">
            Join a Global Therapeutic Community
          </h2>
          <p className="text-gray-300 text-[16px] leading-relaxed mb-10 max-w-lg font-light">
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
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-0">
          <div
            className="absolute inset-0 bg-gray-300"
            style={{
              backgroundImage: "url('/images/join-us.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
