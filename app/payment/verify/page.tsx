"use client";

import { Spinner } from "@/components/spinner";
import { useVerifyPaystackPayment } from "@/lib/api/hooks/payments/payments.hooks";
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function VerifyPayment({ reference }: { reference: string }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(2);
  const { data, isLoading, isError, error } = useVerifyPaystackPayment(reference);

  const payment = data?.data;
  const isSuccess = payment?.status === "SUCCESS";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess && (payment?.type === "PROGRAM" || payment?.type === "CAMP")) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.replace("/dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSuccess, payment?.type, router]);

  if (!reference) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 p-6">
        <div className="bg-red-50 p-4 rounded-full">
          <AlertCircle className="w-12 h-12 text-brand-red" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-primary-text">Invalid Reference</h2>
          <p className="text-secondary-text max-w-md">
            We couldn't find a valid payment reference. If you believe this is an error, please contact support.
          </p>
        </div>
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Spinner size={48} />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-primary-text animate-pulse">
            Verifying Payment
          </h2>
          <p className="text-secondary-text">
            Please wait while we confirm your transaction with Paystack...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 p-6">
        <div className="bg-red-50 p-4 rounded-full">
          <XCircle className="w-12 h-12 text-brand-red" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-primary-text">Verification Error</h2>
          <p className="text-secondary-text max-w-md">
            {error?.message || "An unexpected error occurred while verifying your payment."}
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
          <Link href="/dashboard">
            <Button variant="outline" className="text-regular-button border-regular-button">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      <div className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-8 max-w-md w-full border border-neutral-100 dark:border-neutral-800 text-center space-y-8 transform transition-all animate-in fade-in zoom-in duration-500">
        
        {isSuccess ? (
          <>
            <div className="flex justify-center">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-full animate-bounce">
                <CheckCircle className="w-16 h-16 text-regular-button" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-primary-text">Payment Success!</h2>
              <p className="text-secondary-text text-lg">
                Your payment of <span className="font-semibold text-primary-text">{payment?.amount?.toLocaleString()}</span> has been verified.
              </p>
              <div className="bg-green-50 py-2 px-4 rounded-lg inline-block">
                <p className="text-regular-button  text-sm font-medium">
                  Redirecting to dashboard in {countdown}s...
                </p>
              </div>
            </div>
            <Button 
              className="w-full h-12 text-lg font-medium group" 
              onClick={() => router.push("/dashboard")}
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </>
        ) : payment?.status === "PENDING" ? (
          <>
            <div className="flex justify-center">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-full">
                <AlertCircle className="w-16 h-16 text-amber-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-primary-text">Payment Pending</h2>
              <p className="text-secondary-text">
                Your payment is still being processed. This can happen if Paystack is waiting for confirmation from your bank.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="text-regular-button border-regular-button" onClick={() => window.location.reload()}>
                Refresh Status
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full">
                <XCircle className="w-16 h-16 text-brand-red" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-primary-text">Payment Failed</h2>
              <p className="text-secondary-text">
                Unfortunately, your transaction could not be completed. Please check your bank and try again.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/programs">
                <Button className="w-full">Back to Programs</Button>
              </Link>
              <Button variant="outline" className="text-regular-button border-regular-button" onClick={() => window.location.reload()}>
                Try Verification Again
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPaymentWrapper() {
  return (
    <React.Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    }>
      <VerifyPaymentContent />
    </React.Suspense>
  );
}

function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref") || "";

  return (
    <main className="min-h-screen bg-[#F9FAFB] dark:bg-black flex items-center justify-center font-inter w-full">
      <VerifyPayment reference={reference} />
    </main>
  );
}
