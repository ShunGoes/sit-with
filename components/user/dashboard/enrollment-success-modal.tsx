"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface Props {
  isOpen: boolean;
  programTitle: string;
  onClose: () => void;
}

export default function EnrollmentSuccessModal({
  isOpen,
  programTitle,
  onClose,
}: Props) {
  const fired = useRef(false);

  useEffect(() => {
    if (!isOpen || fired.current) return;
    fired.current = true;

    // Burst from both sides
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55, colors: ["#527E4D", "#60935D", "#A8D5A2"] });
    fire(0.2,  { spread: 60,                   colors: ["#527E4D", "#ffffff", "#D4F1D4"] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ["#86CC7A", "#3E7B3A"] });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ["#60935D", "#A8D5A2"] });
    fire(0.1,  { spread: 120, startVelocity: 45, colors: ["#527E4D", "#ffffff"] });

    return () => {
      fired.current = false;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div
              className="relative bg-white dark:bg-dash-secondary-bg rounded-2xl shadow-2xl p-10 max-w-[460px] w-full mx-4 text-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#EDFFD8] flex items-center justify-center">
                  <Check size={28} className="text-[#527E4D]" strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-primary-text mb-3">
                Enrollment Successful!
              </h2>

              <p className="text-secondary-text text-sm mb-8 leading-relaxed">
                You&apos;re now enrolled in{" "}
                <span className="font-semibold text-[#527E4D]">{programTitle}</span>.{" "}
                We&apos;ve sent a confirmation email with all the programme details.
              </p>

              <Button
                variant="regular"
                className="w-full py-6 text-base font-semibold"
                onClick={onClose}
              >
                Let&apos;s Get Started! 🎉
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
