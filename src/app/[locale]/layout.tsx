import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {ThemeProvider} from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Whatsapp from '@/components/Whatsapp';
import PageReveal from '@/components/PageReveal';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// Enable static rendering for all supported locales
export function generateLocaleMetadata() {
  return {};
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // This enables static rendering for the current locale
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = locale === 'ar' || locale === 'ur';

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange
        defaultTheme="system"
      >
        <div dir={isRtl ? 'rtl' : 'ltr'} className="relative isolate flex min-h-screen flex-col">
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/20" />
            <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-500/15" />
            <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl dark:bg-cyan-500/10" />
            <div className="absolute right-1/3 top-2/3 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl dark:bg-amber-400/10" />
          </div>
          <Navbar />
          <main className="flex-1">
            <PageReveal>{children}</PageReveal>
          </main>
          <Footer />
          <Whatsapp />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
