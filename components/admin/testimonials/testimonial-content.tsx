import { handleEditTestimonial } from "@/components/modal-helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Trash2, FilePenLine } from "lucide-react";
import { Testimonial } from "@/lib/api/services/testimonials/testimonials.services";
import { formatAppDate } from "@/lib/utils";
import { useDeleteTestimonial } from "@/lib/api/hooks/testimonials/testimonials.hooks";
import { useModalStore } from "@/components/store/use-modal-store";
import { Spinner } from "@/components/spinner";
import { useEffect } from "react";
import Image from "next/image";

export default function TestimonialContent({ testimonial }: { testimonial: Testimonial }) {
  const { mutate: deleteTestimonial, isPending: isDeleting } = useDeleteTestimonial();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    if (isDeleting) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isDeleting, openModal]);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this testimonial? This action cannot be undone.")) {
      deleteTestimonial(testimonial.id, {
        onSuccess: () => {
          closeModal("loading");
        },
        onError: () => {
          closeModal("loading");
        },
      });
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div
      key={testimonial.id}
      className="bg-white dark:bg-dash-secondary-bg p-6 rounded-[16px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] border border-[#EAECF0] dark:border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      <div className="flex items-start gap-4 flex-1">
        {testimonial.avatarUrl ? (
          <div className="w-12 h-12 rounded-[12px] relative overflow-hidden shrink-0">
            <Image src={testimonial.avatarUrl} alt={testimonial.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-[12px] bg-[#E8F3EF] dark:bg-[#1A2E25] text-[#4CA48B] flex items-center justify-center shrink-0 font-bold">
            {getInitials(testimonial.name)}
          </div>
        )}
        <div className="flex flex-col gap-y-1">
          <h3 className="text-base font-bold text-Secondary-text">
            {testimonial.name}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">
            {testimonial.role}
          </p>
          <p className="text-sm text-secondary-text max-w-2xl line-clamp-3 mt-1 italic">
            "{testimonial.quote}"
          </p>
          <p className="text-xs text-secondary-text/70 mt-2">
            {formatAppDate(testimonial.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex md:flex-col items-center md:items-end gap-6 shrink-0 w-full md:w-auto md:h-28 justify-between">
        <div className="flex items-center gap-2">
          {testimonial.isPublished ? (
            <Badge variant={"success"}>Published</Badge>
          ) : (
            <Badge variant={"warning"}>Draft</Badge>
          )}
          <span className="px-3 py-1 bg-[#E8F3EF] dark:bg-[#1A2E25] text-[#4CA48B] text-xs font-medium rounded-full max-w-[150px] truncate">
            {testimonial.camp?.title || "Site-wide"}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-auto self-end">
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              handleEditTestimonial(testimonial);
            }}
            className="w-8 h-8 hover:bg-muted cursor-pointer border-none flex items-center justify-center transition-all shadow-md "
          >
            <FilePenLine size={15} color="#98A2B3" />
          </Button>
          <Button
            variant={"outline"}
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-8 h-8 hover:bg-[#FBEAEA] cursor-pointer border-none flex items-center justify-center transition-all shadow-md "
          >
            <Trash2 color="#D32F2F" size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}
