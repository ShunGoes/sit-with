"use client"

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import SeacrchAndFilter from "@/components/seach-and-filter";
import ParticipantsColumn from "@/components/tables/columns/participants-column";
import ReuseableTable from "@/components/tables/reuseable-table";
import { PARTICIPANTS_DATA } from "@/data/table-data";
import React, { useState } from "react";

import { useSearchParams } from "next/navigation";

const STATUS_OPTIONS = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

export default function ParticipantsOverview() {
  const searchParams = useSearchParams();
  const filteredItem = searchParams.get("status") ?? "";
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-15">
      <DashboardHeaderText
        header="Participants "
        subtext="Manage enrolled participants across all programs"
      />

      <div className="space-y-4">
        {/* search and filter functionality */}
        <SeacrchAndFilter
          filterPplaceholder="Filter by status"
          searchPlaceholder="search by name or email...."
          options={STATUS_OPTIONS}
          paramKey="status"
          search={search}
          setSearch={setSearch}
        />

        {/* table  */}
        <div className="bg-dash-secondary-bg rounded-[16px] pb-1 w-full overflow-hidden">
          <ReuseableTable
            columns={ParticipantsColumn()}
            tableData={PARTICIPANTS_DATA}
          />
        </div>
      </div>
    </div>
  );
}
