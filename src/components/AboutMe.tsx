"use client";

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {FaArrowRight} from 'react-icons/fa';
import {aboutMeImage} from '@/data/project-images';

export default function AboutMe() {
  const t = useTranslations('About');
  const stats = t.raw('stats') as Array<{value: string; label: string}>;

  return (
    <section id="aboutMe" className="container-section">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 blur-xl" />
          <div className="glass overflow-hidden rounded-3xl p-1.5">
            <Image
              src={aboutMeImage}
              alt={t('heading')}
              className="aspect-square w-full rounded-[1.1rem] object-cover"
            />
          </div>

          <div className="glass absolute -bottom-5 -right-2 rounded-xl px-4 py-3 sm:-right-4">
            <p className="text-xs text-muted-foreground">{stats[0].label}</p>
            <p className="text-xl font-bold text-primary">{stats[0].value}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {t('sectionTitle')}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('heading')}</h2>
          </div>
          <p className="leading-relaxed text-muted-foreground">{t('description1')}</p>
          <p className="leading-relaxed text-muted-foreground">{t('description2')}</p>

          <div className="grid grid-cols-3 gap-3 pt-2 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-4 text-center backdrop-blur-lg"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {t('learnMore')}
            <FaArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}