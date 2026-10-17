"use client";

import {useCallback, useEffect, useRef, useState} from 'react';
import {FaQuoteRight, FaStar} from 'react-icons/fa';
import {useLocale, useTranslations} from 'next-intl';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import LottieAnimation from './LottieAnimation';

type Testimonial = {
  description: string;
  authorName: string;
  authorDesignation: string;
  photourl?: string;
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const items = t.raw('list') as Testimonial[];

  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, count, next]);

  const gesture = (delta: number) => {
    const isNext = (delta < 0) !== isRtl;
    if (isNext) next();
    else prev();
  };

  const current = items[index];

  return (
    <section id="testimonialsSection" className="container-section pb-2 sm:pb-4">
      <div className="space-y-2 pb-12 text-center">
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
        className="group relative mx-auto max-w-4xl outline-none"
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
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-56 bg-gradient-to-b from-indigo-500/10 to-transparent blur-2xl" />
        <FaQuoteRight className="pointer-events-none absolute -top-10 end-0 h-20 w-20 text-primary/10 rtl:scale-x-[-1] sm:h-28 sm:w-28" />

        <div
          key={index}
          className="relative flex animate-fade-up flex-col items-center gap-7 text-center"
        >
          <div className="flex gap-1 text-amber-500">
            {Array.from({length: 5}).map((_, i) => (
              <FaStar key={i} className="h-4 w-4" />
            ))}
          </div>

          <blockquote className="text-xl font-medium leading-relaxed tracking-tight text-foreground sm:text-2xl sm:leading-[1.6] md:text-[1.75rem]">
            &ldquo;{current.description}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarImage src={current.photourl} alt={current.authorName} />
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {initials(current.authorName)}
              </AvatarFallback>
            </Avatar>
            <div className="text-start">
              <p className="text-sm font-semibold">{current.authorName}</p>
              <p className="text-xs text-muted-foreground">{current.authorDesignation}</p>
            </div>
          </div>
        </div>

        {count > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {items.map((item, i) => (
              <button
                key={item.authorName}
                type="button"
                aria-label={item.authorName}
                onClick={() => setIndex(i)}
                className={`relative rounded-full transition-all duration-300 ${
                  i === index
                    ? 'scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'opacity-45 grayscale hover:opacity-100 hover:grayscale-0'
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.photourl} alt={item.authorName} />
                  <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                    {initials(item.authorName)}
                  </AvatarFallback>
                </Avatar>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <LottieAnimation className="h-24 w-24 opacity-70" />
      </div>
    </section>
  );
}
