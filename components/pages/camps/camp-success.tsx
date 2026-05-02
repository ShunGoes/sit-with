import { useModalStore } from "@/components/store/use-modal-store";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export default function CampSuccessModal({
  camp,
}: {
  camp: SuccessBannerProps;
}) {
  const closeModal = useModalStore((state) => state.closeModal);
  return (
    <section className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
      <CheckCircle className="w-16 h-16 text-regular-button" />
      <h2 className="heading-2 mb-12 max-w-2xl">
        You have successfully booked a {camp?.title} camp session.
      </h2>

      <div className="bg-dash-secondary-bg p-6 rounded-[16px] space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{camp?.title}</h1>
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
              <p>{formatCurrency(camp?.price || 0)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1 text-gray-500">
                Capacity
              </h3>
              <p>{camp?.capacity} Participants max</p>
            </div>
           
            <div>
              <h3 className="font-semibold text-sm mb-1 text-gray-500">
                Dates
              </h3>
              <p>
                {camp?.startDate &&
                  new Date(camp.startDate).toLocaleString("en-US", {
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
        </div>
      <Button onClick={() => closeModal("success")} variant="outline">
        Close
      </Button>
    </section>
  );
}
