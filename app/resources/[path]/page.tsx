import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Code2,
  ExternalLink,
  FileText,
  Lightbulb,
  PlayCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const resourceSets: Record<
  string,
  {
    title: string;
    eyebrow: string;
    intro: string;
    resources: {
      title: string;
      type: string;
      description: string;
      href: string;
      icon: typeof Code2;
    }[];
  }
> = {
  frontend: {
    title: "Frontend Engineer",
    eyebrow: "RESOURCE DECK / SOFTWARE ENGINEERING",
    intro:
      "Build a practical frontend foundation with browser fundamentals, component thinking, accessibility, and projects you can show.",
    resources: [
      {
        title: "MDN Web Docs",
        type: "Reference",
        description:
          "The source of truth for HTML, CSS, JavaScript, and browser APIs.",
        href: "https://developer.mozilla.org/en-US/docs/Learn",
        icon: FileText,
      },
      {
        title: "freeCodeCamp Responsive Web Design",
        type: "Course",
        description:
          "A project-based path through responsive layouts, accessibility, and frontend fundamentals.",
        href: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        icon: BookOpen,
      },
      {
        title: "Frontend Mentor",
        type: "Practice",
        description:
          "Turn real-looking interface designs into portfolio-ready frontend projects.",
        href: "https://www.frontendmentor.io/",
        icon: Code2,
      },
      {
        title: "Web.dev Learn Accessibility",
        type: "Best practice",
        description:
          "Learn how to make interfaces usable for people with different abilities.",
        href: "https://web.dev/learn/accessibility",
        icon: Lightbulb,
      },
    ],
  },
  backend: {
    title: "Backend Engineer",
    eyebrow: "RESOURCE DECK / SOFTWARE ENGINEERING",
    intro:
      "Learn how APIs, databases, authentication, and reliable services fit together behind the interface.",
    resources: [
      {
        title: "roadmap.sh Backend",
        type: "Roadmap",
        description:
          "A structured overview of the concepts and technologies commonly used in backend work.",
        href: "https://roadmap.sh/backend",
        icon: Code2,
      },
      {
        title: "PostgreSQL Tutorial",
        type: "Database",
        description:
          "Build strong SQL and relational data modeling fundamentals with PostgreSQL.",
        href: "https://www.postgresql.org/docs/current/tutorial.html",
        icon: BookOpen,
      },
      {
        title: "MDN HTTP Overview",
        type: "Reference",
        description:
          "Understand requests, responses, methods, headers, status codes, and the web platform.",
        href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
        icon: FileText,
      },
      {
        title: "OWASP Top 10",
        type: "Security",
        description:
          "Study the most important web application security risks and mitigations.",
        href: "https://owasp.org/www-project-top-ten/",
        icon: Lightbulb,
      },
    ],
  },
  aiml: {
    title: "AI / ML Engineer",
    eyebrow: "RESOURCE DECK / DATA & INTELLIGENCE",
    intro:
      "Pair mathematical foundations with practical modeling, evaluation, and responsible deployment.",
    resources: [
      {
        title: "Google Machine Learning Crash Course",
        type: "Course",
        description:
          "Practical lessons covering core ML concepts, data preparation, and model evaluation.",
        href: "https://developers.google.com/machine-learning/crash-course",
        icon: PlayCircle,
      },
      {
        title: "scikit-learn User Guide",
        type: "Reference",
        description:
          "Learn established tools for classical machine learning in Python.",
        href: "https://scikit-learn.org/stable/user_guide.html",
        icon: FileText,
      },
      {
        title: "fast.ai Practical Deep Learning",
        type: "Course",
        description:
          "A hands-on introduction to deep learning that starts with useful applications.",
        href: "https://course.fast.ai/",
        icon: BookOpen,
      },
      {
        title: "Kaggle Learn",
        type: "Practice",
        description:
          "Short, interactive exercises for Python, pandas, SQL, and machine learning.",
        href: "https://www.kaggle.com/learn",
        icon: Code2,
      },
    ],
  },
};

const defaultResources = resourceSets.frontend;

export default async function PathResourcesPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  const set = resourceSets[path] ?? {
    ...defaultResources,
    title: `${path.replaceAll("-", " ")} resources`,
    eyebrow: "RESOURCE DECK / PATHFINDER",
  };

  return (
    <main className="min-h-screen bg-[#080b12] px-5 py-8 text-slate-100 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-lime-300"
        >
          <ArrowLeft data-icon="inline-start" />
          Back to paths
        </Link>
        <header className="mt-14 max-w-3xl">
          <Badge className="border-lime-300/30 bg-lime-300/10 text-lime-200">
            {set.eyebrow}
          </Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Resources for <span className="text-lime-300">{set.title}.</span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">{set.intro}</p>
        </header>
        <section className="mt-12 grid gap-5 md:grid-cols-2">
          {set.resources.map(
            ({ title, type, description, href, icon: Icon }) => (
              <Card
                key={title}
                className="border-white/10 bg-[#101621] text-slate-100 transition hover:-translate-y-1 hover:border-lime-300/40"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                      <Icon />
                    </span>
                    <Badge
                      variant="outline"
                      className="border-white/10 text-slate-400"
                    >
                      {type}
                    </Badge>
                  </div>
                  <CardTitle className="mt-5 text-xl">{title}</CardTitle>
                  <CardDescription className="text-sm leading-6 text-slate-400">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-lime-300 hover:text-lime-200"
                  >
                    Open resource <ExternalLink data-icon="inline-end" />
                  </a>
                </CardContent>
              </Card>
            ),
          )}
        </section>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-lime-300"
        >
          Explore another path <ArrowUpRight data-icon="inline-end" />
        </Link>
      </div>
    </main>
  );
}
