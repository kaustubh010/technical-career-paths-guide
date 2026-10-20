"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  ChevronRight,
  CircuitBoard,
  Code2,
  Database,
  Eye,
  GitBranch,
  LockKeyhole,
  Network,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  TestTube2,
  UserRound,
  Workflow,
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Career = {
  id: string;
  title: string;
  family: string;
  eyebrow: string;
  description: string;
  work: string[];
  skills: string[];
  tools: string[];
  icon: typeof Code2;
  accent: string;
  level: string;
};

const careers: Career[] = [
  {
    id: "frontend",
    title: "Frontend Engineer",
    family: "Software engineering",
    eyebrow: "Build the interface",
    description:
      "Turn product ideas and designs into fast, accessible interfaces that people use every day.",
    work: [
      "Build reusable UI with React, Vue, or another component framework",
      "Translate designs into responsive, accessible pages",
      "Manage client-side state, performance, and browser behavior",
      "Collaborate with designers and backend engineers",
    ],
    skills: [
      "HTML, CSS, and JavaScript",
      "React and TypeScript",
      "Responsive design and accessibility",
      "Testing with Vitest or Playwright",
      "Git, APIs, and browser DevTools",
    ],
    tools: ["React", "TypeScript", "Next.js", "CSS"],
    icon: Braces,
    accent: "bg-sky-100 text-sky-700",
    level: "Common entry point",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    family: "Software engineering",
    eyebrow: "Power the product",
    description:
      "Design the services, APIs, and data systems that make applications reliable and useful.",
    work: [
      "Design APIs and business logic",
      "Model data and write efficient database queries",
      "Build authentication, authorization, and integrations",
      "Monitor reliability, latency, and operational health",
    ],
    skills: [
      "One server-side language",
      "HTTP, REST, and API design",
      "SQL and data modeling",
      "Testing and observability",
      "Security fundamentals",
    ],
    tools: ["Node.js", "Python", "PostgreSQL", "Docker"],
    icon: Server,
    accent: "bg-indigo-100 text-indigo-700",
    level: "Strong fundamentals",
  },
  {
    id: "fullstack",
    title: "Full-stack Engineer",
    family: "Software engineering",
    eyebrow: "Connect the whole system",
    description:
      "Work across the frontend and backend to ship complete product features from interface to database.",
    work: [
      "Own a feature across UI, API, and persistence layers",
      "Make trade-offs between user experience and system design",
      "Create end-to-end tests and debug across the stack",
      "Work closely with product, design, and platform teams",
    ],
    skills: [
      "Strong JavaScript or TypeScript",
      "A frontend and backend framework",
      "Relational databases",
      "Deployment and cloud basics",
      "Product thinking and debugging",
    ],
    tools: ["Next.js", "TypeScript", "SQL", "Git"],
    icon: Workflow,
    accent: "bg-violet-100 text-violet-700",
    level: "Broad skill set",
  },
  {
    id: "devops",
    title: "DevOps / Platform Engineer",
    family: "Software engineering",
    eyebrow: "Make shipping boring",
    description:
      "Build the tooling and infrastructure that helps teams release software safely and consistently.",
    work: [
      "Automate build, test, and deployment pipelines",
      "Provision and maintain cloud infrastructure",
      "Improve reliability, observability, and incident response",
      "Set guardrails for security and developer productivity",
    ],
    skills: [
      "Linux and networking",
      "Cloud platforms and containers",
      "CI/CD and infrastructure as code",
      "Monitoring and incident response",
      "Scripting and automation",
    ],
    tools: ["AWS", "Docker", "Kubernetes", "Terraform"],
    icon: GitBranch,
    accent: "bg-amber-100 text-amber-700",
    level: "Systems minded",
  },
  {
    id: "qa",
    title: "Test / QA Engineer",
    family: "Quality engineering",
    eyebrow: "Protect the experience",
    description:
      "Find risk before users do by designing reliable ways to validate software behavior and quality.",
    work: [
      "Create test plans from requirements and user journeys",
      "Automate regression and end-to-end checks",
      "Investigate failures and communicate actionable bugs",
      "Partner with engineers to improve testability",
    ],
    skills: [
      "Testing strategy and test design",
      "A programming language",
      "API and UI automation",
      "CI pipelines and defect tracking",
      "Exploratory and performance testing",
    ],
    tools: ["Playwright", "Selenium", "Postman", "Jira"],
    icon: TestTube2,
    accent: "bg-rose-100 text-rose-700",
    level: "Detail oriented",
  },
  {
    id: "aiml",
    title: "AI / ML Engineer",
    family: "Data & intelligence",
    eyebrow: "Turn data into decisions",
    description:
      "Build, evaluate, and operate machine-learning systems that solve specific business or scientific problems.",
    work: [
      "Prepare data and select appropriate modeling approaches",
      "Train, evaluate, and improve models",
      "Build inference pipelines and integrate models into products",
      "Track drift, fairness, cost, and model quality in production",
    ],
    skills: [
      "Python and statistics",
      "Linear algebra and probability",
      "Supervised and unsupervised learning",
      "Model evaluation and experimentation",
      "Data pipelines and ML deployment",
    ],
    tools: ["Python", "PyTorch", "scikit-learn", "MLflow"],
    icon: Bot,
    accent: "bg-fuchsia-100 text-fuchsia-700",
    level: "Math + engineering",
  },
  {
    id: "data",
    title: "Data Analyst",
    family: "Data & intelligence",
    eyebrow: "Explain what is happening",
    description:
      "Use data to answer practical questions, reveal patterns, and help teams make better decisions.",
    work: [
      "Define metrics and gather trustworthy data",
      "Clean, query, and analyze datasets",
      "Build dashboards and communicate findings",
      "Translate business questions into measurable analysis",
    ],
    skills: [
      "SQL and spreadsheets",
      "Descriptive statistics",
      "Data visualization",
      "Clear written and verbal communication",
      "Experiment and metric fundamentals",
    ],
    tools: ["SQL", "Python", "Tableau", "Excel"],
    icon: Search,
    accent: "bg-emerald-100 text-emerald-700",
    level: "Insight focused",
  },
  {
    id: "uiux",
    title: "UI / UX Designer",
    family: "Product & design",
    eyebrow: "Make complexity feel simple",
    description:
      "Understand user needs and shape intuitive, useful experiences through research, flows, and visual systems.",
    work: [
      "Research users and frame the right problem",
      "Map journeys, flows, and interaction patterns",
      "Create wireframes, prototypes, and visual designs",
      "Test concepts and iterate with product teams",
    ],
    skills: [
      "User research and usability testing",
      "Information architecture",
      "Interaction and visual design",
      "Prototyping and design systems",
      "Communication and critique",
    ],
    tools: ["Figma", "FigJam", "Prototyping", "Research"],
    icon: Eye,
    accent: "bg-pink-100 text-pink-700",
    level: "People centered",
  },
  {
    id: "cyber",
    title: "Cybersecurity Engineer",
    family: "Security & infrastructure",
    eyebrow: "Reduce digital risk",
    description:
      "Protect systems, networks, and data by finding weaknesses and building practical security controls.",
    work: [
      "Monitor systems and investigate suspicious activity",
      "Assess vulnerabilities and recommend mitigations",
      "Build secure configurations and access controls",
      "Support incident response and security education",
    ],
    skills: [
      "Networking and operating systems",
      "Security principles and threat modeling",
      "Scripting and automation",
      "Identity, access, and encryption",
      "Log analysis and incident response",
    ],
    tools: ["Linux", "SIEM", "Python", "Cloud IAM"],
    icon: ShieldCheck,
    accent: "bg-cyan-100 text-cyan-700",
    level: "Adversarial thinking",
  },
  {
    id: "embedded",
    title: "Embedded Engineer",
    family: "Hardware & systems",
    eyebrow: "Make hardware think",
    description:
      "Write software that runs close to the hardware in devices, appliances, vehicles, and connected products.",
    work: [
      "Develop firmware for microcontrollers and embedded systems",
      "Work with sensors, buses, and hardware interfaces",
      "Optimize for memory, timing, power, and reliability",
      "Debug with hardware tools and collaborate with electrical engineers",
    ],
    skills: [
      "C or C++",
      "Digital logic and microcontrollers",
      "Data sheets and hardware interfaces",
      "Real-time systems",
      "Debugging and version control",
    ],
    tools: ["C/C++", "ARM", "RTOS", "JTAG"],
    icon: CircuitBoard,
    accent: "bg-orange-100 text-orange-700",
    level: "Hardware curious",
  },
  {
    id: "cloud",
    title: "Cloud / Solutions Engineer",
    family: "Infrastructure & platforms",
    eyebrow: "Design for scale",
    description:
      "Help teams choose and connect cloud services to build secure, scalable, and maintainable systems.",
    work: [
      "Translate requirements into cloud architectures",
      "Design for availability, cost, and security",
      "Implement migrations and integrations",
      "Document systems and guide technical decisions",
    ],
    skills: [
      "Networking and distributed systems",
      "Cloud architecture patterns",
      "Infrastructure as code",
      "Security and cost management",
      "Technical communication",
    ],
    tools: ["AWS", "Azure", "Terraform", "Kubernetes"],
    icon: Network,
    accent: "bg-lime-100 text-lime-700",
    level: "Architecture minded",
  },
  {
    id: "systems",
    title: "Systems / Network Engineer",
    family: "Infrastructure & platforms",
    eyebrow: "Keep systems connected",
    description:
      "Operate the foundational networks and computing environments that organizations depend on.",
    work: [
      "Configure and maintain networks, servers, and services",
      "Manage identity, backups, patching, and capacity",
      "Troubleshoot outages and performance issues",
      "Automate repetitive operations and document runbooks",
    ],
    skills: [
      "TCP/IP and networking",
      "Linux or Windows administration",
      "DNS, HTTP, and virtualization",
      "Monitoring and troubleshooting",
      "Automation with Python or shell",
    ],
    tools: ["Linux", "TCP/IP", "Bash", "VMware"],
    icon: Database,
    accent: "bg-teal-100 text-teal-700",
    level: "Foundational role",
  },
];

