import Image from "next/image";

export function CoreValues() {

  return (
    <section className="bg-[#E9EDF0] py-10 lg:py-24 w-full">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
        <h2 className="heading-2 text-center mb-16">Our Core Values</h2>

        <div className="flex flex-col  items-center justify-center lg:max-w-[900px] w-full">
          {/* Row 1: Presence & Authenticity */}
          <div className="flex flex-col md:flex-row items-center w-full justify-between gap-6 md:gap-0">
            <div className="relative w-10/12 h-[300px] sm:h-[400px] lg:h-[600px] mx-auto ">
              <Image
                src={"/images/about-core-values.png"}
                alt="about core values"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
