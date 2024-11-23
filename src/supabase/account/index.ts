import { supabase } from "@/supabase";

export const fillProfileInfo = async (values: any) => {
  return supabase.from("profiles").upsert(values).throwOnError();
};

export const getProfileInfo = (id: string | number) => {
  return supabase.from("profiles").select("*").eq("id", id);
};