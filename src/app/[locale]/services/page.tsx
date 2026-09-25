import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Services from '@/components/Services';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <div className="pt-8">
      <Services />
    </div>
  );
}