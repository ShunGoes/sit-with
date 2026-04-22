"use client";

import {
  Controller,
  useFieldArray,
  useFormContext,
  SubmitHandler,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CampTierFormSchema } from "@/schemas/camp-tier-schema";
import { X, Plus, Trash2 } from "lucide-react";
import { formatAmount } from "@/lib/utils";

export default function CampTierForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: SubmitHandler<CampTierFormSchema>;
  onCancel: () => void;
}) {
  const form = useFormContext<CampTierFormSchema>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "inclusions",
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
      {/* Basic Tier Information */}
      <div className="bg-dash-secondary-bg rounded-[12px]">
        <header className="text-primary-text font-semibold text-base mb-4">
          Tier Details
        </header>
        <div className="space-y-4">
          {/* Label */}
          <Controller
            control={form.control}
            name="label"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="">
                <FieldLabel className="text-[#344054] text-sm mb-2">
                  Label *
                </FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="E.g. Individual"
                  className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 h-[54px] focus-visible:border-none focus-visible:ring-0"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Description */}
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
                    placeholder="Describe what's included in this tier..."
                    className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] py-4 min-h-[100px] outline-none px-3 resize-none"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Price and Seats Per Unit */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            {/* Price */}
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="">
                  <FieldLabel className="text-[#344054] text-sm mb-2">
                    Price (₦) *
                  </FieldLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      const value = formatAmount(e.target.value);
                      field.onChange(value);
                    }}
                    inputMode="decimal"
                    step="0.01"
                    placeholder="0.00"
                    className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 h-[54px] focus-visible:border-none focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Seats Per Unit */}
            <Controller
              control={form.control}
              name="seatsPerUnit"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="">
                  <FieldLabel className="text-[#344054] text-sm mb-2">
                    Seats Per Unit *
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    placeholder="1"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 h-[54px] focus-visible:border-none focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Max Units and Order */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            {/* Max Units */}
            <Controller
              control={form.control}
              name="maxUnits"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="">
                  <FieldLabel className="text-[#344054] text-sm mb-2">
                    Max Units (leave empty for unlimited)
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    placeholder="Leave empty for unlimited"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 h-[54px] focus-visible:border-none focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Order */}
            <Controller
              control={form.control}
              name="order"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="">
                  <FieldLabel className="text-[#344054] text-sm mb-2">
                    Order *
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    placeholder="0"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 h-[54px] focus-visible:border-none focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>
      </div>

      {/* Inclusions Section */}
      <div className="bg-dash-secondary-bg rounded-[12px]">
        <header className="text-primary-text font-semibold text-base mb-4">
          Inclusions
        </header>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <Controller
                control={form.control}
                name={`inclusions.${index}.text`}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="E.g. Accommodation"
                      className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal py-4 h-[54px] focus-visible:border-none focus-visible:ring-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-brand-red  rounded-md"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Featured Toggle */}
      <div className="bg-dash-secondary-bg rounded-[12px] p-4">
        <div className="flex items-center justify-between">
          <div>
            <FieldLabel className="text-primary-text font-semibold text-base">
              Featured Tier
            </FieldLabel>
            <p className="text-sm text-secondary-text mt-1">
              Mark this tier as featured to highlight it
            </p>
          </div>
          <Controller
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-regular-button"
              />
            )}
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-end w-full mt-10 gap-3">
        <Button variant={"outline"} type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant={"regular"}
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Tier"}
        </Button>
      </div>
    </form>
  );
}
