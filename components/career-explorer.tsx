"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ArrowRight,
  Activity,
  Bot,
  Braces,
  BriefcaseBusiness,
  Check,
  CircuitBoard,
  Code2,
  Database,
  Eye,
  FileText,
  GitBranch,
  Network,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  TestTube2,
  UserRound,
  UsersRound,
  Workflow,
  X,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  LogIn,
  LogOut,
  User as UserIcon,
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
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export type Career = {
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

export const careers: Career[] = [
  {
    id: "frontend",
    title: "Frontend Engineer",
    family: "Software engineering",
    eyebrow: "Build the interface",
    description:
      "Turn product ideas and designs into fast, accessible interfaces that people use every day.",
    work: [
      "Build reusable UI with React, Vue, or modern component frameworks",
      "Translate Figma designs into responsive, accessible pages",
      "Manage client-side state, performance, and browser rendering behavior",
      "Collaborate closely with product designers and backend engineers",
    ],
    skills: [
      "HTML, CSS, and modern JavaScript",
      "React, Next.js, and TypeScript",
      "Responsive layout and accessibility (WCAG)",
      "Testing with Vitest or Playwright",
      "Git, REST/GraphQL APIs, and browser DevTools",
    ],
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    icon: Braces,
    accent: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    level: "Common entry point",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    family: "Software engineering",
    eyebrow: "Power the product",
    description:
      "Design the services, APIs, and data systems that make applications reliable, fast, and scalable.",
    work: [
      "Design and maintain scalable REST & GraphQL APIs and microservices",
      "Model relational data and optimize database queries",
      "Implement robust authentication, authorization, and 3rd-party integrations",
      "Monitor system reliability, latency, and operational health",
    ],
    skills: [
      "Server languages (Node.js, Go, Python, or Java)",
      "HTTP, REST, and distributed API design",
      "SQL data modeling and indexing",
      "Testing, caching, and observability",
      "Security best practices and encryption",
    ],
    tools: ["Node.js", "Python", "PostgreSQL", "Docker", "Redis"],
    icon: Server,
    accent: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    level: "Strong fundamentals",
  },
  {
    id: "fullstack",
    title: "Full-stack Engineer",
    family: "Software engineering",
    eyebrow: "Connect the whole system",
    description:
      "Work across frontend, backend, and cloud to ship complete product features end-to-end.",
    work: [
      "Own product features across UI, API, and database persistence layers",
      "Make architectural trade-offs between UX and system complexity",
      "Create end-to-end integration tests and debug across the stack",
      "Coordinate with product, design, and operations teams",
    ],
    skills: [
      "TypeScript, modern JavaScript, and React",
      "Backend frameworks and relational/NoSQL databases",
      "API design and state synchronization",
      "Deployment, containers, and serverless architectures",
      "Product-minded problem solving",
    ],
    tools: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Prisma"],
    icon: Workflow,
    accent: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    level: "Broad skill set",
  },
  {
    id: "devops",
    title: "DevOps / Platform Engineer",
    family: "Software engineering",
    eyebrow: "Make shipping boring",
    description:
      "Build the tooling and infrastructure that helps engineering teams release software safely and predictably.",
    work: [
      "Automate build, test, and zero-downtime deployment pipelines",
      "Provision and maintain cloud infrastructure via Infrastructure as Code",
      "Improve system reliability, metrics, alerting, and incident response",
      "Establish security guardrails and developer productivity tools",
    ],
    skills: [
      "Linux system administration and networking",
      "Cloud platforms (AWS/GCP/Azure) and containers",
      "CI/CD workflows and Terraform / OpenTofu",
      "Prometheus, Grafana, and distributed tracing",
      "Automation scripting with Bash and Python",
    ],
    tools: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    icon: GitBranch,
    accent: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    level: "Systems minded",
  },
  {
    id: "qa",
    title: "Test / QA Engineer",
    family: "Quality engineering",
    eyebrow: "Protect the experience",
    description:
      "Find risk before users do by designing reliable ways to validate software behavior, performance, and quality.",
    work: [
      "Create comprehensive test plans from product specs and edge cases",
      "Develop automated end-to-end and regression test suites",
      "Investigate bugs, isolate root causes, and log clear reproductions",
      "Partner with developers to build testable, maintainable systems",
    ],
    skills: [
      "Testing strategies, test matrix design, and exploratory testing",
      "Automation scripting (TypeScript, Python)",
      "UI and API automation frameworks",
      "CI integration and defect tracking",
      "Load and performance testing fundamentals",
    ],
    tools: ["Playwright", "Cypress", "Postman", "Jest", "k6"],
    icon: TestTube2,
    accent: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    level: "Detail oriented",
  },
  {
    id: "aiml",
    title: "AI / ML Engineer",
    family: "Data & intelligence",
    eyebrow: "Build intelligent systems",
    description:
      "Design, fine-tune, and deploy machine learning models and LLM systems into production products.",
    work: [
      "Prepare datasets, pipelines, and evaluation benchmarks",
      "Train, fine-tune, and evaluate deep learning and statistical models",
      "Build RAG systems, agent pipelines, and embedding search flows",
      "Optimize model inference latency, quantization, and deployment",
    ],
    skills: [
      "Python, NumPy, Pandas, and statistics",
      "Linear algebra and probability",
      "PyTorch, Transformers, and LLM orchestration",
      "Model evaluation, fine-tuning, and vector databases",
      "MLOps and containerized model serving",
    ],
    tools: ["Python", "PyTorch", "Hugging Face", "LangChain", "FastAPI"],
    icon: Bot,
    accent: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    level: "Math + engineering",
  },
  {
    id: "data",
    title: "Data Analyst / Engineer",
    family: "Data & intelligence",
    eyebrow: "Explain what is happening",
    description:
      "Turn raw event streams and databases into trustworthy metrics, clear dashboards, and actionable insights.",
    work: [
      "Define business metrics and model analytical data schemas",
      "Clean, transform, and orchestrate automated data pipelines",
      "Build interactive dashboards and present findings to leadership",
      "Translate ambiguous questions into rigorous quantitative queries",
    ],
    skills: [
      "Advanced SQL and query optimization",
      "Python data manipulation and pandas",
      "Data visualization and business intelligence",
      "Statistical hypothesis testing and experimentation",
      "Data pipeline orchestrators (dbt, Airflow)",
    ],
    tools: ["SQL", "Python", "Tableau", "dbt", "Snowflake"],
    icon: Search,
    accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    level: "Insight focused",
  },
  {
    id: "uiux",
    title: "UI / UX Designer",
    family: "Product & design",
    eyebrow: "Make complexity feel simple",
    description:
      "Understand user needs and shape intuitive, beautiful digital products through research, flows, and design systems.",
    work: [
      "Conduct user interviews, surveys, and usability testing",
      "Map user journeys, wireframes, and information architecture",
      "Build cohesive design systems and pixel-perfect interactive prototypes",
      "Partner with engineers to ensure design fidelity in code",
    ],
    skills: [
      "User research and usability testing",
      "Interaction design and information architecture",
      "Design systems and token management",
      "High-fidelity prototyping in Figma",
      "Design-to-code collaboration",
    ],
    tools: ["Figma", "FigJam", "Framer", "Design Systems"],
    icon: Eye,
    accent: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    level: "People centered",
  },
  {
    id: "cyber",
    title: "Cybersecurity Engineer",
    family: "Security & infrastructure",
    eyebrow: "Reduce digital risk",
    description:
      "Protect infrastructure, networks, and data by uncovering vulnerabilities and building defensive controls.",
    work: [
      "Monitor security telemetry and investigate suspicious activity",
      "Conduct vulnerability assessments, penetration tests, and threat modeling",
      "Implement identity management, zero-trust network access, and encryption",
      "Collaborate on incident response and compliance verification",
    ],
    skills: [
      "Networking protocols, firewalls, and operating systems",
      "Threat modeling, OWASP, and adversarial thinking",
      "Security automation and scripting (Python, Bash)",
      "Identity, IAM, and public key cryptography",
      "Log analysis (SIEM) and incident triage",
    ],
    tools: ["Linux", "Wireshark", "Burp Suite", "Python", "Cloud IAM"],
    icon: ShieldCheck,
    accent: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    level: "Adversarial thinking",
  },
  {
    id: "embedded",
    title: "Embedded Systems Engineer",
    family: "Hardware & systems",
    eyebrow: "Make hardware think",
    description:
      "Write low-level firmware that runs directly on microcontrollers, IoT devices, automotive systems, and robotics.",
    work: [
      "Develop firmware for ARM, ESP32, and custom microcontrollers",
      "Interface with sensors, actuators, and communication buses (I2C, SPI, CAN)",
      "Optimize memory footprints, power consumption, and deterministic timing",
      "Debug with logic analyzers, oscilloscopes, and JTAG hardware debuggers",
    ],
    skills: [
      "C and Modern C++ for resource-constrained systems",
      "Microcontroller architectures and peripheral configuration",
      "Real-Time Operating Systems (FreeRTOS, Zephyr)",
      "Reading hardware datasheets and circuit schematics",
      "Low-level debugging and safety critical practices",
    ],
    tools: ["C/C++", "FreeRTOS", "ARM Cortex", "JTAG", "PlatformIO"],
    icon: CircuitBoard,
    accent: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    level: "Hardware curious",
  },
  {
    id: "cloud",
    title: "Cloud Solutions Architect",
    family: "Infrastructure & platforms",
    eyebrow: "Design for global scale",
    description:
      "Architect and orchestrate resilient, secure, and cost-efficient cloud environments for enterprise applications.",
    work: [
      "Translate business and latency requirements into cloud system architectures",
      "Design multi-region high availability and disaster recovery plans",
      "Optimize cloud spending, networking topologies, and security policies",
      "Guide development teams on best practices for cloud-native patterns",
    ],
    skills: [
      "Cloud architecture design (AWS, Azure, or GCP)",
      "Distributed systems and event-driven patterns",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Cloud security posture, compliance, and cost modeling",
      "Technical diagrams and executive communication",
    ],
    tools: ["AWS", "Azure", "Terraform", "Kubernetes", "Cloudflare"],
    icon: Network,
    accent: "bg-lime-500/10 text-lime-400 border-lime-500/20",
    level: "Architecture minded",
  },
  {
    id: "systems",
    title: "Systems & Network Engineer",
    family: "Infrastructure & platforms",
    eyebrow: "Keep systems connected",
    description:
      "Operate and secure the underlying server fleets, storage arrays, and network backbones that companies rely on.",
    work: [
      "Configure and tune enterprise Linux/Unix servers and virtual machines",
      "Manage routing, switching, DNS, VPNs, and firewall rules",
      "Implement backup strategies, high availability, and automated patching",
      "Triage hardware failures, packet loss, and kernel-level performance bottlenecks",
    ],
    skills: [
      "TCP/IP, BGP, VLANs, and software-defined networking",
      "Linux kernel tuning and storage subsystems (ZFS, Ceph)",
      "DNS, DHCP, TLS/SSL certificate lifecycle",
      "Monitoring with Nagios, Prometheus, and SNMP",
      "Scripting in Bash and Python for sysadmin automation",
    ],
    tools: ["Linux", "TCP/IP", "Bash", "VMware", "Ansible"],
    icon: Database,
    accent: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    level: "Foundational role",
  },
  {
    id: "sre",
    title: "Site Reliability Engineer",
    family: "Infrastructure & platforms",
    eyebrow: "Engineer for reliability",
    description:
      "Keep critical services dependable by combining software engineering, operations, and observability at scale.",
    work: [
      "Define service level objectives and error budgets with product teams",
      "Automate repetitive operational work and improve deployment safety",
      "Design monitoring, alerting, and incident response practices",
      "Lead post-incident reviews and turn failures into lasting improvements",
    ],
    skills: [
      "Linux, networking, and distributed systems",
      "Service level indicators, SLOs, and incident management",
      "Observability with metrics, logs, and traces",
      "Automation with Go, Python, or Bash",
      "Cloud platforms, Kubernetes, and infrastructure as code",
    ],
    tools: ["Kubernetes", "Prometheus", "Grafana", "Terraform", "Go"],
    icon: Activity,
    accent: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    level: "Reliability focused",
  },
  {
    id: "it-consultant",
    title: "IT Consultant",
    family: "Product & design",
    eyebrow: "Turn technology into outcomes",
    description:
      "Help organizations choose, implement, and improve technology systems that solve real business problems.",
    work: [
      "Discover business needs through stakeholder interviews and workshops",
      "Evaluate platforms, vendors, and architectures against clear requirements",
      "Plan technology migrations and guide implementation teams",
      "Communicate trade-offs, timelines, risks, and recommendations to clients",
    ],
    skills: [
      "Requirements discovery and stakeholder management",
      "Business process analysis and technical documentation",
      "Cloud, SaaS, and enterprise systems fundamentals",
      "Project planning, estimation, and risk management",
      "Clear presentations and client communication",
    ],
    tools: ["Azure", "AWS", "Jira", "Miro", "SQL"],
    icon: BriefcaseBusiness,
    accent: "bg-purple-500/10 text-purple-700 border-purple-500/20",
    level: "Business + technology",
  },
  {
    id: "product-manager",
    title: "Technical Product Manager",
    family: "Product & design",
    eyebrow: "Choose what to build next",
    description:
      "Connect customer needs, business goals, and engineering constraints to guide products from idea to impact.",
    work: [
      "Research customer problems and define measurable product outcomes",
      "Prioritize roadmaps using evidence, constraints, and expected value",
      "Write clear requirements and align design and engineering teams",
      "Measure launches, learn from feedback, and iterate the product",
    ],
    skills: [
      "Product discovery, strategy, and roadmap planning",
      "User stories, acceptance criteria, and prioritization",
      "Analytics, experimentation, and outcome measurement",
      "Technical architecture and API literacy",
      "Cross-functional communication and facilitation",
    ],
    tools: ["Jira", "Notion", "Figma", "Amplitude", "SQL"],
    icon: UsersRound,
    accent: "bg-rose-500/10 text-rose-700 border-rose-500/20",
    level: "Customer + systems",
  },
  {
    id: "technical-writer",
    title: "Technical Writer",
    family: "Product & design",
    eyebrow: "Make technology understandable",
    description:
      "Create documentation and learning experiences that help developers and users successfully adopt technical products.",
    work: [
      "Write API references, tutorials, guides, and architecture documentation",
      "Interview subject matter experts and validate technical accuracy",
      "Build documentation sites with versioning, search, and navigation",
      "Use feedback and analytics to continuously improve content",
    ],
    skills: [
      "Structured writing, editing, and information architecture",
      "API concepts, Markdown, Git, and documentation workflows",
      "Basic programming and command-line literacy",
      "Developer experience and user-focused research",
      "Content design, accessibility, and localization awareness",
    ],
    tools: ["Markdown", "Git", "Docusaurus", "OpenAPI", "VS Code"],
    icon: FileText,
    accent: "bg-sky-500/10 text-sky-700 border-sky-500/20",
    level: "Communication focused",
  },
];

const categories = [
  "All Paths",
  "Software engineering",
  "Data & intelligence",
  "Security & infrastructure",
  "Hardware & systems",
  "Product & design",
  "Quality engineering",
];

export function CareerExplorer() {
  const [modalCareer, setModalCareer] = useState<Career | null>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Paths");
  const [savedPathIds, setSavedPathIds] = useState<string[]>([]);
  const [savingPathId, setSavingPathId] = useState<string | null>(null);

  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Load saved paths if user is logged in
  useEffect(() => {
    if (!user) {
      setSavedPathIds([]);
      return;
    }

    const loadSaved = async () => {
      try {
        const res = await fetch("/api/saved-paths");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.savedPaths)) {
            setSavedPathIds(data.savedPaths.map((p: any) => p.pathId));
          }
        }
      } catch (err) {
        console.error("Failed to load saved paths", err);
      }
    };

    loadSaved();
  }, [user]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalCareer(null);
      }
    };
    if (modalCareer) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalCareer]);

  const toggleSavePath = async (pathId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please create an account or sign in to save your career paths.",
      });
      return;
    }

    setSavingPathId(pathId);
    const isSaved = savedPathIds.includes(pathId);

    try {
      if (isSaved) {
        const res = await fetch(`/api/saved-paths?pathId=${pathId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setSavedPathIds((prev) => prev.filter((id) => id !== pathId));
          toast({
            title: "Path removed",
            description: "Career path has been removed from your saved list.",
          });
        }
      } else {
        const res = await fetch("/api/saved-paths", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pathId, status: "exploring" }),
        });
        if (res.ok) {
          setSavedPathIds((prev) => [...prev, pathId]);
          toast({
            title: "Path saved!",
            description: "This career path is bookmarked to your account.",
            variant: "success",
          });
        }
      }
    } catch (err) {
      toast({
        title: "Action failed",
        description: "Could not update saved paths. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingPathId(null);
    }
  };

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesCategory =
        selectedCategory === "All Paths" ||
        career.family.toLowerCase() === selectedCategory.toLowerCase();

      const searchText =
        `${career.title} ${career.family} ${career.eyebrow} ${career.description} ${career.tools.join(" ")}`.toLowerCase();
      const matchesQuery = searchText.includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <div className="pathfinder-light min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080b12]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="Pathfinder home"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-lime-300 text-slate-950 shadow-md shadow-lime-300/20">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <span className="font-mono text-sm font-bold tracking-tight">
              PATHFINDER<span className="text-lime-400">_</span>
            </span>
          </a>

          <nav className="flex items-center gap-4 text-xs sm:gap-6 sm:text-sm">
            <a
              href="#paths"
              className="text-slate-300 transition hover:text-lime-300"
            >
              Career Paths
            </a>
            <a
              href="/pathfinder"
              className="text-slate-300 transition hover:text-lime-300"
            >
              Take Quiz
            </a>
            <a
              href="/resources/frontend"
              className="text-slate-300 transition hover:text-lime-300"
            >
              Resources
            </a>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden items-center gap-2 rounded-full border border-lime-400/20 bg-lime-300/10 px-3 py-1 font-mono text-xs text-lime-300 sm:inline-flex">
                  <UserIcon className="size-3" />
                  {user.name || user.email.split("@")[0]}
                </span>
                <button
                  onClick={() => logout()}
                  title="Sign out"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <a
                href="/auth"
                className="flex items-center gap-1.5 rounded-full border border-lime-300/40 bg-lime-300/10 px-4 py-1.5 font-semibold text-lime-200 transition hover:bg-lime-300/20"
              >
                <LogIn className="size-4" />
                Sign in
              </a>
            )}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl px-5 pb-24 pt-10 lg:px-8 lg:pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-slate-950/40 sm:px-10 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 size-96 rounded-full bg-lime-400/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 size-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <Badge className="mb-5 border-lime-300/30 bg-lime-300/10 text-lime-200 hover:bg-lime-300/15">
              <span className="mr-2 size-2 rounded-full bg-lime-300 animate-pulse" />
              Technical Engineering Guide
            </Badge>

            <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Your engineering degree has{" "}
              <span className="text-lime-300">more than one route.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Explore {careers.length} high-impact technical career paths. Click on any path to open
              detailed breakdowns of day-to-day work, required skills, toolkit stacks,
              and curated learning roadmaps.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Check className="size-4 text-lime-300" />
                {careers.length} Specialized Paths
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-lime-300" />
                Real-world Skill Profiles
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-lime-300" />
                Assessment Data Saver
              </span>
            </div>
          </div>
        </section>

        {/* Career Paths Directory Section */}
        <section id="paths" className="mt-16">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">
                01 / Explore & Discover
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white">
                Technical Career Paths
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Select any path card to view its complete role overview in a popup card.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <input
                aria-label="Search career paths"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search paths or tech..."
                className="h-11 w-full rounded-xl border border-white/10 bg-[#101621] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/20"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                  selectedCategory === cat
                    ? "bg-lime-300 text-slate-950 font-semibold shadow-md shadow-lime-300/20"
                    : "border border-white/10 bg-[#101621] text-slate-400 hover:border-lime-300/30 hover:text-white",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Paths Grid */}
          {filteredCareers.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#101621] p-12 text-center">
              <p className="text-lg text-slate-300">No career paths matched your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("All Paths");
                }}
                className="mt-4 border-white/15 bg-white/5 text-slate-200"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCareers.map((career) => {
                const Icon = career.icon;
                const isSaved = savedPathIds.includes(career.id);

                return (
                  <div
                    key={career.id}
                    onClick={() => setModalCareer(career)}
                    className="group relative flex flex-col justify-between cursor-pointer rounded-2xl border border-white/10 bg-[#101621] p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-lime-300/40 hover:bg-[#131b28] hover:shadow-xl hover:shadow-lime-300/5"
                  >
                    <div>
                      {/* Top Row: Icon + Badges + Bookmark */}
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={cn(
                            "flex size-12 shrink-0 items-center justify-center rounded-xl border transition-colors group-hover:scale-105",
                            career.accent,
                          )}
                        >
                          <Icon className="size-6" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-white/5 text-[11px] font-normal text-slate-400 border border-white/5"
                          >
                            {career.level}
                          </Badge>
                          <button
                            type="button"
                            onClick={(e) => toggleSavePath(career.id, e)}
                            title={isSaved ? "Saved to your list" : "Save this path"}
                            className={cn(
                              "rounded-lg p-1.5 transition-colors",
                              isSaved
                                ? "text-lime-300 bg-lime-300/10 hover:bg-lime-300/20"
                                : "text-slate-500 hover:bg-white/10 hover:text-slate-300",
                            )}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="size-4" />
                            ) : (
                              <Bookmark className="size-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Header details */}
                      <div className="mt-5">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-lime-400/80">
                          {career.family}
                        </p>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-white group-hover:text-lime-200">
                          {career.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {career.eyebrow}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
                        {career.description}
                      </p>

                      {/* Toolkit pills */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {career.tools.slice(0, 4).map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md border border-white/5 bg-[#0b111b] px-2 py-0.5 text-[11px] font-mono text-slate-400"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1.5 text-lime-300 group-hover:translate-x-1 transition-transform">
                        View details
                        <ArrowRight className="size-3.5" />
                      </span>
                      <a
                        href={`/resources/${career.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                      >
                        Roadmap
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Pathfinder CTA Card */}
        <section
          id="start"
          className="mt-20 rounded-[2rem] border border-lime-300/20 bg-gradient-to-br from-[#17221d] to-[#101621] p-8 text-slate-100 shadow-2xl shadow-lime-300/5 sm:p-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-lime-300 text-slate-950 shadow-lg shadow-lime-300/20">
                <UserRound className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Not sure which direction suits you best?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  Take the interactive Pathfinder assessment. Answer a few questions about
                  your current skills and favorite problems, and we’ll match you with your
                  strongest technical career route and save the recommendation to your account.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <a
                href="/pathfinder"
                className="inline-flex h-9 items-center justify-center rounded-full bg-lime-300 px-6 text-sm font-semibold text-slate-950 transition hover:bg-lime-200"
              >
                Find my path <Sparkles className="ml-2 size-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* POPUP CARD MODAL */}
      {modalCareer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-career-title"
          onClick={() => setModalCareer(null)}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-2 backdrop-blur-sm animate-in fade-in duration-150 sm:items-center sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-2 max-h-[calc(100dvh-1rem)] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#101621] text-slate-100 shadow-2xl shadow-black/80 animate-in zoom-in-95 duration-150 sm:my-4 sm:max-h-[calc(100dvh-2rem)] sm:rounded-[2rem]"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalCareer(null)}
              aria-label="Close details"
              className="absolute right-5 top-5 z-10 flex size-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white"
            >
              <X className="size-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-white/10 bg-gradient-to-br from-[#16241e] via-[#101621] to-[#0b111b] p-5 sm:p-7 lg:p-9">
              <div className="flex items-start justify-between gap-4">
                <div
                  className={cn(
                    "flex size-16 items-center justify-center rounded-2xl border shadow-lg",
                    modalCareer.accent,
                  )}
                >
                  <modalCareer.icon className="size-8" />
                </div>
                <div className="flex items-center gap-2 mr-10">
                  <Badge
                    variant="outline"
                    className="border-white/15 bg-white/5 text-slate-300"
                  >
                    {modalCareer.level}
                  </Badge>
                </div>
              </div>

              <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">
                {modalCareer.family}
              </p>
              <h2
                id="modal-career-title"
                className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {modalCareer.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-400">
                {modalCareer.eyebrow}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                {modalCareer.description}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-7 lg:p-9">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Column A: Work */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="flex size-6 items-center justify-center rounded-full bg-lime-300 font-mono text-xs font-bold text-slate-950">
                      A
                    </span>
                    What you will do
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3.5">
                    {modalCareer.work.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-slate-300"
                      >
                        <Check className="mt-1 size-4 shrink-0 text-lime-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column B: Skills */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="flex size-6 items-center justify-center rounded-full bg-violet-400 font-mono text-xs font-bold text-slate-950">
                      B
                    </span>
                    Key skills to build
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3.5">
                    {modalCareer.skills.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-slate-300"
                      >
                        <ArrowRight className="mt-1 size-4 shrink-0 text-violet-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator className="my-8 border-white/10" />

              {/* Toolkit & Actions */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Typical Toolkit & Stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {modalCareer.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="secondary"
                        className="border border-white/10 bg-[#0b111b] px-3 py-1 text-slate-300 font-mono text-xs"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => toggleSavePath(modalCareer.id)}
                    className="rounded-full border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                  >
                    {savedPathIds.includes(modalCareer.id) ? (
                      <>
                        <BookmarkCheck className="mr-2 size-4 text-lime-300" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 size-4" />
                        Save Path
                      </>
                    )}
                  </Button>

                  <a
                    href={`/resources/${modalCareer.id}`}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-lime-300 px-6 text-sm font-semibold text-slate-950 transition hover:bg-lime-200"
                  >
                    Start Learning <ArrowRight className="ml-2 size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-slate-500">
        Pathfinder is an educational career mapping tool. Requirements and role scope
        vary across engineering organizations.
      </footer>
    </div>
  );
}
