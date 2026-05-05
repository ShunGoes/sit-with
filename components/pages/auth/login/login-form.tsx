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
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import { Suspense, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { showErrorToast } from "@/lib/toast-helpers";
import { useSearchParams } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export  function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const settings = usePlatformSettingsStore((state) => state.settings);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate, isPending } = useSignin();
  const { mutate: resendVerification } = useResendVerification();

  const router = useRouter();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate: googleLogin, isPending: googleSignInPending } =
    useGoogleLogin();

  const onSubmit = (data: LoginFormValues) => {
    const values = { email: data.email, password: data.password };

    mutate(values, {
      onSuccess: (resData) => {
        const requireVerification = settings?.requireEmailVerification ?? true;
        if (!requireVerification || resData.data?.user?.isEmailVerified) {
          closeModal("loading");
          if(callbackUrl){
            router.replace(callbackUrl);
          }else{
            router.replace("/");
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
  }, [isPending, googleSignInPending, openModal]);

  return (
    <Card className="flex flex-col lg:flex-row lg:items-stretch  justify-center mx-auto w-full bg-transparent md:bg-[#FEFFFB] shadow-none md:shadow-sm md:rounded-[16px] overflow-hidden lg:p-6 lg:h-[min(635px,90vh)] lg:gap-8">
      {/* Left side Image (Hidden on mobile) */}
      <div className="hidden lg:flex items-center lg:w-1/2 relative h-full">
        <div className="relative w-full h-[95%] rounded-[12px] overflow-hidden bg-gray-100">
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
      <div className="w-full sm:w-[70%] sm:mx-auto lg:w-1/2 overflow-y-auto scrollbar-hide">
        <div className="min-h-full flex flex-col justify-center gap-8 md:gap-8 lg:px-10 lg:py-4">
          {/* Logo */}
          <div className="flex flex-col gap-4 md:gap-2">
            <Link href={"/"} className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
              <div className="w-[120px] h-[40px] relative ">
                <Image
                  src="/images/light-mode-logo.png"
                  alt="Sit With PD Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="text-center lg:text-start">
              <h1 className="text-[24px] font-medium md:font-bold text-brand-green mb-1 ">
                Welcome Back
              </h1>
              <p className="text-[#475467] text-[14px] md:text-[12px] lg:hidden  ">
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
            <div className="space-y-5">
              <Button
                type="submit"
                className="w-full bg-brand-green borer-[0.75px] border-brand-green text-white mt-6 rouned-[8px] md:rounded-[3.75px] text-[14px] md:text-[10.5px] font-medium  transition-colors shadow-[0px_1px_2px_0px_#1018280D] md:shadow-[0px_0.75px_1.5px_0px_#1018280D] "
              >
                Log in
              </Button>

              <div className="flex justify-center w-full overflow-hidden border border-regular-button ">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const idToken = credentialResponse.credential;
                    if (!idToken) {
                      showErrorToast("Invalid Google login credentials");
                      return;
                    }

                    googleLogin(
                      { idToken },
                      {
                        onSuccess: () => {
                          closeModal("loading");
                          router.replace((callbackUrl as string) || "/");
                        },
                        onError: (error: any) => {
                          closeModal("loading");
                          showErrorToast(error.message);
                        },
                      },
                    );
                  }}
                  onError={() => {
                    closeModal("loading");
                    showErrorToast("Google login failed");
                  }}
                  width="400"
                  logo_alignment="center"
                />
              </div>
            </div>

            <div className="relative my-6 lg:my-0 text-center font-medium ">
              <p className="text-[12px] text-[#475467]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-regular-button  hover:text-[#8cb054] font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}

export default function LoginClient() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spinner /></div>}>
            <LoginForm />
        </Suspense>
    );
}