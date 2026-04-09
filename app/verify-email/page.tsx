import { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900">
              Verifying your email address...
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Please wait while we prepare your verification flow.
            </p>
          </div>
        </div>
      }
    >
      <VerifyEmailClient />
    </Suspense>
  );
}
