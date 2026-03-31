"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormFieldComp from "@/components/formfield";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const formSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  consultationType: z.string().min(1, "Please select a consultation type"),
  experience: z.string().min(1, "Please select an experience option"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function BookingForm() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      consultationType: "",
      experience: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Submit logic
  };

  return (
    <section className="py-24 bg-white flex flex-col items-center">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl border border-[#EAECF0] rounded-[16px] p-8 md:p-12 shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)]">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="heading-2 mb-2">Book Your Consultation</h2>
          <p className="text-[#697586] text-base max-w-lg">
            Take a brave step towards healing. Let's find out how we can best support you on your wellness journey.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldComp
              control={control}
              name="fullName"
              label="Full Name*"
              placeholder="Please Provide"
            />
            <FormFieldComp
              control={control}
              name="email"
              type="email"
              label="Email Address*"
              placeholder="YourEmail@gmail.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldComp
              control={control}
              name="phone"
              type="text"
              label="Phone Number*"
              placeholder="+2340 0000 0000"
            />
            <Controller
              control={control}
              name="consultationType"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex flex-col">
                    <FieldLabel className="text-[#344054] text-[14px] mb-2" htmlFor="consultationType">
                      Consultation Type *
                    </FieldLabel>
                    <select
                      id="consultationType"
                      {...field}
                      className="border-[0.75px] border-[#EAECF0] bg-[#F2F4F7] rounded-[5px] w-full text-[12px] font-medium text-[#344054] focus-visible:border-none focus-visible:ring-0 px-3 py-4 h-11"
                    >
                      <option value="" disabled hidden>Select an option</option>
                      <option value="individual">Individual</option>
                      <option value="couples">Couples</option>
                      <option value="group">Group</option>
                    </select>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Controller
            control={control}
            name="experience"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-2">
                <FieldLabel className="text-[#344054] font-medium text-[14px] mb-4">
                  What experience are you looking for?
                </FieldLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="individual_therapy" id="r1" />
                    <Label htmlFor="r1" className="text-[#344054] text-sm font-normal">Individual Therapy</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="couples_counseling" id="r2" />
                    <Label htmlFor="r2" className="text-[#344054] text-sm font-normal">Couples Counseling</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="general_wellness" id="r3" />
                    <Label htmlFor="r3" className="text-[#344054] text-sm font-normal">General Wellness Checkup</Label>
                  </div>
                </RadioGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="message"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <div className="flex flex-col">
                  <FieldLabel className="text-[#344054] text-[14px] mb-2" htmlFor="message">
                    Tell us a bit about your needs
                  </FieldLabel>
                  <textarea
                    id="message"
                    {...field}
                    placeholder="Leave a short message/note"
                    className="border-[0.75px] border-[#EAECF0] bg-[#F2F4F7] rounded-[5px] w-full text-[12px] font-medium text-[#344054] placeholder:text-[#98A2B3] py-4 min-h-[120px] focus-visible:border-none focus-visible:ring-0 px-3 resize-none"
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#56814E] hover:bg-[#456A3E] text-white py-6 rounded-[8px] mt-2 font-medium"
          >
            Request Consultation
          </Button>

          <p className="text-center text-[#98A2B3] text-sm mt-2">
            We'll be in touch with an appointment to get you started.
          </p>
        </form>
      </div>
    </section>
  );
}
