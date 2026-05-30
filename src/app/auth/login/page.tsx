"use client";

import { useState } from "react";

import axios from "axios";

import {
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const response =
        await axios.post(
          "/api/auth/login",
          {
            email: email
              .trim()
              .toLowerCase(),

            password,
          }
        );

      console.log(
        "LOGIN RESPONSE:",
        response.data
      );

      const user =
        response.data?.user;

      if (!user) {
        throw new Error(
          "User missing from response"
        );
      }

      console.log(
        "USER:",
        user
      );

      console.log(
        "ROLE:",
        user.role
      );

      console.log(
        "COOKIE SHOULD NOW EXIST"
      );

      if (
        user.role === "ADMIN"
      ) {
        console.log(
          "REDIRECTING TO ADMIN"
        );

        window.location.assign(
          "/admin/dashboard"
        );

        return;
      }

      console.log(
        "REDIRECTING TO HOME"
      );

      window.location.assign("/");
    } catch (error: any) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      setError(
        error?.response?.data
          ?.error ||
          error?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-3xl font-semibold">
          Login
        </h1>

        <p className="mb-6 text-center text-sm text-slate-500">
          Sign in to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-xl border px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border px-4 py-3 pr-12"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 text-white"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
