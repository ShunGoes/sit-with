"use client"
import { Pill } from "@/components/ui/pill";
import { motion } from "motion/react";

const areas = [
  {
    title: "Initial Assessment",
    description:
      "Whatever the concerns bringing you to therapy, we start by making sense of everything going on for you so that your sessions are structured and progressive.",
    icon: (
      <div className="bg-[#ECFDF5] h-12 w-12 flex justify-center items-center rounded-[10px]">
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 12C19.49 10.54 21 8.79 21 6.5C21 5.04131 20.4205 3.64236 19.3891 2.61091C18.3576 1.57946 16.9587 1 15.5 1C13.74 1 12.5 1.5 11 3C9.5 1.5 8.26 1 6.5 1C5.04131 1 3.64236 1.57946 2.61091 2.61091C1.57946 3.64236 1 5.04131 1 6.5C1 8.8 2.5 10.55 4 12L11 19L18 12Z"
            stroke="#009966"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    bgColor: "bg-[#EBFDF3]",
  },
  {
    title: "Emotional Healing",
    description:
      "Work through past hurts, develop secure and healthy coping mechanisms and build a foundation for greater emotional resilience.",
    icon: (
      <div className="bg-[#F0FDFA] h-12 w-12 flex justify-center items-center rounded-[10px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
            stroke="#009689"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="#009689"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13"
            stroke="#009689"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="#009689"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    bgColor: "bg-[#EBFDF3]",
  },
  {
    title: "Ongoing Support",
    description:
      "Whether you are adapting to a life transition, or facing on-going challenges, you are not alone. We support you on your journey.",
    icon: (
      <div className="bg-[#EFF6FF] h-12 w-12 flex justify-center items-center rounded-[10px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0008 4.99999C12.002 4.60002 11.9232 4.20385 11.769 3.83479C11.6148 3.46572 11.3884 3.13122 11.1031 2.85093C10.8177 2.57065 10.4792 2.35026 10.1075 2.20272C9.7357 2.05518 9.33819 1.98347 8.9383 1.9918C8.53842 2.00014 8.14424 2.08835 7.77894 2.25126C7.41365 2.41416 7.08462 2.64847 6.81121 2.94039C6.53779 3.23232 6.32552 3.57597 6.18686 3.95114C6.0482 4.32631 5.98596 4.72542 6.00381 5.12499C5.41601 5.27613 4.87031 5.55904 4.40804 5.9523C3.94577 6.34556 3.57905 6.83886 3.33565 7.39484C3.09225 7.95081 2.97857 8.55488 3.0032 9.1613C3.02782 9.76772 3.19013 10.3606 3.47781 10.895C2.97199 11.3059 2.57423 11.8342 2.31915 12.4339C2.06406 13.0336 1.95936 13.6866 2.01417 14.336C2.06898 14.9854 2.28162 15.6115 2.63361 16.16C2.9856 16.7085 3.46627 17.1626 4.03381 17.483C3.96372 18.0252 4.00555 18.5761 4.15669 19.1015C4.30784 19.627 4.5651 20.1158 4.91259 20.5379C5.26008 20.9601 5.69042 21.3065 6.17703 21.5557C6.66364 21.805 7.19618 21.9519 7.74178 21.9873C8.28738 22.0227 8.83445 21.9459 9.34919 21.7616C9.86394 21.5773 10.3354 21.2894 10.7346 20.9157C11.1337 20.5421 11.452 20.0906 11.6698 19.5891C11.8876 19.0876 12.0002 18.5467 12.0008 18V4.99999Z"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 4.99999C11.9988 4.60002 12.0776 4.20385 12.2318 3.83479C12.386 3.46572 12.6124 3.13122 12.8977 2.85093C13.1831 2.57065 13.5216 2.35026 13.8934 2.20272C14.2651 2.05518 14.6626 1.98347 15.0625 1.9918C15.4624 2.00014 15.8566 2.08835 16.2219 2.25126C16.5872 2.41416 16.9162 2.64847 17.1896 2.94039C17.463 3.23232 17.6753 3.57597 17.814 3.95114C17.9526 4.32631 18.0149 4.72542 17.997 5.12499C18.5848 5.27613 19.1305 5.55904 19.5928 5.9523C20.0551 6.34556 20.4218 6.83886 20.6652 7.39484C20.9086 7.95081 21.0223 8.55488 20.9976 9.1613C20.973 9.76772 20.8107 10.3606 20.523 10.895C21.0288 11.3059 21.4266 11.8342 21.6817 12.4339C21.9368 13.0336 22.0415 13.6866 21.9867 14.336C21.9318 14.9854 21.7192 15.6115 21.3672 16.16C21.0152 16.7085 20.5345 17.1626 19.967 17.483C20.0371 18.0252 19.9953 18.5761 19.8441 19.1015C19.693 19.627 19.4357 20.1158 19.0882 20.5379C18.7407 20.9601 18.3104 21.3065 17.8238 21.5557C17.3372 21.805 16.8046 21.9519 16.259 21.9873C15.7134 22.0227 15.1664 21.9459 14.6516 21.7616C14.1369 21.5773 13.6654 21.2894 13.2663 20.9157C12.8671 20.5421 12.5488 20.0906 12.331 19.5891C12.1133 19.0876 12.0006 18.5467 12 18V4.99999Z"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 13C14.1604 12.7047 13.4273 12.167 12.8933 11.455C12.3593 10.743 12.0485 9.88867 12 9C11.9515 9.88867 11.6407 10.743 11.1067 11.455C10.5727 12.167 9.83956 12.7047 9 13"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5996 6.5C17.8416 6.08059 17.9785 5.60882 17.9986 5.125"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.00391 5.125C6.02368 5.60873 6.16024 6.0805 6.40191 6.5"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.47656 10.896C3.6595 10.747 3.85527 10.6145 4.06156 10.5"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.9375 10.5C20.1438 10.6145 20.3396 10.747 20.5225 10.896"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.0002 18C5.31103 18.0003 4.63347 17.8226 4.0332 17.484"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.967 17.484C19.3667 17.8226 18.6892 18.0003 18 18"
            stroke="#155DFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    bgColor: "bg-[#EFF8FF]",
  },
  {
    title: "Trauma Informed Care",
    description:
      "Compassionate care that prioritizes your safety, validates your experiences, and empowers you to build resilience.",
    icon: (
      <div className="bg-[#F0FDF4] h-12 w-12 flex justify-center items-center rounded-[10px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 20H17"
            stroke="#00A63E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 20C15.5 17.5 10.8 13.6 13 10"
            stroke="#00A63E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 9.39997C10.6 10.2 11.3 11.6 11.8 13.1C9.8 13.5 8.3 13.5 7 12.8C5.8 12.2 4.7 10.9 4 8.59997C6.8 8.09997 8.4 8.59997 9.5 9.39997Z"
            stroke="#00A63E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.0998 6C13.3374 7.19156 12.9539 8.58615 12.9998 10C14.8998 9.9 16.2998 9.4 17.2998 8.6C18.2998 7.6 18.8998 6.3 18.9998 4C16.2998 4.1 14.9998 5 14.0998 6Z"
            stroke="#00A63E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    bgColor: "bg-[#EBFDF3]",
  },
  {
    title: "Parent Education",
    description:
      "Guidance and skills to empower you as a parent. Learn effective managing skills, foster boundaries and deeper connections.",
    icon: (
      <div className="bg-[#FAF5FF] h-12 w-12 flex justify-center items-center rounded-[10px]">
        <svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 12.0004C17 17.0004 13.5 19.5005 9.34 20.9505C9.12216 21.0243 8.88554 21.0207 8.67 20.9405C4.5 19.5005 1 17.0004 1 12.0004V5.00045C1 4.73523 1.10536 4.48088 1.29289 4.29334C1.48043 4.10581 1.73478 4.00045 2 4.00045C4 4.00045 6.5 2.80045 8.24 1.28045C8.45185 1.09945 8.72135 1 9 1C9.27865 1 9.54815 1.09945 9.76 1.28045C11.51 2.81045 14 4.00045 16 4.00045C16.2652 4.00045 16.5196 4.10581 16.7071 4.29334C16.8946 4.48088 17 4.73523 17 5.00045V12.0004Z"
            stroke="#9810FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    bgColor: "bg-[#F4F3FF]",
  },
  {
    title: "Child and Youth Wellness",
    description:
      "A specific focus for children and youth, we provide a safe space for them to express themselves, understand emotions, and build self esteem.",
    icon: (
      <div className="bg-[#FFFBEB] h-12 w-12 flex justify-center items-center rounded-[10px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2398 7.76001L14.4358 13.171C14.3376 13.4656 14.1722 13.7333 13.9526 13.9528C13.733 14.1724 13.4653 14.3378 13.1708 14.436L7.75977 16.24L9.56377 10.829C9.66195 10.5344 9.82737 10.2668 10.0469 10.0472C10.2665 9.82762 10.5342 9.66219 10.8288 9.56401L16.2398 7.76001Z"
            stroke="#E17100"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#E17100"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    bgColor: "bg-[#FFFAEB]",
  },
];

export function AreasOfSupport() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  return (
    <section className="py-10 lg:py-24">
      <div className="container mx-auto  flex flex-col items-center text-center">
        <Pill text="What We Offer" className="mb-4" />
        <h2 className="heading-2 mb-12 max-w-2xl">
          Our consultations cover a wide range of areas to support your unique
          needs
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {areas.map((area, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col text-left p-8 rounded-[10px] border-[0.87px] border-[#F3F4F6]  bg-white"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${area.bgColor}`}
              >
                {area.icon}
              </div>
              <h3 className="text-[#101828] font-medium text-lg mb-3">
                {area.title}
              </h3>
              <p className="text-[#4A5565] text-base leading-[1.425rem]">
                {area.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
