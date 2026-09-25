"use client";

import type {ReactElement} from 'react';
import {useTranslations} from 'next-intl';
import {
  FaDatabase,
  FaReact,
  FaRobot,
  FaServer,
  FaTools
} from 'react-icons/fa';
import Stagger from './Stagger';

const ICON_MAP: Record<string, ReactElement> = {
  react: <FaReact className="h-5 w-5" />,
  server: <FaServer className="h-5 w-5" />,
  database: <FaDatabase className="h-5 w-5" />,
  ai: <FaRobot className="h-5 w-5" />,
  tools: <FaTools className="h-5 w-5" />
};

const COLOR_MAP: Record<string, string> = {
  react: 'from-cyan-500 to-emerald-500',
  server: 'from-sky-500 to-blue-500',
  database: 'from-amber-500 to-orange-500',
  ai: 'from-violet-500 to-purple-500',
  tools: 'from-emerald-500 to-teal-500'
};

const SOFT_MAP: Record<string, string> = {
  react: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300',
  server: 'bg-sky-500/10 text-sky-600 dark:text-sky-300',
  database: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
  ai: 'bg-violet-500/10 text-violet-600 dark:text-violet-300',
  tools: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
};

type Category = {
  title: string;
  icon: string;
  skills: string[];
};

export default function Skills() {
  const t = useTranslations('Skills');
  const categories = t.raw('categories') as Category[];
  const coreStack = categories[0]?.skills ?? [];
  const totalSkills = categories.reduce((n, c) => n + c.skills.length, 0);

  return (
    <section
      id="myExpertise"
      className="container-section"
    >
      <div className="space-y-3 pb-10 text-center">
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

      <div className="grid gap-8 lg:grid-cols-5">
        <Stagger className="lg:col-span-2">
          <div className="glass relative h-full overflow-hidden rounded-3xl p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/25 to-blue-500/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-500/15 blur-2xl" />

            <div className="relative flex h-full flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-md">
                  <FaReact className="h-5 w-5" />
                </span>
                <p className="text-lg font-bold">{t('myExpertise')}</p>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('note')}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-background/50 p-4 text-center">
                  <p className="text-2xl font-bold">{categories.length}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('areasLabel')}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/50 p-4 text-center">
                  <p className="text-2xl font-bold">{totalSkills}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('skillsLabel')}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t('coreStack')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {coreStack.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300"
                    >
                      <FaReact className="h-3 w-3" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Stagger>

        <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-3">
          {categories.map((cat, i) => (
            <Stagger key={cat.title} index={i}>
              <article className="glass group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-60 transition-opacity group-hover:opacity-100 ${COLOR_MAP[cat.icon] ?? COLOR_MAP.tools}`}
                />

                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${COLOR_MAP[cat.icon] ?? COLOR_MAP.tools}`}
                  >
                    {ICON_MAP[cat.icon] ?? ICON_MAP.tools}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${SOFT_MAP[cat.icon] ?? SOFT_MAP.tools}`}
                  >
                    {cat.skills.length} {t('skillsLabel')}
                  </span>
                </div>

                <h3 className="text-base font-semibold">{cat.title}</h3>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-indigo-400/40 group-hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </Stagger>
          ))}
        </div>
      </div>
    </section>
  );
}