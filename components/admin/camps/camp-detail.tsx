"use client";

import { useEffect, useState } from "react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import QueryStateHandler from "@/components/query-state-handler";
import ReuseableTable from "@/components/tables/reuseable-table";
import {
  useGetCamp,
  useGetCampParticipants,
  useDeleteCampTier,
  useDeleteCampImage,
  useReplaceCampImage,
} from "@/lib/api/hooks/camps/camps.hooks";
import Image from "next/image";
import CampParticipantsColumn from "@/components/tables/columns/camp-participants-column";
import ParticipantDetailModal from "@/components/admin/camps/participant-detail-modal";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ViewTransition } from "react";
import { flushSync } from "react-dom";
import { useModalStore } from "@/components/store/use-modal-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  Trash2,
  Edit2,
  ImagePlus,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MultiImageUpload from "@/components/multi-image-upload";
import { useUploadCampImages } from "@/lib/api/hooks/camps/camps.hooks";
import { editCampTier, handleEditFileCaption } from "@/components/modal-helper";
import { CampTier, CampImage } from "@/types/camps.types";
import Pagination from "@/components/pagination";
import { useSearchParams } from "next/navigation";


export default function CampDetail({ id }: { id: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page'))
  const PARTICIPANT_TABLE_LIMIT = 20
  
  const params = {
    page,
    limit: PARTICIPANT_TABLE_LIMIT
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: campData, isLoading, isError } = useGetCamp(id);
  const { data: participantsData, isLoading: participantsLoading } =
    useGetCampParticipants({id, params});

  const { mutate: deleteTier } = useDeleteCampTier();
  const { mutate: deleteImage } = useDeleteCampImage();
  const { mutate: uploadImages, isPending: isUploadingImages } =
    useUploadCampImages();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const camp = campData?.data;

  const participantTableData = participantsData?.data;
  
  const mappedparticipationArray = participantTableData?.map((participant: any) => {
    return {
      id: participant.id,
      name: `${participant.applicantDetails?.fullName}`,
      phone: participant.applicantDetails?.phone,
      tier: participant.tier?.label,
      amountPaid: participant.tier?.price,
      payment: participant.payment?.status,
      emergencyContact: participant.applicantDetails?.emergencyContact,
    };
  });

  const handleViewParticipantDetails = (participantId: string) => {
    const fullParticipantData = participantTableData?.find(
      (p: any) => p.id === participantId
    );
    if (fullParticipantData) {
      openModal(
        `participant-detail-${participantId}`,
        <ParticipantDetailModal participant={fullParticipantData} />
      );
    }
  };

  // Image replacement handler
  const handleReplaceImage = (imageId: string, order: number | undefined) => {
    handleEditFileCaption(id, imageId, order);
  };

  // Delete image handler
  const handleDeleteImage = (imageId: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      deleteImage({ campId: id, imageId });
    }
  };

  // Delete tier handler
  const handleDeleteTier = (tierId: string) => {
    if (window.confirm("Are you sure you want to delete this tier?")) {
      deleteTier({ campId: id, tierId });
    }
  };

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



  const handleUploadImages = (files: File[]) => {
    uploadImages({ campId: id, files });
  };

  const labelTyles = "font-semibold text-sm mb-1 text-primary-text"
  let badgeVariant = "default" as "default" | "warning" | "destructive" | "hibiscus" | "success";

  if (camp?.status === "COMPLETED") {
    badgeVariant = "success";
  } else if (camp?.status === "UPCOMING") {
    badgeVariant = "warning";
  } else if (camp?.status === "CANCELLED") {
    badgeVariant = "destructive";
  } else if (camp?.status === "ONGOING") {
    badgeVariant = "hibiscus";
  }

  return (
    <div className="space-y-10">
      <DashboardHeaderText
        header="Camp Details"
        subtext="View comprehensive information about this camp."
        backLink="/admin/camps"
        backLinkText="Back to camps"
      />

      {/* Basic camp details */}
      <QueryStateHandler
        data={camp ? [camp] : undefined}
        isLoading={isLoading}
        isError={isError}
        loadingMessage="Loading Camp Details"
        errorMessage="Failed to fetch camp data"
        emptyMessage="Camp not found"
      >
        <div className="bg-dash-secondary-bg p-6 rounded-[16px] space-y-6">
          <div className="flex flex-col-reverse gap-3 md:flex-row  justify-between items-start">
            <h1 className="text-2xl font-bold">{camp?.title}</h1>
            <Badge variant={badgeVariant}>{camp?.status}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={labelTyles}>
                Location
              </h3>
              <p>{camp?.location}</p>
            </div>
          
            <div>
              <h3 className={labelTyles}>
                Capacity
              </h3>
              <p>{camp?.capacity} Participants max</p>
            </div>
            <div>
              <h3 className={labelTyles}>
                Seats Remaining
              </h3>
              <p>{camp?.seatsRemaining}</p>
            </div>
            <div>
              <h3 className={labelTyles}>
                Dates
              </h3>
              <p>
                {isMounted && camp?.startDate &&
                  new Date(camp.startDate).toLocaleString("en-US", {
                    dateStyle: "medium",
                  })}{" "}
                -{" "}
                {isMounted && camp?.endDate &&
                  new Date(camp.endDate).toLocaleString("en-US", {
                    dateStyle: "medium",
                  })}
                {!isMounted && "Loading dates..."}
              </p>
            </div>
          </div>

          <div>
            <h3 className={labelTyles}>
              Description
            </h3>
            <p className="text-sm leading-relaxed">{camp?.description}</p>
          </div>

          {camp?.thumbnail && (
            <div>
              <h3 className={labelTyles}>
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
                    <h3 className="font-semibold text-base text-primary-text dark:text-secondary-text">
                      {tier.label}
                    </h3>
                    {tier.isFeatured && (
                      <Badge variant="success" className="mt-1">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer transition-all rounded-full duration-300 w-8 h-8 hover:bg-[#EBEBEB] flex justify-center items-center">
                      <EllipsisVertical size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[150px]">
                      <DropdownMenuItem
                        onClick={() => editCampTier(id, tier)}
                        className="py-2 px-3"
                      >
                        <Edit2 size={14} className="text-primary-text" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteTier(tier.id)}
                        className="py-2 px-3 text-brand-red"
                      >
                        <Trash2 color="var(--brand-red)" size={14} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Description */}
                <p className="text-sm text-secondary-text dark:text-primary-text leading-relaxed">
                  {tier.description}
                </p>

                {/* Price and Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-5">
                  <div>
                    <p className="text-xs text-primary-text dark:text-secondary-text  font-medium">Price</p>
                    <p className="text-primary-text font-semibold">
                      {formatCurrency(tier.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-text dark:text-secondary-text  font-medium">
                      Seats/Unit
                    </p>
                    <p className="text-primary-text font-semibold">
                      {tier.seatsPerUnit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-text dark:text-secondary-text  font-medium">
                      Max Units
                    </p>
                    <p className="text-primary-text font-semibold">
                      {tier.maxUnits ? tier.maxUnits : "Unlimited"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-text dark:text-secondary-text  font-medium">Order</p>
                    <p className="text-primary-text font-semibold">
                      {tier.order}
                    </p>
                  </div>
                </div>

                {/* Inclusions */}
                {tier.inclusions && tier.inclusions.length > 0 && (
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-primary-text dark:text-secondary-text  font-medium mb-2">
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

                {/* Overlay buttons */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReplaceImage(image.id, image.order);
                    }}
                    className="bg-white hover:bg-regular-button text-primary-text hover:text-white p-2 rounded-full shadow-md transition-all"
                    title="Replace image"
                  >
                    <ImagePlus size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(image.id);
                    }}
                    className="bg-white hover:bg-brand-red text-primary-text hover:text-white p-2 rounded-full shadow-md transition-all"
                    title="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
                <p className="text-sm uppercase wrap-break-word line-clamp-2 w-full  text-primary-text mt-2">{image.caption} hello</p>
           </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload New Images Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upload Gallery Images</h2>
        </div>
        <div className="bg-dash-secondary-bg rounded-[16px] p-6">
          <MultiImageUpload
            onUpload={handleUploadImages}
            isLoading={isUploadingImages}
            maxFiles={20}
          />
        </div>
      </div>

      {/* Participants Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Camp Participants</h2>
        <div className="bg-dash-secondary-bg rounded-[16px] pb-1">
          <QueryStateHandler
            data={mappedparticipationArray || []}
            isLoading={participantsLoading}
            isError={false}
            loadingMessage="Loading Participants..."
            emptyMessage="No participants registered yet."
          >
            <ReuseableTable
              columns={CampParticipantsColumn(handleViewParticipantDetails)}
              tableData={mappedparticipationArray || []}
            />
          </QueryStateHandler>
        </div>
        <Pagination totalPages={participantsData ? participantsData.meta.totalPages : 1}/>
      </div>
    </div>
  );
}
