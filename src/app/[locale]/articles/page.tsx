import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {FaArrowRight, FaCalendarAlt} from 'react-icons/fa';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Reveal from '@/components/Reveal';

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
  const items = t.raw('items') as Array<{
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
  }>;

  return (
    <Reveal className="mx-auto w-full max-w-[84rem] px-4 py-16 sm:px-6">
      <div className="space-y-3 pb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t('title')}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('heading')}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.slug}
            className="glass flex flex-col gap-3 rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] font-semibold text-indigo-500">
              {item.category}
            </span>
            <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              {item.excerpt}
            </p>
            <div className="flex items-center justify-between border-t border-border/50 pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <FaCalendarAlt className="h-3 w-3" />
                {item.date}
              </span>
              <Link
                href={`/articles/${item.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {t('readMore')}
                <FaArrowRight className="h-3 w-3 rtl:rotate-180" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  );
}