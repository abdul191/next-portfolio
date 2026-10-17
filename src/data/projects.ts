export type ProjectMeta = {
  slug: string;
  image: "queue" | "facility" | "keeper" | "code" | "atom" | "smartphone" | "gitbranch";
  github?: string;
  live?: string;
  stack: string[];
};

export const projects: ProjectMeta[] = [
  {
    slug: "gtrack-esignature",
    image: "keeper",
    github: "",
    live: "https://esignature.gtrack.online",
    stack: ["React.js", "Express", "Prisma", "MSSQL"]
  },
  {
    slug: "groute-admin",
    image: "facility",
    github: "",
    live: "https://admin.groute.online",
    stack: ["React.js", "Express", "Prisma", "MSSQL", "React Native"]
  },
  {
    slug: "trust-corners",
    image: "code",
    github: "",
    live: "https://www.trustcorners.sa/en",
    stack: ["Next.js", "TypeScript", "Nest.js", "PostgreSQL"]
  },
  {
    slug: "rs-flavour",
    image: "smartphone",
    github: "",
    live: "https://rsflavour.com/",
    stack: ["Next.js", "React.js", "PostgreSQL", "Payment Gateway"]
  },
  {
    slug: "innovazy-suite",
    image: "atom",
    github: "",
    live: "https://suite.innovazy.com/en",
    stack: ["React.js", "Tailwind CSS", "SEO"]
  },
  {
    slug: "knk-associates",
    image: "queue",
    github: "",
    live: "",
    stack: ["Next.js", "Express", "MongoDB", "TypeScript"]
  },
  {
    slug: "code-frenetics",
    image: "gitbranch",
    github: "",
    live: "https://www.codefrenetics.com/",
    stack: ["Next.js", "React.js", "Tailwind CSS", "SEO"]
  },
  {
    slug: "innovazy-website",
    image: "code",
    github: "",
    live: "https://www.innovazy.com/",
    stack: ["React.js", "Tailwind CSS", "SEO"]
  },
  {
    slug: "attendance-management",
    image: "facility",
    github: "",
    live: "",
    stack: ["React.js", "Express", "Prisma", "MSSQL"]
  },
  {
    slug: "warehouse-management",
    image: "queue",
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
