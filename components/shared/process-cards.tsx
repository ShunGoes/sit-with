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
    <section className="py-24 bg-white flex flex-col items-center">
      <div className="container mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        <Pill text="How It Works" className="mb-4" />
        <h2 className="heading-2 mb-16 max-w-2xl">
          A simple, straightforward process designed for your comfort
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl text-left">
          {processSteps.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#3A5D35] flex flex-col rounded-[16px] p-8 min-h-[300px]"
            >
              <div className="w-10 h-10 rounded-full bg-[#A3D979] flex items-center justify-center text-[#2E4A2A] font-medium text-lg mb-12">
                {item.step}
              </div>
              <h3 className="text-white font-medium text-xl mb-4">{item.title}</h3>
              <p className="text-[#EBECEB] text-base leading-relaxed opacity-90">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
