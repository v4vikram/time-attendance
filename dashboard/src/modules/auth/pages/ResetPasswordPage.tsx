"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Heading from "@/shared/components/Heading";
import Paragraph from "@/shared/components/Paragraph";
import ErrorText from "@/shared/components/ErrorText";
import { useAuth } from "../hooks/useAuth";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6, "Minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { resetPassword, isResettingPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordType) => {
    if (!token) return;

    await resetPassword({
      token,
      password: data.password,
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-6 p-6">
          <div>
            <Heading as="h1">Reset password</Heading>
            <Paragraph size="sm" className="text-muted-foreground">
              Enter and confirm your new password
            </Paragraph>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-sm font-medium">New password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <ErrorText message={errors.password.message!} />}
            </div>

            <div>
              <Label className="text-sm font-medium">Confirm password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <ErrorText message={errors.confirmPassword.message!} />
              )}
            </div>

            <Button type="submit" className="w-full flex gap-2">
              {isResettingPassword ? "Updating..." : "Update Password"}{" "}
              <ArrowRight size={16} />
            </Button>
          </form>

          <Paragraph size="sm" className="text-center text-muted-foreground">
            Remember your password?{" "}
            <Button asChild variant="link" className="text-primary">
              <Link to="/">Back to Login</Link>
            </Button>
          </Paragraph>
        </CardContent>
      </Card>
    </div>
  );
}
