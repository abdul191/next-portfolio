"use client";

import {IoClose, IoMenu} from 'react-icons/io5';
import {FaDownload} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {usePathname} from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import Languages from '@/components/Languages';
import Modes from '@/components/Modes';
import {site} from '@/data/site';
import {routing} from '@/i18n/routing';

const NAV_ITEMS = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/services', key: 'services'},
  {href: '/projects', key: 'projects'},
  {href: '/articles', key: 'articles'},
  {href: '/contact', key: 'contactMe'}
] as const;

const LOCALE_RE = new RegExp(`^(${routing.locales.join('|')})(?=/|$)`);

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname().replace(LOCALE_RE, '') || '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    `whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px]">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500"
          style={{width: `${progress}%`}}
        />
      </div>

      <nav
        className={`relative mx-auto flex max-w-[84rem] items-center justify-between gap-2 rounded-full border border-border/70 bg-background/85 px-2.5 py-2 shadow-lg shadow-black/5 backdrop-blur-xl transition-[background-color,box-shadow,border-color] sm:gap-3 sm:px-3 ${
          scrolled ? 'border-white/20 bg-background/95 shadow-black/10 dark:border-white/10' : ''
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="relative inline-flex">
            <Image
              src={Logo}
              alt="Logo"
              height={38}
              width={38}
              className="h-9 w-9 rounded-xl object-cover sm:h-10 sm:w-10"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </span>
          <span className="text-lg font-bold tracking-tight min-[420px]:inline hidden sm:text-xl">
            Abdul<span className="text-primary"> Rehman</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass(item.href)}>
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Languages />
          <Modes />
          <a
            href={site.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-lg xl:inline-flex"
          >
            <FaDownload className="h-3.5 w-3.5" />
            {t('downloadCV')}
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
          >
            {menuOpen ? <IoClose className="h-5 w-5" /> : <IoMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="relative mx-auto mt-2 max-w-[84rem] lg:hidden">
          <ul className="animate-dropdown space-y-1 rounded-2xl border border-border/70 bg-background/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-3 py-2.5 text-center text-sm font-medium text-white shadow-md shadow-indigo-500/25"
              >
                <FaDownload className="h-3.5 w-3.5" />
                {t('downloadCV')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}