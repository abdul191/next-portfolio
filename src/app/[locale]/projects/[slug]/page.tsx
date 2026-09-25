import Image from 'next/image';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCheck} from 'react-icons/fa';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {getAllProjects, getProjectBySlug} from '@/data/projects';
import {projectImages} from '@/data/project-images';
import Reveal from '@/components/Reveal';

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
  const items = t.raw('items') as Array<{slug: string; title: string; tagline: string}>;
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
  const items = t.raw('items') as Array<{
    slug: string;
    title: string;
    tagline: string;
    overview: string;
    features: string[];
  }>;
  const content = items.find((i) => i.slug === slug);
  if (!content) {
    notFound();
  }

  const img = projectImages[project.image];

  return (
    <Reveal className="mx-auto w-full max-w-[84rem] px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <FaArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
        {t('back')}
      </Link>

      <div className="mt-6 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {content.tagline}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{content.title}</h1>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-xl">
        <Image
          src={img}
          alt={content.title}
          priority
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h2 className="text-xl font-semibold">{t('overviewLabel')}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {content.overview}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t('featuresLabel')}</h2>
            <ul className="mt-3 space-y-2.5">
              {content.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <FaCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {t('stackLabel')}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              <FaGithub className="h-4 w-4" />
              {t('sourceCode')}
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                <FaExternalLinkAlt className="h-3.5 w-3.5" />
                {t('liveDemo')}
              </a>
            )}
          </div>
        </aside>
      </div>
    </Reveal>
  );
}