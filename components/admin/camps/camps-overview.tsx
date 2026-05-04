"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import FilterSelectComp from "@/components/filter";
import { addCamp, editCamp } from "@/components/modal-helper";
import QueryStateHandler from "@/components/query-state-handler";
import SearchInput from "@/components/searchInput";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import CampsColumn from "@/components/tables/columns/camps-column";
import Pagination from "@/components/pagination";
import ReuseableTable from "@/components/tables/reuseable-table";
import { Button } from "@/components/ui/button";
import { useDeleteCamp, useGetAdminCamps } from "@/lib/api/hooks/camps/camps.hooks";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const FILTER_BY_STATUS = [
  { label: "All Status", value: "all" },
  { label: "Upcoming", value: "UPCOMING" },
  { label: "Ongoing", value: "ONGOING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];
export default function CampsOverview() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const search = searchParams.get("search") || "";
  const status =  searchParams.get("status") === "all" ? "" : searchParams.get("status") || "";

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const settings = usePlatformSettingsStore((state) => state.settings);

  const { data: campsData, isLoading, isError, isFetching } = useGetAdminCamps({
    page,
    limit,
    search,
    status,
  });

  const { mutate, isPending } = useDeleteCamp();

  const handleDeleteCamp = (id: string) => {
    // Add simple native confirm
    if (window.confirm("Are you sure you want to delete this camp?")) {
      mutate(id, {
        onSuccess: () => {
          closeModal("loading");
        },
        onError: () => {
          closeModal("loading");
        },
      });
    }
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
          header="Camps"
          subtext="Manage all camps on the platform"
        />

        <div className="flex items-center gap-2">
         
          <Button
            variant={"regular"}
            className="font-normal hidden sm:flex"
            onClick={() => addCamp()}
          >
            <Plus /> <span>Add Camp</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <SearchInput />
          </div>
            
          <div className="w-full sm:w-auto">
            <FilterSelectComp paramKey="status" options={FILTER_BY_STATUS} />
          </div>
        </div>

        {/* table */}
        <div className="bg-dash-secondary-bg rounded-[16px] pb-1 w-full overflow-hidden">
          <QueryStateHandler
            data={campsData?.data}
            isLoading={isLoading}
            isError={isError}
            loadingMessage="Loading Camps"
            fetchingMessage="Fetching Latest Camps"
            errorMessage="Error loading camps. Please try again"
            emptyMessage="No camps at this time"
            isFetching={isFetching}
          >
            <ReuseableTable
              columns={CampsColumn(handleDeleteCamp, editCamp, settings?.currency)}
              tableData={campsData?.data ?? []}
            />
            {campsData?.meta?.totalPages && (
              <Pagination totalPages={campsData.meta.totalPages} />
            )}
          </QueryStateHandler>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-10 right-10 z-40 pointer-events-auto">
        <button
          onClick={() => addCamp()}
          className="w-14 h-14 bg-regular-button rounded-full flex items-center justify-center text-white shadow-lg hover:bg-brand-green transition-all duration-300"
          aria-label="Add Camp"
        >
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
}
