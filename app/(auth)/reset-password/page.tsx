"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { NewPasswordForm } from "@/components/pages/auth/forgot-password/new-password-form";
import { Spinner } from "@/components/spinner";
import { Card } from "@/components/ui/card";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  useEffect(() => {
    if (!token) {
      router.replace("/forgot-password");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="flex items-center justify-center w-full py-20">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <Card className="max-w-[500px] w-[90%] md:w-full lg:w-[90%] mx-auto bg-[#FEFFFBCC] border-4 border-[#FFFFFF5C] rounded-[10px] shadow-[0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_20px_24px_-4px_rgba(10,13,18,0.08)] overflow-hidden p-6 sm:p-8 lg:px-5 lg:py-7 flex flex-col justify-center relative min-h-[300px]">
      <NewPasswordForm
        token={token}
        onSuccess={() => router.replace("/reset-password-success")}
      />
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full py-20">
          <Spinner size={40} />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
