"use client"

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import SeacrchAndFilter from "@/components/seach-and-filter";
import ConsultationColumn from "@/components/tables/columns/consultation-column";
import ReuseableTable from "@/components/tables/reuseable-table";
import QueryStateHandler from "@/components/query-state-handler";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import { useGetConsultations } from "@/lib/api/hooks/consultations/consultations.hooks";
import { addConsultationService } from "@/components/modal-helper";
import { Plus, Settings2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const STATUS_OPTIONS = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function ConsultationOverview() {
  const [filteredItem, setFilteredItem] = useState("");
  const [search, setSearch] = useState("");

  const openModal = useModalStore((state) => state.openModal);
  const { data, isLoading, isError, isFetching } = useGetConsultations();


  const tableData: ConsultationColumn[] | [] = data?.data?.map((booking) => ({
  id: booking.id,
  status: booking.status,
  firstName: booking.user.firstName,
  lastName: booking.user.lastName,
  email: booking.user.email,
  serviceTitle: booking.service.title,
  price: booking.service.price,
  date: booking.service.createdAt,
})) ?? []

  const handleAddService = () => {
    addConsultationService();
  };

  return (
    <div className="space-y-15">
      <div className="flex items-center justify-between gap-4">
        <DashboardHeaderText
          header="Consultations"
          subtext="Manage and track all consultation sessions"
        />
        <div className="flex items-center gap-3">
          <Link href="/admin/consultation-services">
            <Button variant="outline" className="font-normal text-regular-button border border-regular-button">
              <Settings2 size={16} /> <span className="hidden sm:block">Services</span>
            </Button>
          </Link>
          <Button variant="regular" className="font-normal" onClick={handleAddService}>
            <Plus /> <span className="hidden sm:block">Add Service</span>
          </Button>
        </div>
      </div>

      {/* search bar, filter and table */}
      <div className="space-y-4">
        <SeacrchAndFilter
          filterPplaceholder="Filter by status"
          searchPlaceholder="Search by name or email"
          options={STATUS_OPTIONS}
          filteredItem={filteredItem}
          setFilteredItem={setFilteredItem}
          search={search}
          setSearch={setSearch}
        />

        {/* table */}
        <div className="bg-dash-secondary-bg rounded-[16px] pb-1">
          <QueryStateHandler
            data={data?.data}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            loadingMessage="Loading consultations..."
            fetchingMessage="Fetching latest consultations..."
            errorMessage="Error loading consultations. Please try again."
            emptyMessage="No consultations at this time"
          >
            <ReuseableTable
              columns={ConsultationColumn()}
              tableData={tableData}
            />
          </QueryStateHandler>
        </div>
      </div>
    </div>
  );
}
