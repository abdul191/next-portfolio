export type ProjectMeta = {
  slug: string;
  image: "queue" | "facility" | "keeper" | "code" | "atom" | "smartphone" | "gitbranch";
  github: string;
  live: string;
  stack: string[];
};

export const projects: ProjectMeta[] = [
  {
    slug: "gtrack-esignature",
    image: "keeper",
    github: "https://github.com/abdul191",
    live: "https://esignature.gtrack.online",
    stack: ["React.js", "Express", "Prisma", "MSSQL"]
  },
  {
    slug: "groute-admin",
    image: "facility",
    github: "https://github.com/abdul191",
    live: "https://admin.groute.online",
    stack: ["React.js", "Express", "Prisma", "MSSQL", "React Native"]
  },
  {
    slug: "trust-corners",
    image: "code",
    github: "https://github.com/abdul191",
    live: "",
    stack: ["Next.js", "TypeScript", "Nest.js", "PostgreSQL"]
  },
  {
    slug: "rs-flavour",
    image: "smartphone",
    github: "https://github.com/abdul191",
    live: "",
    stack: ["Next.js", "React.js", "PostgreSQL", "Payment Gateway"]
  },
  {
    slug: "innovazy-suite",
    image: "atom",
    github: "https://github.com/abdul191",
    live: "",
    stack: ["React.js", "Tailwind CSS", "SEO"]
  },
  {
    slug: "knk-associates",
    image: "queue",
    github: "https://github.com/abdul191",
    live: "",
    stack: ["Next.js", "Express", "MongoDB", "TypeScript"]
  },
  {
    slug: "innovazy-website",
    image: "gitbranch",
    github: "https://github.com/abdul191",
    live: "",
    stack: ["React.js", "Tailwind CSS", "SEO"]
  }
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}