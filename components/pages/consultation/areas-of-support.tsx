import { Pill } from "@/components/ui/pill";

const areas = [
  {
    title: "Initial Assessment",
    description: "Whatever the concerns bringing you to therapy, we start by making sense of everything going on for you so that your sessions are structured and progressive.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#027A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V12" stroke="#027A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16H12.01" stroke="#027A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bgColor: "bg-[#EBFDF3]",
  },
  {
    title: "Emotional Healing",
    description: "Work through past hurts, develop secure and healthy coping mechanisms and build a foundation for greater emotional resilience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#027A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bgColor: "bg-[#EBFDF3]",
  },
  {
    title: "Ongoing Support",
    description: "Whether you are adapting to a life transition, or facing on-going challenges, you are not alone. We support you on your journey.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#175CD3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bgColor: "bg-[#EFF8FF]",
  },
  {
    title: "Trauma Informed Care",
    description: "Compassionate care that prioritizes your safety, validates your experiences, and empowers you to build resilience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#027A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 4L12 14.01l-3-3" stroke="#027A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bgColor: "bg-[#EBFDF3]",
  },
  {
    title: "Parent Education",
    description: "Guidance and skills to empower you as a parent. Learn effective managing skills, foster boundaries and deeper connections.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#6941C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="#6941C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bgColor: "bg-[#F4F3FF]",
  },
  {
    title: "Child and Youth Wellness",
    description: "A specific focus for children and youth, we provide a safe space for them to express themselves, understand emotions, and build self esteem.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22V2M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="#B54708" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bgColor: "bg-[#FFFAEB]",
  }
];

export function AreasOfSupport() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <Pill text="What We Offer" className="mb-4" />
        <h2 className="heading-2 mb-12 max-w-2xl">
          Our consultations cover a wide range of areas to support your unique needs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {areas.map((area, index) => (
            <div 
              key={index} 
              className="flex flex-col text-left p-8 rounded-2xl border border-[#EEF2F6] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_0px_-2px_rgba(16,24,40,0.04)] bg-white"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${area.bgColor}`}>
                {area.icon}
              </div>
              <h3 className="text-[#101828] font-semibold text-lg mb-3">{area.title}</h3>
              <p className="text-[#697586] text-base leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
