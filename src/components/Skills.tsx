"use client";

import type {ReactElement} from 'react';
import {useTranslations} from 'next-intl';
import {
  FaDatabase,
  FaGlobe,
  FaLightbulb,
  FaLock,
  FaMicrosoft,
  FaPlug,
  FaReact,
  FaRobot,
  FaSearch,
  FaServer,
  FaTools,
  FaUsers
} from 'react-icons/fa';
import {
  SiExpress,
  SiGithub,
  SiGitlab,
  SiMongodb,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';
import {Bot, Brain, CheckCircle2, Layers, Network, Sparkles} from 'lucide-react';
import Stagger from './Stagger';

const ICON_MAP: Record<string, ReactElement> = {
  react: <FaReact className="h-5 w-5" />,
  server: <FaServer className="h-5 w-5" />,
  database: <FaDatabase className="h-5 w-5" />,
  ai: <FaRobot className="h-5 w-5" />,
  tools: <FaTools className="h-5 w-5" />
};

const COLOR_MAP: Record<string, string> = {
  react: 'from-cyan-500 to-blue-500',
  server: 'from-sky-500 to-indigo-500',
  database: 'from-amber-500 to-orange-500',
  ai: 'from-violet-500 to-purple-500',
  tools: 'from-emerald-500 to-teal-500'
};

const SOFT_MAP: Record<string, string> = {
  react: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  server: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  database: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  ai: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  tools: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
};

type Category = {
  title: string;
  icon: string;
  badge?: string;
  description?: string;
  skills: string[];
  highlights?: string;
};

function getSkillIcon(name: string): ReactElement {
  const s = name.toLowerCase();

  // Next.js
  if (s.includes('next')) return <SiNextdotjs className="h-3.5 w-3.5 shrink-0 text-foreground" />;
  // React Native
  if (s.includes('native')) return <SiReact className="h-3.5 w-3.5 shrink-0 text-cyan-500" />;
  // React.js / React
  if (s.includes('react')) return <SiReact className="h-3.5 w-3.5 shrink-0 text-cyan-400" />;
  // TypeScript
  if (s.includes('typescript')) return <SiTypescript className="h-3.5 w-3.5 shrink-0 text-blue-500" />;
  // Tailwind CSS
  if (s.includes('tailwind')) return <SiTailwindcss className="h-3.5 w-3.5 shrink-0 text-cyan-400" />;
  // Material UI
  if (s.includes('material')) return <SiMui className="h-3.5 w-3.5 shrink-0 text-sky-500" />;
  // Node.js
  if (s.includes('node')) return <SiNodedotjs className="h-3.5 w-3.5 shrink-0 text-emerald-500" />;
  // Express
  if (s.includes('express')) return <SiExpress className="h-3.5 w-3.5 shrink-0 text-foreground" />;
  // Nest.js
  if (s.includes('nest')) return <SiNestjs className="h-3.5 w-3.5 shrink-0 text-rose-500" />;
  // Auth / JWT / Security
  if (s.includes('auth') || s.includes('jwt') || s.includes('مصادقة') || s.includes('تصدیق'))
    return <FaLock className="h-3.5 w-3.5 shrink-0 text-amber-500" />;
  // REST API
  if (s.includes('api') || s.includes('rest')) return <FaPlug className="h-3.5 w-3.5 shrink-0 text-indigo-400" />;
  // Microservices / Architecture
  if (s.includes('microservice') || s.includes('مائیکرو') || s.includes('هندسة'))
    return <Layers className="h-3.5 w-3.5 shrink-0 text-blue-400" />;
  // PostgreSQL
  if (s.includes('postgre')) return <SiPostgresql className="h-3.5 w-3.5 shrink-0 text-sky-500" />;
  // MS SQL Server
  if (s.includes('sql server') || s.includes('mssql')) return <FaMicrosoft className="h-3.5 w-3.5 shrink-0 text-red-500" />;
  // MongoDB
  if (s.includes('mongo')) return <SiMongodb className="h-3.5 w-3.5 shrink-0 text-emerald-500" />;
  // Prisma ORM
  if (s.includes('prisma')) return <SiPrisma className="h-3.5 w-3.5 shrink-0 text-teal-400" />;
  // Schema / Index / Optimization
  if (s.includes('schema') || s.includes('اسکیما') || s.includes('جداول'))
    return <Layers className="h-3.5 w-3.5 shrink-0 text-indigo-400" />;
  if (s.includes('query') || s.includes('index') || s.includes('استعلام') || s.includes('کوئری') || s.includes('تحسين'))
    return <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />;
  // AI & Agents
  if (s.includes('mcp') || s.includes('context protocol')) return <Network className="h-3.5 w-3.5 shrink-0 text-purple-400" />;
  if (s.includes('prompt') || s.includes('برومبت') || s.includes('پرامپٹ')) return <FaLightbulb className="h-3.5 w-3.5 shrink-0 text-amber-400" />;
  if (s.includes('rag')) return <Brain className="h-3.5 w-3.5 shrink-0 text-violet-400" />;
  if (s.includes('llm') || s.includes('ai') || s.includes('الذكاء')) return <Bot className="h-3.5 w-3.5 shrink-0 text-purple-400" />;
  // Tools / Practices
  if (s.includes('gitlab')) return <SiGitlab className="h-3.5 w-3.5 shrink-0 text-orange-500" />;
  if (s.includes('github') || s.includes('git')) return <SiGithub className="h-3.5 w-3.5 shrink-0 text-foreground" />;
  if (s.includes('i18n') || s.includes('rtl')) return <FaGlobe className="h-3.5 w-3.5 shrink-0 text-emerald-500" />;
  if (s.includes('seo') || s.includes('vitals') || s.includes('أداء')) return <FaSearch className="h-3.5 w-3.5 shrink-0 text-amber-500" />;
  if (s.includes('agile') || s.includes('التعاون') || s.includes('تعاون')) return <FaUsers className="h-3.5 w-3.5 shrink-0 text-blue-400" />;

  return <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-400" />;
}

export default function Skills() {
  const t = useTranslations('Skills');
  const categories = t.raw('categories') as Category[];
  const coreStackFallback = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'];
  const coreStackRaw = t.raw('coreStackSkills') as string[] | undefined;
  const coreStack = Array.isArray(coreStackRaw) && coreStackRaw.length > 0 ? coreStackRaw : coreStackFallback;
  const totalSkills = categories.reduce((n, c) => n + c.skills.length, 0);
  const focusPointsRaw = t.raw('focusPoints') as string[] | undefined;
  const focusPoints = Array.isArray(focusPointsRaw) ? focusPointsRaw : [];

  const stats = [
    {
      value: categories.length,
      label: t('areasLabel'),
      gradient: 'from-indigo-500 to-blue-500',
      hover: 'hover:border-indigo-500/40'
    },
    {
      value: totalSkills,
      label: t('skillsLabel'),
      gradient: 'from-violet-500 to-purple-500',
      hover: 'hover:border-violet-500/40'
    },
    {
      value: t('statsYears'),
      label: t('statsYearsLabel'),
      gradient: 'from-cyan-500 to-sky-500',
      hover: 'hover:border-cyan-500/40'
    },
    {
      value: t('statsProjects'),
      label: t('statsProjectsLabel'),
      gradient: 'from-emerald-500 to-teal-500',
      hover: 'hover:border-emerald-500/40'
    }
  ];

  return (
    <section
      id="myExpertise"
      className="container-section"
    >
      <div className="space-y-3 pb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t('mySkills')}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t('myExpertise')}
        </h2>
        <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Left Overview Card */}
        <Stagger className="h-full xl:col-span-4">
          <div className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between gap-5">
              {/* Card Header with distinct title */}
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20">
                  <FaReact className="h-6 w-6 animate-[spin_12s_linear_infinite]" />
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {t.has('cardTitle') ? t('cardTitle') : t('myExpertise')}
                  </h3>
                  <p className="text-xs text-muted-foreground">{t('cardSubtitle')}</p>
                </div>
              </div>

              {/* Lede */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('note')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2.5">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`group rounded-2xl border border-border/80 bg-background/50 p-2.5 text-center transition-all duration-300 hover:bg-background/80 hover:shadow-xs ${stat.hover}`}
                  >
                    <p
                      className={`bg-gradient-to-br bg-clip-text text-2xl font-extrabold tracking-tight text-transparent ${stat.gradient}`}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Focus Points */}
              {focusPoints.length > 0 && (
                <div className="border-t border-border/60 pt-4">
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-foreground/80">
                    {t('focusTitle')}
                  </p>
                  <ul className="space-y-2">
                    {focusPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Core Stack */}
              <div className="pt-2 border-t border-border/60">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                    {t('coreStack')}
                  </p>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {t('coreStackNote')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {coreStack.map((skill) => (
                    <div
                      key={skill}
                      className="group flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:bg-indigo-500/15 hover:shadow-xs"
                    >
                      {getSkillIcon(skill)}
                      <span className="truncate">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Stagger>

        {/* 4 Enhanced Powerhouse Category Cards (2x2 Balanced Grid) */}
        <div className="grid h-full gap-4 sm:grid-cols-2 sm:grid-rows-2 xl:col-span-8">
          {categories.map((cat, i) => (
            <Stagger key={cat.title} index={i} className="h-full">
              <article className="glass group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                {/* Accent top gradient line */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100 ${COLOR_MAP[cat.icon] ?? COLOR_MAP.tools}`}
                />

                <div className="flex h-full flex-col justify-between gap-3">
                  <div className="space-y-3">
                    {/* Top Bar: Icon + Badge + Skill Count */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md transition-all duration-300 group-hover:scale-105 ${COLOR_MAP[cat.icon] ?? COLOR_MAP.tools}`}
                      >
                        {ICON_MAP[cat.icon] ?? ICON_MAP.tools}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {cat.badge && (
                          <span className="hidden sm:inline-flex rounded-full border border-border/80 bg-background/50 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                            {cat.badge}
                          </span>
                        )}
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${SOFT_MAP[cat.icon] ?? SOFT_MAP.tools}`}
                        >
                          {cat.skills.length} {t('skillsLabel')}
                        </span>
                      </div>
                    </div>

                    {/* Numbered divider */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs font-black tabular-nums tracking-wider text-primary/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-border via-border to-transparent" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {cat.title}
                    </h3>

                    {/* Rich Description */}
                    {cat.description && (
                      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {cat.description}
                      </p>
                    )}
                  </div>

                  {/* Skill Chips with brand icons */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/60 px-2 py-1 text-[11px] font-medium text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:bg-background/90 hover:text-foreground hover:shadow-xs [&_svg]:h-3 [&_svg]:w-3"
                      >
                        {getSkillIcon(skill)}
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Stagger>
          ))}
        </div>
      </div>
    </section>
  );
}