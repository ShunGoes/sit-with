"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import addNewProgram from "@/components/modal-helper";
import SeacrchAndFilter from "@/components/seach-and-filter";
import ProgramsColumn from "@/components/tables/columns/programs-column";
import ReuseableTable from "@/components/tables/reuseable-table";
import { Button } from "@/components/ui/button";
import { PROGRAMS_TABLE } from "@/data/table-data";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const CHURCH_OPTIONS = [
  {
    label: "Ascending",
    value: "ascending",
  },
];
export default function ProgramOverview() {
  const [filteredItem, setFilteredItem] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center ">
        <DashboardHeaderText
          header="Programs "
          subtext="Manage all learning programs on the platform"
        />
        <Button
          variant={"regular"}
          className="font-normal"
          onClick={addNewProgram}
        >
          <Plus /> <span className="hidden sm:block">New Program </span>
        </Button>
      </div>

      <div className="space-y-4">
        {/* search and filter functionality */}
        <SeacrchAndFilter
          filterPplaceholder="Filter by type"
          searchPlaceholder="search progrma..."
          options={CHURCH_OPTIONS}
          filteredItem={filteredItem}
          setFilteredItem={setFilteredItem}
          search={search}
          setSearch={setSearch}
        />

        {/* table  */}
        <div className="bg-dash-secondary-bg rounded-[16px]  pb-1">
          <ReuseableTable
            columns={ProgramsColumn()}
            tableData={PROGRAMS_TABLE}
          />
        </div>
      </div>
    </div>
  );
}
