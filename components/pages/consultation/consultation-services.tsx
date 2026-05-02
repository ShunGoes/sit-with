"use client";

import { useGetAllConsultationServices } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import { getCalApi } from "@calcom/embed-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";
import CaretRight from "@/pd-icons/caret-right";
import { Clock } from "lucide-react";

export function ConsultationServices() {
  const { data, isLoading } = useGetAllConsultationServices();

  const handleBookCard = async (bookingUrl: string) => {
    const cal = await getCalApi({ namespace: "consultation" });
    cal("modal", {
      calLink: bookingUrl,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
    });
  };

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



  if (isLoading) {
    return (
      <section className="py-20 bg-white" id="consultation-cta">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-12">
            <Skeleton className="h-6 w-32 rounded-full mb-4" />
            <Skeleton className="h-10 w-3/4 lg:w-1/2 mb-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl border border-slate-100 bg-white shadow-sm">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full mb-6" />
                <div className="flex justify-between items-center mb-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const services = data?.data.filter((service) => service.calBookingUrl !== null) || [];
  console.log("services", services)

  return (
    <section className="py-20 lg:pt-0 bg-white" id="consultation-cta">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-16">
          <Pill text="Our Services" className="mb-4" />
          <h2 className="heading-2 max-w-2xl">
            Choose a consultation package that fits your needs
          </h2>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl w-full border border-dashed border-slate-200">
            <p className="heading-2 mb-12 max-w-2xl">
              No consultation services are available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group flex flex-col p-4 rounded-[16px] border border-[#F3F4F6] bg-white shadow-sm hover:shadow-lg hover:border-[#EBFDF3] hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <h3 className="text-[#101828] font-medium text-lg mb-3 pr-6">
                  {service.title}
                </h3>
                <p className="text-[#4A5565] text-base leading-[1.425rem] mb-3 grow">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between py-6 border-t border-slate-50 mb-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4 text-regular-button" />
                    <span className="text-sm font-medium">{service.duration} mins</span>
                  </div>
                  <div className="text-regular-button font-bold text-lg">
                    {formatCurrency(service.price)}
                  </div>
                </div>

                <Button
                  onClick={() => handleBookCard(service.calBookingUrl.startsWith("cal.com/") ? service.calBookingUrl.slice("cal.com/".length) : service.calBookingUrl)}
                  variant="regular"
                  className="w-full  group/btn"
                >
                  Book Session
                  <CaretRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
