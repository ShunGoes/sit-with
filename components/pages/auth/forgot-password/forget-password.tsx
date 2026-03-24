"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Child Form Components
import { EmailForm } from "./email-form";
import { VerifyOtpForm } from "./verify-otp-form";
import { NewPasswordForm } from "./new-password-form";
import { PasswordSuccess } from "./password-success";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleEmailNext = (submittedEmail: string) => {
    setEmail(submittedEmail);
    console.log("Email submitted:", submittedEmail);
    setStep(2);
  };

  const handleOtpVerify = () => {
    if (otp.length === 6) {
      console.log("OTP verified:", otp);
      setStep(3);
    }
  };

  const variants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <Card className="max-w-[500px] w-[90%] md:w-full lg:w-[90%]  mx-auto bg-[#FEFFFBCC] border-4 border-[#FFFFFF5C] rounded-[10px] shadow-[0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_20px_24px_-4px_rgba(10,13,18,0.08)] overflow-hidden p-6 sm:p-8 lg:px-5 lg:py-7 flex flex-col justify-center relative min-h-[300px]">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <EmailForm onNext={handleEmailNext} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <VerifyOtpForm
              email={email}
              otp={otp}
              setOtp={setOtp}
              onBack={() => setStep(1)}
              onVerify={handleOtpVerify}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <NewPasswordForm onNext={() => setStep(4)} />
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <PasswordSuccess />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
