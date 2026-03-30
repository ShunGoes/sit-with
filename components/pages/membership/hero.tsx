

export function MembershipHero() {
  return (
    <section
      style={{
        backgroundImage: "url('/images/membership-bg.webp')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-[70dvh] h-[80dvh] w-full pb-20"
    >
      <div className="h-full  mx-auto max-w-6xl w-11/12 flex flex-col justify-center">
        <div className="flex flex-col justify-end gap-4 h-full ">
          <h1 className="text-[#F9FDF9] font-semibold text-[80px] leading-[1.1em] ">
            Choose Your <br /> Membership
          </h1>
          <p className="text-[20px] text-[#F7FBF6] w-5/12">
            Select the membership tier that aligns with your needs and
            commitment to personal growth and healing.
          </p>
        </div>
      </div>
    </section>
  );
}
