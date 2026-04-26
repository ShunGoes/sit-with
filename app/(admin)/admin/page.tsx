"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/admin/dashboard/stats-cards";
import { QuickActions } from "@/components/admin/dashboard/quick-actions";
import { RecentActivities } from "@/components/admin/dashboard/recent-activities";
import FilterSelectComp from "@/components/filter";
import { useState } from "react";
import UsersTable from "@/components/admin/users/users-table";

import { RecentPayments } from "@/components/admin/dashboard/recent-payments";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/searchInput";

export default function Page() {
  const [filteredItem, setFilteredItem] = useState("");

  const STATUS_OPTIONS = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="flex flex-col gap-10 w-full pb-8">
      <DashboardHeaderText
        header="Dashboard"
        subtext="Overview of programmes, participants, and activity"
      />

      <StatsCards />
      <QuickActions />
      
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-end w-full">
            <div className="w-auto ">
              {/* <FilterSelectComp
                placeholder="Filter by status"
                options={STATUS_OPTIONS}
                value={filteredItem}
                onValueChange={setFilteredItem}
              /> */}
            </div>
          </div>
          <RecentActivities />
        </div>
        
        <div className="space-y-2">
          <div className="h-11 hidden xl:block"></div> {/* Spacer to align with the filter dropdown */}
          <RecentPayments />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between  gap-3">
          <div>
          <h2 className="text-xl font-semibold text-primary-text">Users</h2>
          <p className="text-sm text-secondary-text">
            All registered users on the platform
          </p>

          </div>
          <SearchInput />
        </div>
        <UsersTable />
      </section>
    </div>
  );
}
