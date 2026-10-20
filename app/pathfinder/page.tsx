import { ArrowLeft, Sparkles } from "lucide-react";
import { PathfinderForm } from "@/components/pathfinder-form";

export default function PathfinderPage() {
  return (
    <main className="dark min-h-screen bg-[#080b12] px-5 py-8 text-slate-100 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 font-mono text-sm font-bold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-slate-950 text-lime-300">
              <Sparkles />
            </span>
            PATHFINDER<span className="text-lime-600">_</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-lime-300"
          >
            <ArrowLeft data-icon="inline-start" />
            Back to paths
          </a>
        </header>
        <section className="mb-10 max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">
            Route finder / 01
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Find the path that fits{" "}
            <span className="text-lime-300">your signal.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Tell us what you already know and what you want to explore. We’ll
            suggest a starting direction based on your answers — not a generic
            career quiz.
          </p>
        </section>
        <PathfinderForm />
      </div>
    </main>
  );
}
