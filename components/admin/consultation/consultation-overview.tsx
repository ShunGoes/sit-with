"use client"

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import SeacrchAndFilter from "@/components/seach-and-filter";
import ConsultationColumn from "@/components/tables/columns/consultation-column";
import ReuseableTable from "@/components/tables/reuseable-table";
import { CONSULTATION_DATA, PROGRAMS_TABLE } from "@/data/table-data";
import React, { useState } from "react";

const CHURCH_OPTIONS = [
  {
    label: "Ascending",
    value: "ascending",
  },
];

export default function ConsultationOverview() {
  const [filteredItem, setFilteredItem] = useState("");
  const [search, setSearch] = useState("");
  return (
    <div className="space-y-15">
      <DashboardHeaderText
        header="Consultations "
        subtext="Manage and track all consultation sessions"
      />

      {/* serach bar, fiter and table  */}
      <div className="space-y-4">
        {/* search and filter functionality */}
        <SeacrchAndFilter
          filterPplaceholder="Filter by status"
          searchPlaceholder="search by name or email"
          options={CHURCH_OPTIONS}
          filteredItem={filteredItem}
          setFilteredItem={setFilteredItem}
          search={search}
          setSearch={setSearch}
        />

        {/* table  */}
        <div className="bg-white rounded-[16px]  pb-1">
          <ReuseableTable
            columns={ConsultationColumn()}
            tableData={CONSULTATION_DATA}
          />
        </div>
      </div>
    </div>
  );
}
