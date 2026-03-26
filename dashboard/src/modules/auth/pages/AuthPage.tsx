"use client";

import { useState } from "react";
import { LoginPage } from "./LoginPage";
import { RegisterForm } from "./RegisterPage";

export default function AuthPage() {
    const [view, setView] = useState<"login" | "register">("login");

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted p-4">
            {view === "login" ? (
                <LoginPage onSwitch={() => setView("register")} />
            ) : (
                <RegisterForm onSwitch={() => setView("login")} />
            )}
        </div>
    );
}