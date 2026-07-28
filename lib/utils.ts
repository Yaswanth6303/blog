import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SortableItem = {
  order?: number;
  date: string;
};

export function sortWithOrderAndDate(a: SortableItem, b: SortableItem): number {
  if (a.order !== undefined && b.order !== undefined) {
    if (a.order === b.order) {
      return new Date(a.date) < new Date(b.date) ? 1 : -1;
    }
    return a.order - b.order;
  }
  if (a.order !== undefined) return -1;
  if (b.order !== undefined) return 1;
  return new Date(a.date) < new Date(b.date) ? 1 : -1;
}
