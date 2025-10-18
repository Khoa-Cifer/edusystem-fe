import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDateString(dateStr: string) {
  const date = `${dateStr}T00:00:00.000Z`;
  return date;
}
