import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function remainingTimeAsString(time: string) {
  const currentTime = new Date();
  const endTime = new Date(time);

  const diff = endTime.getTime() - currentTime.getTime();
  const padZero = (num: number) => num.toString().padStart(2, "0");

  return {
    diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: padZero(Math.floor((diff / (1000 * 60 * 60)) % 24)),
    minutes: padZero(Math.floor((diff / 1000 / 60) % 60)),
    seconds: padZero(Math.floor((diff / 1000) % 60)),
  };
}

export function formatDateIntl(
  locale: string | string[],
  time: string,
  options?: Intl.DateTimeFormatOptions,
) {
  const utcDate = new Date(time);

  const formattedDate = new Intl.DateTimeFormat(locale, options).format(
    utcDate,
  );

  return formattedDate;
}
