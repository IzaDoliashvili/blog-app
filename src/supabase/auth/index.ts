import { supabase } from "@/supabase";

export const register = (p0: string, p1: { required: string; minLength: { value: number; message: string; }; maxLength: { value: number; message: string; }; }, {
  email, password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth.signUp({ email, password });
  
};
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await supabase.auth.signInWithPassword({ email, password });

  if (response.error) {
    throw response.error; 
  }

  return response; 
};


// export const login = ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   return supabase.auth
//     .signInWithPassword({ email, password })
//     .then((response) => {
//       if (response.error) {
//         throw response?.error;
//       }
//       return response;
//     });
// };

export const logout = () => {
  return supabase.auth.signOut();
};