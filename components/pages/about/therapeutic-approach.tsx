export function TherapeuticApproach() {
  const healingPoints = [
    "Building awareness of one's body, mind, and spirit",
    "Embracing present-moment awareness, letting go of future and past anxiety",
    "Fostering emotional regulation through grounding techniques",
    "Creating safe space for processing deep-seated trauma",
  ];

  const developmentPoints = [
    "Building emotional intelligence and self awareness",
    "Developing authentic leadership and relationship skills",
    "Clarifying values and aligning life goals with purpose",
    "Creating sustainable practices for health and growth",
    "Building capacity for deeper, more meaningful connection",
  ];

  return (
    <section className="container  mx-auto  py-18 flex flex-col items-center">
      <h2 className="heading-2 text-center mb-7 lg:mb-16">Our Therapeutic Approach</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Left Card */}
        <div className="bg-[#E7F0E733] p-5">
          <h3 className="heading-2  mb-6">
            Presence-Based Healing
          </h3>
          <p className="text-black text-base xl:text-xl leading-[140%] mb-8">
            Our approach is rooted in the understanding that true healing
            happens when we fully engage with the present. This means:
          </p>
          <ul className="space-y-4">
            {healingPoints.map((point, idx) => (
              <li key={idx} className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#606060] shrink-0"></div>
                <span className="text-black text-base xl:text-xl leading-[140%]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Card */}
        <div className="bg-[#E7F0E733] p-5">
          <h3 className="heading-2 mb-6">
            Personal Development
          </h3>
          <p className="text-black text-base xl:text-xl leading-[140%] mb-8">
            Beyond healing, we are committed to facilitating personal
            development through:
          </p>
          <ul className="space-y-4">
            {developmentPoints.map((point, idx) => (
              <li key={idx} className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#606060] shrink-0"></div>
                <span className="text-black text-base xl:text-xl leading-[140%]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
