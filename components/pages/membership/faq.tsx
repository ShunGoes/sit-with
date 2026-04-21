"use client";

import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

export function MembershipFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Can I change my membership tier?",
      answer:
        "Yes! You can upgrade or downgrade your membership at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
      question: "Is there a long-term commitment required?",
      answer:
        "No, all our memberships are billed month-to-month and you can cancel anytime without any hidden penalty fees.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards including Visa, Mastercard, American Express, and Discover.",
    },
    {
      question: "Do you offer annual discounts?",
      answer:
        "Yes, members who choose to be billed annually receive a 15% discount equivalent to almost 2 months free.",
    },
    {
      question: "What if I want to cancel my membership?",
      answer:
        "You can easily cancel your membership through your account settings or by contacting our support team.",
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-8 py-20 flex flex-col items-center">
      <h2 className="heading-2 text-center mb-8 lg:mb-16">Membership FAQ</h2>

      <div className="w-full max-w-3xl flex flex-col gap-4  overflow-hidden bg-white">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
 
          return (
            <div
              key={idx}
              className={`shadow-[2px_2px_4px_#C7CAC61F] border border-[#EAEAEA] rounded-[8px] `}
            >
              <button
                className="w-full flex items-center justify-between p-4 lg:p-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <span className="font-medium text-lg lg:text-xl text-[#131313]">
                  {faq.question}
                </span>
                <div className="shrink-0 text-[#071A34] ml-4">
                  {isOpen ? (
                    <MinusCircle className="w-5 h-5 " />
                  ) : (
                    <PlusCircle className="w-5 h-5 " />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="lg:px-6 px-4 pb-6 pr-12">
                  <p className="text-black text-base lg:text-xl leading-relaxed lg:leading-[30px]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
