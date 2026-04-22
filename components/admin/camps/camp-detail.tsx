"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import QueryStateHandler from "@/components/query-state-handler";
import ReuseableTable from "@/components/tables/reuseable-table";
import {
  useGetCamp,
  useGetCampParticipants,
} from "@/lib/api/hooks/camps/camps.hooks";
import Image from "next/image";
import ParticipantsColumn from "@/components/tables/columns/participants-column";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ViewTransition } from "react";
import { flushSync } from "react-dom";
import { useModalStore } from "@/components/store/use-modal-store";

export default function CampDetail({ id }: { id: string }) {
  const { data: campData, isLoading, isError } = useGetCamp(id);
  const { data: participantsData, isLoading: participantsLoading } =
    useGetCampParticipants(id);
console.log(participantsData)
  const openModal = useModalStore((state) => state.openModal);
  const camp = campData?.data;

  
  const handleOpenLightbox = () => {
    const renderModal = () => {
      openModal(
        "open-lightbox",
        <div className=" w-[80%] h-[50vh] max-w-6xl mx-auto flex items-center justify-center">
          <ViewTransition name={camp?.id ?? "lightbox"}>
            <div className="relative aspect-square w-full h-full rounded-[10px] overflow-hidden">
              <Image
                src={camp?.thumbnail ?? ""}
                fill
                className="object-cover "
                alt={camp?.title ?? ""}
              />
            </div>
          </ViewTransition>
        </div>,
        
      );
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          renderModal();
        });
      });
    } else {
      renderModal();
    }
  };
  // participants column is usually array-dependent.
  return (
    <div className="space-y-10">
      <DashboardHeaderText
        header="Camp Details"
        subtext="View comprehensive information about this camp."
        backLink="/admin/camps"
        backLinkText="Back to camps"
      />

      <QueryStateHandler
        data={camp ? [camp] : undefined}
        isLoading={isLoading}
        isError={isError}
        loadingMessage="Loading Camp Details"
        errorMessage="Failed to fetch camp data"
        emptyMessage="Camp not found"
      >
        <div className="bg-dash-secondary-bg p-6 rounded-[16px] space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{camp?.title}</h1>
            <Badge variant="secondary">{camp?.status}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-sm mb-1 text-gray-500">
                Location
              </h3>
              <p>{camp?.location}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1 text-gray-500">
                Price
              </h3>
              <p>{formatCurrency(camp?.price || 0, "NGN")}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1 text-gray-500">
                Capacity
              </h3>
              <p>{camp?.capacity} Participants max</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1 text-gray-500">
                Seats Remaining
              </h3>
              <p>{camp?.seatsRemaining}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1 text-gray-500">
                Dates
              </h3>
              <p>
                {camp?.startDate &&
                  new Date(camp.startDate).toLocaleString("en-US", {
                    dateStyle: "medium",
                  })}{" "}
                -{" "}
                {camp?.endDate &&
                  new Date(camp.endDate).toLocaleString("en-US", {
                    dateStyle: "medium",
                  })}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2 text-gray-500">
              Description
            </h3>
            <p className="text-sm leading-relaxed">{camp?.description}</p>
          </div>

          {camp?.thumbnail && (
            <div>
              <h3 className="font-semibold text-sm mb-2 text-gray-500">
                Thumbnail
              </h3>
              <ViewTransition name={camp.id}>
                <div onClick={handleOpenLightbox} className="relative cursor-pointer w-full max-w-sm h-48 rounded-lg overflow-hidden border">
                  <Image
                    src={camp.thumbnail}
                    fill
                    className="object-cover"
                    alt={camp.title}
                  />
                </div>
              </ViewTransition>
            </div>
          )}
        </div>
      </QueryStateHandler>

      {/* Participants Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Camp Participants</h2>
        <div className="bg-dash-secondary-bg rounded-[16px] pb-1">
          <QueryStateHandler
            data={participantsData?.data || []}
            isLoading={participantsLoading}
            isError={false}
            loadingMessage="Loading Participants..."
            emptyMessage="No participants registered yet."
          >
            <ReuseableTable
              columns={ParticipantsColumn()}
              tableData={participantsData?.data || []}
            />
          </QueryStateHandler>
        </div>
      </div>
    </div>
  );
}
