"use client";

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {FaArrowRight, FaCalendarAlt} from 'react-icons/fa';

const CATEGORY_STYLES = [
  'bg-indigo-500/15 text-indigo-500',
  'bg-violet-500/15 text-violet-500',
  'bg-sky-500/15 text-sky-500',
  'bg-emerald-500/15 text-emerald-500'
];

export default function Articles() {
  const t = useTranslations('Articles');
  const items = t.raw('items') as Array<{
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
  }>;

  return (
    <section
      id="articlesSection"
      className="container-section"
    >
      <div className="space-y-2 pb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t('title')}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('heading')}</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <article
            key={item.slug}
            className="glass group relative flex flex-col gap-3 rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  CATEGORY_STYLES[i % CATEGORY_STYLES.length]
                }`}
              >
                {item.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <FaCalendarAlt className="h-3 w-3" />
                {item.date}
              </span>
            </div>

            <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              {item.excerpt}
            </p>

            <Link
              href={`/articles/${item.slug}`}
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {t('readMore')}
              <FaArrowRight className="h-3 w-3 rtl:rotate-180" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}