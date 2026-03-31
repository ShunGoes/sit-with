import Image from "next/image";

export function MembershipHero() {
  return (
    <section>
      <div className="relative w-full min-h-dvh h-dvh flex items-center justify-center  py-24">
        <Image
          src={"/images/membership-bg.webp"}
          alt={"about oage bg image"}
          fill
          className="object-cover object-[70%_center]"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/25" /> */}
        <div className="relative h-full w-[90%] mx-auto  flex flex-col gap-6 justify-center items-start max-w-7xl">
          <div className="space-y-4  ">
            <h1
              className={`text-[#F9FDF9] font-semibold text-[3.125rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05]  `}
            >
              Choose Your <br /> Membership
            </h1>
            <p className="lg:text-[1.25rem] text-xl text-[#F7FBF6]  md:text-start  sm:w-10/12 md:w-9/12 ">
              Select the membership tier that aligns with your needs and
              commitment to personal growth and healing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
