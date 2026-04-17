import FormFieldComp from "@/components/formfield";
import { Controller, useFormContext, SubmitHandler } from "react-hook-form";
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
import ImageUpload from "@/components/image-upload";
import { ProgramFormSchema } from "@/schemas/programs-schema";
import ProgramWeeksSection from "./weeks/program-weeks-section";
import LearningObjectivesField from "./learning-objectives-field";

const PROGRAM_TYPE = [
  {
    label: "Student",
    value: "STUDENTS",
  },
  {
    label: "Professional",
    value: "PROFESSIONALS",
  },
  {
    label: "Leadership",
    value: "LEADERS",
  },
];

export default function ProgramForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<ProgramFormSchema>;
}) {
  const form = useFormContext<ProgramFormSchema>();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 ">
      {/* basic information */}
      <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
        <header className="text-primary-text font-semibold text-base mb-4">
          Basic Information
        </header>
        <div className="space-y-4">
          <FormFieldComp
            name="title"
            control={form.control}
            label="Program Name *"
            placeholder="Eg Leadership Essentials"
            className="bg-white"
          />
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
            <FormFieldComp
              name="duration"
              control={form.control}
              label="Duration (weeks) *"
              placeholder="1"
              className="bg-white"
            />
            <FormFieldComp
              name="hoursPerWeek"
              control={form.control}
              label="Hours per week *"
              placeholder="4"
              className="bg-white"
            />
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="">
                  <FieldLabel className="text-[#344054]  text-sm">
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
                    className="pr-10  border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px]   font-medium text-[#344054] placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal  py-4 h-11 focus-visible:border-none focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FormFieldComp
              name="date"
              control={form.control}
              label="Start Date *"
              placeholder="DD/MM/YYYY"
              className="bg-white"
            />
          </div>
          <Controller
            control={form.control}
            name="programType"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex-1 max-w-[300px]"
              >
                <div className="flex flex-col">
                  <FieldLabel
                    className="text-[#344054] text-[14px] mb-2"
                    htmlFor="type"
                  >
                    Program Type *
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
                    placeholder="Describe the program, its goal and who its for......."
                    className="border-[0.75px] border-[#EAECF0] bg-white rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] py-4 min-h-30 outline-none px-3 resize-none"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {/* learning objectives  */}
      <div className="bg-dash-secondary-bg p-5 rounded-[12px]">
        <header className="text-primary-text font-semibold text-base mb-3">
          Learning Objectives
        </header>
        <LearningObjectivesField />
      </div>

      {/* facilitator information  */}
      <div className="bg-dash-secondary-bg p-5  rounded-[12px]">
        <header className="text-primary-text font-semibold text-base mb-2">
          Facilitator Information
        </header>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <FormFieldComp
            name="facilitatorName"
            control={form.control}
            label="Facilitator Name * "
            placeholder="Dr. John Doe"
            className="bg-white"
          />
          <FormFieldComp
            name="facilitatorEmail"
            control={form.control}
            label="Facilitator Email * "
            placeholder="facilitator@sitwithpd.com"
            className="bg-white"
          />
        </div>
      </div>

      {/* program weeks  */}
      <ProgramWeeksSection />

      {/* thumbnail */}
      <div className="bg-dash-secondary-bg p-5  rounded-[12px]">
        <Controller
          control={form.control}
          name="thumbnail"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mt-4">
              <FieldLabel className="text-primary-text font-semibold text-base ">
                Thumbnail
              </FieldLabel>
              <ImageUpload value={field.value} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex items-center justify-end w-full mt-10 gap-3">
        <Button variant={"outline"}>Cancel</Button>
        <Button variant={"regular"} className="m">
          Create Program
        </Button>
      </div>
    </form>
  );
}
