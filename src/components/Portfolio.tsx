"use client";

import {useEffect, useRef, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa';
import {getProjectBySlug} from '@/data/projects';
import {getProjectColor, getProjectIcon} from '@/data/project-ui';
import {site} from '@/data/site';
import Stagger from './Stagger';

type ProjectCard = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

export default function Portfolio() {
  const t = useTranslations('Portfolio');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const items = t.raw('projects') as ProjectCard[];

  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqTablet = window.matchMedia('(min-width: 640px)');
    const update = () => setPerView(mqDesktop.matches ? 3 : mqTablet.matches ? 2 : 1);
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
    <section id="portfolioSection" className="container-section">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('title')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('heading')}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FaGithub className="h-4 w-4" />
            {t('githubButton')}
          </a>
          <Link href="/projects" className="btn-primary">
            {t('viewAll')}
          </Link>
        </div>
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
            {items.map((proj, i) => {
              const meta = getProjectBySlug(proj.slug);
              const color = getProjectColor(proj.slug);
              const icon = getProjectIcon(proj.slug);
              return (
                <div
                  key={proj.title}
                  className="shrink-0 grow-0 px-3"
                  style={{flexBasis: `${100 / perView}%`, maxWidth: `${100 / perView}%`}}
                >
                  <Stagger index={i} delay={50} className="h-full">
                    <article className="group/card relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl">
                      <div
                        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-20 ${color}`}
                      />

                      <div className="relative flex items-center justify-between">
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover/card:scale-110 ${color}`}
                        >
                          {icon}
                        </span>
                        {meta?.live && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {t('liveBadge')}
                          </span>
                        )}
                      </div>

                      <h3 className="relative text-lg font-semibold tracking-tight transition-colors duration-300 group-hover/card:text-primary">
                        {proj.title}
                      </h3>
                      <p className="relative text-sm leading-relaxed text-muted-foreground">
                        {proj.description}
                      </p>

                      {meta && (
                        <div className="relative flex flex-wrap gap-1.5">
                          {meta.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-border/70 bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="relative mt-auto flex items-center gap-4 border-t border-border/60 pt-4">
                        {meta?.live && (
                          <a
                            href={meta.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                          >
                            {t('liveDemo')}
                            <FaExternalLinkAlt className="h-3 w-3" />
                          </a>
                        )}
                        <Link
                          href={`/projects/${proj.slug}`}
                          className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                          {t('details')}
                        </Link>
                      </div>
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
    </section>
  );
}
