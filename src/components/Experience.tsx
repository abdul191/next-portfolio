"use client";

import {useTranslations} from 'next-intl';
import {FaBriefcase, FaCheck, FaMapMarkerAlt} from 'react-icons/fa';
import Stagger from './Stagger';

type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
};

export default function Experience() {
  const t = useTranslations('Experience');
  const items = t.raw('items') as Job[];

  return (
    <section
      id="experience"
      className="container-section"
    >
      <div className="space-y-2 pb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t('title')}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t('heading')}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t('subtitle')}
        </p>
      </div>

      <ol className="relative mx-auto max-w-5xl border-s-2 border-indigo-500/20 ps-8 sm:ps-10">
        {items.map((job, i) => (
          <li key={job.company} className="relative pb-10 last:pb-0">
            <span className="absolute -start-[9px] top-5 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 ring-4 ring-indigo-500/20">
              <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500/40" />
            </span>

            <Stagger index={i} delay={80}>
              <div className="group relative flex gap-4 rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 sm:p-7">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/25 sm:flex">
                  <FaBriefcase className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="mt-0.5 text-sm font-medium text-primary">
                        {job.company}
                      </p>
                    </div>
                    <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                      {job.period}
                    </span>
                  </div>

                  <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FaMapMarkerAlt className="h-3 w-3" />
                    {job.location}
                  </p>

                  <ul className="space-y-2 pt-1">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <FaCheck className="mt-1 h-3 w-3 shrink-0 text-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Stagger>
          </li>
        ))}
      </ol>
    </section>
  );
}