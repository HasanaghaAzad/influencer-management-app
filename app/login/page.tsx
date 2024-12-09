"use client";

import React from "react";
import {useRouter} from "next/navigation";
import LoginForm from "@/components/pages/login/LoginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
      const {error} = await response.json();
      throw new Error(error || "Login failed");
    }

    // Redirect on success
    router.push("/");
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
