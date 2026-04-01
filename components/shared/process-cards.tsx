import { Pill } from "@/components/ui/pill";

const processSteps = [
  {
    step: "1",
    title: "Book Your Session",
    description: "Get guidance on clarifying your goals, building confidence, and creating actionable steps toward your vision of a better life.",
  },
  {
    step: "2",
    title: "Preparation",
    description: "You'll receive a brief intake form to help us understand your situation better before our session.",
  },
  {
    step: "3",
    title: "Your Consultation",
    description: "Join a safe, confidential session with our professional where you can share openly and receive personalized guidance.",
  },
  {
    step: "4",
    title: "Action Plan",
    description: "Leave with clear next steps, practical tools, and resources tailored to your specific needs and goals.",
  }
];

export function ProcessCards() {
  return (
    <section className="py-10 lg:py-24 bg-white flex flex-col items-center">
      <div className="container mx-auto text-center flex flex-col items-center">
        <Pill text="How It Works" className="mb-4" />
        <h2 className="heading-2 mb-8 lg:mb-16 max-w-2xl">
          A simple, straightforward process designed for your comfort
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl text-left">
          {processSteps.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#314C14] flex flex-col rounded-[16px] px-5 py-6 lg:p-8 min-[250px] lg:min-h-75"
            >
              <div className="w-10.5 h-10.5 rounded-full bg-secondary-green flex items-center justify-center text-[#30430E] font-medium text-lg mb-6">
                {item.step}
              </div>
              <h3 className="text-[#FBFFF6] font-emibold text-lg mb-2">{item.title}</h3>
              <p className="text-[#FBFFF6] text-base leading-[1.425rem]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
