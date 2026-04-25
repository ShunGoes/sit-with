"use client";

import React from "react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/use-auth-store";
import { Calendar, Check, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UserDashboardPage() {
  const user = useAuthStore((state) => state.user);

  const fullname = `${user?.firstName} ${user?.lastName}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px]">
      <DashboardHeaderText
        header={`Welcome back ${fullname}`}
        subtext="Browse available programmes to get started"
      />

      <div className="flex flex-col gap-10">
        {/* Empty state  */}
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

        {/* Pending Program  */}
        <section className="grid grid-cols-1 lg:grid-cols-[9fr_3fr] gap-5 ">
          <div className=" flex flex-col gap-5">
            <div className="bg-dash-secondary-bg p-5 flex flex-col gap-y-2">
              <div className=" flex items-center gap-3">
                <h2 className="text-primary-text text-2xl font-semibold">
                  Leadership Essentials
                </h2>
                <Badge>Leaders</Badge>
              </div>

              <div className="flex items-center gap-4">
                <p>
                  <span className="text-sm text-[#667085] flex gap-2 items-center ">
                    <Clock size={12} />
                    12 weeks
                  </span>
                </p>
                <p>
                  <span className="text-sm text-[#667085] flex gap-2 items-center ">
                    <Calendar size={12} />3 hrs per week
                  </span>
                </p>
              </div>

              <div className="mb-6 mt-3">
                <p className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-primary-text font-medium text-sm">
                    Progress: Week 4 of 12
                  </span>
                  <span className="text-regular-button font-semibold text-sm">
                    25%
                  </span>
                </p>
                <div className="relative bg-[#F2F4F7] h-2 w-full">
                  <div
                    className="absolute inset-0 bg-regular-button rounded-full  "
                    style={{
                      width: "25%",
                    }}
                  />
                </div>
              </div>

              <Button variant={"regular"} className="w-full">
                Continue Programme
              </Button>
            </div>
            <div className="bg-dash-secondary-bg p-5 flex flex-col gap-y-2">
              {" "}
              hello
            </div>
          </div>

          <div className="bg-dash-secondary-bg p-5 flex flex-col gap-y-2">
            Lorem ipsum dolor sit.
          </div>
        </section>

        {/* Completed Programs  */}
        <div>
          <p className="text-primary text-lg-text lg:text-xl font-semibold mb-3 ">
            Completed Programmes
          </p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="min-h-[118px] flex-1 bg-dash-secondary-bg  p-4">
              <div className="flex items-center justify-between gap-3 rounded-[12px] mb-3 ">
                <span className="text-primary-text font-medium text-base">
                  Business Strategy for Students
                </span>
                <Badge variant={"success"}>
                  {" "}
                  <Check /> Completed
                </Badge>
              </div>

              <p className="flex items-center text-sm text-secondary-text gap-3">
                8 weeks
                <span className="h-1 w-1 bg-[#667085] rounded-full  "></span>
                Studdent
              </p>
            </div>
            <div className="min-h-[118px] flex-1 bg-dash-secondary-bg  p-4">
              <div className="flex items-center justify-between gap-3 rounded-[12px] mb-3 ">
                <span className="text-primary-text font-medium text-base">
                  Business Strategy for Students
                </span>
                <Badge variant={"success"}>
                  {" "}
                  <Check /> Completed
                </Badge>
              </div>

              <p className="flex items-center text-sm text-secondary-text gap-3">
                8 weeks
                <span className="h-1 w-1 bg-[#667085] rounded-full  "></span>
                Studdent
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
