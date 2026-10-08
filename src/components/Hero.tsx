"use client";

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  FaArrowDown,
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp
} from 'react-icons/fa';
import {heroImage} from '@/data/project-images';
import {site} from '@/data/site';

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

const ORBITS = [
  {label: 'React.js', dot: 'bg-cyan-400', delay: 0},
  {label: 'MERN', dot: 'bg-emerald-400', delay: 5},
  {label: 'Responsive', dot: 'bg-violet-400', delay: 10}
];

const ORBIT_CSS = 'orbit 15s linear infinite';
const ORBIT_REV_CSS = 'orbit-rev 15s linear infinite';

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

  return (
    <section
      id="heroSection"
      className="relative flex items-center overflow-hidden sm:min-h-[calc(100vh-4rem)]"
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-[84rem] items-center gap-6 px-4 py-6 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-5 text-center sm:space-y-6 lg:text-left">
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
          </h1>

          <div
            className="animate-fade-up flex h-10 items-center justify-center lg:justify-start"
            style={{animationDelay: '0.14s'}}
          >
            <p className="text-2xl font-bold sm:text-3xl">
              <span className="text-gradient">{text}</span>
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
            className="animate-fade-up hidden flex-wrap items-center justify-center gap-2 sm:flex lg:justify-start"
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
            <div className="pointer-events-none absolute -inset-4 -z-10 animate-slow-spin rounded-[2.5rem] bg-[conic-gradient(from_0deg,#6366f1,#22d3ee,#a78bfa,#3b82f6,#6366f1)] opacity-50 blur-[6px]" />

            <div className="relative aspect-square w-72 overflow-hidden sm:w-80 lg:w-96">
              <Image
                src={heroImage}
                alt={t('greeting')}
                priority
                className="h-full w-full rounded-[1.1rem] object-cover"
              />
            </div>

            {ORBITS.map(({label, dot, delay}) => (
              <div
                key={label}
                className="animate-orbit absolute -inset-4 z-10 sm:-inset-7"
                style={{
                  transform: `rotate(${delay * 24}deg)`,
                  animation: `${ORBIT_CSS} ${-delay}s`
                }}
              >
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <span
                    className="animate-orbit-rev block"
                    style={{
                      transform: `rotate(${-delay * 24}deg)`,
                      animation: `${ORBIT_REV_CSS} ${-delay}s`
                    }}
                  >
                    <span className="glass inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-lg shadow-indigo-500/15">
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                      {label}
                    </span>
                  </span>
                </span>
              </div>
            ))}
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