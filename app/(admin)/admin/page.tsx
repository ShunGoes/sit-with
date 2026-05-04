"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/admin/dashboard/stats-cards";
import { QuickActions } from "@/components/admin/dashboard/quick-actions";
import { RecentActivities } from "@/components/admin/dashboard/recent-activities";
import { Suspense } from "react";
import UsersTable from "@/components/admin/users/users-table";

import { RecentPayments } from "@/components/admin/dashboard/recent-payments";
import SearchInput from "@/components/searchInput";

function DashboardContent() {
  return (
    <div className="flex flex-col gap-10 w-full pb-8">
      <DashboardHeaderText
        header="Dashboard"
        subtext="Overview of programmes, participants, and activity"
      />

      <StatsCards />
      <QuickActions />

      <section className="space-y-6 mt-5">
        <div className="flex flex-col lg:flex-row justify-between  gap-3">
          <div className="w-full">
            <h2 className="text-xl font-semibold text-primary-text">Users</h2>
            <p className="text-sm text-secondary-text">
              All registered users on the platform
            </p>
          </div>
          <div className="w-full flex justify-end">
          <SearchInput />
          </div>
        </div>
        <UsersTable />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
       

        <div className="space-y-2">
          <div className="h-11 hidden xl:block"></div>{" "}
          {/* Spacer to align with the filter dropdown */}
           <div className="mb-7">
          <h2 className="text-xl font-semibold text-primary-text">Recent Payments</h2>
          <p className="text-sm text-secondary-text">
    Users payment across the app
          </p>

          </div>
          <RecentPayments />
        </div>
      </section>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
