"use client";

import { Suspense } from "react";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { showErrorToast, showSuccessToast } from "@/lib/toast-helpers";
import { useVerifyEmail } from "@/lib/api/hooks/auth/auth.hooks";
import { useAuthStore } from "@/store/use-auth-store";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { data, isLoading, isError, isSuccess, error } = useVerifyEmail(token);
  
  const setUserEmailVerified = useAuthStore(
    (state) => state.setUserEmailVerified,
  );
  const setUser = useAuthStore((state) => state.setUser);

  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!token) {
      router.replace("/verification-failed?reason=invalid");
      return;
    }

    if (hasCalledRef.current || (!isSuccess && !isError)) {
      return;
    }

    hasCalledRef.current = true;

    if (isSuccess && data) {
      showSuccessToast(data.message);
      
      // Robustly extract user data handling {data: {user: ...}} or {data: {...}}
      const userData = data?.data?.user || data?.data;
      
      if (userData) {
        setUser(userData, "email");
        setUserEmailVerified(true);
      }

      // Wait for 2 seconds to allow the user to read the success message
      setTimeout(() => {
        const role = userData?.role;
        
        if (role === "ADMIN") {
          router.replace("/admin");
        } else if (role === "USER") {
          router.replace("/dashboard");
        } else {
          // No role if userData is partial or missing
          router.replace("/login");
        }
      }, 2000);
    }

    if (isError) {
      const rawMessage = error?.message ?? "Verification failed.";
      const lowerMessage = String(rawMessage).toLowerCase();

      if (
        lowerMessage.includes("already verified") ||
        lowerMessage.includes("already been verified")
      ) {
        showSuccessToast(rawMessage);
        setUserEmailVerified(true);

        setTimeout(() => {
          router.replace("/login");
        }, 2000);
        return;
      }

      showErrorToast(rawMessage);

      if (lowerMessage.includes("expired")) {
        setTimeout(() => {
          router.replace("/verification-failed?reason=expired");
        }, 2000);
        return;
      }

      setTimeout(() => {
        router.replace("/verification-failed?reason=invalid");
      }, 2000);
    }
  }, [router, token, isSuccess, data, isError, error, setUserEmailVerified, setUser]);

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
          Please wait while we confirm your account and redirect you to the
          right dashboard.
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Spinner size={40} />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
