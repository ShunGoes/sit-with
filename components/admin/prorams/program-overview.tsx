"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { addNewProgram, editProgram } from "@/components/modal-helper";
import QueryStateHandler from "@/components/query-state-handler";
import SeacrchAndFilter from "@/components/seach-and-filter";
import ProgramsColumn from "@/components/tables/columns/programs-column";
import ReuseableTable from "@/components/tables/reuseable-table";
import { Button } from "@/components/ui/button";
import { PROGRAMS_TABLE } from "@/data/table-data";
import { useDeleteProgram, useGetAllAdminPrograms } from "@/lib/api/hooks/programs/programs.hooks";
import { Plus } from "lucide-react";
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

  const params = {
    search,
    type: filteredItem,
  };
  const { data, isLoading, isError, isFetching } =
    useGetAllAdminPrograms(params);

  const {mutate, isPending} = useDeleteProgram()

  const handleDeleteProgram = (id: string) => {
    mutate(id)
  }

  

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
          <QueryStateHandler
            data={data}
            isLoading={isLoading}
            isError={isError}
            loadingMessage="Loading Programs"
            fetchingMessage="Fetching Latest Programs"
            errorMessage="Error loading programs. Please try again"
            emptyMessage="No Programs at this time"
            isFetching={isFetching}
            
          >
            <ReuseableTable
              columns={ProgramsColumn(handleDeleteProgram, editProgram)}
              tableData={PROGRAMS_TABLE}
            />
          </QueryStateHandler>
        </div>
      </div>
    </div>
  );
}
