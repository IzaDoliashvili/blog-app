import React from "react";
import { Input } from "../../components/ui/input"
import { Button, buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Link} from "react-router-dom";
import { register } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";


export const SignUp: React.FC = () => {

  const { t } = useTranslation(); 

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const { mutate: handleRegister } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: { email: string; password: string }) => {
      return register(data); // Register function interacts with Supabase
    },
    onSuccess: () => {
      alert("Registration successful! Check your email to confirm.");
    },
    onError: (error: any) => {
      console.error("Registration failed:", error.message); // Log detailed error
      alert(`Registration failed: ${error.message}`);
    },
  });
  

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      alert(t("Passwords do not match!"));
      return;
    }
    handleRegister({
      email: data.email,
      password: data.password,
      
  });
}
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">{t("Sign Up for BitBlogs")}</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {t("Create your account to start blogging")}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              {t("Name")}
            </label>
            <Input
              id="name"
              placeholder={t("John Doe")}
              {...formRegister("name", {
                required: t("Name is required"),
                minLength: { value: 3, message: t("Name must be at least 3 characters") },
                maxLength: { value: 20, message: t("Name must be less than 20 characters") },
              })}
            />
            {errors.name && <p className="text-red-800 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t("Email")}
            </label>
            <Input
              id="email"
              placeholder={t("john@example.com")}
              {...formRegister("email", {
                required: t("Email is required"),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t("Invalid email format"),
                },
              })}
            />
            {errors.email && <p className="text-red-800 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              {t("Password")}
            </label>
            <Input
              id="password"
              type="password"
              placeholder={t("Enter your password")}
              {...formRegister("password", {
                required: t("Password is required"),
                minLength: { value: 8, message: t("Password must be at least 8 characters") },
              })}
            />
            {errors.password && <p className="text-red-800 text-sm">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              {t("Confirm Password")}
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={t("Confirm your password")}
              {...formRegister("confirmPassword", {
                required: t("Please confirm your password"),
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-800 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className={cn(buttonVariants({ variant: "link", size: "lg" }), "w-full bg-blue-500 text-white")}
          >
            {t("Sign Up")}
          </Button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <span>{t("Already have an account?")}</span>
          <Link to="/signin" className="text-blue-500 hover:underline">
            {t("Log In")}
          </Link>
        </div>
      </div>
    </div>
  );
};



