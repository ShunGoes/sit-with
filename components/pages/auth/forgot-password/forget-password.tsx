"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

// Child Form Components
import { EmailForm } from "./email-form";
import { useForgotPassword } from "@/lib/api/hooks/auth/auth.hooks";
import { useModalStore } from "@/components/store/use-modal-store";
import { Spinner } from "@/components/spinner";

export default function ForgotPasswordFlow() {
  const router = useRouter();
  const { mutate, isPending } = useForgotPassword();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleEmailNext = (submittedEmail: string) => {
    mutate(
      { email: submittedEmail },
      {
        onSuccess: () => {
          closeModal("loading");
          // Navigate to a "check your email" page so the user knows what to do next
          router.replace("/signup-success");
        },
        onError: () => {
          closeModal("loading");
        },
      },
    );
  };

  const variants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending]);

  return (
    <Card className="max-w-[500px] w-[90%] md:w-full lg:w-[90%]  mx-auto bg-[#FEFFFBCC] border-4 border-[#FFFFFF5C] rounded-[10px] shadow-[0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_20px_24px_-4px_rgba(10,13,18,0.08)] overflow-hidden p-6 sm:p-8 lg:px-5 lg:py-7 flex flex-col justify-center relative min-h-[300px]">
      <motion.div
        key="step1"
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3 }}
      >
        <EmailForm onNext={handleEmailNext} />
      </motion.div>
    </Card>
  );
}
