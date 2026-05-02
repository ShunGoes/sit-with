"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useModalStore } from "@/components/store/use-modal-store";
import { useContactFacilitator, useContactSupport } from "@/lib/api/hooks/contact/contact.hooks";

const messageSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

interface MessageFacilitatorModalProps {
  programId?: string;
  isSupport?: boolean;
}

export const MessageFacilitatorModal = ({ programId, isSupport }: MessageFacilitatorModalProps) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutate: sendMessageToFacilitator, isPending: isFacilitatorPending } = useContactFacilitator();
  const { mutate: sendMessageToSupport, isPending: isSupportPending } = useContactSupport();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: MessageFormValues) => {
    if (isSupport) {
      sendMessageToSupport(data, {
        onSuccess: () => {
          closeModal("message-facilitator");
        },
      });
    } else if (programId) {
      sendMessageToFacilitator(
        { programId, payload: data },
        {
          onSuccess: () => {
            closeModal("message-facilitator");
          },
        }
      );
    }
  };

  const isPending = isFacilitatorPending || isSupportPending;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary-text">
        {isSupport ? "Contact Support" : "Message Facilitator"}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <FieldLabel className="text-[14px] font-medium text-primary-text">
            Subject
          </FieldLabel>
          <Controller
            control={control}
            name="subject"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  placeholder="Enter subject"
                  className="border-[0.75px] border-[#EAECF0] bg-[#F2F4F7] rounded-[5px] w-full text-[12px] font-medium text-primary-text placeholder:text-[#98A2B3] px-4 h-11 focus-visible:ring-0 focus-visible:border-none"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <div className="space-y-2">
          <FieldLabel className="text-[14px] font-medium text-primary-text">
            Message
          </FieldLabel>
          <Controller
            control={control}
            name="message"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Textarea
                  {...field}
                  placeholder="Type your message here…"
                  className="min-h-[150px] border-[0.75px] border-[#EAECF0] bg-[#F2F4F7] rounded-[5px] w-full text-[12px] font-medium text-primary-text placeholder:text-[#98A2B3] p-4 focus-visible:ring-0 focus-visible:border-none"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => closeModal("message-facilitator")}
            className="px-6 border-[#EAECF0] text-primary-text font-medium h-11"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="regular" 
            className="px-6 font-medium h-11"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
};
