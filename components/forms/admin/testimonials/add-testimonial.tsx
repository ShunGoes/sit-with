import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TestimonialFormValues, testimonialSchema } from "@/schemas/testimonials-schema";
import TestimonialForm from "./testimonial-form";
import { useCreateTestimonial } from "@/lib/api/hooks/testimonials/testimonials.hooks";
import { useModalStore } from "@/components/store/use-modal-store";
import { useEffect } from "react";
import { Spinner } from "@/components/spinner";

export default function AddTestimonialModal() {
  const { mutate, isPending } = useCreateTestimonial();
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  const methods = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      quote: "",
      isPublished: false,
      campId: "site-wide",
      avatar: undefined,
    },
  });

  const onSubmit = (data: TestimonialFormValues) => {
    const formData = new FormData();
    if (data.campId && data.campId !== "site-wide") formData.append("campId", data.campId);
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("quote", data.quote);
    formData.append("isPublished", String(data.isPublished));
    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    mutate(formData, {
      onSuccess: () => {
        closeModal("testimonial-modal");
        closeModal("loading");
      },
      onError: () => {
        closeModal("loading");
      },
    });
  };

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
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-primary-text mb-1">
          Add Testimonial
        </h2>
        <p className="text-sm text-secondary-text">
          Create a new testimonial.
        </p>
      </div>

      <FormProvider {...methods}>
        <TestimonialForm
          onSubmit={onSubmit}
          isLoading={isPending}
          submitLabel="Add Testimonial"
        />
      </FormProvider>
    </div>
  );
}
