import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export { format as formatDate } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
