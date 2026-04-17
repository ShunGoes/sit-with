import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="w-full max-w-xl rounded-[10px] border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-[24px] font-medium md:font-bold text-brand-green mb-1 text-center">Check your email</h1>
        <p className="text-[#475467] text-base">
          We sent a verification link to your inbox. Open your email and click the link to verify your account and continue.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
          >
            <Button variant="regular">

            Go to Login

            </Button>
          </Link>
          <Link
            href="/"
          >
            <Button variant={"outline"} className="text-regular-button">

            Back to Home

            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
