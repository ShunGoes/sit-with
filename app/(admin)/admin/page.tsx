"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/admin/dashboard/stats-cards";
import { QuickActions } from "@/components/admin/dashboard/quick-actions";
import { RecentActivities } from "@/components/admin/dashboard/recent-activities";
import FilterSelectComp from "@/components/filter";
import { useState } from "react";

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
      <section className="space-y-2">
        <div className="flex justify-end w-full">
          <div className="w-auto ">
            <FilterSelectComp
              placeholder="Filter by status"
              options={STATUS_OPTIONS}
              value={filteredItem}
              onValueChange={setFilteredItem}
            />
          </div>
        </div>
        <RecentActivities />
      </section>
    </div>
  );
}
