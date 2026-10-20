"use client";

import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  if (!toasts.length) return null;

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end gap-2 p-4 sm:p-6"
    >
      {toasts.map((toast) => {
        const isDestructive = toast.variant === "destructive";
        const isSuccess = toast.variant === "success";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-2 ${
              isDestructive
                ? "border-red-500/30 bg-red-950/80 text-red-200"
                : isSuccess
                  ? "border-lime-500/30 bg-[#121c15]/90 text-lime-200"
                  : "border-white/10 bg-[#101621]/90 text-slate-100"
            }`}
          >
            {isDestructive ? (
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" />
            ) : isSuccess ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-lime-300" />
            ) : (
              <Info className="mt-0.5 size-5 shrink-0 text-slate-400" />
            )}
            <div className="flex-1 text-sm">
              {toast.title && (
                <div className="font-semibold text-white">{toast.title}</div>
              )}
              {toast.description && (
                <div className="mt-0.5 text-xs text-slate-300">
                  {toast.description}
                </div>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
