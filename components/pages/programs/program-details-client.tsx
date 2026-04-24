"use client";

import { useGetProgramById } from "@/lib/api/hooks/programs/programs.hooks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardSkeletons from "@/components/skeletons/card-skeletons";
import { Suspense } from "react";
import { formatCurrency } from "@/lib/utils";
import { Calendar, CheckCircle, Clock10Icon, Lightbulb } from "lucide-react";
import LocationIcon from "@/pd-icons/location-icon";
import { showErrorToast } from "@/lib/toast-helpers";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useCreatePayment } from "@/lib/api/hooks/payments/payments.hooks";
import { useModalStore } from "@/components/store/use-modal-store";

const WHAT_YOU_WILL_GAIN = [
  "Greater emotional awareness and self-understanding",
  "Clarity in navigating life decisions and transitions",
  "Tools for managing pressure and uncertainty",
];

function PaymentSuccessModal() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
      <CheckCircle className="w-16 h-16 text-regular-button" />
      <h2 className="heading-2 mb-12 max-w-2xl">
        You have successfully enrolled for this coure. Please check your mail
        for the next steps .
      </h2>
    </section>
  );
}

function ProgramDetailsWrapper({ id }: { id: string }) {
  const {
    data: programData,
    isLoading,
    isError,
    isFetching,
  } = useGetProgramById(id);
  const { mutate: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const router = useRouter();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CardSkeletons />{" "}
      </div>
    );
  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-primary-text text-lg tex-center font-medium ">
          There was an error loading this program. Please try refreshing this
          page
        </p>
      </div>
    );
  }

  // adge color
  let typeVariant;

  function variantAssigner(type: "LEADERS" | "PROFESSIONALS" | "STUDENTS") {
    switch (type) {
      case "LEADERS":
        return (typeVariant = "warning");
      case "PROFESSIONALS":
        return (typeVariant = "hibiscus");
      case "STUDENTS":
        return (typeVariant = "success");
      default:
        return (typeVariant = "default");
    }
  }

  const labelText = "font-medium text-lg text-[#606060]";

  // program api response
  const program = programData?.data;
  const {
    title,
    description,
    thumbnail,
    category,
    link,
    price,
    durationWeeks,
    hoursPerWeek,
  } = program;

  // submit enrollment
  const enrolNow = () => {
    if (!id) {
      showErrorToast("Program ID is invalid or cannot be found.");
      return;
    }

    if (!isAuthenticated) {
      router.push(`/auth/login?callbackUrl=/programs/${id}`);
      return;
    }

    const payload = {
      itemId: id,
      type: "PROGRAM" as "PROGRAM" | "CONSULTATION" | "CAMP",
    };

    createPayment(payload, {
      onSuccess: (data) => {
        openModal("success", <PaymentSuccessModal />);
      },
    });
  };

  return (
    <section>
      <div className="w-10/12 sm:w-8/12 lg:w-10/12 max-w-6xl mx-auto my-30">
        <header>
          <h2 className="heading-2 text-center mb-7">Course Details </h2>
        </header>
        <div className="flex flex-col lg:flex-row    gap-10">
          <div className="flex-1">
            <div className="flex flex-col w-full lg:w-[70%] max-w-[506px] h-full bg-[#F2F2F1] p-4 transition-shadow">
              {/* Image Placeholder */}
              <div className="w-full object-top lg:object-center  aspect-3/2 mb-3 overflow-hidden relative">
                <Image
                  src={thumbnail ?? "/images/glimpse-2.png"}
                  alt={title || "Program"}
                  fill
                  className="object-cover"
                />

                {category && (
                  <Badge
                    variant={variantAssigner(category)}
                    className="absolute top-2 left-2 "
                  >
                    {category}
                  </Badge>
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-[#627B3A] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[#263016] leading-relaxed ">
                {description}
              </p>
            </div>
          </div>

          {/* product checkout  */}
          <div className="flex-1">
            <div className="max-w-[500px] shadow-[0px_4px_4px_#141A1A1F] w-full lg:w-[80%] flex flex-col gap-4 lg:ml-auto rounded-[10px] p-4 bg-[#FFFAFA] min-h-[455px] sticky top-0">
              <div className="w-10/12 mx-auto flex flex-col gap-3 py-4">
                <h4 className="text-[#3A3E3F] text-[25px] font-semibold">
                  {formatCurrency(price, "USD")}{" "}
                </h4>
                <p className="text-lg text-[#627B3A] font-semibold">{title}</p>
                <p className="flex items-center gap-3">
                  <Clock10Icon className="text-[#606060]" />{" "}
                  <span className={labelText}>{durationWeeks} weeks </span>
                </p>
                <p className="flex items-center gap-3">
                  <Calendar className="text-[#606060]" />{" "}
                  <span className={labelText}>
                    {hoursPerWeek} {hoursPerWeek === 1 ? "hour" : "hours"} per
                    week{" "}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <LocationIcon className="text-[#606060]" />{" "}
                  <span className={labelText}>Online </span>
                </p>
                <p className="flex items-center gap-3">
                  <Lightbulb className="text-[#606060]" />{" "}
                  <span className={labelText}>Digital Certificate </span>
                </p>
              </div>
              <Button
                onClick={enrolNow}
                variant={"regular"}
                className=" mt-auto rounded-[8px]! w-full"
              >
                Enrol now
              </Button>
            </div>
          </div>
        </div>

        {/* what you will gain  */}
        <section className="mt-20 lg:mt-50 relative">
          <div className="w-full lg:w-1/2 mx-auto">
            <header className="text-[#667185] uppercase text-center mb-10 text-sm">
              what you will gain
            </header>
            <div className="flex items-center flex-col gap-5">
              {WHAT_YOU_WILL_GAIN.map((item, index) => (
                <p
                  key={index}
                  className="text-sm text-[#667185] font-meium border-[#A8D675] text-center border w-full py-3 rounded-[12px] "
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 left-20 -translate-y-1/2 hidden lg:block">
            <Image
              src={"/images/green-arrow-right.png"}
              alt=""
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </section>

        <section className="lg:mt-50 mt-20 relative">
          <header className="text-[#242424] font-semibold text-center  text-lg py-2 border border-[#DDE4EA] w-full rounded-[8px]">
            About This Programme
          </header>
          <p className="text-sm text-[#606060] mt-2 border border-[#E8E8E8] p-2 rounded-[8px] ">
            This programme is designed to support undergraduates navigating identity, pressure, and life transitions. Through guided sessions, reflective practices, and structured conversations, participants develop emotional awareness, clarity, and a stronger sense of direction
          </p>
        </section>
      </div>
    </section>
  );
}

export default function ProgramDetailsClient({ id }: { id: string }) {
  return (
    <Suspense
      fallback={
        <p className="text-center min-h-dvh text-lg text-primary-text">
          Loading program...
        </p>
      }
    >
      <ProgramDetailsWrapper id={id} />
    </Suspense>
  );
}
