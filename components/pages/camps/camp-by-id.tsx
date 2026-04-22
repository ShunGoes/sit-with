"use client";

import { useState } from "react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import QueryStateHandler from "@/components/query-state-handler";
import { useGetCamp } from "@/lib/api/hooks/camps/camps.hooks";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ViewTransition } from "react";
import { flushSync } from "react-dom";
import { useModalStore } from "@/components/store/use-modal-store";

import { CampTier, CampImage } from "@/types/camps.types";

function CardByIdOverview({ id }: { id: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { data: campData, isLoading, isError } = useGetCamp(id);

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const camp = campData?.data;

  // Lightbox with ViewTransition
  const handleOpenLightbox = (imageId: string, imageUrl: string) => {
    const renderModal = () => {
      openModal(
        `lightbox-${imageId}`,
        <div className="w-[90%] sm:w-[80%] h-[50vh] max-w-6xl mx-auto flex items-center justify-center">
          <div
            style={{
              viewTransitionName: `camp-image-${imageId}`,
            }}
            className="relative aspect-square w-full h-full rounded-[10px] overflow-hidden"
          >
            <Image
              src={imageUrl}
              fill
              className="object-contain"
              alt="Camp gallery"
            />
          </div>
        </div>,
      );
    };

    setSelectedImage(imageId);

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setLightboxOpen(true);
          renderModal();
        });
      });
    } else {
      setLightboxOpen(true);
      renderModal();
    }
  };

  return (
    <div className="space-y-10">
      <section className="max-w-7xl w-10/12 mx-auto lg:w-11/12">
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
                  <div
                    onClick={() =>
                      handleOpenLightbox(camp.id, camp.thumbnail || "")
                    }
                    className="relative cursor-pointer w-full max-w-sm h-48 rounded-lg overflow-hidden border"
                  >
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

        {/* Camp Tiers Section */}
        {camp?.tiers && camp.tiers.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Camp Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {camp.tiers.map((tier: CampTier) => (
                <div
                  key={tier.id}
                  className="bg-dash-secondary-bg border border-gray-200 rounded-[12px] p-4 space-y-3"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base text-primary-text">
                        {tier.label}
                      </h3>
                      {tier.isFeatured && (
                        <Badge variant="success" className="mt-1">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-secondary-text leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price and Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Price</p>
                      <p className="text-primary-text font-semibold">
                        {formatCurrency(tier.price, "NGN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Seats/Unit
                      </p>
                      <p className="text-primary-text font-semibold">
                        {tier.seatsPerUnit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Max Units
                      </p>
                      <p className="text-primary-text font-semibold">
                        {tier.maxUnits ? tier.maxUnits : "Unlimited"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Order</p>
                      <p className="text-primary-text font-semibold">
                        {tier.order}
                      </p>
                    </div>
                  </div>

                  {/* Inclusions */}
                  {tier.inclusions && tier.inclusions.length > 0 && (
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-xs text-gray-500 font-medium mb-2">
                        Inclusions
                      </p>
                      <ul className="space-y-1">
                        {tier.inclusions.map((inclusion, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-primary-text flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-regular-button"></span>
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Images Section */}
        {camp?.images && camp.images.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Gallery Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {camp.images.map((image: CampImage) => (
                <div key={image.id}>
                  <div
                    style={{
                      viewTransitionName:
                        lightboxOpen && selectedImage === image.id
                          ? "none"
                          : `camp-image-${image.id}`,
                    }}
                    className="relative group rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-sm aspect-square flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleOpenLightbox(image.id, image.url)}
                  >
                    <Image
                      src={image.url}
                      alt={image.caption || "Camp gallery"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm uppercase wrap-break-word line-clamp-2 w-full  text-primary-text mt-2">
                    {image.caption} hello
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function CampCardByIdOverviewWrapper({ id }: { id: string }) {
  return <CardByIdOverview id={id} />;
}
