"use client";
import { SubmitButton } from "@/components/ui/form/SubmitButton";
import React, { useState } from "react";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-4 bg-white rounded shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        {error && (
          <div className="p-2 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <SubmitButton>Login</SubmitButton>
      </form>
    </div>
  );
}
