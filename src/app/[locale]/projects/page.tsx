import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {
  FaArrowRight,
  FaCheck,
  FaExternalLinkAlt,
  FaGithub
} from 'react-icons/fa';
import {routing} from '@/i18n/routing';
import {getAllProjects} from '@/data/projects';
import {projectGalleries, projectImages} from '@/data/project-images';
import {getProjectColor} from '@/data/project-ui';
import {site} from '@/data/site';
import ProjectGallery from '@/components/ProjectGallery';
import Reveal from '@/components/Reveal';

type ProjectContent = {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  outcome: string;
  role: string;
  period: string;
  type: string;
  client: string;
  location: string;
  features: string[];
};

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
  const t = await getTranslations({locale, namespace: 'Projects'});

  return {
    title: `${t('heading')} — ${site.name}`,
    description: t('subtitle')
  };
}

export default async function ProjectsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('Projects');
  const navT = await getTranslations('Navbar');
  const items = t.raw('items') as ProjectContent[];
  const allProjects = getAllProjects();
  const liveCount = allProjects.filter((project) => project.live).length;
  const technologies = new Set(allProjects.flatMap((project) => project.stack));

  const stats = [
    {value: allProjects.length, label: t('caseStudies')},
    {value: liveCount, label: t('liveDeployments')},
    {value: technologies.size, label: t('technologiesUsed')}
  ];

  return (
    <div>
      {/* Compact header */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-[84rem] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-20">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div className="space-y-4">
              <p className="animate-fade-up text-sm font-semibold uppercase tracking-widest text-primary">
                {t('title')}
              </p>
              <h1 className="animate-fade-up font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {t('heading')}
              </h1>
              <p className="animate-fade-up max-w-2xl leading-relaxed text-muted-foreground">
                {t('subtitle')}
              </p>
              <div className="animate-fade-up flex flex-wrap gap-3 pt-1">
                <Link href="/contact" className="btn-primary">
                  {t('ctaButton')}
                  <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
                <a
                  href={site.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-outline"
                >
                  {navT('downloadCV')}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-3 text-center sm:p-4"
                >
                  <p
                    dir="ltr"
                    className="text-gradient text-2xl font-extrabold tracking-tight sm:text-3xl"
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label={t('title')} className="mt-8 flex flex-wrap gap-2">
            {allProjects.map((project, index) => {
              const content = items.find((item) => item.slug === project.slug);
              if (!content) return null;

              return (
                <a
                  key={project.slug}
                  href={`#${project.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <span
                    dir="ltr"
                    className="tabular-nums text-primary/70"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {content.title}
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Case studies */}
      {allProjects.map((project, index) => {
        const content = items.find((item) => item.slug === project.slug);
        if (!content) return null;

        const color = getProjectColor(project.slug);
        const reversed = index % 2 === 1;
        const images = [projectImages[project.image], ...(projectGalleries[project.slug] ?? [])].map(
          (src, imageIndex) => ({
            src,
            alt:
              imageIndex === 0
                ? content.title
                : `${content.title} — ${t('galleryLabel')} ${imageIndex}`
          })
        );

        return (
          <Reveal key={project.slug}>
            <article
              id={project.slug}
              className={`container-section scroll-mt-24 ${
                index > 0 ? 'border-t border-border/50' : ''
              }`}
            >
              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                <div
                  className={`self-start lg:sticky lg:top-24 ${
                    reversed ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative">
                    <div
                      aria-hidden
                      className={`absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br opacity-20 blur-2xl ${color}`}
                    />
                    <ProjectGallery images={images} label={t('galleryLabel')} />

                    {project.live && (
                      <span className="absolute start-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 backdrop-blur dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {t('liveBadge')}
                      </span>
                    )}
                  </div>

                  <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      {label: t('roleLabel'), value: content.role},
                      {label: t('clientLabel'), value: content.client},
                      {label: t('locationLabel'), value: content.location},
                      {label: t('timelineLabel'), value: content.period}
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-border/70 bg-background/40 px-2.5 py-2"
                      >
                        <dt className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </dt>
                        <dd className="mt-0.5 text-xs font-semibold leading-snug">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className={reversed ? 'lg:order-1' : ''}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">{content.type}</span>
                    <span className="chip">{content.period}</span>
                    <span
                      dir="ltr"
                      className="ms-auto text-4xl font-black leading-none tabular-nums text-muted-foreground/15 sm:text-5xl"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {content.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-primary sm:text-base">
                    {content.tagline}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {t('challengeLabel')}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {content.problem}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {t('solutionLabel')}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {content.solution}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-3 overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-4">
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${color}`}
                    />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {t('outcomeLabel')}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {content.outcome}
                    </p>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-sm font-bold tracking-tight">
                      {t('featuresLabel')}
                    </h3>
                    <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
                      {content.features.map((feature) => (
                        <li
                          key={feature}
                          className="inline-flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                        >
                          <FaCheck className="mt-1 h-3 w-3 shrink-0 text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      {t('viewProject')}
                      <FaArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </Link>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-500"
                      >
                        <FaExternalLinkAlt className="h-3 w-3" />
                        {t('liveDemo')}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <FaGithub className="h-3.5 w-3.5" />
                        {t('sourceCode')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}

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
          <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
            {t('ctaDescription')}
          </p>
          <Link href="/contact" className="btn-primary relative mt-6">
            {t('ctaButton')}
            <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
