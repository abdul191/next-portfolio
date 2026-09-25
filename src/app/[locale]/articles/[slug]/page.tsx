import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {FaArrowLeft, FaCalendarAlt} from 'react-icons/fa';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import Reveal from '@/components/Reveal';

const SLUGS = [
  'react-performance-tips',
  'responsive-layouts',
  'modern-css-tips',
  'use-effect-patterns',
  'css-grid-vs-flexbox',
  'design-systems'
];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SLUGS.map((slug) => ({locale, slug})));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({locale, namespace: 'Articles'});
  const items = t.raw('items') as Array<{slug: string; title: string; tagline: string}>;
  const content = items.find((i) => i.slug === slug);
  if (!content) {
    return {};
  }
  return {
    title: `${content.title} — ${t('title')}`,
    description: content.tagline
  };
}

export default async function ArticleDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('Articles');
  const items = t.raw('items') as Array<{
    slug: string;
    title: string;
    tagline: string;
    category: string;
    date: string;
    excerpt: string;
    content: string[];
  }>;
  const content = items.find((i) => i.slug === slug);
  if (!content) {
    notFound();
  }

  return (
    <Reveal className="mx-auto w-full max-w-[84rem] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <FaArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          {t('backToArticles')}
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] font-semibold text-indigo-500">
            {content.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <FaCalendarAlt className="h-3 w-3" />
            {content.date}
          </span>
        </div>

        <div className="mt-4 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h1>
          <p className="text-lg text-muted-foreground">{content.tagline}</p>
        </div>

        <div className="glass mt-8 space-y-5 rounded-2xl p-6 sm:p-8">
          {content.content.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Reveal>
  );
}