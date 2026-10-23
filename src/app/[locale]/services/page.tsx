import type {ReactElement} from 'react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {site} from '@/data/site';
import Reveal from '@/components/Reveal';
import Stagger from '@/components/Stagger';
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

const SERVICE_ICONS: Record<string, ReactElement> = {
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

const SERVICE_COLORS: Record<string, string> = {
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

const STACK_VISUALS = [
  {
    icon: <FaReact className="h-5 w-5" />,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: <FaServer className="h-5 w-5" />,
    color: 'from-sky-500 to-indigo-500'
  },
  {
    icon: <FaDatabase className="h-5 w-5" />,
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: <FaRobot className="h-5 w-5" />,
    color: 'from-violet-500 to-fuchsia-500'
  }
];

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

const HERO_STACK = [
  'React.js',
  'Next.js',
  'Node.js',
  'Nest.js',
  'PostgreSQL',
  'React Native'
];

type ServiceItem = {title: string; description: string; icon: string};
type Step = {step: string; title: string; description: string};
type StackLayer = {label: string; tech: string};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({locale, namespace: 'Services'});

  return {
    title: `${t('heading')} — ${site.name}`,
    description: t('subtitle')
  };
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('Services');
  const aboutT = await getTranslations('About');
  const heroT = await getTranslations('Hero');

  const items = t.raw('items') as ServiceItem[];
  const steps = t.raw('processSteps') as Step[];
  const stack = t.raw('stack') as StackLayer[];
  const aboutStats = aboutT.raw('stats') as Array<{value: string; label: string}>;

  return (
    <div>
      {/* Intro */}
      <section className="mx-auto w-full max-w-[84rem] px-4 py-6 sm:px-6 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5 text-center sm:space-y-6 lg:text-left">
            <span
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
              style={{animationDelay: '0s'}}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {heroT('availability')}
            </span>

            <div
              className="animate-fade-up space-y-3"
              style={{animationDelay: '0.07s'}}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t('title')}
              </p>
              <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {t('heading')}
              </h1>
            </div>

            <p
              className="animate-fade-up mx-auto max-w-xl leading-relaxed text-muted-foreground lg:mx-0"
              style={{animationDelay: '0.14s'}}
            >
              {t('subtitle')}
            </p>

            <div
              className="animate-fade-up flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{animationDelay: '0.21s'}}
            >
              <Link href="/contact" className="btn-primary">
                {t('cta')}
                <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link href="/projects" className="btn-outline">
                {heroT('viewWork')}
                <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>

            <div
              className="animate-fade-up flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              style={{animationDelay: '0.28s'}}
            >
              {HERO_STACK.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            className="animate-fade-up relative mx-auto w-full max-w-md"
            style={{animationDelay: '0.14s'}}
          >
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/25 via-violet-500/10 to-sky-500/20 blur-2xl"
            />

            <div className="glass relative overflow-hidden rounded-3xl p-4 sm:p-5">
              <div className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

              <div className="relative space-y-3">
                {stack.map((layer, i) => {
                  const visual = STACK_VISUALS[i % STACK_VISUALS.length];

                  return (
                    <div
                      key={layer.label}
                      className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-background/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
                    >
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${visual.color}`}
                      >
                        {visual.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {layer.label}
                        </p>
                        <p className="truncate text-sm font-semibold">
                          {layer.tech}
                        </p>
                      </div>
                      <span
                        dir="ltr"
                        className="text-xs font-black tabular-nums text-muted-foreground/25"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass animate-float absolute -start-3 -top-5 rounded-2xl px-4 py-3 sm:-start-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {aboutStats[0].label}
              </p>
              <p dir="ltr" className="text-gradient text-2xl font-extrabold">
                {aboutStats[0].value}
              </p>
            </div>

            <div className="glass animate-float absolute -end-3 -bottom-5 rounded-2xl px-4 py-3 sm:-end-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {aboutStats[3].label}
              </p>
              <p dir="ltr" className="text-gradient text-2xl font-extrabold">
                {aboutStats[3].value}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Reveal className="container-section">
        <h2 className="sr-only">{t('heading')}</h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const color = SERVICE_COLORS[item.icon] ?? SERVICE_COLORS.code;
            const featured = i === 0;
            const last = i === items.length - 1;

            return (
              <Stagger
                key={item.title}
                index={i}
                delay={40}
                className={`h-full ${featured ? 'md:col-span-2' : ''} ${
                  last ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <article
                  className={`glass group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl ${
                    featured
                      ? 'rounded-3xl p-6 sm:p-8'
                      : 'gap-4 rounded-2xl p-6'
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100 ${color}`}
                  />
                  <div
                    className={`pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25 ${color}`}
                  />

                  {featured ? (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 ${color}`}
                        >
                          {SERVICE_ICONS[item.icon] ?? SERVICE_ICONS.code}
                        </span>
                        <span
                          dir="ltr"
                          className="text-5xl font-black leading-none tabular-nums text-muted-foreground/15 transition-colors duration-300 group-hover:text-primary/40"
                        >
                          01
                        </span>
                      </div>

                      <h3 className="mt-6 text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {HERO_STACK.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="/projects"
                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {heroT('viewWork')}
                        <FaArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 ${color}`}
                        >
                          {SERVICE_ICONS[item.icon] ?? SERVICE_ICONS.code}
                        </span>
                        <span
                          dir="ltr"
                          className="text-3xl font-black leading-none tabular-nums text-muted-foreground/15 transition-colors duration-300 group-hover:text-primary/40"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      <div
                        className={`mt-auto h-0.5 w-8 rounded-full bg-gradient-to-r transition-all duration-300 group-hover:w-full ${color}`}
                      />
                    </>
                  )}
                </article>
              </Stagger>
            );
          })}
        </div>
      </Reveal>

      {/* Process */}
      <Reveal className="container-section">
        <div className="mb-10 space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('processEyebrow')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('processTitle')}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t('processSubtitle')}
          </p>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl"
          />

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-x-12 top-7 hidden h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent lg:block"
            />

            <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => {
                const color = STEP_COLORS[i % STEP_COLORS.length];

                return (
                  <li key={step.step} className="h-full">
                    <Stagger
                      index={i}
                      delay={70}
                      className="flex h-full flex-col items-center text-center"
                    >
                      <span
                        className={`relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg ring-4 ring-background/60 transition-transform duration-300 hover:scale-105 ${color}`}
                      >
                        {STEP_ICONS[i % STEP_ICONS.length]}
                      </span>

                      <div className="mt-4 flex items-center gap-2">
                        <span
                          dir="ltr"
                          className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-primary"
                        >
                          {step.step}
                        </span>
                        <h3 className="text-lg font-bold tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </Stagger>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal className="container-section">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-48 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-blue-500/15 blur-3xl"
          />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            {t('ctaTitle')}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
            {t('ctaDescription')}
          </p>
          <Link href="/contact" className="btn-primary relative mt-6">
            {t('cta')}
            <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
