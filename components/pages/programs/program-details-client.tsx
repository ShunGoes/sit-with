"use client";

import { useGetProgramById } from "@/lib/api/hooks/programs/programs.hooks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardSkeletons from "@/components/skeletons/card-skeletons";
import { Suspense, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Calendar, CheckCircle, Clock10Icon, Lightbulb } from "lucide-react";
import LocationIcon from "@/pd-icons/location-icon";
import { showErrorToast } from "@/lib/toast-helpers";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useCreatePayment } from "@/lib/api/hooks/payments/payments.hooks";
import { useModalStore } from "@/components/store/use-modal-store";
import { Spinner } from "@/components/spinner";
import { useGetDashboardData } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import { Purchase } from "@/lib/api/services/dashboard/dashboard.services";

const WHAT_YOU_WILL_GAIN = [
  "Greater emotional awareness and self-understanding",
  "Clarity in navigating life decisions and transitions",
  "Tools for managing pressure and uncertainty",
];

function PaymentSuccessModal() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
      <CheckCircle className="w-10 h-10 text-regular-button" />
      <h2 className="text-base text-center mb-12 max-w-2xl">
        You have successfully enrolled for this coure. Please check your mail
        for the next steps .
      </h2>
    </section>
  );
}

function ProgramDetailsWrapper({ id }: { id: string }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    data: programData,
    isLoading,
    isError,
    isFetching,
  } = useGetProgramById(id);
  const { mutate: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();
  const {
    data,
    isLoading: dashboardDataLoading,
  } = useGetDashboardData({ enabled: isAuthenticated });



  const router = useRouter();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const existingProgram = data?.data?.purchases?.find((p: Purchase) => p.programId === id);

  const labelText = "font-medium text-lg text-[#606060]";

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
  } = program ?? {};

  // submit enrollment
  const enrolNow = () => {
    if (!id) {
      showErrorToast("Program ID is invalid or cannot be found.");
      return;
    }

    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/programs/${id}`);
      return;
    }

    if (existingProgram) {
      showErrorToast("You are already enrolled in this program.");
      return;
    }

    // Save pending enrollment so the dashboard can show the congrats modal after payment
    localStorage.setItem(
      "pending_enrollment",
      JSON.stringify({ programId: id, programTitle: title ?? "your programme" })
    );

    // Open tab immediately to avoid popup blockers
    const paymentTab = window.open("", "_blank");

    const payload = {
      itemId: id,
      type: "PROGRAM" as "PROGRAM" | "CONSULTATION" | "CAMP",
    };

    createPayment(payload, {
      onSuccess: (data) => {
        closeModal("loading");
        if (paymentTab) {
          paymentTab.location.href = data?.data?.authorizationUrl;
        }
      },
      onError: (error) => {
        closeModal("loading");
        paymentTab?.close();
        // Clear pending enrollment if payment init fails
        localStorage.removeItem("pending_enrollment");
      },
    });
  };

  // Render different buttons depending on if the user has registered for a course before
  const getButtonByState = () => {
    if (dashboardDataLoading) {
      return (
        <Button disabled variant="regular" className="w-full">
          <Spinner />
        </Button>
      );
    }

    if (existingProgram) {
      return (
        <Link href={`/dashboard/program/${existingProgram.programId}`} className="w-full mt-auto">
          <Button
            variant="regular"
            className="rounded-[8px]! w-full"
          >
            Continue Program
          </Button>
        </Link>
      );
    }

    return (
      <Button
        onClick={enrolNow}
        variant="regular"
        className="mt-auto rounded-[8px]! w-full"
      >
        Enrol now
      </Button>
    );
  };
  
  useEffect(() => {
    if (isCreatingPayment) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isCreatingPayment, openModal]);

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
            <div className="max-w-[500px] shadow-[0px_4px_4px_#141A1A1F] w-full lg:w-[80%] flex flex-col gap-4 lg:ml-auto rounded-[10px] p-4 bg-[#FFFAFA]  sticky top-0">
              <div className="w-10/12 mx-auto flex flex-col gap-3 py-4">
                <h4 className="text-[#3A3E3F] text-[25px] font-semibold">
                  {formatCurrency(price)}{" "}
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
              </div>
              {/* button here  */}
              {getButtonByState()}
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
            This programme is designed to support undergraduates navigating
            identity, pressure, and life transitions. Through guided sessions,
            reflective practices, and structured conversations, participants
            develop emotional awareness, clarity, and a stronger sense of
            direction
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
