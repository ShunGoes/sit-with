import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-semibold text-slate-900">Check your email</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          We sent a verification link to your inbox. Open your email and click the link to verify your account and continue.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Go to Login
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-8 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
