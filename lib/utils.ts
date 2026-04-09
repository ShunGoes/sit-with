import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

// formatting figures in naira
export const formatCurrency = (amount: number, currency = "NGN") => {
  const currencyDomain =
    currency === "NGN" ? "en-NG" : currency === "USD" ? "en-US" : "en-GB";
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
