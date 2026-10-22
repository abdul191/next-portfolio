import Image from 'next/image';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {
  FaArrowRight,
  FaCertificate,
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaTwitter,
  FaWhatsapp
} from 'react-icons/fa';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {aboutMeImage} from '@/data/project-images';
import {site} from '@/data/site';
import Reveal from '@/components/Reveal';
import Stagger from '@/components/Stagger';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({locale, namespace: 'AboutPage'});

  return {
    title: `${t('title')} — ${site.name}`,
    description: t('intro')
  };
}

const SOCIALS = [
  {href: site.github, icon: FaGithub, label: 'GitHub'},
  {href: site.linkedin, icon: FaLinkedin, label: 'LinkedIn'},
  {href: site.twitter, icon: FaTwitter, label: 'X / Twitter'},
  {
    href: `https://wa.me/${site.whatsapp}`,
    icon: FaWhatsapp,
    label: 'WhatsApp'
  }
];

function SectionHeading({
  title,
  eyebrow,
  center = false
}: {
  title: string;
  eyebrow?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <span
        aria-hidden
        className={`mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 ${
          center ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('AboutPage');
  const aboutT = await getTranslations('About');
  const heroT = await getTranslations('Hero');
  const navT = await getTranslations('Navbar');
  const stats = aboutT.raw('stats') as Array<{value: string; label: string}>;
  const education = t.raw('education') as Array<{
    institution: string;
    degree: string;
    period: string;
    description: string;
  }>;
  const experience = t.raw('experience') as Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  const tools = t.raw('tools') as string[];
  const details = t.raw('details') as Array<{label: string; value: string}>;
  const languages = t.raw('languages') as Array<{name: string; level: string}>;
  const certifications = t.raw('certifications') as Array<{
    title: string;
    org: string;
  }>;
  const coreStack = tools.slice(0, 6);

  return (
    <div>
      {/* Intro */}
      <section className="mx-auto w-full max-w-[84rem] px-4 py-6 sm:px-6 sm:py-16">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5 text-center sm:space-y-6 lg:text-left">
            <span
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
              style={{animationDelay: '0s'}}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {heroT('availability')}
            </span>

            <div
              className="animate-fade-up space-y-3"
              style={{animationDelay: '0.07s'}}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t('title')}
              </p>
              <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {t('heading')}
              </h1>
            </div>

            <p
              className="animate-fade-up mx-auto max-w-xl leading-relaxed text-muted-foreground lg:mx-0"
              style={{animationDelay: '0.14s'}}
            >
              {t('intro')}
            </p>

            <div
              className="animate-fade-up flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{animationDelay: '0.21s'}}
            >
              <a
                href={site.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-primary"
              >
                <FaDownload className="h-4 w-4" />
                {navT('downloadCV')}
              </a>
              <Link href="/contact" className="btn-outline">
                {t('ctaButton')}
                <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>

            <div
              className="animate-fade-up flex items-center justify-center gap-3 lg:justify-start"
              style={{animationDelay: '0.28s'}}
            >
              {SOCIALS.map(({href, icon: Icon, label}) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div
              className="animate-fade-up flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              style={{animationDelay: '0.35s'}}
            >
              {coreStack.map((tool) => (
                <span key={tool} className="chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div
            className="animate-fade-up relative mx-auto w-full max-w-md"
            style={{animationDelay: '0.14s'}}
          >
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/25 via-violet-500/10 to-sky-500/20 blur-2xl"
            />

            <div className="glass relative overflow-hidden rounded-3xl p-2">
              <Image
                src={aboutMeImage}
                alt={site.name}
                preload
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 100vw"
                className="aspect-square w-full rounded-[1.4rem] object-cover"
              />
            </div>

            <div className="glass animate-float absolute -start-2 top-8 rounded-2xl px-4 py-3 sm:-start-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {stats[0].label}
              </p>
              <p dir="ltr" className="text-gradient text-2xl font-extrabold">
                {stats[0].value}
              </p>
            </div>

            <div className="glass animate-float absolute -end-2 bottom-10 flex items-center gap-2 rounded-2xl px-4 py-3 sm:-end-6">
              <FaMapMarkerAlt className="h-3.5 w-3.5 shrink-0 text-primary" />
              <p className="text-xs font-semibold">{t('location')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Reveal className="container-section">
        <div className="glass rounded-3xl p-5 sm:p-8">
          <div className="px-1">
            <SectionHeading title={t('statsTitle')} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <Stagger key={stat.label} index={i} delay={60} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border/80 bg-background/50 p-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-600 opacity-70 transition-opacity group-hover:opacity-100" />
                  <p
                    dir="ltr"
                    className="bg-gradient-to-br from-indigo-500 to-blue-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl"
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </Stagger>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Experience + sidebar */}
      <Reveal className="container-section">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div>
            <SectionHeading title={t('experienceTitle')} />

            <ol className="relative mt-8 border-s-2 border-indigo-500/20 ps-6 sm:ps-8">
              {experience.map((item, i) => (
                <li key={`${item.role}-${item.company}`} className="relative pb-6 last:pb-0">
                  <span className="absolute -start-[9px] top-6 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 ring-4 ring-indigo-500/20">
                    {i === 0 && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500/40" />
                    )}
                  </span>

                  <Stagger index={i} delay={70}>
                    <article className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg sm:p-6">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-60 transition-opacity group-hover:opacity-100" />

                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                            {item.role}
                          </h3>
                          <p className="mt-0.5 text-sm font-medium text-primary">
                            {item.company}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                          {i === 0 && (
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                          )}
                          {item.period}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </article>
                  </Stagger>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <Stagger index={0} delay={60}>
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-bold tracking-tight">
                  {t('educationTitle')}
                </h2>
                <div className="mt-4 space-y-5">
                  {education.map((item) => (
                    <div
                      key={item.institution}
                      className="rounded-xl border border-border/70 bg-background/40 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-semibold">{item.institution}</h3>
                        {item.period && (
                          <span
                            dir="ltr"
                            className="text-[11px] font-medium text-muted-foreground"
                          >
                            {item.period}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-medium text-primary">
                        {item.degree}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Stagger>

            <Stagger index={1} delay={60}>
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-bold tracking-tight">
                  {t('detailsTitle')}
                </h2>
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  {details.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-border/70 bg-background/40 px-4 py-3"
                    >
                      <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Stagger>

            <Stagger index={2} delay={60}>
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-bold tracking-tight">
                  {t('languagesTitle')}
                </h2>
                <ul className="mt-4 space-y-3">
                  {languages.map((lang) => (
                    <li
                      key={lang.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-4 py-2.5"
                    >
                      <span className="text-sm font-semibold">{lang.name}</span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Stagger>
          </div>
        </div>
      </Reveal>

      {/* Tools + certifications */}
      <Reveal className="container-section">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <SectionHeading title={t('skillsTitle')} />
            <div className="mt-6 flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <Stagger key={tool} index={i} delay={20}>
                  <span className="chip transition-colors hover:border-primary/40 hover:text-foreground">
                    {tool}
                  </span>
                </Stagger>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8">
            <SectionHeading title={t('certificationsTitle')} />
            <ul className="mt-6 space-y-4">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex items-start gap-3">
                  <FaCertificate className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold leading-snug">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {cert.org}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal className="container-section">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-48 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-blue-500/15 blur-3xl"
          />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            {t('ctaTitle')}
          </h2>
          <p className="relative mx-auto mt-2 max-w-md text-muted-foreground">
            {t('ctaDescription')}
          </p>
          <Link
            href="/contact"
            className="btn-primary relative mt-6"
          >
            {t('ctaButton')}
            <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
