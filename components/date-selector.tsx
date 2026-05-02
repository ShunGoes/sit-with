import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from './ui/field';

interface DateFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export default function SelectDateComp<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'DD-MM-YYYY',
  disableFutureDates = false,
  disablePastDates = false,
  minDate,
  maxDate,
}: DateFormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // Helpers: parse and format (dd-MM-yyyy)
        const parseToDate = (val: any): Date | null => {
          if (val == null) return null;
          if ((val as any) instanceof Date) {
            const d = val as Date;
            return isNaN(d.getTime()) ? null : d;
          }
          if (typeof val === 'string') {
            const s = val.trim();

            // YYYY-MM-DD (preferred storage format)
            const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(s);
            if (isoMatch) {
              const [yearS, monthS, dayS] = s.split('-');
              const y = Number(yearS);
              const m = Number(monthS) - 1;
              const d = Number(dayS);
              if (Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(d)) {
                const dt = new Date(y, m, d);
                return isNaN(dt.getTime()) ? null : dt;
              }
            }

            // dd-MM-yyyy (user-facing)
            const ddMatch = /^\d{1,2}-\d{1,2}-\d{4}$/.test(s);
            if (ddMatch) {
              const [dayS, monthS, yearS] = s.split('-');
              const day = Number(dayS);
              const month = Number(monthS) - 1;
              const year = Number(yearS);
              if (
                Number.isFinite(day) &&
                Number.isFinite(month) &&
                Number.isFinite(year)
              ) {
                const d2 = new Date(year, month, day);
                return isNaN(d2.getTime()) ? null : d2;
              }
            }

            // Fallback: try Date constructor (ISO with time, etc.)
            const d1 = new Date(s);
            if (!isNaN(d1.getTime())) return d1;
          }
          return null;
        };

        const formatDate = (d: Date) => {
          const dd = String(d.getDate()).padStart(2, '0');
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const yyyy = d.getFullYear();
          return `${dd}-${mm}-${yyyy}`;
        };

        // Storage format: YYYY-MM-DD
        const formatISO = (d: Date) => {
          const dd = String(d.getDate()).padStart(2, '0');
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const yyyy = d.getFullYear();
          return `${yyyy}-${mm}-${dd}`;
        };

        const selectedDate = parseToDate(field.value);

        // Local raw input to allow user typing; keep in sync with field.value
        const [rawInput, setRawInput] = useState<string | null>(() => {
          if (typeof field.value === 'string') {
            const parsed = parseToDate(field.value);
            return parsed ? formatDate(parsed) : field.value;
          }
          if ((field.value as any) instanceof Date) {
            const d = field.value as Date;
            return isNaN(d.getTime()) ? null : formatDate(d);
          }
          return null;
        });

        useEffect(() => {
          // if external value changes, keep rawInput synced
          if (typeof field.value === 'string') {
            const parsed = parseToDate(field.value);
            setRawInput(parsed ? formatDate(parsed) : field.value);
          } else if ((field.value as any) instanceof Date) {
            const d = field.value as Date;
            if (!isNaN(d.getTime())) setRawInput(formatDate(d));
            else setRawInput(null);
          } else {
            setRawInput(null);
          }
        }, [field.value]);

        // Determine max date
        const computedMaxDate = disableFutureDates 
          ? new Date() 
          : maxDate;

        // Determine min date
        const computedMinDate = disablePastDates 
          ? new Date() 
          : minDate;

        return (
          <Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid} className="flex flex-col">
            <FieldLabel className=''>{label}</FieldLabel>
              <DatePicker
                selected={selectedDate}
                onChange={(date: any) => {
                  // When a date is picked from calendar, store as YYYY-MM-DD string and sync raw input
                  if (date instanceof Date && !isNaN(date.getTime())) {
                    const iso = formatISO(date);
                    (field.onChange as any)(iso);
                    setRawInput(formatDate(date));
                  } else {
                    (field.onChange as any)(null);
                    setRawInput(null);
                  }
                }}
                onChangeRaw={(e: any) => {
                  // keep local raw input while typing
                  setRawInput(e?.target?.value ?? null);
                }}
                onBlur={() => {
                  // Validate raw input on blur and convert if valid (store as YYYY-MM-DD)
                  if (rawInput == null || rawInput === '') {
                    (field.onChange as any)(null);
                    return;
                  }
                  const parsed = parseToDate(rawInput);
                  if (parsed) {
                    (field.onChange as any)(formatISO(parsed));
                    setRawInput(formatDate(parsed));
                  } else {
                    // invalid: keep rawInput as-is and leave form value unchanged
                  }
                }}
                dateFormat="dd-MM-yyyy"
                placeholderText={placeholder}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
                maxDate={computedMaxDate}
                minDate={computedMinDate}
                className="flex h-11 w-full  placeholder:text-[#767676] rounded-md border border-[#C0C0C0] bg-dash-secondary-bg dark:bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[14px] focus-visible:outline-none dark:text-primary-text disabled:cursor-not-allowed disabled:opacity-50"
                wrapperClassName="w-full"
              />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
}