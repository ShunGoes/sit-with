"use client";

import React from "react";
import { Controller, useFormContext, SubmitHandler } from "react-hook-form";
import FormFieldComp from "@/components/formfield";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ConsultationServiceFormValues } from "@/schemas/consultation-service-schema";
import CalEventTypeSelect from "./cal-event-type-select";

interface ConsultationServiceFormProps {
  onSubmit: SubmitHandler<ConsultationServiceFormValues>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConsultationServiceForm({
  onSubmit,
  onCancel,
  isLoading,
}: ConsultationServiceFormProps) {
  const form = useFormContext<ConsultationServiceFormValues>();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
      <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
        <header className="text-primary-text font-semibold text-base mb-6">
          Consultation Service Details
        </header>

        <div className="space-y-4">
          <FormFieldComp
            name="title"
            control={form.control}
            label="Service Title *"
            placeholder="e.g. 1-on-1 Wellness Session"
            className="bg-white"
          />

          <Controller
            control={form.control}
            name="calBookingUrl"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="">
                <FieldLabel className="text-[#344054] text-sm mb-2">
                  Cal.com Event Type *
                </FieldLabel>
                <CalEventTypeSelect
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <div className="flex flex-col">
                  <FieldLabel
                    className="text-[#344054] text-[14px] mb-2"
                    htmlFor="description"
                  >
                    Description *
                  </FieldLabel>
                  <textarea
                    id="description"
                    {...field}
                    placeholder="Describe the service, what to expect, and any requirements..."
                    className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] py-4 min-h-30 outline-none px-3 resize-none"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldComp
              name="price"
              control={form.control}
              label="Price (₦) *"
              placeholder="e.g. 15000"
              type="text"
              inputMode="numeric"
              className="bg-white"
            />
            <FormFieldComp
              name="duration"
              control={form.control}
              label="Duration (mins) *"
              placeholder="e.g. 60"
              type="text"
              inputMode="numeric"
              className="bg-white"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-full mt-10 gap-3">
        <Button
          variant={"outline"}
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="text-regular-button border border-regular-button"
        >
          Cancel
        </Button>
        <Button
          variant={"regular"}
          disabled={!form.formState.isValid || isLoading}
        >
          {isLoading ? "Submitting..." : "Save Service"}
        </Button>
      </div>
    </form>
  );
}
