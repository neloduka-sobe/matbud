import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString)

  let formattedDate: string
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    formattedDate = date.toLocaleDateString(locale || "pl-PL", options)
  } catch {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    formattedDate = date.toLocaleDateString("pl-PL", options)
  }

  return formattedDate
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

