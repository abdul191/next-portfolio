import Image from 'next/image';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaChevronRight,
  FaClock,
  FaLightbulb
} from 'react-icons/fa';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {getArticleAccent, getReadingMinutes} from '@/data/article-ui';
import {aboutMeImage} from '@/data/project-images';
import {site} from '@/data/site';
import ArticleShare from '@/components/ArticleShare';
import Reveal from '@/components/Reveal';

const SLUGS = [
  'react-performance-tips',
  'responsive-layouts',
  'modern-css-tips',
  'use-effect-patterns',
  'css-grid-vs-flexbox',
  'design-systems'
];

type ArticleContent = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  date: string;
  excerpt: string;
  content: string[];
};

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
  const items = t.raw('items') as ArticleContent[];
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
  const items = t.raw('items') as ArticleContent[];
  const content = items.find((i) => i.slug === slug);
  if (!content) {
    notFound();
  }

  const accent = getArticleAccent(content.slug);
  const ArticleIcon = accent.icon;
  const articleNumber = String(items.findIndex((i) => i.slug === content.slug) + 1).padStart(
    2,
    '0'
  );

  const minutes = getReadingMinutes(content.excerpt, ...content.content);

  const hasTakeaway = content.content.length > 2;
  const body = hasTakeaway ? content.content.slice(0, -1) : content.content;
  const takeaway = hasTakeaway ? content.content[content.content.length - 1] : null;
  const lede = body[0];
  const rest = body.slice(1);

  const related = items
    .filter((item) => item.slug !== content.slug)
    .sort(
      (a, b) =>
        Number(b.category === content.category) - Number(a.category === content.category)
    )
    .slice(0, 3);
  const more = related.slice(0, 2);
  const shareUrl = `${site.website}/${locale}/articles/${content.slug}`;

  return (
    <div>
      <Reveal>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className={`pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${accent.gradient} opacity-15 blur-3xl`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -start-24 top-1/2 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-[84rem] px-4 pb-10 pt-6 sm:px-6 sm:pb-16 sm:pt-10">
            <nav
              aria-label={t('title')}
              className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Link href="/" className="shrink-0 transition-colors hover:text-foreground">
                {t('breadcrumbHome')}
              </Link>
              <FaChevronRight className="h-2.5 w-2.5 shrink-0 rtl:rotate-180" />
              <Link
                href="/articles"
                className="shrink-0 transition-colors hover:text-foreground"
              >
                {t('title')}
              </Link>
              <FaChevronRight className="h-2.5 w-2.5 shrink-0 rtl:rotate-180" />
              <span className="truncate text-foreground">{content.category}</span>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                  <span
                    className={`inline-flex items-center rounded-full bg-gradient-to-r ${accent.gradient} px-3 py-1 text-[11px] font-semibold text-white shadow-sm`}
                  >
                    {content.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaCalendarAlt className="h-3 w-3" />
                    {content.date}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="inline-flex items-center gap-1.5">
                    <FaClock className="h-3 w-3" />
                    {t('readTime', {minutes})}
                  </span>
                </div>

                <h1 className="mt-5 font-heading text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                  {content.title}
                </h1>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground sm:text-lg">
                  {content.tagline}
                </p>

                <div className="mt-7 flex items-center gap-3 border-t border-border/60 pt-5">
                  <Image
                    src={aboutMeImage}
                    alt={site.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {t('writtenBy')}
                    </p>
                    <p className="text-sm font-semibold">{site.name}</p>
                  </div>
                  <span className="ms-auto hidden text-xs text-muted-foreground sm:inline">
                    {t('authorRole')}
                  </span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div
                  aria-hidden
                  className={`absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br ${accent.gradient} opacity-20 blur-3xl`}
                />
                <div
                  className={`relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${accent.gradient} p-6 text-white shadow-2xl sm:aspect-[16/10]`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
                      backgroundSize: '18px 18px'
                    }}
                  />
                  <ArticleIcon
                    aria-hidden
                    className="absolute -bottom-10 -end-10 h-56 w-56 text-white/10"
                  />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                        {t('articleLabel')}
                      </span>
                      <span className="font-mono text-xs font-semibold text-white/70">
                        /{articleNumber}
                      </span>
                    </div>

                    <div>
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                        <ArticleIcon className="h-6 w-6" />
                      </span>
                      <p className="mt-4 font-heading text-2xl font-bold leading-tight">
                        {content.category}
                      </p>
                      <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                        {content.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal className="mx-auto w-full max-w-[84rem] px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
          <article>
            <div className="glass rounded-[2rem] p-6 sm:p-9 lg:p-10">
              <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                {lede}
              </p>

              {rest.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-5 leading-[1.8] text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}

              {takeaway && (
                <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 sm:p-6">
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 start-0 w-1 bg-gradient-to-b ${accent.gradient}`}
                  />
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    <FaLightbulb className="h-3.5 w-3.5" />
                    {t('keyTakeaway')}
                  </p>
                  <p className="mt-3 text-base font-medium leading-relaxed text-foreground">
                    {takeaway}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                <FaArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
                {t('backToArticles')}
              </Link>
              <div className="flex flex-wrap gap-2">
                <span className="chip">{content.category}</span>
                <span className="chip">{t('readTime', {minutes})}</span>
              </div>
            </div>
          </article>

          <aside className="space-y-4 self-start lg:sticky lg:top-24">
            <div className="glass rounded-2xl p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('articleDetails')}
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  {label: t('published'), value: content.date},
                  {label: t('categoryLabel'), value: content.category},
                  {label: t('readingTime'), value: t('readTime', {minutes})}
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between gap-3"
                  >
                    <dt className="text-muted-foreground">{item.label}</dt>
                    <dd className="text-end font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="glass rounded-2xl p-5">
              <ArticleShare
                url={shareUrl}
                title={content.title}
                labels={{
                  share: t('shareArticle'),
                  copy: t('copyLink'),
                  copied: t('copied'),
                  x: t('shareOnX'),
                  linkedin: t('shareOnLinkedIn')
                }}
              />
            </div>

            <div className="glass rounded-2xl p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('relatedArticles')}
              </h2>
              <ul className="mt-3 divide-y divide-border/60">
                {related.map((item) => (
                  <li key={item.slug} className="py-3 first:pt-0 last:pb-0">
                    <Link href={`/articles/${item.slug}`} className="group block">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {item.category}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Reveal>

      <Reveal className="mx-auto w-full max-w-[84rem] px-4 pb-16 sm:px-6">
        <div className="border-t border-border/60 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t('title')}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {t('moreArticles')}
              </h2>
            </div>
            <Link
              href="/articles"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {t('viewAll')}
              <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {more.map((item) => {
              const itemAccent = getArticleAccent(item.slug);
              const ItemIcon = itemAccent.icon;

              return (
                <Link
                  key={item.slug}
                  href={`/articles/${item.slug}`}
                  className="glass group flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${itemAccent.gradient} text-white shadow-sm`}
                  >
                    <ItemIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span className="font-semibold text-primary">{item.category}</span>
                      <span>{item.date}</span>
                    </span>
                    <span className="mt-1.5 block text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                      {item.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                      {item.excerpt}
                    </span>
                  </span>
                  <FaArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground rtl:rotate-180" />
                </Link>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
