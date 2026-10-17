"use client";

import {useEffect, useRef, useState} from 'react';
import type {ReactElement} from 'react';
import {useLocale, useTranslations} from 'next-intl';
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
import Stagger from './Stagger';

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

type ServiceItem = {title: string; description: string; icon: string};
type Step = {step: string; title: string; description: string};

export default function Services() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const items = t.raw('items') as ServiceItem[];
  const steps = t.raw('processSteps') as Step[];

  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqTablet = window.matchMedia('(min-width: 640px)');
    const update = () => setPerView(mqDesktop.matches ? 4 : mqTablet.matches ? 2 : 1);
    update();
    mqDesktop.addEventListener('change', update);
    mqTablet.addEventListener('change', update);
    return () => {
      mqDesktop.removeEventListener('change', update);
      mqTablet.removeEventListener('change', update);
    };
  }, []);

  const maxIndex = Math.max(0, items.length - perView);
  const current = Math.min(index, maxIndex);

  const next = () => setIndex(current >= maxIndex ? 0 : current + 1);
  const prev = () => setIndex(current <= 0 ? maxIndex : current - 1);

  useEffect(() => {
    if (paused || maxIndex <= 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const c = Math.min(i, maxIndex);
        return c >= maxIndex ? 0 : c + 1;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  const gesture = (delta: number) => {
    const isNext = (delta < 0) !== isRtl;
    if (isNext) next();
    else prev();
  };

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

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t('heading')}
        tabIndex={0}
        className="group relative outline-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prev();
          if (e.key === 'ArrowRight') next();
        }}
        onPointerDown={(e) => {
          touchStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (touchStart.current === null) return;
          const delta = e.clientX - touchStart.current;
          touchStart.current = null;
          if (Math.abs(delta) > 50) gesture(delta);
        }}
      >
        <div className="overflow-x-clip">
          <div
            className="flex touch-pan-y select-none py-2 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              transform: `translateX(${isRtl ? '' : '-'}${current * (100 / perView)}%)`
            }}
          >
            {items.map((item, i) => {
              const color = COLOR_MAP[item.icon] ?? COLOR_MAP.code;
              return (
                <div
                  key={item.title}
                  className="shrink-0 grow-0 px-3"
                  style={{flexBasis: `${100 / perView}%`, maxWidth: `${100 / perView}%`}}
                >
                  <Stagger index={i} delay={40} className="h-full">
                    <article className="group/card relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl">
                      <div
                        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-25 ${color}`}
                      />
                      <div
                        className={`pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover/card:scale-x-100 rtl:origin-right ${color}`}
                      />

                      <div className="relative flex items-start justify-between">
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover/card:-rotate-3 group-hover/card:scale-110 ${color}`}
                        >
                          {ICON_MAP[item.icon] ?? ICON_MAP.code}
                        </span>
                        <span className="text-3xl font-black leading-none tabular-nums text-muted-foreground/15 transition-colors duration-300 group-hover/card:text-primary/40">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="relative text-lg font-semibold tracking-tight transition-colors duration-300 group-hover/card:text-primary">
                        {item.title}
                      </h3>
                      <p className="relative text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      <div
                        className={`mt-auto h-0.5 w-8 rounded-full bg-gradient-to-r transition-all duration-300 group-hover/card:w-full ${color}`}
                      />
                    </article>
                  </Stagger>
                </div>
              );
            })}
          </div>
        </div>

        {maxIndex > 0 && (
          <>
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-muted">
                <span
                  key={current}
                  className={`block h-full origin-left rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 rtl:origin-right animate-[carousel-progress_5s_linear_forwards] ${
                    paused ? '[animation-play-state:paused]' : ''
                  }`}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                {Array.from({length: maxIndex + 1}).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-7 bg-gradient-to-r from-indigo-500 to-blue-600'
                        : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
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
