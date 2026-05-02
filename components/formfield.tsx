"use client"

import { Control, FieldPath, FieldValues, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file" | "number";
  disabled?: boolean;
  label?: string;
  className?: string;
  inputMode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  autoComplete?: string;
}

export default function FormFieldComp<T extends FieldValues>({
  control,
  name,
  placeholder,
  type = "text",
  disabled = false,
  label,
  className,
  inputMode,
  autoComplete,
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className=" ">
            <FieldLabel
              className={clsx("text-secondary-text dark:font-medium  text-[14px] mb-2")}
              htmlFor={name}
            >
              {label}
            </FieldLabel>
            <div className="relative">
              <Input
                type={isPassword && showPassword ? "text" : type}
                placeholder={placeholder}
                disabled={disabled}
                id={name}
                {...field}
                inputMode={inputMode}
                autoComplete="one-time-code"
                className={clsx(
                  "pr-10  border-[0.75px]  border-[#EAECF0] bg-[#F2F4F7] rounded-[5px] w-full text-[12px]   font-medium text-primary-text placeholder:text-[#98A2B3] placeholder:text-[12px] placeholder:font-normal  py-4 h-11 focus-visible:border-none focus-visible:ring-0 ",
                  isPassword &&
                    !showPassword &&
                    "  [-webkit-text-security:disc] text-primary-text ",
                  className,
                )}
              />
              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute border-none  right-1 top-1/2 h-full -translate-y-1/2 hover:bg-transparent cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <EyeOff
                    className={clsx(
                      "h-5 w-5 text-[#344054]",
                      showPassword ? "block" : "hidden",
                    )}
                  />
                  <Eye
                    className={clsx(
                      "h-5 w-5 text-[#344054]",
                      !showPassword ? "block" : "hidden",
                    )}
                  />
                </Button>
              )}
            </div>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
