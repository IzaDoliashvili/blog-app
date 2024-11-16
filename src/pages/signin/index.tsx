import React from "react";
import { Input } from "../../components/ui/input"
import { Button, buttonVariants } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const SignIn: React.FC = () => {
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
              required/>
            
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              type="password"
              id="password"
               required
            />
          </div>
          
          <Button
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