"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/auth";
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

type RegisterType = z.infer<typeof registerSchema>;

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
    const { register:registerUser  } = useAuth();
    const [show, setShow] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: RegisterType) => {
        registerUser(data);
    };

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardContent className="space-y-6 p-6">

                {/* Heading */}
                <div>
                    <Heading as="h1">Create account</Heading>
                    <Paragraph size="sm" className="text-muted-foreground">
                        Enter your details
                    </Paragraph>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <Input {...register("name")} />
                        {errors.name && (
                            <ErrorText message={errors.name.message!} />
                        )}
                    </div>

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
                        Register <ArrowRight size={16} />
                    </Button>
                </form>

                <Paragraph size="sm" className="text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Button variant="link" onClick={onSwitch} className="text-primary">
                        Login
                    </Button>
                </Paragraph>

            </CardContent>
        </Card>
    );
}