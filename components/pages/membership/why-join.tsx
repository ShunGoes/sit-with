export function WhyJoin() {
  const blocks = [
    {
      title: "Community connection",
      desc: "Connect with over 100+ individuals committed to personal development and growth.",
    },
    {
      title: "Program Access",
      desc: "Unlock the same templates, resources, and expert-led programs given for mentorship.",
    },
    {
      title: "Continuous Support",
      desc: "Secure ongoing guidance via our dedicated mentors and continuous touch points.",
    },
    {
      title: "Special Discounts",
      desc: "Enjoy special benefits including steep member-only pricing on courses and retreats.",
    },
    {
      title: "Personal Development",
      desc: "Track your growth with continuous small assessments and guidance to map out goals.",
    },
    {
      title: "Flexible Commitment",
      desc: "Cancel anytime with no penalties. Choose the plan that works best for you.",
    },
  ];

  return (
    <section className="container mx-auto py-10 lg:py-20 mt-10">
      <h2 className="heading-2 text-center mb-8 lg:mb-16">Why Become a Member?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[16px] p-6 sm:px-6 sm:py-7.5 border border-[#DEDEDE] "
          >
            <h3 className="font-medium text-xl text-[#242424] mb-2">
              {block.title}
            </h3>
            <p className="text-base text-black leading-6">
              {block.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
