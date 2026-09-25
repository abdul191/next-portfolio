"use client";

import {useCallback, useEffect, useRef, useState} from 'react';
import {FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar} from 'react-icons/fa';
import {useLocale, useTranslations} from 'next-intl';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import LottieAnimation from './LottieAnimation';

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const items = t.raw('list') as Array<{
    description: string;
    authorName: string;
    authorDesignation: string;
    photourl?: string;
  }>;

  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % count),
    [count]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, count, next]);

  const initials = (name: string) =>
    name
      .split(' ')
      .map((p) => p[0] ?? '')
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const gesture = (delta: number) => {
    const isNext = (delta < 0) !== isRtl;
    if (isNext) next();
    else prev();
  };

  return (
    <section
      id="testimonialsSection"
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
        <div className="relative overflow-hidden rounded-3xl">
          <div
            className="flex touch-pan-y select-none transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${isRtl ? '' : '-'}${index * 100}%)`
            }}
          >
            {items.map((item) => (
              <div key={item.authorName} className="w-full shrink-0 px-1 py-2 sm:px-8">
                <figure className="glass mx-auto flex max-w-3xl flex-col gap-5 rounded-3xl p-8 transition-shadow hover:shadow-xl sm:p-10">
                  <div className="flex items-center justify-between">
                    <FaQuoteLeft className="h-7 w-7 text-primary/40" />
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({length: 5}).map((_, i) => (
                        <FaStar key={i} className="h-3.5 w-3.5" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="flex-1 text-base leading-relaxed text-muted-foreground">
                    &ldquo;{item.description}&rdquo;
                  </blockquote>

                  <figcaption className="flex items-center gap-3 border-t border-border/60 pt-5">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={item.photourl} alt={item.authorName} />
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                        {initials(item.authorName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{item.authorName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.authorDesignation}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
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
              {items.map((item, i) => (
                <button
                  key={item.authorName}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-7 bg-primary'
                      : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <LottieAnimation className="h-24 w-24 opacity-70" />
      </div>
    </section>
  );
}