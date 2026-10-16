"use client";

import type {ReactElement} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  FaArrowRight,
  FaBolt,
  FaChalkboardTeacher,
  FaCode,
  FaCodeBranch,
  FaDatabase,
  FaMobileAlt,
  FaPalette,
  FaPlug,
  FaReact,
  FaRobot,
  FaRocket,
  FaSearch,
  FaServer,
  FaUniversalAccess
} from 'react-icons/fa';

const ICON_MAP: Record<string, ReactElement> = {
  code: <FaCode className="h-5 w-5" />,
  react: <FaReact className="h-5 w-5" />,
  design: <FaPalette className="h-5 w-5" />,
  api: <FaPlug className="h-5 w-5" />,
  speed: <FaBolt className="h-5 w-5" />,
  git: <FaCodeBranch className="h-5 w-5" />,
  a11y: <FaUniversalAccess className="h-5 w-5" />,
  mentor: <FaChalkboardTeacher className="h-5 w-5" />,
  server: <FaServer className="h-5 w-5" />,
  database: <FaDatabase className="h-5 w-5" />,
  ai: <FaRobot className="h-5 w-5" />,
  mobile: <FaMobileAlt className="h-5 w-5" />
};

const COLOR_MAP: Record<string, string> = {
  code: 'from-blue-500 to-cyan-500',
  react: 'from-cyan-500 to-emerald-500',
  design: 'from-violet-500 to-purple-500',
  api: 'from-sky-500 to-blue-500',
  speed: 'from-amber-500 to-orange-500',
  git: 'from-emerald-500 to-teal-500',
  a11y: 'from-rose-500 to-pink-500',
  mentor: 'from-slate-500 to-slate-400',
  server: 'from-sky-600 to-blue-600',
  database: 'from-amber-500 to-orange-600',
  ai: 'from-fuchsia-500 to-violet-600',
  mobile: 'from-teal-500 to-emerald-600'
};

const STEP_ICONS: ReactElement[] = [
  <FaSearch key="discover" className="h-5 w-5" />,
  <FaPalette key="design" className="h-5 w-5" />,
  <FaCode key="build" className="h-5 w-5" />,
  <FaRocket key="deliver" className="h-5 w-5" />
];

const STEP_COLORS = [
  'from-indigo-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-sky-600',
  'from-emerald-500 to-teal-600'
];

export default function Services() {
  const t = useTranslations('Services');
  const items = t.raw('items') as Array<{title: string; description: string; icon: string}>;
  const steps = t.raw('processSteps') as Array<{
    step: string;
    title: string;
    description: string;
  }>;

  return (
    <section
      id="servicesSection"
      className="container-section"
    >
      <div className="space-y-2 pb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t('title')}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('heading')}</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="glass group relative flex flex-col gap-3 overflow-hidden rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
            <span
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${COLOR_MAP[item.icon] ?? COLOR_MAP.code}`}
            >
              {ICON_MAP[item.icon] ?? ICON_MAP.code}
            </span>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <div className="mb-10 space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('processEyebrow')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('processTitle')}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t('processSubtitle')}</p>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const color = STEP_COLORS[i % STEP_COLORS.length];
            return (
              <li key={step.step}>
                <div className="glass group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100 ${color}`}
                  />

                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${color}`}
                    >
                      {STEP_ICONS[i % STEP_ICONS.length]}
                    </span>
                    <span className="text-gradient text-3xl font-black tabular-nums">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          {t('cta')}
          <FaArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}