import { supabase } from "@/supabase";

export const register = async ({
 
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
    try {
        const { data, error } = await supabase.auth.signUp(
          {
            email,
            password,
           
          }
        );
    
        if (error) {
          console.error("Sign-up error:", error);
          return { error };
        }
    
        return { data };
      } catch (err: any) {
        console.error("Unexpected error:", err.message);
        return { error: err };
      }
    };

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth.signInWithPassword({ email, password });
};