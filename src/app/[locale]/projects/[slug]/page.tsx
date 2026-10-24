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
      <section className="mx-auto w-full max-w-[84rem] px-4 py-6 sm:px-6 sm:py-16">
        <Link
          href="/projects"
          className="animate-fade-up inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          style={{animationDelay: '0s'}}
        >
          <FaArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          {t('back')}
        </Link>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5 text-center sm:space-y-6 lg:text-left">
            {project.live && (
              <span
                className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                style={{animationDelay: '0.05s'}}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t('liveBadge')}
              </span>
            )}

            <div
              className="animate-fade-up space-y-3"
              style={{animationDelay: '0.07s'}}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {content.tagline}
              </p>
              <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>
            </div>

            <div
              className="animate-fade-up flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{animationDelay: '0.14s'}}
            >
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

            <div
              className="animate-fade-up flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              style={{animationDelay: '0.28s'}}
            >
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            className="animate-fade-up relative mx-auto w-full max-w-xl"
            style={{animationDelay: '0.14s'}}
          >
            <div
              aria-hidden
              className={`absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br opacity-25 blur-2xl ${color}`}
            />

            <ProjectGallery images={images} label={t('galleryLabel')} />

            <div className="glass animate-float absolute -start-3 -top-5 flex items-center gap-2 rounded-2xl px-4 py-3 sm:-start-6">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md ${color}`}
              >
                {getProjectIcon(project.slug)}
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t('stackLabel')}
                </p>
                <p className="text-xs font-semibold">
                  {project.stack.slice(0, 2).join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <Reveal className="container-section">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {content.type}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {t('overviewLabel')}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {content.overview}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {[
                  {label: t('roleLabel'), value: content.role},
                  {label: t('clientLabel'), value: content.client},
                  {label: t('locationLabel'), value: content.location},
                  {label: t('timelineLabel'), value: content.period}
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border/70 bg-background/40 px-3.5 py-2.5"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t('challengeLabel')}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {content.problem}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t('solutionLabel')}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {content.solution}
                  </p>
                </div>
              </div>

              <div className="relative mt-3 overflow-hidden rounded-2xl border border-border/70 bg-background/40 p-4">
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
            </div>

            <div className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {t('featuresLabel')}
              </h2>
              <ul className="mt-5 space-y-3">
                {content.features.map((feature, i) => (
                  <Stagger key={feature} index={i} delay={60}>
                    <li className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/40 p-4">
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

          <aside className="space-y-6">
            <div className="glass rounded-3xl p-6 sm:p-8">
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

            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 text-center sm:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-blue-500/15 blur-3xl"
              />
              <h2 className="relative text-xl font-bold tracking-tight">
                {t('ctaTitle')}
              </h2>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {t('ctaDescription')}
              </p>
              <Link href="/contact" className="btn-primary relative mt-5">
                {t('ctaButton')}
                <FaArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </aside>
        </div>
      </Reveal>

      {/* Related projects */}
      {related.length > 0 && (
        <Reveal className="container-section">
          <div className="mb-8 space-y-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {t('title')}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('moreProjects')}
            </h2>
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
