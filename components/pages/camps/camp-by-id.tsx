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
import CampParticipation from "./participation";
import GrayCheckIcon from "@/pd-icons/gray-check";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookCampForm from "@/components/forms/admin/camps/book-camp-form";
import { showSuccessToast } from "@/lib/toast-helpers";

function CardByIdOverview({ id }: { id: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [campTierId, setCampTierId] = useState<{
    id: string;
    label: string;
  } | null>(null);

  const { data: campData, isLoading, isError } = useGetCamp(id);

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const camp = campData?.data;

  const labelText = "text-brand-green font-medium text-sm uppercase";
  const valueText = "text-secondary-text font-medium text-base";

  console.log("this is the camping event details:", camp);

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
    <div className=" bg-[#F7F7F7] py-30">
      <section className="max-w-7xl w-11/12 mx-auto lg:w-11/12 space-y-10">
        <DashboardHeaderText
          header="Camp Details"
          subtext="View comprehensive information about this camp."
          backLink="/camps"
          backLinkText="Back to camps"
        />

        {/* camp details  */}
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
              <h1 className="text-xl text-primary-text font-bold">
                {camp?.title}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={labelText}>Location</h3>
                <p className={valueText}>{camp?.location}</p>
              </div>
              <div>
                <h3 className={labelText}>Price</h3>
                <p className={valueText}>
                  {formatCurrency(camp?.price || 0)}
                </p>
              </div>
              <div>
                <h3 className={labelText}>Capacity</h3>
                <p className={valueText}>{camp?.capacity} Participants max</p>
              </div>
              <div>
                <h3 className={labelText}>Seats Remaining</h3>
                <p className={valueText}>{camp?.seatsRemaining}</p>
              </div>
              <div>
                <h3 className={labelText}>Dates</h3>
                <p className={valueText}>
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
              <h3 className={labelText}>Description</h3>
              <p className={valueText}>{camp?.description}</p>
            </div>

            {camp?.images && camp.images.length > 0 && (
              <div className="space-y-2">
                <h3 className={labelText}>Gallery Images</h3>
                <div className="flex items-center gap-4 overflow-x-auto">
                  {camp.images.map((image: CampImage) => (
                    <div key={image.id}>
                      <div
                        style={{
                          viewTransitionName:
                            lightboxOpen && selectedImage === image.id
                              ? "none"
                              : `camp-image-${image.id}`,
                        }}
                        className="relative rounded-md  w-[250px] aspect-3/2  cursor-pointer "
                        onClick={() => handleOpenLightbox(image.id, image.url)}
                      >
                        <Image
                          src={image.url}
                          alt={image.caption || "Camp gallery"}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <p className="text-xs uppercase wrap-break-word line-clamp-2 w-full  text-primary-text mt-2">
                        {image.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </QueryStateHandler>

        {/* Camp Tiers Section */}
        {camp?.tiers && camp.tiers.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl text-primary-text font-bold">Camp Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-120 mx-auto lg:max-w-7xl gap-4  px-6 rounded-[16px]">
              {camp.tiers.map((plan: CampTier) => (
                <div
                  key={plan.id}
                  className={`flex flex-col gap-6 rounded-[32px] px-8 py-15 md:py-[100px]   transition-all duration-300 relative ${
                    plan.isFeatured
                      ? "bg-white border-2 border-[#649351] z-10 xl:-mt-4 xl:mb-4"
                      : "bg-white border border-[#2C2D47]  xl:mt-2 xl:scale-[0.95]"
                  }`}
                >
                  <div className="text-center ">
                    <h3 className="text-lg font-medium text-[#242424] mb-4">
                      {plan.label}
                    </h3>
                    <div className="flex items-end justify-center gap-1 mb-2">
                      <span
                        className={`text-[56px] font-medium leading-none ${plan.isFeatured ? "text-[#649351]" : "text-[#242424]"}`}
                      >
                        {formatCurrency(plan.price)}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 flex-1">
                    {plan.inclusions?.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <span
                          style={{
                            background: "rgba(100, 147, 81, 0.2)",
                          }}
                          className="  w-[17px] h-[17px] rounded-full flex items-center justify-center "
                        >
                          <GrayCheckIcon color={"#649351"} />
                        </span>
                        <span className="text-black text-base font-medium ">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="regular"
                    className="w-full mt-10 "
                    onClick={() =>{
                      setCampTierId({ id: plan.id, label: plan.label })
                      showSuccessToast(`You selected the ${plan.label} camp.`)
                    }
                      
                    }
                  >
                    Book Camp
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {campTierId && camp && (
          <div className="w-11/12 lg:w-7/12 mx-auto">
            <BookCampForm
              tierId={campTierId?.id}
              campId={id}
              tierLabel={campTierId?.label}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default function CampCardByIdOverviewWrapper({ id }: { id: string }) {
  return <CardByIdOverview id={id} />;
}
