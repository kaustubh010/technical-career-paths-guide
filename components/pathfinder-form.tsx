"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  RotateCcw,
  Sparkles,
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
import { Separator } from "@/components/ui/separator";

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
    match: ["JavaScript / TypeScript", "HTML & CSS", "Design & prototyping"],
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
];

export function PathfinderForm() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

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
      .sort((a, b) => b.score - a.score)[0];
  }, [skills, interests]);

  if (submitted)
    return (
      <Card className="border-lime-300/20 bg-[#101621] text-slate-100 shadow-2xl shadow-lime-300/5">
        <CardHeader className="p-7 sm:p-10">
          <Badge className="w-fit border-lime-300/20 bg-lime-300/10 text-lime-200">
            <Sparkles data-icon="inline-start" />
            Route found
          </Badge>
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
              Why it fits
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.match
                .filter((value) => [...skills, ...interests].includes(value))
                .map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="bg-white/10 text-slate-200"
                  >
                    {value}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="bg-lime-300 text-slate-950 hover:bg-lime-200"
            >
              <a href={`/resources/${result.id}`}>
                Explore this path <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
            >
              <RotateCcw data-icon="inline-start" />
              Retake assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-8"
    >
      <Card className="border-white/10 bg-[#101621] text-slate-100">
        <CardHeader className="p-7 sm:p-9">
          <CardTitle className="text-2xl">
            First, tell us a little about you
          </CardTitle>
          <CardDescription className="text-slate-400">
            Your answers stay in this browser for now. Account syncing comes
            later.
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
              placeholder="Your name"
              className="border-white/10 bg-[#0b111b] text-white"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <LockKeyhole data-icon="inline-start" />
            Sign in to save your assessment and revisit it later.
          </div>
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
        disabled={!skills.length && !interests.length}
        className="h-12 w-full bg-lime-300 text-base font-semibold text-slate-950 hover:bg-lime-200 sm:w-fit sm:self-end"
      >
        Find my strongest routes <Sparkles data-icon="inline-end" />
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
        <CardTitle className="text-xl">{title}</CardTitle>
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
