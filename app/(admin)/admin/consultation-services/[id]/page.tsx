"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FilePenLine, ToggleLeft, ToggleRight, Clock, Banknote, ShieldCheck, ShieldAlert } from "lucide-react";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { useGetConsultationServiceById, useUpdateConsultationService } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import { editConsultationService } from "@/components/modal-helper";
import { formatCurrency, formatAppDate } from "@/lib/utils";

export default function ConsultationServiceDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { data: response, isLoading, isError } = useGetConsultationServiceById(id);
  const { mutate: updateService, isPending: isUpdating } = useUpdateConsultationService();

  const service = response?.data;

  useEffect(() => {
    if (isUpdating) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-dash-secondary-bg p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true }
      );
    }
  }, [isUpdating, openModal]);

  const handleToggleStatus = () => {
    if (!service) return;
    updateService(
      { id: service.id, payload: { isActive: !service.isActive } },
      {
        onSuccess: () => closeModal("loading"),
        onError: () => closeModal("loading"),
      }
    );
  };

  const handleEdit = () => {
    if (!service) return;
    editConsultationService(service);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spinner size={40} />
        <p className="mt-4 text-secondary-text">Loading service details...</p>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldAlert size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Service Not Found</h2>
        <p className="text-secondary-text mb-6">The consultation service you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push("/admin/consultation-services")}>Back to Services</Button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashboardHeaderText
          header={service.title}
          subtext="Detailed view of this consultation service"
          backLink="/admin/consultation-services"
          backLinkText="Back to Services"
        />
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={handleToggleStatus}>
            {service.isActive ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
            {service.isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button variant="regular" className="gap-2" onClick={handleEdit}>
            <FilePenLine size={18} /> Edit Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-dash-secondary-bg dark:border-none p-6 rounded-[16px] shadow-sm border border-[#EAECF0]">
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-primary-text leading-relaxed whitespace-pre-wrap">
              {service.description}
            </p>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="bg-dash-secondary-bg dark:border-none p-6 rounded-[16px] shadow-sm border border-[#EAECF0] space-y-5">
            <h3 className="text-lg font-semibold border-b border-[#EAECF0] pb-3">Service Details</h3>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F9FAFB] flex items-center justify-center text-[#667085]">
                <Banknote size={20} />
              </div>
              <div>
                <p className="text-xs text-secondary-text">Price</p>
                <p className="text-sm font-semibold">{formatCurrency(service.price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F9FAFB] flex items-center justify-center text-[#667085]">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-secondary-text">Duration</p>
                <p className="text-sm font-semibold">{service.duration} Minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F9FAFB] flex items-center justify-center">
                {service.isActive ? <ShieldCheck className="text-green-500" size={20} /> : <ShieldAlert className="text-slate-400" size={20} />}
              </div>
              <div>
                <p className="text-xs text-secondary-text">Status</p>
                <Badge variant={service.isActive ? "success" : "secondary"}>
                  {service.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="pt-2">
               <p className="text-[10px] text-slate-400">Created on {formatAppDate(service.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
