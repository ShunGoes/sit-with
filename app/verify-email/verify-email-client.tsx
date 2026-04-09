'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { useVerifyEmail } from "@/lib/api/hooks/auth/auth.hooks";

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (!token) {
      router.replace("/verification-failed?reason=invalid");
      return;
    }

    verifyEmailMutation.mutate(token, {
      onSuccess: (data: any) => {
        const userRole = data?.user?.role;

        if (userRole === "ADMIN") {
          router.replace("/admin");
          return;
        }

        router.replace("/user");
      },
      onError: (error: any) => {
        const message = String(error?.message ?? "Verification failed.").toLowerCase();

        if (message.includes("already verified") || message.includes("already been verified")) {
          router.replace("/login");
          return;
        }

        if (message.includes("expired")) {
          router.replace("/verification-failed?reason=expired");
          return;
        }

        router.replace("/verification-failed?reason=invalid");
      },
    });
  }, [router, token, verifyEmailMutation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <Spinner className="h-10 w-10 text-primary" size={40} />
        </div>
        <h1 className="text-xl font-semibold text-slate-900">
          Verifying your email address...
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Please wait while we confirm your account and redirect you to the right dashboard.
        </p>
      </div>
    </div>
  );
}
