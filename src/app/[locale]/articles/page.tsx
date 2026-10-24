import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {FaArrowRight, FaClock} from 'react-icons/fa';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getArticleAccent, getReadingMinutes} from '@/data/article-ui';
import Reveal from '@/components/Reveal';

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
  return routing.locales.map((locale) => ({locale}));
}

export default async function ArticlesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('Articles');
  const items = t.raw('items') as ArticleContent[];
  const featured = items[0];
  const rest = items.slice(1);

  const featuredAccent = getArticleAccent(featured.slug);
  const FeaturedIcon = featuredAccent.icon;
  const featuredMinutes = getReadingMinutes(featured.excerpt, ...featured.content);

  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.07] via-indigo-500/[0.02] to-transparent" />
        <div
          className={`absolute -end-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br ${featuredAccent.gradient} opacity-10 blur-3xl`}
        />
        <div className="absolute -start-24 top-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Reveal>
        <section className="relative">
          <div className="relative mx-auto w-full max-w-[84rem] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {t('title')}
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {t('heading')}
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground sm:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal className="mx-auto w-full max-w-[84rem] px-4 pb-10 sm:px-6 sm:pb-12">
        <Link
          href={`/articles/${featured.slug}`}
          className="glass group grid overflow-hidden rounded-3xl bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/[0.04] lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div
            className={`relative min-h-[230px] overflow-hidden bg-gradient-to-br ${featuredAccent.gradient} p-6 text-white sm:min-h-[280px] sm:p-8`}
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
            <FeaturedIcon
              aria-hidden
              className="absolute -bottom-10 -end-10 h-56 w-56 text-white/10"
            />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                  {t('featuredArticle')}
                </span>
                <span className="font-mono text-xs font-semibold text-white/70">/01</span>
              </div>

              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <FeaturedIcon className="h-6 w-6" />
                </span>
                <p className="mt-4 font-heading text-2xl font-bold leading-tight">
                  {featured.category}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                  {featured.date}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="text-primary">{featured.category}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5 font-medium">
                <FaClock className="h-3 w-3" />
                {t('readTime', {minutes: featuredMinutes})}
              </span>
            </div>

            <h2 className="mt-3 font-heading text-2xl font-bold leading-tight transition-colors group-hover:text-primary sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              {t('readMore')}
              <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>

      <Reveal className="mx-auto w-full max-w-[84rem] px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, index) => {
            const accent = getArticleAccent(item.slug);
            const Icon = accent.icon;
            const minutes = getReadingMinutes(item.excerpt, ...item.content);

            return (
              <Link
                key={item.slug}
                href={`/articles/${item.slug}`}
                className="glass group flex h-full flex-col rounded-2xl bg-white/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${accent.gradient} text-white shadow-sm`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/50">
                    {String(index + 2).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="font-semibold text-primary">{item.category}</span>
                  <span>{item.date}</span>
                </div>

                <h2 className="mt-2 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <FaClock className="h-3 w-3" />
                    {t('readTime', {minutes})}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                    {t('readMore')}
                    <FaArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
