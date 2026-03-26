"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/auth";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

import Heading from "@/shared/components/Heading";
import Paragraph from "@/shared/components/Paragraph";
import ErrorText from "@/shared/components/ErrorText";
import { useAuth } from "../hooks/useAuth";

type LoginType = z.infer<typeof loginSchema>;

export function LoginPage({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
  });

  const onSubmit = (data: LoginType) => {
    login(data);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="space-y-6 p-6">

        <div>
          <Heading as="h1">Welcome back</Heading>
          <Paragraph size="sm" className="text-muted-foreground">
            Enter your details
          </Paragraph>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <Input {...register("email")} />
            {errors.email && (
              <ErrorText message={errors.email.message!} />
            )}
          </div>

          {/* Password */}
          <div>
            <Label className="text-sm font-medium">Password</Label>

            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-2.5 text-muted-foreground"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.password && (
              <ErrorText message={errors.password.message!} />
            )}
          </div>

          <Button type="submit" className="w-full flex gap-2">
            Sign In <ArrowRight size={16} />
          </Button>
        </form>

        <Paragraph size="sm" className="text-center text-muted-foreground">
          No account?{" "}
          <Button variant="link" onClick={onSwitch} className="text-primary">
            Register
          </Button>
        </Paragraph>

      </CardContent>
    </Card>
  );
}