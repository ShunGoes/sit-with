"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldComp from "@/components/formfield";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

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
              src="/images/logo.png"
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
                  href="/auth/forgot-password"
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
            <Button
              type="button"
              variant="outline"
              className="w-full text-[#344054] border-none hover:bg-transparent bg-transparent flex items-center justify-center gap-3 text-[12px] font-medium transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>
          </div>

          <div className="relative my-6 text-center font-medium hidden md:block">
            <p className="text-[12px] text-[#475467]">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
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
