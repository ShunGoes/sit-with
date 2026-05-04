"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import SeacrchAndFilter from "@/components/seach-and-filter";
import ReuseableTable from "@/components/tables/reuseable-table";
import QueryStateHandler from "@/components/query-state-handler";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import { useGetAllConsultationServices } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import ConsultationServicesColumn from "@/components/tables/columns/consultation-services-column";
import AddConsultationServiceForm from "@/components/forms/admin/consultation/add-consultation-service";

import { useSearchParams } from "next/navigation";

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function ConsultationServicesOverview() {
  const searchParams = useSearchParams();
  const filteredItem = searchParams.get("status") ?? "";
  const [search, setSearch] = useState("");

  const openModal = useModalStore((state) => state.openModal);

  const { data, isLoading, isError, isFetching } = useGetAllConsultationServices();

  const handleAddService = () => {
    openModal("add-consultation-service", <AddConsultationServiceForm />);
  };

  // filter the table data using search bar or filter component 
const filteredData = useMemo(() => {
  return (data?.data ?? []).filter((service) => {
    const matchesSearch =
      !search ||
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      !filteredItem ||
      (filteredItem === "active" && service.isActive) ||
      (filteredItem === "inactive" && !service.isActive);

    return matchesSearch && matchesFilter;
  });
}, [data, search, filteredItem]);

  console.log(filteredData)
  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center">
        <DashboardHeaderText
          header="Consultation Services"
          subtext="Manage all available consultation service offerings"
          backLink="/admin/consultation"
          backLinkText="Back to Consultations"
        />
        <Button variant="regular" className="font-normal" onClick={handleAddService}>
          <Plus /> <span className="hidden sm:block">Add Service</span>
        </Button>
      </div>

      <div className="space-y-4">
        <SeacrchAndFilter
          filterPplaceholder="Filter by status"
          searchPlaceholder="Search services..."
          options={STATUS_OPTIONS}
          paramKey="status"
          search={search}
          setSearch={setSearch}
        />

        <div className="bg-dash-secondary-bg rounded-[16px] pb-1 w-full overflow-hidden">
          <QueryStateHandler
            data={filteredData}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            loadingMessage="Loading consultation services..."
            fetchingMessage="Fetching latest services..."
            errorMessage="Error loading services. Please try again."
            emptyMessage="No consultation services yet"
          >
            <ReuseableTable
              columns={ConsultationServicesColumn()}
              tableData={filteredData}
            />
          </QueryStateHandler>
        </div>
      </div>
    </div>
  );
}
