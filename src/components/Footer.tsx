"use client";

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  FaArrowUp,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp
} from 'react-icons/fa';
import {site} from '@/data/site';
import {aboutMeImage} from '@/data/project-images';

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
    <footer>
      <div className="mx-auto flex w-full max-w-[84rem] flex-col items-center gap-6 px-4 py-8 sm:px-6 md:flex-row md:justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 font-bold tracking-tight">
          <Image
            src={aboutMeImage}
            alt={nav('nameFirst')}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/15"
          />
          {nav('nameFirst')}
          <span className="text-primary">{nav('nameLast')}</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {nav(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {SOCIALS.map(({href, icon: Icon, label}) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-[84rem] flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {year} {nav('nameFirst')} {nav('nameLast')}. {t('madeWith')}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            {t('backToTop')}
            <FaArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
