import { supabase } from "@/supabase";

// const { error } = await supabase.auth.signUp({
//   email: "example@example.com",
//   password: "strongpassword123",
// });

// if (error) {
//   console.error("Error:", error.message);
// }


export const register = ({
  email,
  password,
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