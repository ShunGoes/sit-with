import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";
import Image from "next/image";
import Link from "next/link";

export function ProgramCta() {
  return (
    <section className="container mx-auto ">
      <div className="w-full bg-footer-bg   flex flex-col lg:flex-row gap-6 overflow-hidden border border-[#2A5A51]">
        {/* Left Content */}
        <div className="flex-1  flex flex-col items-center lg:items-start px-5 md:px-12 md:py-20 lg:py-5 py-10 text-center lg:text-start  justify-center ">
          <h2 className="text-[#EBECEB] heading-2 mb-4 max-w-md ">
            Speak With Someone Who Listens
          </h2>
          <p className="text-[#F7FBF6] text-base lg:w-10/12 leading-relaxed  mb-5 t">
            Book a one-on-one session where you can talk freely, gain clarity,
            and feel supported in a calm and confidential space
          </p>
          <div>
            <Link href="/consultation">
              <Button
                variant="regular"
                className="bg-[#60935D] hover:bg-[#4E7D4C] text-white border-none h-11 px-6 text-sm font-medium gap-2"
              >
                Book Consultation <CaretRight />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full flex-1">
          <div className="w-full md:w-[507px] lg:w-full  md:mx-auto relative min-h-[300px] md:min-h-[446px]">
            <Image
              src={"/images/program-cta.png"}
              alt="Speak with someone whi cares"
              fill
              className="object-cover object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
