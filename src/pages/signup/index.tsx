import React, { useState } from "react";
import { Input } from "../../components/ui/input"
import { Button, buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Link} from "react-router-dom";
import { register } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";

export const SignUp: React.FC = () => {
   const [registerPayload, setRegisterPayload] = useState({
    email: "",
    password: "",
  });

  const { mutate: handleRegister } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      console.log("Registration Successful:", data); 
      alert("Registration successful! Check your email to confirm your account.");
    },
    onError: (error: any) => {
      console.error("Registration Failed:", error); 
      alert(`Registration failed: ${error.message}`); 
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!registerPayload.email || !/\S+@\S+\.\S+/.test(registerPayload.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (registerPayload.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    handleRegister(registerPayload);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up for BitBlogs</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
        Create your account to start blogging
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input  
              type="text"
              id="name"
              
              placeholder="John Doe"
              />
              <label htmlFor="email" className="block text-sm font-medium mb-1">
              Emale
            </label>
            <Input  
              type="email"
              id="email"
              value={registerPayload.email}
              onChange={(e) => {
                setRegisterPayload({
                  email: e.target.value,
                  password: registerPayload.password,
                });
              }}
              placeholder="john@example.com"
              />
            
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={registerPayload.password}
              onChange={(e) => {
          setRegisterPayload({
            email: registerPayload.email,
            password: e.target.value,
          });
        }}
               required
            />
            <label htmlFor="password" className="block text-sm font-medium mb-1">
            Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              
            />
          </div>
          
          <Button
          type="submit"
            className={cn(buttonVariants({ variant: "link", size: "lg" }), " w-full bg-blue-600 text-white ")}>
            Sign up
           </Button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          
          <span>Don't have an account?</span>
          <Link to="/signin" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};



