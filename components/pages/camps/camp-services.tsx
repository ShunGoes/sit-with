"use client";

import { useGetAllConsultationServices } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { getCalApi } from "@calcom/embed-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";
import CaretRight from "@/pd-icons/caret-right";
import { CheckCircle, Clock, LocateFixed } from "lucide-react";
import { useBookACamp, useGetCamps } from "@/lib/api/hooks/camps/camps.hooks";
import Image from "next/image";
import { useEffect } from "react";
import { useModalStore } from "@/components/store/use-modal-store";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export default function CampServices() {
  const { data: campsData, isLoading, isError, isFetching } = useGetCamps();
  const { mutate: bookACamp, isPending } = useBookACamp();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const camp =
    campsData?.data.filter(
      (camp) => camp.status === "UPCOMING" || camp.status === "ONGOING",
    ) || [];





  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

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
    <section className="py-20   bg-white" id="camp-services">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl flex flex-col w-full items-center ">
        <div className="flex flex-col items-center text-center mb-16">
          <Pill text="Our Services" className="mb-4" />
          <h2 className="heading-2 max-w-2xl">
            Join our upcoming and ongoing camps
          </h2>
        </div>

        {camp.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl w-full border border-dashed border-slate-200">
            <p className="text-base text-primary-text mb-12 mx-auto max-w-2xl text-center">
              No camps are available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {camp.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group flex flex-col gap-3 p-4 rounded-[16px] border border-[#F3F4F6] bg-white shadow-sm hover:shadow-lg hover:border-[#EBFDF3] hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {service.thumbnail ? (
                  <div className="flex items-center aspect-3/2 relative rounded-[10px] gap-2 text-slate-500">
                    <Image
                      src={service.thumbnail}
                      alt={service.title}
                      fill
                      className="object-cover  w-full rounded-[10px]"
                    />
                    <span className="text-sm font-medium">
                      {service.location}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center aspect-3/2 rounded-[10px] relative gap-2 text-slate-500 bg-slate-50">
                    <span className="text-sm font-medium">No Image</span>
                  </div>
                )}
                <div>
                  <h3 className="text-[#101828] font-medium text-base mb-1 pr-6">
                    {service.title}
                  </h3>
                  <p className="text-[#4A5565] text-sm leading-[1.425rem] grow">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 justify-between py-6 border-t border-slate-50 mb-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <LocateFixed className="w-4 h-4 text-regular-button" />
                    <span className="text-sm font-medium line-clamp-2">
                      {service.location}
                    </span>
                  </div>
                  <div className="text-regular-button font-bold text-lg">
                    {formatCurrency(service.price)}
                  </div>
                </div>
                <Link href={`/camps/${service.id}`}>
                  <Button
                    variant="regular"
                    className="w-full mt-auto group/btn"
                  >
                    View Camp Details
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
