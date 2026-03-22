export function OurStory() {
  const steps = [
    {
      year: "2018",
      title: "Founding roots",
      description:
        "Sit-With-PD started as a simple blog dedicated to emotional healing. After seeing the profound impact on individuals, we expanded our vision.",
    },
    {
      year: "2019",
      title: "First programs",
      description:
        "Launched the first group therapeutic sessions focusing on mindfulness, awareness, and deep emotional connectivity.",
    },
    {
      year: "2020",
      title: "Community Growth",
      description:
        "Scaled globally, reached members across boundaries and brought intentional, healing communities together online and offline.",
    },
    {
      year: "2021",
      title: "Digital Transformation",
      description:
        "Built the digital tracing, accountability networks and incorporated a full coaching and community ecosystem to serve broader audiences.",
    },
    {
      year: "Present",
      title: "Global Network",
      description:
        "Today, Sit-With-PD serves thousands of individuals driving profound, sustainable transformation for communities.",
    },
  ];

  return (
    <section className="bg-[#EAEFEA] py-24 w-full">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
        <h2 className="heading-2 text-center mb-16">Our Story</h2>

        <div className="flex flex-col gap-6 w-full max-w-4xl relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-[50px] top-6 bottom-6 w-[2px] bg-brand-green/20"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 md:p-8 ml-10 md:ml-24 relative shadow-[0px_2px_12px_rgba(0,0,0,0.02)]"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[30px] md:-left-[64px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-green border-[4px] border-[#EAEFEA]"></div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                <span className="text-gray-500 font-semibold min-w-[80px] text-sm md:text-base">
                  {step.year}
                </span>
                <div className="flex flex-col">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
