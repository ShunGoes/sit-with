"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { addNewProgram, editProgram } from "@/components/modal-helper";
import QueryStateHandler from "@/components/query-state-handler";
import SeacrchAndFilter from "@/components/seach-and-filter";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import ProgramsColumn from "@/components/tables/columns/programs-column";
import ReuseableTable from "@/components/tables/reuseable-table";
import { Button } from "@/components/ui/button";
import {
  useDeleteProgram,
  useGetAllAdminPrograms,
} from "@/lib/api/hooks/programs/programs.hooks";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CHURCH_OPTIONS = [
  {
    label: "Ascending",
    value: "ascending",
  },
];
export default function ProgramOverview() {
  const searchParams = useSearchParams();
  const filteredItem = searchParams.get("type") ?? "";
  const [search, setSearch] = useState("");

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const params = {
    search,
    type: filteredItem,
  };
  const { data: programData, isLoading, isError, isFetching } =
    useGetAllAdminPrograms(params);

  const { mutate, isPending } = useDeleteProgram();

  const handleDeleteProgram = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        closeModal("loading");
      },
      onError: () => {
        closeModal("loading");
      },
    });
  };

   useEffect(() => {
      if (isPending) {
        openModal(
          "loading",
          <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
            <Spinner size={40} />
          </div>,
          { isMutation: true },
        );
      }
    }, [isPending, openModal]);

  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center ">
        <DashboardHeaderText
          header="Programs "
          subtext="Manage all learning programs on the platform"
        />
        <Link href={"/admin/program/add"}>
          <Button variant={"regular"} className="font-normal">
            <Plus /> <span className="hidden sm:block">New Program </span>
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {/* search and filter functionality */}
        <SeacrchAndFilter
          filterPplaceholder="Filter by type"
          searchPlaceholder="search progrma..."
          options={CHURCH_OPTIONS}
          paramKey="type"
          search={search}
          setSearch={setSearch}
        />

        {/* table  */}
        <div className="bg-dash-secondary-bg rounded-[16px]  pb-1">
          <QueryStateHandler
            data={programData?.data}
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
              tableData={programData?.data}
            />
          </QueryStateHandler>
        </div>
      </div>
    </div>
  );
}
