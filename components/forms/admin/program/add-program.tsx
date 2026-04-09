import FormFieldComp from "@/components/formfield";
import React, { useEffect } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatAmount } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateProgram } from "@/lib/api/hooks/programs/programs.hooks";
import { ProgramFormSchema, ProgramSchema } from "@/schemas/programs-schema";
import ImageUpload from "@/components/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";

const PROGRAM_TYPE = [
  {
    label: "Students",
    value: "students",
  },
  {
    label: "Couples",
    value: "professionals",
  },
  {
    label: "Singles",
    value: "leaders",
  },
];

const DEFAULT_VALUES = {
  // price: ""
};
export default function AddProgramForm() {
  const form = useForm<ProgramFormSchema>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(ProgramSchema),
    mode: "onChange",
  });

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, isPending } = useCreateProgram();

  function onSubmit(data: ProgramFormSchema) {
    const parsedData = {
      ...data,
      price: parseFloat(data.price.replace(/,/g, "")) || 0,
    };

    mutate(parsedData, {
      onSuccess: () => {
        closeModal("loading");
      },
      onError: () => {
        closeModal("loading");
      },
    });
  }

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
  }, [isPending]);

  return (
    <FormProvider {...form}>
      <header className="">Create New Program</header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 mt-7">
        <FormFieldComp
          name="title"
          control={form.control}
          label="Program Name"
          placeholder="Enter program name"
        />
        <div className="flex items-center justify-between">
          <Controller
            control={form.control}
            name="programType"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <div className="flex flex-col">
                  <FieldLabel
                    className="text-[#344054] text-[14px] mb-2"
                    htmlFor="type"
                  >
                    Type
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-white" id="type">
                      <SelectValue placeholder="Select program type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROGRAM_TYPE.map((type, index) => (
                        <SelectItem
                          key={`${type.label}_${index}`}
                          className="text-sm text-[#101928"
                          value={type.value}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex-1">
            <FormFieldComp
              name="duration"
              control={form.control}
              label="Duration"
              placeholder="E.g 8 weeks"
            />
          </div>
        </div>
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
                  Description
                </FieldLabel>
                <textarea
                  id="description"
                  {...field}
                  placeholder="Brief description of the program"
                  className="border-[0.75px] border-[#EAECF0] bg-[#F2F4F7] rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] py-4 min-h-30 outline-none px-3 resize-none"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* {"Program price"} */}
        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mt-4">
              <FieldLabel className="text-black font-medium text-[1rem]">
                Price (₦)
              </FieldLabel>
              <Input
                {...field}
                type="text"
                inputMode="decimal"
                autoComplete="one-time-code"
                onChange={(e) => {
                  const formatted = formatAmount(e.target.value);
                  field.onChange(formatted);
                }}
                placeholder="0.00"
                className="border-[#DBDBDB]  rounded-[10px] border placeholder:text-[#888888] text-[1.125rem] font-medium h-13.75 shadow-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="thumbnail"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mt-4">
              <FieldLabel className="text-black font-medium text-[1rem]">
                Thumbnail
              </FieldLabel>
              <ImageUpload value={field.value} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex items-center justify-end w-full mt-10 gap-3">
          <Button variant={"outline"}>Cancel</Button>
          <Button variant={"regular"}>Create Program</Button>
        </div>
      </form>
    </FormProvider>
  );
}
