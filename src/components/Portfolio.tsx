"use client";

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub
} from 'react-icons/fa';
import {projectImages} from '@/data/project-images';
import {getProjectBySlug} from '@/data/projects';
import Stagger from './Stagger';

type ProjectCard = {
  title: string;
  description: string;
  link: string;
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

  const groups: ProjectCard[][] = [];
  for (let i = 0; i < items.length; i += perView) {
    groups.push(items.slice(i, i + perView));
  }
  const slideCount = groups.length;
  const current = Math.min(index, slideCount - 1);

  const next = () => setIndex((i) => (i + 1) % slideCount);
  const prev = () => setIndex((i) => (i - 1 + slideCount) % slideCount);

  useEffect(() => {
    if (paused || slideCount <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slideCount), 5000);
    return () => clearInterval(id);
  }, [paused, slideCount]);

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
            href="https://github.com/abdul191"
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
        className="group relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
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
        <div className="overflow-hidden rounded-3xl">
          <div
            className="flex touch-pan-y select-none transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(${isRtl ? '' : '-'}${current * 100}%)`
            }}
          >
            {groups.map((group, gi) => (
              <div key={gi} className="w-full shrink-0 px-1 py-2 sm:px-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((proj, i) => {
                    const meta = getProjectBySlug(proj.slug);
                    const img = projectImages[proj.image] ?? projectImages.queue;
                    return (
                      <Stagger key={proj.title} index={i} delay={90}>
                        <article className="group relative h-[420px] overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10">
                          <Image
                            src={img}
                            alt={proj.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />

                          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-white">
                            <h3 className="text-xl font-bold">{proj.title}</h3>
                            <p className="line-clamp-3 text-sm leading-relaxed text-white/75">
                              {proj.description}
                            </p>

                            {meta && (
                              <div className="flex flex-wrap gap-1.5">
                                {meta.stack.slice(0, 3).map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-4 border-t border-white/20 pt-4">
                              <Link
                                href={`/projects/${proj.slug}`}
                                className="inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-slate-900 shadow-md transition-transform hover:scale-[1.03]"
                              >
                                {t('details')}
                              </Link>
                              <a
                                href={meta?.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
                              >
                                <FaGithub className="h-4 w-4" />
                              </a>
                              {meta?.live && (
                                <a
                                  href={meta.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={t('liveDemo')}
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
                                >
                                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </article>
                      </Stagger>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {slideCount > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground opacity-100 shadow-md backdrop-blur transition-all hover:text-foreground sm:left-0 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <FaChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground opacity-100 shadow-md backdrop-blur transition-all hover:text-foreground sm:right-0 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <FaChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2">
              {groups.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-7 bg-primary'
                      : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}