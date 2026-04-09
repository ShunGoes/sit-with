import { BadgeCheck, X } from "lucide-react";
import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
     toast.success(message, {
          classNames: {
            toast: "bg-green-500 text-white font-medium text-lg p-4 min-h-16 rounded-lg",
            icon: "shrink-0",
            },
            duration: 5000,
            icon: <BadgeCheck  />,
          });
}

export const showErrorToast = (message: string) => {
     toast.error(message, {
          classNames: {
            toast: "bg-red-500 text-white font-medium text-lg p-4 min-h-16 rounded-lg",
            icon: "shrink-0",
            },
            duration: 5000,
            icon: <X  />,
          });
}


