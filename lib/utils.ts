import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert digits to readable financial amounts with comma sperated 
export const formatAmount = (value: string) => {
  // Remove all non-digit characters except decimal point
  let cleaned = value.replace(/[^\d.]/g, "");

  // Ensure only one decimal point
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }

  // Limit to 2 decimal places
  if (parts[1]?.length > 2) {
    cleaned = parts[0] + "." + parts[1].slice(0, 2);
  }

  // Add commas to the integer part
  const [integerPart, decimalPart] = cleaned.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};

import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";

// formatting figures in naira
export const formatCurrency = (amount: number, currencyParam?: string) => {
  const storeCurrency = usePlatformSettingsStore.getState().settings?.currency;
  const currency = currencyParam || storeCurrency || "NGN";
  
  const currencyDomain =
    currency === "NGN" ? "en-NG" : currency === "USD" ? "en-US" : currency === "GBP" ? "en-GB" : "en-DE";
  const formattedTotal = new Intl.NumberFormat(currencyDomain, {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
  return formattedTotal;
};

// catch api errors and display them nicely
export const getApiError = (error: any) => {
  const response = error?.response;

  if (response?.data?.message) {
    return response.data.message;
  }

  if (response?.data?.error) {
    return response.data.error;
  }

  if (response?.status >= 500) {
    return "Something went wrong on our end. Please try again later.";
  }

  if (error?.request && !response) {
    return "Unable to reach the server. Please check your internet connection and try again.";
  }

  return error?.message === "[object Object]"
    ? "An unexpected error occurred"
    : error?.message || "An unexpected error occurred";
};

// prepare objects to be used as url params strings
export const buildQueryString = (params: Record<string, string>) => {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      queryParams.append(key, params[key]);
    }
  });

  return queryParams.toString();
};


  // Helper to format Date to "YYYY-MM-DD" for form state
  export const toIsoDateString = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${d}-${m}-${y}`;
  };

export const formatAppDate = (dateString: string | Date | undefined | null, options?: Intl.DateTimeFormatOptions) => {
  if (!dateString) return "";
  
  try {
    const storeTimezone = usePlatformSettingsStore.getState().settings?.defaultTimezone;
    const date = new Date(dateString);
    
    // Default format if no options provided: e.g. "Oct 14, 2023"
    const defaultOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    
    const finalOptions = {
      ...defaultOptions,
      ...options,
      ...(storeTimezone && storeTimezone !== "all" ? { timeZone: storeTimezone } : {})
    };

    return new Intl.DateTimeFormat('en-US', finalOptions).format(date);
  } catch (error) {
    // Fallback if timezone is invalid
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
};

export const formatAppDateTime = (dateString: string | Date | undefined | null) => {
  return formatAppDate(dateString, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
