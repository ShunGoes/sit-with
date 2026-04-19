import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description:
    "Have questions about our programs, camps, or consultations? Reach out to the Sit-With-PD team for support and information.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-brand-green mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700">Get in touch with us.</p>
    </div>
  );
}
