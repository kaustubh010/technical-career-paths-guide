"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, Sparkles } from "lucide-react";
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

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080b12] px-5 py-10 text-slate-100">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-lime-300"
        >
          <ArrowLeft data-icon="inline-start" />
          Back to Pathfinder
        </a>
        <Card className="border-white/10 bg-[#101621] shadow-2xl shadow-lime-300/5">
          <CardHeader className="p-7 sm:p-9">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-lime-300 text-slate-950">
              <Sparkles />
            </div>
            <CardTitle className="text-3xl">
              {mode === "signin" ? "Welcome back." : "Start your route."}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {mode === "signin"
                ? "Pick up where your learning journey left off."
                : "Save paths, resources, and your next steps."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-7 pt-0 sm:p-9 sm:pt-0">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="border-white/10 bg-[#0b111b] text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="border-white/10 bg-[#0b111b] text-white"
                />
              </div>
              <Button className="mt-2 w-full bg-lime-300 text-slate-950 hover:bg-lime-200">
                {mode === "signin" ? "Sign in" : "Create account"}{" "}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <div className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-400">
              <LockKeyhole data-icon="inline-start" />
              Auth is UI-only for now.
            </div>
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="mt-6 w-full text-center text-sm text-lime-300 hover:text-lime-200"
            >
              {mode === "signin"
                ? "Need an account? Create one"
                : "Already have an account? Sign in"}
            </button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
