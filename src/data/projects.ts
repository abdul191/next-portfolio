export type ProjectImage =
  | "gtrack"
  | "groute"
  | "trust-corners"
  | "innovazy-suite"
  | "code-frenetics"
  | "innovazy-website"
  | "rs-flavour"
  | "knk-associates"
  | "attendance-management"
  | "warehouse-management";

export type ProjectMeta = {
  slug: string;
  image: ProjectImage;
  github?: string;
  live?: string;
  stack: string[];
};

export const projects: ProjectMeta[] = [
  {
    slug: "gtrack-esignature",
    image: "gtrack",
    github: "",
    live: "https://esignature.gtrack.online",
    stack: ["React.js", "Express", "Prisma", "MSSQL"]
  },
  {
    slug: "groute-admin",
    image: "groute",
    github: "",
    live: "https://admin.groute.online",
    stack: ["React.js", "Express", "Prisma", "MSSQL", "React Native"]
  },
  {
    slug: "trust-corners",
    image: "trust-corners",
    github: "",
    live: "https://www.trustcorners.sa/en",
    stack: ["Next.js", "TypeScript", "Nest.js", "PostgreSQL"]
  },
  {
    slug: "rs-flavour",
    image: "rs-flavour",
    github: "",
    live: "",
    stack: ["Next.js", "React.js", "PostgreSQL", "Payment Gateway"]
  },
  {
    slug: "innovazy-suite",
    image: "innovazy-suite",
    github: "",
    live: "https://suite.innovazy.com/en",
    stack: ["React.js", "Tailwind CSS", "SEO"]
  },
  {
    slug: "knk-associates",
    image: "knk-associates",
    github: "",
    live: "",
    stack: ["Next.js", "Express", "MongoDB", "TypeScript"]
  },
  {
    slug: "code-frenetics",
    image: "code-frenetics",
    github: "",
    live: "https://www.codefrenetics.com/",
    stack: ["Next.js", "React.js", "Tailwind CSS", "SEO"]
  },
  {
    slug: "innovazy-website",
    image: "innovazy-website",
    github: "",
    live: "https://www.innovazy.com/",
    stack: ["React.js", "Tailwind CSS", "SEO"]
  },
  {
    slug: "attendance-management",
    image: "attendance-management",
    github: "",
    live: "",
    stack: ["React.js", "Express", "Prisma", "MSSQL"]
  },
  {
    slug: "warehouse-management",
    image: "warehouse-management",
    github: "",
    live: "",
    stack: ["React.js", "Express", "Prisma", "MSSQL"]
  }
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
