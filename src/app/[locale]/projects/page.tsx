import Image from 'next/image';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {FaGithub, FaExternalLinkAlt} from 'react-icons/fa';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getAllProjects} from '@/data/projects';
import {projectImages} from '@/data/project-images';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
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
  const items = t.raw('items') as Array<{slug: string; title: string; tagline: string}>;
  const allProjects = getAllProjects();

  return (
    <Reveal className="mx-auto w-full max-w-[84rem] px-4 py-16 sm:px-6">
      <div className="space-y-3 pb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t('title')}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('heading')}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project) => {
          const content = items.find((i) => i.slug === project.slug);
          const img = projectImages[project.image];
          if (!content) return null;

          return (
            <article
              key={project.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={img}
                  alt={content.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="text-lg font-semibold">{content.title}</h2>
                <p className="text-sm font-medium text-primary">{content.tagline}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border/60 pt-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {t('overviewLabel')}
                  </Link>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <FaGithub className="h-3.5 w-3.5" />
                    {t('sourceCode')}
                  </a>
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
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Reveal>
  );
}