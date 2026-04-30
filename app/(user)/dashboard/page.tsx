"use client";

import React, { useState } from "react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { useAuthStore } from "@/store/use-auth-store";
import {
  Calendar,
  Check,
  Clock,
  Plus,
  Monitor,
  User,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Users,
  Headset,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetDashboardData } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { Purchase } from "@/lib/api/services/dashboard/dashboard.services";
import Image from "next/image";
import CardSkeletons from "@/components/skeletons/card-skeletons";
import ProgramCards from "@/components/user/dashboard/program-cards";
import { messageFacilitator, contactSupport } from "@/components/modal-helper";
import { useDashboardStore } from "@/store/use-dashboard-store";
import Link from "next/link";

export default function UserDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useGetDashboardData();
  const { selectedPurchaseId, setSelectedPurchaseId } = useDashboardStore();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(3); // Default expanded week for demo

  const fullname = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;

  const cardLabel = "text-[#667085] text-xs mb-1";
  const cardValue = "text-primary-text text-base font-semibold";

  if (isLoading) return <CardSkeletons />;

  const purchases = data?.data?.purchases ?? [];
  const selectedPurchase = purchases.find((p) => p.id === selectedPurchaseId);

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-[1200px]">
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
            You're not currently enrolled in any programme. Browse our available
            programmes to start your learning journey.
          </span>
          <Button variant={"regular"} size={"sm"} className="">
            Browse Programmes
          </Button>
        </div>
      </div>
    );
  }

  // If a program is selected, show the detailed view (Image 2)
  if (selectedPurchase) {
    let programStatusBadge:
      | "warning"
      | "hibiscus"
      | "success"
      | "secondary"
      | "link"
      | "default"
      | "outline"
      | "ghost"
      | "destructive"
      | null
      | undefined;

    if (selectedPurchase.program.category === "LEADERS") {
      programStatusBadge = "warning";
    } else if (selectedPurchase.program.category === "PROFESSIONALS") {
      programStatusBadge = "hibiscus";
    } else if (selectedPurchase.program.category === "STUDENTS") {
      programStatusBadge = "success";
    } else {
      programStatusBadge = "secondary";
    }
    return (
      <div className="flex flex-col gap-8 w-full max-w-[1200px]">
        <div className="flex justify-between">
          <DashboardHeaderText
            header={`Welcome back, ${fullname}`}
            subtext="Continue your programme journey"
          />

          <Button
            variant="regular"
            size={"sm"}
            onClick={() => setSelectedPurchaseId(null)}
          >
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[9fr_3fr] gap-6 relative">
          {/* Main Content Area */}
          <div className="flex flex-col gap-8">
            {/* Active Program Progress Card */}
            <div className="bg-dash-secondary-bg rounded-[12px] border-[0.67px] border-[#EAECF0] dark:border-none p-6 ">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="xl:text-2xl-text text-xl font-semibold text-primary-text">
                  {selectedPurchase.program.title}
                </h2>
                <Badge variant={programStatusBadge}>
                  {selectedPurchase.program.category}
                </Badge>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2 text-primary-text text-sm">
                  <Clock size={16} />
                  <span>
                    {selectedPurchase.program.durationWeeks ?? 0}
                    {selectedPurchase.program.durationWeeks === 1
                      ? " week"
                      : " weeks"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-primary-text text-sm">
                  <Calendar size={16} />
                  <span>
                    {selectedPurchase.program.hoursPerWeek}
                    {selectedPurchase.program.hoursPerWeek === 1 ? "hr" : "hrs"}
                    /week
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-primary-text">
                    Progress: Week 3 of 12
                  </span>
                  <span className="font-semibold text-regular-button">25%</span>
                </div>
                <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-regular-button"
                    style={{ width: "25%" }}
                  />
                </div>
              </div>

              <Link href={`/dashboard/program`}>
                <Button variant="regular" className="w-full ">
                  Continue Programme
                </Button>
              </Link>
            </div>

            {/* Programme Content Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#101828]">
                  Programme Content
                </h3>
                <button className="text-[#667085] text-sm flex items-center gap-1">
                  Collapse <ChevronDown size={16} />
                </button>
              </div>

              {/* Weekly Modules */}
              {/* {[1, 2, 3, 4, 5].map((week) => (
                <div
                  key={week}
                  className={`border rounded-2xl transition-all ${week === 3 ? "border-[#445b1c] bg-[#F9FFF0]" : "border-[#EAECF0] bg-white"}`}
                >
                  <div
                    className="p-5 flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      setExpandedWeek(expandedWeek === week ? null : week)
                    }
                  >
                    <div className="flex items-center gap-4">
                      {week < 3 ? (
                        <div className="w-6 h-6 rounded-full bg-[#ECFDF3] flex items-center justify-center border border-[#ABEFC6]">
                          <Check size={14} className="text-[#079455]" />
                        </div>
                      ) : week === 3 ? (
                        <div className="w-6 h-6 rounded-full border-2 border-[#445b1c] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#445b1c]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-[#EAECF0]" />
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-[#101828]">
                            Week {week}
                            {week === 3 && (
                              <span className="text-[#445b1c] text-xs ml-2 font-medium">
                                — Current
                              </span>
                            )}
                          </h4>
                        </div>
                        <p className="text-xs text-[#667085]">
                          {week === 1
                            ? "Introduction to Leadership"
                            : week === 2
                              ? "Understanding Leadership Styles"
                              : "Communication & Influence"}
                        </p>
                        <p className="text-[10px] text-[#98A2B3] mt-0.5">
                          {week < 3
                            ? "All modules completed"
                            : week === 3
                              ? "3 of 5 modules completed"
                              : "0 of 5 modules completed"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {week < 3 && (
                        <span className="text-xs font-medium text-[#079455]">
                          Completed
                        </span>
                      )}
                      <ChevronRight size={18} className="text-[#667085]" />
                    </div>
                  </div>
                </div>
              ))} */}

              <Button
                variant="outline"
                className="w-full py-6 rounded-xl text-[#101828] border-[#EAECF0]"
              >
                Collapse Content
              </Button>
            </div>
          </div>

          {/* Right Sidebar Section */}
          <div className="flex flex-col gap-6 sticky top-0">
            {/* Programme Overview Card */}
            <div className="bg-dash-secondary-bg rounded-[12px] border-[0.67px] dark:border-none border-[#EAECF0] px-3 py-4">
              <h3 className="text-base font-semibold text-primary-text mb-3">
                Programme Overview
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-3">
                <div>
                  <p className={cardLabel}>Duration</p>
                  <p className={cardValue}>12 weeks</p>
                </div>
                <div>
                  <p className={cardLabel}>Format</p>
                  <p className={cardValue}>online</p>
                </div>
                <div>
                  <p className={cardLabel}>Start date</p>
                  <p className={cardValue}>
                    {selectedPurchase?.program.startDate
                      ? new Date(
                          selectedPurchase?.program.startDate,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Not Started"}
                  </p>
                </div>
                <div>
                  <p className={cardLabel}>Status</p>
                  <Badge className="bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6] font-medium rounded-full px-2 flex items-center gap-1 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#027A48]" />{" "}
                    Active
                  </Badge>
                </div>
              </div>
            </div>

            {/* Need Support Card */}
            <div className="bg-dash-secondary-bg rounded-2xl border border-[#EAECF0] px-4 py-5 shadow-sm">
              <h3 className="text-base font-semibold text-primary-text mb-3">
                Need Support?
              </h3>
              <div className="bg-[#F9FAFB] rounded-xl px-3 py-4 mb-4 flex  gap-3">
                <div className="w-8 h-8 rounded-full shrink-0 bg-regular-button flex items-center justify-center text-white font-seminold">
                  {fullname.split(" ")[0][0]}
                  {fullname.split(" ")[1][0]}
                </div>
                <div>
                  <p className="text-sm text-primary-text font-semibold">
                    {fullname}
                  </p>
                  <p className="text-sm text-primary-text mb-4">
                    Programme Facilitator
                  </p>
                  <p className="text-xs text-regular-button font-medium mt-0.5">
                    info@sitwithpd.com
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-[#D0D5DD] border-[0.67px] "
                  onClick={() => messageFacilitator(selectedPurchase.program.id)}
                >
                  <MessageCircle size={18} className="text-primary-text" />
                  <span className="text-sm font-medium text-primary-text">
                    Message Facilitator
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-6 rounded-xl border-[#EAECF0] text-[#101828]"
                >
                  <Users size={18} className="text-primary-text" />
                  <span className="text-sm font-medium text-primary-text">
                    Join Community
                  </span>
                </Button>
                <Button
                  variant="regular"
                  className="w-full "
                  onClick={contactSupport}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Programs Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-[#101828] mb-6">
            Completed Programmes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-[#101828]">
                  Business Strategy for Students
                </h4>
                <Badge className="bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6] font-medium rounded-full px-3 py-0.5 flex items-center gap-1">
                  <Check size={12} /> Completed
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-[#667085] text-sm">
                <span>8 weeks</span>
                <span className="w-1 h-1 rounded-full bg-[#D0D5DD]" />
                <span>Student</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-[#101828]">
                  Executive Leadership
                </h4>
                <Badge className="bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6] font-medium rounded-full px-3 py-0.5 flex items-center gap-1">
                  <Check size={12} /> Completed
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-[#667085] text-sm">
                <span>6 weeks</span>
                <span className="w-1 h-1 rounded-full bg-[#D0D5DD]" />
                <span>Leaders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Initial Program Card View (Image 1)
  return (
    <div className="flex flex-col gap-7">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-[#527E4D] rounded-[16px] p-8 text-white  flex items-center ">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF33] flex items-center justify-center  backdrop-blur-sm">
            <Check className="text-white" size={24} />
          </div>
          <div>
            <h1 className="xl:text-[1.75rem] text-xl font-semibold text-white">
              Welcome, {user?.firstName ?? ""} {user?.lastName ?? ""}! 🎉
            </h1>
            <p className="text-[#FFFFFFE5] text-base">
              Payment successful - You&apos;re all set to begin your learning
              journey
            </p>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -top-[70%] right-[30px] w-50 h-50 bg-[#FFFFFF1A] rounded-full" />
      </div>

      <div className="flex flex-col gap-10">
        {purchases.map((purchase) => (
          <ProgramCards key={purchase.id} purchase={purchase} />
        ))}
      </div>
    </div>
  );
}
