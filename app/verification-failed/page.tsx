"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResendVerification } from "@/lib/api/hooks/auth/auth.hooks";

interface VerificationFailedPageProps {
  searchParams: {
    reason?: string;
  };
}

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const getFailureContent = (reason?: string) => {
  switch (reason) {
    case "expired":
      return {
        title: "Verification link expired",
        description:
          "Your email verification link has expired. Enter your email below to receive a new verification link.",
      };
    case "invalid":
      return {
        title: "Invalid verification link",
        description:
          "This verification link is invalid or has been tampered with. Enter your email below to receive a fresh verification link.",
      };
    default:
      return {
        title: "Email verification failed",
        description:
          "We could not verify your email address. Enter your email below to request a new verification email.",
      };
  }
};

export default function VerificationFailedPage({ searchParams }: VerificationFailedPageProps) {
  const { title, description } = getFailureContent(searchParams.reason);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resendVerificationMutation = useResendVerification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await resendVerificationMutation.mutateAsync(data);
      setIsSubmitted(true);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Check your email</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            We've sent a new verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
          <div className="mt-8">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mr-4"
            >
              Try another email
            </Button>
            <Button asChild>
              <a href="/login">Go to Login</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="text-left">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || resendVerificationMutation.isPending}
            className="w-full"
          >
            {isSubmitting || resendVerificationMutation.isPending
              ? "Sending..."
              : "Send Verification Email"}
          </Button>
        </form>

        <div className="mt-6">
          <Button asChild variant="outline">
            <a href="/login">Back to Login</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
