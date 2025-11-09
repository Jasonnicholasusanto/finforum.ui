import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { environment } from "./environment/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasEnvVars =
  environment.nextPublicSupabaseUrl &&
  environment.nextPublicSupabasePublishableOrAnonKey;
