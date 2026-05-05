"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { useAuthStore } from "@/store/use-auth-store";
import { Check, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetDashboardData } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import CardSkeletons from "@/components/skeletons/card-skeletons";
import ProgramCards from "@/components/user/dashboard/program-cards";
import { contactSupport } from "@/components/modal-helper";
import ProgramGrowth from "@/components/pages/programs/program-growth";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import { useGetAllConsultationServices } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import { getCalApi } from "@calcom/embed-react";
import UserConsultations from "@/components/user/dashboard/user-consultations";
import UserBlogsCarousel from "@/components/user/dashboard/user-blogs-carousel";
import Link from "next/link";
import CampCards from "@/components/user/dashboard/camp-cards";
import EnrollmentSuccessModal from "@/components/user/dashboard/enrollment-success-modal";

export default function UserDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useGetDashboardData();
  const Adminsettings = usePlatformSettingsStore((state) => state.settings);
  const [showPrgrams, setShowPrgrams] = useState(false);

  // Enrollment congratulations state
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrolledProgramTitle, setEnrolledProgramTitle] =
    useState("your programme");
  const [showWelcomeBanner, setShowWelcomeBanner] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const raw = localStorage.getItem("pending_enrollment");
    if (raw) {
      try {
        const { programTitle } = JSON.parse(raw);
        setEnrolledProgramTitle(programTitle ?? "your programme");
        setShowWelcomeBanner(programTitle ?? "your programme");
      } catch {
        // Ignore malformed JSON
      }
      setShowEnrollModal(true);
    }

    return () => {
      localStorage.removeItem("pending_enrollment");
    };
  }, []);

  const handleCloseEnrollModal = () => {
    setShowEnrollModal(false);
  };

  const fullname = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;

  if (isLoading) return <CardSkeletons />;

  const purchases = data?.data?.purchases ?? [];
  const campRegistrations = data?.data?.campRegistrations ?? [];

  // empty  user dashboard state without course
  if (purchases.length === 0) {
    return (
      <div>
        <EnrollmentSuccessModal
          isOpen={showEnrollModal}
          programTitle={enrolledProgramTitle}
          onClose={handleCloseEnrollModal}
        />
        <AnimatePresence mode="wait">
          {showPrgrams ? (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProgramGrowth paddingTop="lg:py-0" />
              <div className="flex justify-center mt-10">
                <Button
                  variant={"regular"}
                  size={"sm"}
                  onClick={() => setShowPrgrams(false)}
                  className=""
                >
                  Back to Dashboard
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-programs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6 w-full max-w-[1200px]"
            >
              <DashboardHeaderText
                header={`Welcome back ${fullname}`}
                subtext="Browse available programmes to get started"
              />
              <div className="min-h-[330px] border-2 border-[#D0D5DD] rounded-[12px] w-full p-5 bg-dash-secondary-bg flex flex-col gap-3 items-center justify-center">
                <span className="bg-[#F9FAFB] rounded-full flex items-center justify-center h-15 w-15">
                  <Plus className="text-primary-text" />
                </span>
                <p className="text-primary text-lg-text lg:text-xl font-semibold ">
                  No active programme
                </p>
                <span className="text-sm text-[#667085] lg:w-1/2 w-full mx-auto text-center ">
                  You're not currently enrolled in any programme. Browse our
                  available programmes to start your learning journey.
                </span>
                <Button
                  onClick={() => setShowPrgrams(true)}
                  variant={"regular"}
                  size={"sm"}
                  className=""
                >
                  Browse Programmes
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="">
      {/* Enrollment congratulations modal */}
      <EnrollmentSuccessModal
        isOpen={showEnrollModal}
        programTitle={enrolledProgramTitle}
        onClose={handleCloseEnrollModal}
      />

      <div className="flex flex-col gap-7 min-w-0">
        {/* Welcome Banner — hidden while congrats modal is showing to avoid double-banner */}
        {showWelcomeBanner && !showEnrollModal ? (
          <div className="relative overflow-hidden bg-[#527E4D] rounded-[16px] lg:p-8 p-4 sm:p-6 text-white  flex items-center ">
            <div className="relative z-10 flex items-center gap-4 lg:gap-6">
              <div className="w-10 h-10 rounded-full bg-[#FFFFFF33] shrink-0 flex items-center justify-center  backdrop-blur-sm">
                <Check className="text-white" size={18} />
              </div>
              <div>
                <h1 className="xl:text-[1.55rem] text-lg font-semibold text-white dark:text-secondary-text">
                  Welcome, {user?.firstName ?? ""}! 🎉
                </h1>
                <p className="text-[#FFFFFFE5] text-sm">
                  Payment successful - You&apos;re all set to begin your
                  learning journey
                </p>
              </div>
            </div>
            {/* Decorative Circles */}
            <div className="absolute -top-[70%] right-[30px] w-50 h-50 bg-[#FFFFFF1A] rounded-full" />
          </div>
        ) : (
          <DashboardHeaderText
            header={`Welcome back ${fullname}`}
            subtext="Browse available programmes to get started"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-6">
          <div className="min-w-0 space-y-10">
            <div className="flex flex-col gap-10 min-w-0">
              {purchases.map((purchase) => (
                <ProgramCards key={purchase.id} purchase={purchase} />
              ))}
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-primary-text mb-3">
                Consultation Services
              </h3>
              <UserConsultations />
            </div>

            {campRegistrations.length > 0 && (
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-primary-text mb-3">
                  Your Registered Camps
                </h3>
                <div className="flex flex-col gap-6">
                  {campRegistrations.map((registration: any) => (
                    <CampCards
                      key={registration.id}
                      registration={registration}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Section */}
          <div className="flex flex-col gap-6 sticky top-0 min-w-0">
            {/* Need Support Card */}
            <div className="bg-dash-secondary-bg rounded-2xl dark:border-none border border-[#EAECF0] px-4 py-5 shadow-sm">
              <h3 className="text-base font-semibold text-primary-text mb-3">
                Need Support?
              </h3>
              <div className="bg-[#F9FAFB] dark:bg-transparent rounded-xl px-3 py-4 mb-4 flex  gap-3">
                <div className="w-8 h-8 rounded-full shrink-0 bg-regular-button flex items-center justify-center text-white font-seminold">
                  {/* {fullname.split(" ")[0][0]}
                  {fullname.split(" ")[1][0]} */}
                  MS
                </div>
                <div>
                  <p className="text-sm text-primary-text font-semibold">
                    Mr. Samuel
                  </p>
                  <p className="text-sm text-primary-text mb-4">Admin</p>
                  <p className="text-xs text-regular-button font-medium mt-0.5">
                    {Adminsettings && Adminsettings.supportEmail}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  variant="regular"
                  className="w-full "
                  onClick={contactSupport}
                >
                  Contact Support
                </Button>
              </div>
            </div>

            {/* Blog section  */}
            <div className="min-w-0 mt-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-primary-text">
                  Blogs
                </h3>
                <Link
                  href="/blog"
                  className="text-sm text-regular-button hover:underline"
                >
                  View all
                </Link>
              </div>
              <UserBlogsCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
