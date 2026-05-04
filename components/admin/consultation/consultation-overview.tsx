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
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/searchInput";

const STATUS_OPTIONS = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const LIMIT = 20;

export default function ConsultationOverview() {
  const [filteredItem, setFilteredItem] = useState("");

  const searchParams = useSearchParams();
 
  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? "";

  const params = {
    page,
    limit: LIMIT,
    ...(search !== "" && { search }),
  };

  const openModal = useModalStore((state) => state.openModal);
  const { data, isLoading, isError, isFetching } = useGetConsultations(params);


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
          <Button variant="regular" className="font-normal hidden sm:flex" onClick={handleAddService}>
            <Plus /> <span>Add Service</span>
          </Button>
        </div>
      </div>

      {/* search bar, filter and table */}
      <div className="space-y-4">
        <SearchInput placeholder="Search by name or email"/>
        

        {/* table */}
        <div className="bg-dash-secondary-bg rounded-[16px] pb-1">
          <QueryStateHandler
            key={`${page}-${search}`}
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
        <div>
          <Pagination totalPages={data?.meta?.totalPages ?? 1}  />
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-10 right-10 z-40 pointer-events-auto">
        <button
          onClick={handleAddService}
          className="w-14 h-14 bg-regular-button rounded-full flex items-center justify-center text-white shadow-lg hover:bg-brand-green transition-all duration-300"
          aria-label="Add Service"
        >
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
}
