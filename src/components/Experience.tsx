"use client";

import {useTranslations} from 'next-intl';
import {FaBriefcase, FaMapMarkerAlt} from 'react-icons/fa';
import {CheckCircle2} from 'lucide-react';
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

      <ol className="relative border-s-2 border-indigo-500/20 ps-6 sm:ps-10">
        {items.map((job, i) => (
          <li key={job.company} className="relative pb-8 last:pb-0">
            <span className="absolute -start-[9px] top-7 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 ring-4 ring-indigo-500/20">
              {i === 0 && (
                <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500/40" />
              )}
            </span>

            <Stagger index={i} delay={80}>
              <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-indigo-500/10 sm:p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />

                <div className="relative flex gap-4 sm:gap-5">
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105 sm:flex">
                    <FaBriefcase className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                          {job.role}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="text-sm font-medium text-primary">{job.company}</p>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <FaMapMarkerAlt className="h-3 w-3" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                        {i === 0 && (
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                        )}
                        {job.period}
                      </span>
                    </div>

                    <ul className="grid gap-x-8 gap-y-2 pt-1 lg:grid-cols-2">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Stagger>
          </li>
        ))}
      </ol>
    </section>
  );
}