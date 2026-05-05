import { Metadata } from "next";
import { Youtube, Instagram, Facebook } from "lucide-react";

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.9-.23-2.74.28-.69.44-1.22 1.06-1.35 1.88-.22 1.16.27 2.35 1.14 3.07.45.38 1.01.63 1.58.75 1.75.37 3.68-.55 4.32-2.15.14-.35.21-.73.21-1.11.02-3.52.01-7.03.02-10.55-.02-.1-.01-.3 0-.4z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description:
    "Have questions about our programs, camps, or consultations? Reach out to the Sit-With-PD team for support and information.",
};

export default function ContactPage() {
  const socialLinks = [
    {
      name: "YouTube",
      href: "https://www.youtube.com/@sitwithpd",
      icon: <Youtube size={32} />,
      color: "hover:text-red-600",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/19tSLd5kzH/?mibextid=wwXIfr",
      icon: <Facebook size={32} />,
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/sitwithpd?igsh=OHo1eHRqNTRmd2ps&utm_source=qr",
      icon: <Instagram size={32} />,
      color: "hover:text-pink-600",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@sitwithpd?_r=1&_t=ZN-95g0zMOaKzW",
      icon: <TikTokIcon />,
      color: "hover:text-black",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-regular-button mt-5 mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have questions? Reach out to us or connect on our social platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Email Support</h2>
          <p className="text-gray-600 mb-4">
            For general inquiries and support, feel free to send us an email.
          </p>
          <a
            href="mailto:hello@sitwithpd.com"
            className="text-regular-button text-lg font-medium hover:underline"
          >
            hello@sitwithpd.com
          </a>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Social Connection</h2>
          <p className="text-gray-600 mb-6">
            Follow us for the latest updates, community stories, and insights.
          </p>
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
