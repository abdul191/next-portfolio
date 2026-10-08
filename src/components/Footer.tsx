"use client";

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {FaGithub, FaLinkedin, FaTwitter, FaWhatsapp} from 'react-icons/fa';
import {site} from '@/data/site';

const SOCIALS = [
  {href: site.github, icon: FaGithub, label: 'GitHub'},
  {href: site.linkedin, icon: FaLinkedin, label: 'LinkedIn'},
  {href: site.twitter, icon: FaTwitter, label: 'X / Twitter'},
  {href: `https://wa.me/${site.whatsapp}`, icon: FaWhatsapp, label: 'WhatsApp'}
];

const QUICK_LINKS = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/services', key: 'services'},
  {href: '/projects', key: 'projects'},
  {href: '/articles', key: 'articles'},
  {href: '/contact', key: 'contactMe'}
] as const;

export default function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Navbar');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/20 bg-background/40 backdrop-blur-xl dark:border-white/10">
      <div className="mx-auto grid w-full max-w-[84rem] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight">
            {nav('nameFirst')}
            <span className="text-primary">{nav('nameLast')}</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({href, icon: Icon, label}) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:justify-self-end">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {nav('home')}
          </p>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {nav('downloadCV')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-[84rem] flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6">
          <p className="text-sm text-muted-foreground">
            © {year} {nav('nameFirst')} {nav('nameLast')}. {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}