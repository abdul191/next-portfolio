import Image from 'next/image';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {aboutMeImage} from '@/data/project-images';
import {site} from '@/data/site';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

const SOCIALS = [
  {href: site.github, icon: FaGithub, label: 'GitHub'},
  {href: site.linkedin, icon: FaLinkedin, label: 'LinkedIn'},
  {href: site.twitter, icon: FaTwitter, label: 'X / Twitter'}
];

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

  return (
    <Reveal className="mx-auto w-full max-w-[84rem] px-4 py-16 sm:px-6">
      {/* Intro */}
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('title')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('heading')}</h1>
          <p className="max-w-xl leading-relaxed text-muted-foreground">{t('intro')}</p>

          <div className="flex items-center gap-3 pt-2">
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
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/10 blur-xl" />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
            <Image
              src={aboutMeImage}
              alt={t('title')}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16">
        <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-primary">
          {t('statsTitle')}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Experience */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">{t('educationTitle')}</h2>
          {education.map((item) => (
            <div
              key={item.institution}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">{item.institution}</h3>
                {item.period && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.period}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-primary">{item.degree}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">{t('experienceTitle')}</h2>
          {experience.map((item) => (
            <div
              key={item.role}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">{item.role}</h3>
                {item.period && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.period}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-primary">{item.company}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
          {t('skillsTitle')}
        </h2>
        <div className="flex flex-wrap justify-center gap-2.5">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
          {t('detailsTitle')}
        </h2>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4"
            >
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-14">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
          {t('languagesTitle')}
        </h2>
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="rounded-2xl border border-border bg-card px-5 py-3 text-center"
            >
              <p className="font-semibold">{lang.name}</p>
              <p className="text-xs text-muted-foreground">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-14">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
          {t('certificationsTitle')}
        </h2>
        <div className="mx-auto grid max-w-3xl gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40"
            >
              <span className="text-sm font-medium">{cert.title}</span>
              <span className="text-xs text-muted-foreground">{cert.org}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('ctaTitle')}</h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">{t('ctaDescription')}</p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          {t('ctaButton')}
        </Link>
      </div>
    </Reveal>
  );
}