"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerifyOtpFormProps {
  email: string;
  otp: string;
  setOtp: (val: string) => void;
  onBack: () => void;
  onVerify: () => void;
}

export function VerifyOtpForm({
  email,
  otp,
  setOtp,
  onBack,
  onVerify,
}: VerifyOtpFormProps) {
  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    otpRef.current?.focus();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="mx-auto w-14 h-14 bg-[#FBBC041A] rounded-full flex items-center justify-center mb-6">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.9521 0.733572C12.7797 0.458119 12.5257 0.243266 12.2255 0.118922C11.9253 -0.00542294 11.5937 -0.0330729 11.2771 0.0398215L9.02957 0.556072C8.79924 0.609011 8.5599 0.609011 8.32957 0.556072L6.08207 0.0398215C5.7654 -0.0330729 5.43388 -0.00542294 5.13366 0.118922C4.83344 0.243266 4.57946 0.458119 4.40707 0.733572L3.18207 2.68857C3.05707 2.88857 2.88832 3.05732 2.68832 3.18357L0.733321 4.40857C0.458343 4.58081 0.243806 4.83438 0.119488 5.13409C-0.00483005 5.43379 -0.0327615 5.76477 0.0395704 6.08107L0.555821 8.33107C0.608568 8.561 0.608568 8.79989 0.555821 9.02982L0.0395704 11.2786C-0.0330426 11.5951 -0.00525174 11.9263 0.119079 12.2263C0.243411 12.5262 0.458105 12.78 0.733321 12.9523L2.68832 14.1773C2.88832 14.3023 3.05707 14.4711 3.18332 14.6711L4.40832 16.6261C4.76082 17.1898 5.43332 17.4686 6.08207 17.3198L8.32957 16.8036C8.5599 16.7506 8.79924 16.7506 9.02957 16.8036L11.2783 17.3198C11.5948 17.3924 11.9261 17.3646 12.226 17.2403C12.526 17.116 12.7798 16.9013 12.9521 16.6261L14.1771 14.6711C14.3021 14.4711 14.4708 14.3023 14.6708 14.1773L16.6271 12.9523C16.9023 12.7798 17.1169 12.5257 17.241 12.2255C17.3651 11.9253 17.3926 11.5939 17.3196 11.2773L16.8046 9.02982C16.7516 8.79949 16.7516 8.56015 16.8046 8.32982L17.3208 6.08107C17.3936 5.76472 17.366 5.43356 17.2418 5.13361C17.1177 4.83366 16.9033 4.57981 16.6283 4.40732L14.6721 3.18232C14.4723 3.05709 14.3036 2.88829 14.1783 2.68857L12.9521 0.733572ZM12.3233 5.89232C12.4006 5.75015 12.4198 5.58354 12.3768 5.42754C12.3337 5.27153 12.2319 5.1383 12.0926 5.05588C11.9533 4.97345 11.7875 4.94826 11.6301 4.98559C11.4726 5.02293 11.3358 5.11989 11.2483 5.25607L7.97957 10.7886L6.00582 8.89857C5.94727 8.83845 5.8772 8.79073 5.79981 8.75827C5.72242 8.72581 5.63928 8.70927 5.55535 8.70964C5.47143 8.71001 5.38844 8.72727 5.31133 8.7604C5.23422 8.79354 5.16458 8.84186 5.10655 8.90249C5.04852 8.96312 5.0033 9.03482 4.97358 9.11331C4.94386 9.19179 4.93025 9.27546 4.93357 9.35932C4.93688 9.44318 4.95705 9.52551 4.99287 9.60141C5.0287 9.67731 5.07944 9.74521 5.14207 9.80107L7.68457 12.2373C7.75262 12.3024 7.83449 12.3512 7.92406 12.3802C8.01364 12.4092 8.10861 12.4176 8.20188 12.4047C8.29514 12.3919 8.3843 12.3581 8.46269 12.306C8.54108 12.2538 8.60667 12.1846 8.65457 12.1036L12.3233 5.89232Z"
            fill="#FBBC04"
            fill-opacity="0.7"
          />
        </svg>
      </div>
      <h1 className="text-[24px] lg:text-[48px] text-brand-green mb-1 lg:mb-2 text-center">
        Verification code
      </h1>
      <p className="text-[#535862] text-[14px] lg:w-[95%] mx-auto text-center mb-8">
        Please enter the code we sent to {email || "your email"}.
      </p>

      <div className="flex flex-col items-center justify-center mb-4">
        <InputOTP ref={otpRef} maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup className="gap-2 sm:gap-3 md:gap-2 items-center">
            {[...Array(6)].map((_, index) => (
              <React.Fragment key={index}>
                {index === 3 && (
                  <div className="flex items-center justify-center px-1">
                    <div className="w-3 h-1 md:w-5 md:h-[6px] bg-[#D0D5DD] rounded-full"></div>
                  </div>
                )}
                <InputOTPSlot
                  index={index}
                  className="w-[45px] h-[50px] sm:w-[50px] sm:h-[55px] md:w-[60px] md:h-[65px] text-[29px] md:text-[40px] rounded-[8px] border border-[#EAECF0] bg-white text-footer-bg shadow-[0px_1px_2px_0px_#1018280D]"
                />
              </React.Fragment>
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <p className="text-center text-[13px] text-[#667085] mb-8">
        Didn&apos;t receive a code?{" "}
        <button type="button" className="text-brand-orange  hover:underline">
          click to resend
        </button>
      </p>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="flex-1 text-brand-green hover:bg-transparent hover:text-brand-green/80 rounded-[8px] md:rounded-[3.75px] font-medium transition-colors"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onVerify}
          disabled={otp.length !== 6}
          className="flex-1 rounded-[8px] md:rounded-[3.75px]"
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
