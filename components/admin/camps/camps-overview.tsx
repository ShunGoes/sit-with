"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import FilterSelectComp from "@/components/filter";
import { addCamp, editCamp } from "@/components/modal-helper";
import QueryStateHandler from "@/components/query-state-handler";
import SeacrchAndFilter from "@/components/seach-and-filter";
import SearchInput from "@/components/searchInput";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import CampsColumn from "@/components/tables/columns/camps-column";
import ReuseableTable from "@/components/tables/reuseable-table";
import { Button } from "@/components/ui/button";
import { useDeleteCamp, useGetCamps } from "@/lib/api/hooks/camps/camps.hooks";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const FILTER_BY_STATUS = [
  {
    label: "published", value: "published"
  }
]
export default function CampsOverview() {
  const searchParams = useSearchParams();
  const filteredItem = searchParams.get("status") ?? "";
  const [search, setSearch] = useState("");

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const settings = usePlatformSettingsStore((state) => state.settings);

  const { data: campsData, isLoading, isError, isFetching } = useGetCamps();

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

  // Client-side filtering
  const filteredData = campsData?.data?.filter((camp) => {
    if (search && !camp.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

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
            className="font-normal"
            onClick={() => addCamp()}
          >
            <Plus /> <span className="hidden sm:block">Add Camp</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">

        {/* <div className="flex justify-between gap-4">
          <SearchInput />
            
          <div>
          <FilterSelectComp paramKey="" options={FILTER_BY_STATUS} />
          </div>
        </div> */}

        {/* table */}
        <div className="bg-dash-secondary-bg rounded-[16px] pb-1">
          <QueryStateHandler
            data={filteredData}
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
              tableData={filteredData ?? []}
            />
          </QueryStateHandler>
        </div>
      </div>
    </div>
  );
}
