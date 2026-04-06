import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAmount = (value: string) => {
  // Remove all non-digit characters except decimal point
  let cleaned = value.replace(/[^\d.]/g, '');
  
  // Ensure only one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Limit to 2 decimal places
  if (parts[1]?.length > 2) {
    cleaned = parts[0] + '.' + parts[1].slice(0, 2);
  }
  
  // Add commas to the integer part
  const [integerPart, decimalPart] = cleaned.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return decimalPart !== undefined 
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};