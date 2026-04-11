import { PasswordSuccess } from "@/components/pages/auth/forgot-password/password-success";
import { Card } from "@/components/ui/card";

export default function ResetPasswordSuccessPage() {
  return (
    <Card className="max-w-[500px] w-[90%] md:w-full lg:w-[90%] mx-auto bg-[#FEFFFBCC] border-4 border-[#FFFFFF5C] rounded-[10px] shadow-[0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_20px_24px_-4px_rgba(10,13,18,0.08)] overflow-hidden p-6 sm:p-8 lg:px-5 lg:py-7 flex flex-col justify-center relative min-h-[300px]">
      <PasswordSuccess />
    </Card>
  );
}
