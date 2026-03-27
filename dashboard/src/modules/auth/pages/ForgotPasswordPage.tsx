"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Heading from "@/shared/components/Heading";
import Paragraph from "@/shared/components/Paragraph";
import ErrorText from "@/shared/components/ErrorText";
import { useAuth } from "../hooks/useAuth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { forgotPassword, isSendingResetLink } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    await forgotPassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-6 p-6">
          <div>
            <Heading as="h1">Forgot password</Heading>
            <Paragraph size="sm" className="text-muted-foreground">
              Enter your email to receive a reset link
            </Paragraph>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <Input {...register("email")} />
              {errors.email && <ErrorText message={errors.email.message!} />}
            </div>

            <Button type="submit" className="w-full flex gap-2">
              {isSendingResetLink ? "Sending..." : "Send Reset Link"}{" "}
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
