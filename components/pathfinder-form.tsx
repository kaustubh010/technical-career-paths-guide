"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
  Loader2,
  BookmarkCheck,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";

const skillOptions = [
  "JavaScript / TypeScript",
  "Python",
  "SQL & data",
  "HTML & CSS",
  "Linux & networking",
  "C / C++",
  "Design & prototyping",
  "Statistics & maths",
];

const interestOptions = [
  "Building interfaces",
  "Solving logic problems",
  "Working with data",
  "AI and intelligent systems",
  "Security and investigation",
  "Cloud infrastructure",
  "Hardware and devices",
  "Testing and quality",
];

const recommendations = [
  {
    title: "Frontend Engineer",
    id: "frontend",
    match: ["JavaScript / TypeScript", "HTML & CSS", "Design & prototyping", "Building interfaces"],
    reason:
      "You combine a product-building mindset with interface and web fundamentals.",
  },
  {
    title: "AI / ML Engineer",
    id: "aiml",
    match: [
      "Python",
      "Statistics & maths",
      "Working with data",
      "AI and intelligent systems",
    ],
    reason:
      "Your quantitative interests and Python foundation are a strong starting signal.",
  },
  {
    title: "Backend Engineer",
    id: "backend",
    match: [
      "JavaScript / TypeScript",
      "Python",
      "SQL & data",
      "Solving logic problems",
    ],
    reason:
      "You enjoy systems, logic, and the data layer behind useful products.",
  },
  {
    title: "Cybersecurity Engineer",
    id: "cyber",
    match: ["Linux & networking", "Python", "Security and investigation"],
    reason:
      "You are drawn to adversarial thinking, systems, and protecting technology.",
  },
  {
    title: "UI / UX Designer",
    id: "uiux",
    match: ["Design & prototyping", "Building interfaces"],
    reason:
      "You notice how people experience products and want to shape that experience.",
  },
  {
    title: "Cloud / Solutions Engineer",
    id: "cloud",
    match: ["Linux & networking", "Cloud infrastructure", "Solving logic problems"],
    reason:
      "You think in systems, scalability, and connecting distributed services together.",
  },
  {
    title: "Data Analyst",
    id: "data",
    match: ["SQL & data", "Statistics & maths", "Working with data"],
    reason:
      "You enjoy extracting patterns, answering questions with data, and communicating findings.",
  },
  {
    title: "Embedded Systems Engineer",
    id: "embedded",
    match: ["C / C++", "Hardware and devices", "Linux & networking"],
    reason:
      "You enjoy writing efficient code close to hardware, sensors, and microcontrollers.",
  },
];

