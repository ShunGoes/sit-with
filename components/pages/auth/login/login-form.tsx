"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldComp from "@/components/formfield";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useSignin,
  useResendVerification,
  useGoogleLogin,
} from "@/lib/api/hooks/auth/auth.hooks";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { showErrorToast } from "@/lib/toast-helpers";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// admin@wellbeing.com
// Admin@1234
export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useSignin();
  const { mutate: resendVerification } = useResendVerification();
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutate: googleLogin, isPending: googleSignInPending} = useGoogleLogin();


  const onSubmit = (data: LoginFormValues) => {
    const values = { email: data.email, password: data.password };

    mutate(values, {
      onSuccess: (resData) => {
        if (resData.data?.user?.isEmailVerified) {
          closeModal("loading");
          if (resData.data.user.role === "ADMIN") {
            router.replace("/admin");
          } else {
            router.replace("/user");
          }
        } else {
          // If unverified, resend verification email using the user's email
          resendVerification(
            { email: resData.data.user.email },
            {
              onSuccess: () => {
                closeModal("loading");
                router.replace("/signup-success");
              },
              onError: () => {
                closeModal("loading");
              },
            },
          );
        }
      },
      onError: () => {
        closeModal("loading");
      },
    });
  };

  useEffect(() => {
    if (isPending || googleSignInPending) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending, googleSignInPending]);

  return (
    <Card className=" w-[80%]  mx-auto md:w-full md:border border-[#FFFFFF5C] bg-transparent md:bg-[#FEFFFBCC] shadow-none   md:rounded-[10px] overflow-hidden flex flex-col md:flex-row xl:gap-20 lg:p-5 ">
      {/* Left side Image (Hidden on mobile) */}
      <div className="hidden lg:block md:w-1/2 relative  ">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src="/images/login-bg.webp"
            alt="Login background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right side Form */}
      <div className="w-full lg:w-1/2 md:p-5 sm:p-8 lg:p-12 flex flex-col gap-8 md:gap-8 justify-center ">
        {/* Logo */}
        <div className="flex flex-col md:gap-2">
          <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
            <Image
              src="/images/logo.webp"
              alt="sit with PD logo"
              width={30}
              height={30}
            />
            <span className="font-semibold text-[14px] text-[##1E1E1E]">
              Sit With PD
            </span>
          </div>

          <div>
            <h1 className="text-[24px] font-medium md:font-bold text-brand-green mb-1 text-left">
              Welcome Back
            </h1>
            <p className="text-[#475467] text-[14px] md:text-[12px]  text-left">
              Take a moment, breathe, and continue your journey
            </p>
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-5 py-10 md:py-0 md:px-0 bg-[#FEFFFBCC] border border-[#FFFFFF5C] rounded-[5px] md:rounded-none md:border-none "
        >
          <div className="flex flex-col gap-5">
            <FormFieldComp
              control={form.control}
              name="email"
              label="Email address"
              placeholder="Enter your email"
              type="email"
            />

            <div className="space-y-1">
              <FormFieldComp
                control={form.control}
                name="password"
                label="Password"
                placeholder="************"
                type="password"
              />
              <div className="flex justify-end mt-2">
                <Link
                  href="/forgot-password"
                  className="text-[12px] text-[#FDA428] font-medium hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          {/* buttons  */}
          <div className="space-y-10">
            <Button
              type="submit"
              className="w-full bg-brand-green borer-[0.75px] border-brand-green text-white mt-6 rouned-[8px] md:rounded-[3.75px] text-[14px] md:text-[10.5px] font-medium  transition-colors shadow-[0px_1px_2px_0px_#1018280D] md:shadow-[0px_0.75px_1.5px_0px_#1018280D] "
            >
              Log in
            </Button>
            <div className="relative hidden md:block ">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-[0.75px] border-[#E4E4E4]"></div>
              </div>
              <div className="relative flex justify-center text-[12px] text-[#344054] font-medium ">
                <span className="px-3 bg-[#FEFFFBCC]">Or</span>
              </div>
            </div>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const idToken = credentialResponse.credential;
                if (!idToken) {
                  showErrorToast("Invalid Google login credentials");
                  return;
                }

                googleLogin({idToken}, {
                  onSuccess: (resData) => {
                    closeModal("loading");
                    if (resData.data.user.role === "ADMIN") {
                      router.replace("/admin");
                    } else {
                      router.replace("/user");
                    }
                  },
                  onError: (error: any) => {
                    closeModal("loading");
                    showErrorToast(error.message);
                  },
                });
              }}
              onError={() => {
                closeModal("loading");
                showErrorToast("Google login failed");
              }}
            />
          </div>

          <div className="relative my-6 text-center font-medium hidden md:block">
            <p className="text-[12px] text-[#475467]">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#A8D675] hover:text-[#8cb054] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Card>
  );
}
