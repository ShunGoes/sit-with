import { Button } from "@/components/ui/button";
import CaretRight from "@/pd-icons/caret-right";
import { Pill } from "@/components/ui/pill";

export function Hero() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Image Setup Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: 'url("/images/consultation-hero.jpg")' }} // Use existing hero background or a placeholder, replacing later if needed
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 text-center text-white flex flex-col items-center max-w-4xl z-10">
        <h1 className="heading-1 mb-4">
          One-on-One<br/>Professional Consultation
        </h1>
        <p className="text-lg md:text-xl font-light mb-8 opacity-90">
          Experience a safe, confidential space to explore your thoughts and feelings with our certified professional in a one-on-one session. Whether you're seeking clarity, healing, and personal transformation.
        </p>

        <div className="bg-white/20 backdrop-blur-md rounded-[16px] p-6 border border-white/30 flex flex-col items-center gap-2 mb-8 w-fit mx-auto">
          <Pill text="Therapy and Coaching" className="bg-[#EBFDF3] text-[#027A48] border-[#ABEFC6]" />
          <p className="text-2xl font-bold mt-2">$99 per session</p>
          <p className="text-sm opacity-80">45 minutes per free consultation</p>
        </div>

        <Button variant={"regular"} className="rounded-[8px] bg-[#2E6B4F] hover:bg-[#1F4842] border-none text-white h-12 px-8">
          Book Session <CaretRight />
        </Button>
      </div>
    </section>
  );
}
