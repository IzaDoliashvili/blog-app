import React, { useState } from "react";
import { Input } from "../../components/ui/input"
import { Button, buttonVariants } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/supabase/auth";
import { userAtom } from "@/store/auth";
import { useSetAtom } from "jotai";

export const SignIn: React.FC = () => {

  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });

  const { mutate: handleLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (user) => {
      setUser(user);
      navigate("/home");
    },
  });

  const handleSubmit = () => {
    const isEmailFilled = !!loginPayload.email;
    const isPasswordFilled = !!loginPayload.password;

    if (isEmailFilled && isPasswordFilled) {
      handleLogin(loginPayload);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Log in to BitBlogs</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your credentials to access your account
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input  
              type="email"
              id="email"
              placeholder="john@example.com"
              value={loginPayload.email}
        onChange={(e) => {
          setLoginPayload({
            email: e.target.value,
            password: loginPayload.password,
          });
        }}
              required/>
            
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={loginPayload.password}
        onChange={(e) => {
          setLoginPayload({
            email: loginPayload.email,
            password: e.target.value,
          });
        }}
               required
            />
          </div>
          
          <Button
            onClick={handleSubmit}
            className={cn(buttonVariants({ variant: "link", size: "lg" }), " w-full bg-blue-600 text-white ")}>
            Log In
           </Button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <Link  to="" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
          <span>Don't have an account?</span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
