import Image from 'next/image';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaExternalLinkAlt,
  FaGithub
} from 'react-icons/fa';
import {routing} from '@/i18n/routing';
import {getAllProjects, getProjectBySlug} from '@/data/projects';
import {projectGalleries, projectImages} from '@/data/project-images';
import {getProjectColor, getProjectIcon} from '@/data/project-ui';
import ProjectGallery from '@/components/ProjectGallery';
import Reveal from '@/components/Reveal';
import Stagger from '@/components/Stagger';

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
  return routing.locales.flatMap((locale) =>
    getAllProjects().map((project) => ({locale, slug: project.slug}))
  );
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
  const t = await getTranslations({locale, namespace: 'Projects'});
  const items = t.raw('items') as ProjectContent[];
  const content = items.find((i) => i.slug === slug);
  if (!content) {
    return {};
  }
  return {
    title: `${content.title} — ${t('title')}`,
    description: content.tagline
  };
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations('Projects');
  const items = t.raw('items') as ProjectContent[];
  const content = items.find((i) => i.slug === slug);
  if (!content) {
    notFound();
  }

  const images = [
    projectImages[project.image],
    ...(projectGalleries[project.slug] ?? [])
  ].map((src, index) => ({
    src,
    alt:
      index === 0
        ? content.title
        : `${content.title} — ${t('galleryLabel')} ${index}`
  }));
  const color = getProjectColor(project.slug);
  const related = getAllProjects()
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3)
    .flatMap((item) => {
      const relatedContent = items.find((entry) => entry.slug === item.slug);
      return relatedContent ? [{project: item, content: relatedContent}] : [];
    });

  return (
    <div>
      {/* Intro */}
      <section className="mx-auto w-full max-w-[84rem] px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6">
        <Link
          href="/projects"
          className="animate-fade-up inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          style={{animationDelay: '0s'}}
        >
          <FaArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          {t('back')}
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.5fr)] lg:items-end lg:gap-8">
          <div
            className="animate-fade-up text-center lg:text-left"
            style={{animationDelay: '0.05s'}}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start">
              {project.live && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {t('liveBadge')}
                </span>
              )}
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {content.tagline}
              </p>
            </div>
            <h1 className="mt-3 max-w-4xl font-heading text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
              {content.title}
            </h1>
          </div>

          <div
            className="animate-fade-up flex flex-col items-center gap-4 lg:items-end"
            style={{animationDelay: '0.12s'}}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                  {t('liveDemo')}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <FaGithub className="h-4 w-4" />
                  {t('sourceCode')}
                </a>
              )}
              {!project.github && (
                <Link href="/contact" className="btn-outline">
                  {t('ctaButton')}
                  <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="animate-fade-up relative mt-8"
          style={{animationDelay: '0.18s'}}
        >
          <div
            aria-hidden
            className={`absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br opacity-20 blur-3xl ${color}`}
          />
          <ProjectGallery
            images={images}
            label={t('galleryLabel')}
            variant="wide"
          />
        </div>

        <div
          className="animate-fade-up mt-4"
          style={{animationDelay: '0.24s'}}
        >
          <div className="glass rounded-2xl p-2">
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 pb-2 pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('snapshotLabel')}
              </p>
              <span className="chip">{content.type}</span>
            </div>

            <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                {label: t('roleLabel'), value: content.role},
                {label: t('clientLabel'), value: content.client},
                {label: t('locationLabel'), value: content.location},
                {label: t('timelineLabel'), value: content.period}
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border/70 bg-background/40 px-3.5 py-3"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Details */}
      <Reveal className="mx-auto w-full max-w-[84rem] px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          <div className="space-y-5">
            <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${color}`}
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  {content.type}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  {t('overviewLabel')}
                </h2>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {content.overview}
              </p>
            </div>

            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/40 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {t('challengeLabel')}
                    </h3>
                    <span
                      dir="ltr"
                      className="font-mono text-[10px] font-semibold text-muted-foreground/40"
                    >
                      01
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {content.problem}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-background/40 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {t('solutionLabel')}
                    </h3>
                    <span
                      dir="ltr"
                      className="font-mono text-[10px] font-semibold text-muted-foreground/40"
                    >
                      02
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {content.solution}
                  </p>
                </div>
              </div>

              <div className="relative mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background/40 p-5">
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${color}`}
                />
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t('outcomeLabel')}
                  </h3>
                  <span
                    dir="ltr"
                    className="font-mono text-[10px] font-semibold text-muted-foreground/40"
                  >
                    03
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {content.outcome}
                </p>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {t('featuresLabel')}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {content.features.map((feature, i) => (
                  <Stagger
                    key={feature}
                    index={i}
                    delay={60}
                    className={`h-full ${
                      content.features.length % 2 === 1 &&
                      i === content.features.length - 1
                        ? 'sm:col-span-2'
                        : ''
                    }`}
                  >
                    <li className="flex h-full items-start gap-3 rounded-2xl border border-border/70 bg-background/40 p-4">
                      <span
                        className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-sm ${color}`}
                      >
                        <FaCheck className="h-3 w-3" />
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature}
                      </p>
                    </li>
                  </Stagger>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-4 self-start lg:sticky lg:top-24">
            <div className="glass rounded-2xl p-5">
              <h2 className="text-lg font-bold tracking-tight">
                {t('stackLabel')}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.live || project.github) && (
              <div className="glass rounded-2xl p-5">
                <h2 className="text-lg font-bold tracking-tight">
                  {t('projectLinks')}
                </h2>
                <div className="mt-4 space-y-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-3.5 py-2.5 text-sm font-semibold transition-colors hover:border-emerald-400/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      <span className="inline-flex items-center gap-2">
                        <FaExternalLinkAlt className="h-3.5 w-3.5" />
                        {t('liveDemo')}
                      </span>
                      <FaArrowRight className="h-3 w-3 rtl:rotate-180" />
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-3.5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <span className="inline-flex items-center gap-2">
                        <FaGithub className="h-3.5 w-3.5" />
                        {t('sourceCode')}
                      </span>
                      <FaArrowRight className="h-3 w-3 rtl:rotate-180" />
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-center">
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-blue-500/15 blur-3xl"
              />
              <h2 className="relative text-lg font-bold tracking-tight">
                {t('ctaTitle')}
              </h2>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {t('ctaDescription')}
              </p>
              <Link href="/contact" className="btn-primary relative mt-4">
                {t('ctaButton')}
                <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </aside>
        </div>
      </Reveal>

      {/* Related projects */}
      {related.length > 0 && (
        <Reveal className="mx-auto w-full max-w-[84rem] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t('title')}
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {t('moreProjects')}
              </h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {t('allProjects')}
              <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {related.map(({project: item, content: itemContent}, i) => (
              <Stagger key={item.slug} index={i} delay={60} className="h-full">
                <Link
                  href={`/projects/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={projectImages[item.image]}
                      alt={itemContent.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span
                      className={`absolute start-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${getProjectColor(item.slug)}`}
                    >
                      {getProjectIcon(item.slug)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-5">
                    <h3 className="font-bold tracking-tight transition-colors group-hover:text-primary">
                      {itemContent.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {itemContent.tagline}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-primary">
                      {t('viewProject')}
                      <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Stagger>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
