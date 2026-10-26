"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2,
  Mail,
  Lock,
  User,
  LogOut,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { user, isLoading, login, signup, loginWithGoogle, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setSubmitting(true);
    try {
      if (mode === "signin") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pathfinder-light flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12 text-slate-900">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-lime-300"
        >
          <ArrowLeft className="size-4" />
          Back to Pathfinder
        </a>

        {/* If already logged in, show active user status card */}
        {user ? (
          <Card className="border-lime-300/30 bg-[#101621] shadow-2xl shadow-lime-300/10">
            <CardHeader className="p-7 sm:p-9">
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-lime-300 text-slate-950">
                <CheckCircle className="size-6" />
              </div>
              <CardTitle className="text-2xl font-bold">
                You are logged in
              </CardTitle>
              <CardDescription className="text-slate-400">
                Logged in as <span className="font-semibold text-white">{user.email}</span>
                {user.name ? ` (${user.name})` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-7 pt-0 sm:p-9 sm:pt-0">
              <a
                href="/"
                className="flex h-9 w-full items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-lime-200"
              >
                Go to Explorer <ArrowRight className="ml-2 size-4" />
              </a>
              <a
                href="/pathfinder"
                className="flex h-9 w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Take Assessment
              </a>
              <Button
                variant="ghost"
                onClick={() => logout()}
                className="mt-2 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut className="mr-2 size-4" />
                Sign out
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-white/10 bg-[#101621] shadow-2xl shadow-lime-300/5">
            <CardHeader className="p-7 sm:p-9">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-lime-300 text-slate-950 shadow-md shadow-lime-300/20">
                <Sparkles className="size-6" />
              </div>
              <CardTitle className="text-3xl font-semibold tracking-tight">
                {mode === "signin" ? "Welcome back." : "Start your route."}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {mode === "signin"
                  ? "Sign in to access your saved paths and assessments."
                  : "Create an account to save paths, track skills, and record assessments."}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-7 pt-0 sm:p-9 sm:pt-0">
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={loginWithGoogle}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#0b111b] py-3 text-sm font-medium text-slate-200 transition-all hover:border-lime-300/40 hover:bg-[#141d29] hover:text-white"
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.9 6.4C.7 8.8 0 10.3 0 12s.7 3.2 1.9 5.6l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16C3.7 19.8 7.5 23 12 23z"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="relative my-6 flex items-center justify-center">
                <div className="w-full border-t border-white/10" />
                <span className="absolute bg-[#101621] px-3 font-mono text-xs uppercase tracking-wider text-slate-500">
                  Or continue with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === "signup" && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-slate-300">
                      Full Name <span className="text-slate-500">(optional)</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Alex Morgan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-white/10 bg-[#0b111b] pl-10 text-white placeholder:text-slate-500 focus:border-lime-300/60"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-white/10 bg-[#0b111b] pl-10 text-white placeholder:text-slate-500 focus:border-lime-300/60"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-300">
                      Password
                    </Label>
                    <span className="text-xs text-slate-500">
                      {mode === "signup" ? "Min 6 characters" : ""}
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-white/10 bg-[#0b111b] pl-10 text-white placeholder:text-slate-500 focus:border-lime-300/60"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting || isLoading}
                  className="mt-3 w-full bg-lime-300 py-2.5 font-semibold text-slate-950 transition hover:bg-lime-200"
                >
                  {submitting ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : null}
                  {mode === "signin" ? "Sign in with Email" : "Create Account"}
                  {!submitting && <ArrowRight className="ml-2 size-4" />}
                </Button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                }}
                className="mt-6 w-full text-center text-sm text-lime-300 transition hover:text-lime-200"
              >
                {mode === "signin"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
