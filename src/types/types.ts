import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

export type TypedSupabaseClient = SupabaseClient<Database>;

export enum LinkType {
  Link = 1,
  Email,
  Phone,
}

export type User = {
  name?: string;
  email: string;
  password: string;
};

export const homeRecipeFields = ["label", "image", "images"];