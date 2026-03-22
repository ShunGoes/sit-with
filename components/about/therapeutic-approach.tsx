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
    <section className="container mx-auto px-4 md:px-8 py-24 flex flex-col items-center">
      <h2 className="heading-2 text-center mb-16">Our Therapeutic Approach</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Left Card */}
        <div className="bg-[#FAFAFA] rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Presence-Based Healing
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our approach is rooted in the understanding that true healing
            happens when we fully engage with the present. This means:
          </p>
          <ul className="space-y-4">
            {healingPoints.map((point, idx) => (
              <li key={idx} className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-secondary-green shrink-0"></div>
                <span className="text-gray-700 font-medium text-[15px]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Card */}
        <div className="bg-[#FAFAFA] rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Personal Development
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8">
            Beyond healing, we are committed to facilitating personal
            development through:
          </p>
          <ul className="space-y-4">
            {developmentPoints.map((point, idx) => (
              <li key={idx} className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-secondary-green shrink-0"></div>
                <span className="text-gray-700 font-medium text-[15px]">
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