export function CareerExplorer() {
  const [selectedId, setSelectedId] = useState("frontend");
  const [query, setQuery] = useState("");
  const selected =
    careers.find((career) => career.id === selectedId) ?? careers[0];
  const filteredCareers = useMemo(
    () =>
      careers.filter((career) =>
        `${career.title} ${career.family} ${career.description}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const SelectedIcon = selected.icon;

  return (
    <div className="dark min-h-screen bg-[#080b12] text-slate-100">
      <header className="border-b border-white/10 bg-[#0b111b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label="Pathfinder home"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-lime-300 shadow-sm">
              <Sparkles aria-hidden="true" />
            </span>
            <span className="font-mono text-sm font-bold tracking-tight">
              PATHFINDER<span className="text-lime-600">_</span>
            </span>
          </a>
          <nav className="flex items-center gap-3 text-xs sm:gap-5 sm:text-sm">
            <a
              href="/resources/frontend"
              className="text-slate-400 transition hover:text-lime-300"
            >
              Resources
            </a>
            <a
              href="/auth"
              className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1.5 font-semibold text-lime-200 transition hover:bg-lime-300/20"
            >
              Sign in
            </a>
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400 sm:inline">
              2026 edition
            </span>
          </nav>
        </div>
      </header>

      <main
        id="top"
        className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8 lg:pt-20"
      >
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-xl shadow-slate-950/10 sm:px-10 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-lime-300/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/3 size-64 rounded-full bg-violet-400/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <Badge className="mb-6 border-lime-300/30 bg-lime-300/10 text-lime-200 hover:bg-lime-300/10">
              <span className="mr-2 size-1.5 rounded-full bg-lime-300" />
              Explore before you specialize
            </Badge>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Your engineering degree has{" "}
              <span className="text-lime-300">more than one route.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              A practical map of the technical careers you can build toward —
              what the work looks like, where your skills fit, and what to learn
              next.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Check className="text-lime-300" data-icon="inline-start" />
                12 paths
              </span>
              <span className="flex items-center gap-2">
                <Check className="text-lime-300" data-icon="inline-start" />
                Real-world skills
              </span>
              <span className="flex items-center gap-2">
                <Check className="text-lime-300" data-icon="inline-start" />
                No gatekeeping
              </span>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-lime-700">
                  01 / Pick a direction
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Technical paths
                </h2>
              </div>
              <span className="font-mono text-xs text-slate-400">
                {filteredCareers.length.toString().padStart(2, "0")} available
              </span>
            </div>
            <div className="relative mb-5">
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                aria-label="Search career paths"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search paths or skills..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none ring-offset-2 transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-300/40"
              />
            </div>
            <div
              className="flex flex-col gap-3"
              role="listbox"
              aria-label="Technical career paths"
            >
              {filteredCareers.map((career, index) => {
                const Icon = career.icon;
                return (
                  <button
                    key={career.id}
                    type="button"
                    onClick={() => setSelectedId(career.id)}
                    aria-selected={selected.id === career.id}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all",
                      selected.id === career.id
                        ? "border-lime-300/40 bg-[#17221d] text-white shadow-lg shadow-lime-300/10"
                        : "border-white/10 bg-[#101621] hover:-translate-y-0.5 hover:border-lime-300/30 hover:bg-[#141d29] hover:shadow-md",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl",
                        selected.id === career.id
                          ? "bg-lime-300 text-slate-950"
                          : career.accent,
                      )}
                    >
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate font-semibold">
                          {career.title}
                        </span>
                        {index < 4 && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "hidden text-[10px] sm:inline-flex",
                              selected.id === career.id &&
                                "bg-white/10 text-slate-200",
                            )}
                          >
                            {career.family.split(" ")[0]}
                          </Badge>
                        )}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-xs",
                          selected.id === career.id
                            ? "text-slate-400"
                            : "text-slate-500",
                        )}
                      >
                        {career.eyebrow}
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "shrink-0 transition-transform group-hover:translate-x-0.5",
                        selected.id === career.id
                          ? "text-lime-300"
                          : "text-slate-300",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <Card className="overflow-hidden rounded-[1.75rem] border-white/10 bg-[#101621] text-slate-100 shadow-xl shadow-black/20">
            <CardHeader className="border-b border-white/10 bg-gradient-to-br from-[#15211c] to-[#101621] p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "flex size-14 items-center justify-center rounded-2xl",
                    selected.accent,
                  )}
                >
                  <SelectedIcon aria-hidden="true" />
                </span>
                <Badge
                  variant="outline"
                  className="rounded-full border-slate-200 text-slate-500"
                >
                  {selected.level}
                </Badge>
              </div>
              <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
                {selected.family}
              </p>
              <CardTitle className="mt-2 text-3xl tracking-[-0.03em] sm:text-4xl">
                {selected.title}
              </CardTitle>
              <CardDescription className="max-w-2xl pt-2 text-base leading-7 text-slate-300">
                {selected.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-7 sm:p-9">
              <div className="grid gap-9 md:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <span className="flex size-6 items-center justify-center rounded-full bg-lime-100 font-mono text-xs text-lime-800">
                      A
                    </span>
                    What you will do
                  </h3>
                  <ul className="mt-5 flex flex-col gap-4">
                    {selected.work.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-7 text-slate-300"
                      >
                        <Check
                          className="mt-0.5 shrink-0 text-lime-600"
                          data-icon="inline-start"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <span className="flex size-6 items-center justify-center rounded-full bg-violet-100 font-mono text-xs text-violet-800">
                      B
                    </span>
                    Skills to build
                  </h3>
                  <ul className="mt-5 flex flex-col gap-4">
                    {selected.skills.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-7 text-slate-300"
                      >
                        <ArrowRight
                          className="mt-1 shrink-0 text-violet-500"
                          data-icon="inline-start"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Separator className="my-9" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    A useful toolkit
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="secondary"
                        className="rounded-md bg-slate-100 px-3 py-1 text-slate-700"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  asChild
                  className="shrink-0 rounded-full bg-slate-950 text-white hover:bg-slate-800"
                >
                  <a href={`/resources/${selected.id}`}>
                    Start learning <ArrowRight data-icon="inline-end" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section
          id="start"
          className="mt-14 rounded-[1.75rem] border border-lime-300/20 bg-gradient-to-br from-[#17221d] to-[#101621] p-7 text-slate-100 shadow-xl shadow-lime-300/5 sm:p-9"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-slate-950">
                <UserRound aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Not sure where to start?
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                  Answer two quick questions and Pathfinder will suggest the
                  strongest route for your current skills and interests.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-lime-300 text-slate-950 hover:bg-lime-200"
              >
                <a href="/pathfinder">
                  Find my path <Sparkles data-icon="inline-end" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
                onClick={() => {
                  setSelectedId("frontend");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Reset explorer <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200/80 px-5 py-8 text-center text-xs text-slate-400">
        Pathfinder is an educational overview. Role scope varies by company,
        team, and seniority.
      </footer>
    </div>
  );
}
