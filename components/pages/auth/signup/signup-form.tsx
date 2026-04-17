"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldComp from "@/components/formfield";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useRegister,
  useGoogleLogin,
} from "@/lib/api/hooks/auth/auth.hooks";
import { useEffect } from "react";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { GoogleLogin } from "@react-oauth/google";
import { showErrorToast } from "@/lib/toast-helpers";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useRegister();
  const { mutate: googleLogin, isPending: googleSignInPending} = useGoogleLogin();

  const onSubmit = (data: SignupFormValues) => {
    const firstName = data.fullName.split(" ")[0];
    const lastName = data.fullName.split(" ").slice(1).join(" ");

    const values = {
      firstName,
      lastName,
      email: data.email,
      password: data.password,
    };

    mutate(values, {
      onSuccess: () => {
        closeModal("loading");
        router.push("/signup-success");
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
    <Card className="flex flex-col  lg:w-full lg:flex-row lg:items-stretch justify-center mx-auto w-full bg-transparent md:bg-[#FEFFFB] shadow-none md:shadow-sm md:rounded-[16px] overflow-hidden lg:p-6 lg:h-[min(635px,90vh)] lg:gap-8">
      {/* Left side Image (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative h-full">
        <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-gray-100">
          <Image
            src="/images/signup-bg.webp"
            alt="Login background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right side Form */}
      <div className="w-full lg:w-1/2 overflow-y-auto scrollbar-hide">
        <div className="min-h-full flex flex-col justify-center gap-8 md:gap-8 lg:px-10 lg:py-4">
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
              Create Account
            </h1>
            <p className="text-[#475467] text-[14px] md:text-[12px] text-left">
              Join us, it only takes a minute.
            </p>
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-5 py-10 md:py-0 md:px-0 bg-[#FEFFFBCC] border border-[#FFFFFF5C] rounded-[5px] md:rounded-none md:border-none "
        >
          <div className="flex flex-col gap-5">
            <div>
              <FormFieldComp
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="Funke Moore"
                type="text"
              />
              {/* <p className="text-xs text-primary-text italic mt-1">
                Firstname Lastname
              </p> */}
            </div>
            <FormFieldComp
              control={form.control}
              name="email"
              label="Email address"
              placeholder="Enter your email"
              type="email"
            />

            <FormFieldComp
              control={form.control}
              name="password"
              label="Password"
              placeholder="************"
              type="password"
            />
            <FormFieldComp
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="************"
              type="password"
            />
          </div>

          {/* buttons  */}
          <div className="space-y-10">
            <Button
              type="submit"
              className="w-full bg-brand-green borer-[0.75px] border-brand-green text-white mt-6 rouned-[8px] md:rounded-[3.75px] text-[14px] md:text-[10.5px] font-medium  transition-colors shadow-[0px_1px_2px_0px_#1018280D] md:shadow-[0px_0.75px_1.5px_0px_#1018280D] "
            >
              Sign Up
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
        </form>
        </div>
      </div>
    </Card>
  );
}
