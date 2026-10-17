"use client";

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {FaArrowRight} from 'react-icons/fa';

const CATEGORY_STYLES = [
  'bg-indigo-500/15 text-indigo-500',
  'bg-violet-500/15 text-violet-500',
  'bg-sky-500/15 text-sky-500',
  'bg-emerald-500/15 text-emerald-500'
];

type Item = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
};

export default function Articles() {
  const t = useTranslations('Articles');
  const items = t.raw('items') as Item[];

  return (
    <section id="articlesSection" className="container-section pt-4 sm:pt-6">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('title')}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('heading')}
          </h2>
          <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        </div>

        <Link
          href="/articles"
          className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
        >
          {t('viewAll')}
          <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>

      <ul className="border-t border-border/70">
        {items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/articles/${item.slug}`}
              className="group relative flex items-center gap-5 border-b border-border/70 py-6 transition-colors hover:bg-accent/40 sm:gap-8 sm:px-4"
            >
              <span className="absolute inset-y-0 start-0 w-0.5 bg-gradient-to-b from-indigo-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <span className="w-8 shrink-0 font-mono text-sm text-muted-foreground/40 transition-colors group-hover:text-primary sm:w-12">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      CATEGORY_STYLES[i % CATEGORY_STYLES.length]
                    }`}
                  >
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h3 className="mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {item.excerpt}
                </p>
              </div>

              <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:text-white sm:grid">
                <FaArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
