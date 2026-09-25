"use client";

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  FaArrowDown,
  FaBriefcase,
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaRocket,
  FaTwitter,
  FaWhatsapp
} from 'react-icons/fa';
import {heroImage} from '@/data/project-images';
import {site} from '@/data/site';
import LottieAnimation from './LottieAnimation';

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

const CORE_STACK = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'];

const DOTS: Record<string, string> = {
  react: 'bg-cyan-400',
  mern: 'bg-emerald-400',
  responsive: 'bg-violet-400'
};

export default function Hero() {
  const t = useTranslations('Hero');
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const roles = (t.raw('roles') as string[]) ?? [];
    if (roles.length === 0) return;
    const word = roles[index % roles.length];

    const tick = () => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1600);
        return;
      }
      if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
        return;
      }
      setText(
        deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
      );
    };

    const id = setTimeout(tick, deleting ? 45 : 120);
    return () => clearTimeout(id);
  }, [text, deleting, index, t]);

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
  };

  const FloatChip = ({
    dot,
    label,
    className,
    delay
  }: {
    dot: string;
    label: string;
    className: string;
    delay: number;
  }) => (
    <span
      className={`animate-fade-up absolute ${className}`}
      style={{animationDelay: `${delay}s`}}
    >
      <span className="animate-float" style={{animationDelay: `${delay + 0.9}s`}}>
        <span className="glass inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-lg shadow-indigo-500/15">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {label}
        </span>
      </span>
    </span>
  );

  return (
    <section
      id="heroSection"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-[84rem] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
            style={{animationDelay: '0s'}}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t('availability')}
          </span>

          <h1
            className="animate-fade-up font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            style={{animationDelay: '0.07s'}}
          >
            {t('greeting')}
            <span className="text-gradient block">{t('developer')}</span>
          </h1>

          <div
            className="animate-fade-up flex h-8 items-center justify-center lg:justify-start"
            style={{animationDelay: '0.14s'}}
          >
            <p className="text-xl font-semibold text-muted-foreground">
              {text}
              <span className="ml-0.5 inline-block animate-pulse text-primary">|</span>
            </p>
          </div>

          <p
            className="animate-fade-up mx-auto max-w-xl leading-relaxed text-muted-foreground lg:mx-0"
            style={{animationDelay: '0.21s'}}
          >
            {t('description')}
          </p>

          <div
            className="animate-fade-up flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{animationDelay: '0.28s'}}
          >
            <a
              href={site.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn-primary"
            >
              <FaDownload className="h-4 w-4" />
              {t('downloadCV')}
            </a>
            <Link href="/projects" className="btn-outline">
              <FaGithub className="h-4 w-4" />
              {t('viewWork')}
            </Link>
          </div>

          <div
            className="animate-fade-up flex items-center justify-center gap-3 lg:justify-start"
            style={{animationDelay: '0.35s'}}
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
            style={{animationDelay: '0.42s'}}
          >
            {CORE_STACK.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <LottieAnimation className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="pointer-events-none absolute -inset-4 -z-10 animate-slow-spin rounded-[2.5rem] bg-[conic-gradient(from_0deg,#6366f1,#22d3ee,#a78bfa,#3b82f6,#6366f1)] opacity-50 blur-[6px]" />

            <div className="relative aspect-square w-64 overflow-hidden rounded-3xl border border-white/25 bg-[radial-gradient(circle_at_50%_32%,#eef2ff_0%,#c7d2fe_52%,#a5b4fc_100%)] p-1.5 shadow-2xl sm:w-72 lg:w-80">
              <Image
                src={heroImage}
                alt={t('greeting')}
                priority
                className="h-full w-full rounded-[1.1rem] object-cover"
              />
            </div>

            <FloatChip dot={DOTS.react} label="React.js" delay={0.45} className="-left-8 top-8 sm:-left-10 sm:top-10" />
            <FloatChip dot={DOTS.mern} label="MERN" delay={0.6} className="-right-6 top-1/3 sm:-right-8" />
            <FloatChip dot={DOTS.responsive} label="Responsive" delay={0.75} className="-bottom-3 left-8 sm:bottom-[-0.2rem] sm:left-10" />

            <span className="animate-fade-up absolute -right-5 top-1/4 sm:-right-9 sm:top-8" style={{animationDelay: '0.5s'}}>
              <span className="animate-float" style={{animationDelay: '1.3s'}}>
                <span className="glass inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg shadow-emerald-500/15">
                  <FaRocket className="h-3.5 w-3.5 text-emerald-400" />
                  7+ Projects
                </span>
              </span>
            </span>

            <span className="animate-fade-up absolute -right-6 bottom-1/2 sm:-right-10 sm:bottom-10" style={{animationDelay: '0.7s'}}>
              <span className="animate-float" style={{animationDelay: '1.6s'}}>
                <span className="glass inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg shadow-amber-500/15">
                  <FaBriefcase className="h-3.5 w-3.5 text-amber-400" />
                  4+ Years
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToId('myExpertise')}
        aria-label={t('scrollHint')}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-foreground md:block"
      >
        <FaArrowDown className="h-5 w-5" />
      </button>
    </section>
  );
}