export function PathfinderForm() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || "");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggle = (
    value: string,
    values: string[],
    setter: (next: string[]) => void,
  ) =>
    setter(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    );

  const result = useMemo(() => {
    const selected = [...skills, ...interests];
    return recommendations
      .map((item) => ({
        ...item,
        score: item.match.filter((value) => selected.includes(value)).length,
      }))
      .sort((a, b) => b.score - a.score)[0] || recommendations[0];
  }, [skills, interests]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    const matched = result.match.filter((value) =>
      [...skills, ...interests].includes(value)
    );

    try {
      const res = await fetch("/api/career-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || user?.name || undefined,
          skills,
          interests,
          recommendedPathId: result.id,
          recommendedPathTitle: result.title,
          reason: result.reason,
          matchedItems: matched,
        }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        toast({
          title: "Assessment saved!",
          description: `Your path recommendation for ${result.title} has been stored.`,
          variant: "success",
        });
      }
    } catch (err) {
      console.error("Failed to save assessment:", err);
    } finally {
      setSaving(false);
      setSubmitted(true);
    }
  };

  if (submitted)
    return (
      <Card className="border-lime-300/20 bg-[#101621] text-slate-100 shadow-2xl shadow-lime-300/5">
        <CardHeader className="p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="border-lime-300/20 bg-lime-300/10 text-lime-200">
              <Sparkles className="mr-1.5 size-3.5" />
              Route found
            </Badge>
            {savedSuccess && (
              <Badge variant="outline" className="border-lime-400/40 text-lime-300">
                <BookmarkCheck className="mr-1 size-3" />
                Saved to database
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4 text-3xl sm:text-4xl">
            Your strongest signal is{" "}
            <span className="text-lime-300">{result.title}</span>.
          </CardTitle>
          <CardDescription className="max-w-2xl text-base leading-7 text-slate-300">
            {name ? `${name}, ` : ""}
            {result.reason} This is a starting hypothesis, not a permanent
            label.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-7 pt-0 sm:p-10 sm:pt-0">
          <div className="rounded-2xl border border-white/10 bg-[#0b111b] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime-300">
              Why it fits your profile
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.match
                .filter((value) => [...skills, ...interests].includes(value))
                .map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="border border-lime-300/20 bg-lime-300/10 text-lime-200"
                  >
                    <Check className="mr-1.5 size-3 text-lime-400" />
                    {value}
                  </Badge>
                ))}
              {result.match.filter((value) =>
                [...skills, ...interests].includes(value)
              ).length === 0 && (
                <span className="text-sm text-slate-400">
                  A foundational direction based on your broad potential.
                </span>
              )}
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`/resources/${result.id}`}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-lime-200"
            >
              Explore this path <ArrowRight className="ml-2 size-4" />
            </a>
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setSavedSuccess(false);
              }}
              className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
            >
              <RotateCcw className="mr-2 size-4" />
              Retake assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Card className="border-white/10 bg-[#101621] text-slate-100">
        <CardHeader className="p-7 sm:p-9">
          <CardTitle className="text-2xl font-semibold">
            First, tell us a little about you
          </CardTitle>
          <CardDescription className="text-slate-400">
            {user
              ? `Connected as ${user.email}. Your assessment will be saved to your account.`
              : "Your assessment results will be saved. Sign in anytime to link them to your profile."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 p-7 pt-0 sm:p-9 sm:pt-0">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-slate-300">
              What should we call you?{" "}
              <span className="text-slate-500">(optional)</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={user?.name || "Your name"}
              className="border-white/10 bg-[#0b111b] text-white placeholder:text-slate-500"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-2 text-xs text-lime-300">
              <UserCheck className="size-4 shrink-0" />
              Logged in as {user.email} (results will be saved to your dashboard)
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
              <span>Want to sync results across devices?</span>
              <a href="/auth" className="text-lime-300 hover:underline">
                Sign in
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      <ChoiceCard
        title="Which skills have you touched?"
        description="Choose all that feel familiar, even if you are still learning."
        options={skillOptions}
        values={skills}
        onToggle={(value) => toggle(value, skills, setSkills)}
      />

      <ChoiceCard
        title="What kind of work sounds energising?"
        description="There are no wrong answers. Pick the problems you would enjoy exploring."
        options={interestOptions}
        values={interests}
        onToggle={(value) => toggle(value, interests, setInterests)}
      />

      <Button
        type="submit"
        disabled={saving || (!skills.length && !interests.length)}
        className="h-12 w-full bg-lime-300 text-base font-semibold text-slate-950 hover:bg-lime-200 sm:w-fit sm:self-end"
      >
        {saving ? (
          <>
            <Loader2 className="mr-2 size-5 animate-spin" />
            Analyzing & saving...
          </>
        ) : (
          <>
            Find my strongest routes <Sparkles className="ml-2 size-4" />
          </>
        )}
      </Button>
    </form>
  );
}

function ChoiceCard({
  title,
  description,
  options,
  values,
  onToggle,
}: {
  title: string;
  description: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <Card className="border-white/10 bg-[#101621] text-slate-100">
      <CardHeader className="p-7 pb-5 sm:p-9 sm:pb-5">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-slate-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 p-7 pt-0 sm:grid-cols-2 sm:p-9 sm:pt-0">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0b111b] p-4 text-sm text-slate-300 transition hover:border-lime-300/40 has-[:checked]:border-lime-300/50 has-[:checked]:bg-lime-300/10 has-[:checked]:text-white"
          >
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => onToggle(option)}
              className="size-4 accent-lime-300"
            />
            {option}
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
