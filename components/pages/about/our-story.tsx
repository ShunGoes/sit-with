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
    <section className=" py-24 w-full">
      <div className="container mx-auto  flex flex-col items-center">
        <h2 className="heading-2 text-center mb-16">Our Story</h2>

        <div className="flex flex-col gap-6 w-full max-w-6xl bg-[#E9EDF0] py-10 border border-[#DEDEDE] rounded-[16px] relative ">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#F2F4F7] border-l-4 border-[#649351] rounded-[10px] p-6 md:px-10 md:py-5 w-10/12 mx-auto "
            >
              <div className="flex flex-col  gap-2 ">
                <span className="text-[#606060] text-[16px] ">
                  {step.year}
                </span>
                  <h3 className="font-medium text-[#242424] text-[20px]">
                    {step.title}
                  </h3>
                  <p className="text-black text-[16px] leading-[24px]">
                    {step.description}
                  </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
