import { useGetAllConsultationServices } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import React from "react";
import { getCalApi } from "@calcom/embed-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Clock } from "lucide-react";
import CaretRight from "@/pd-icons/caret-right";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function UserConsultations() {
  const { data: consultationServices, isLoading } =
    useGetAllConsultationServices();

  const handleBookCard = async (bookingUrl: string) => {
    const cal = await getCalApi({ namespace: "consultation" });
    cal("modal", {
      calLink: bookingUrl,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
    });
  };
  if (isLoading) {
    return (
      <section className="py-20 bg-dash-secondary-bg" id="consultation-cta">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-12">
            <Skeleton className="h-6 w-32 rounded-full mb-4" />
            <Skeleton className="h-10 w-3/4 lg:w-1/2 mb-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-slate-100 bg-dash-secondary-bg shadow-sm"
              >
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

  const services =
    consultationServices?.data.filter(
      (service) => service.calBookingUrl !== null,
    ) || [];

  if (services.length === 0) return <p className="text-center min-h-[40vh] flex items-center justify-center text-xl">No consultations yet</p>
  console.log("services", services);

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      }}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="w-full pb-8! "
    >
      {services.map((service) => (
        <SwiperSlide key={service.id} className="flex items-stretch h-auto">
          <div className="h-[300px] group flex flex-col p-4 rounded-[16px] dark:border-none border border-[#F3F4F6] bg-dash-secondary-bg shadow-sm hover:shadow-lg hover:border-[#EBFDF3] hover:scale-105 transition-all duration-300 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h3 className="text-[#101828] dark:text-secondary-text font-medium text-lg mb-3 pr-6">
              {service.title}
            </h3>
            <p className="text-[#4A5565] dark:text-primary-text text-sm line-clamp-2 leading-[1.425rem] mb-3 grow">
              {service.description}
            </p>

            <div className="flex items-center justify-between py-6 border-t border-slate-50 mb-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4 text-regular-button" />
                <span className="text-sm font-medium">
                  {service.duration} mins
                </span>
              </div>
              <div className="text-regular-button font-bold text-lg">
                {formatCurrency(service.price)}
              </div>
            </div>

            <Button
              onClick={() =>
                handleBookCard(
                  service.calBookingUrl.startsWith("cal.com/")
                    ? service.calBookingUrl.slice("cal.com/".length)
                    : service.calBookingUrl,
                )
              }
              variant="regular"
              className="w-full mt-auto group/btn"
            >
              Book Session
              <CaretRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
