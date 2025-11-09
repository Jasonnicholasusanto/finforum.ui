import { createBrowserClient } from "@supabase/ssr";
import { env } from "process";
import { environment } from "../environment/env";

export function createClient() {
  return createBrowserClient(
    environment.nextPublicSupabaseUrl!,
    environment.nextPublicSupabasePublishableOrAnonKey!
  );
}
