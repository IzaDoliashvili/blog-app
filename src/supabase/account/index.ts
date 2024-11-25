import { supabase } from "@/supabase";
import { Database } from "../supabase.types";

export const fillProfileInfo =  async (
  data: Database["public"]["Tables"]["profiles"]["Insert"],
) => {
  return supabase.from("profiles").upsert(data);
};

export const getProfileInfo = (id: string | number) => {
  return supabase.from("profiles").select("*").eq("id", id);
};