"use client";

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import Languages from '@/components/Languages';
import Modes from '@/components/Modes';
import {site} from '@/data/site';
import {Download, Menu, X} from 'lucide-react';

const NAV_ITEMS = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/services', key: 'services'},
  {href: '/projects', key: 'projects'},
  {href: '/articles', key: 'articles'},
  {href: '/contact', key: 'contactMe'}
] as const;

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full pt-3">
      {/* Scroll progress indicator */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-[width] duration-150 ease-out"
          style={{width: `${progress}%`}}
        />
      </div>

      <div className="mx-auto w-full max-w-[84rem] px-2.5 sm:px-6">
        <nav
          className={`relative flex w-full items-center justify-between gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-background/80 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] sm:gap-3 sm:px-5 sm:py-2 ${
            scrolled
              ? 'border-border/80 bg-background/95 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:bg-background/90 dark:border-white/15 dark:shadow-[0_12px_36px_rgba(0,0,0,0.4)]'
              : ''
          }`}
        >
          {/* Brand / Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-1.5 transition-transform hover:opacity-95 sm:gap-2.5">
            <span className="relative inline-flex shrink-0">
              <span className="relative flex h-8 w-8 overflow-hidden rounded-full ring-2 ring-border/80 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/50 sm:h-10 sm:w-10">
                <Image
                  src={Logo}
                  alt={`${t('nameFirst')} ${t('nameLast')}`}
                  height={40}
                  width={40}
                  className="h-full w-full object-cover"
                  priority
                />
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center" title="Available for work">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              </span>
            </span>
            <span className="text-xs font-bold tracking-tight text-foreground sm:text-lg">
              {t('nameFirst')}
              <span className="hidden min-[380px]:inline bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-sky-400 dark:to-indigo-300">
                {' '}
                {t('nameLast')}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-2 rounded-full border border-border/40 bg-muted/35 p-1 backdrop-blur-sm dark:bg-muted/20">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative inline-flex whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                        active
                          ? 'bg-background text-foreground shadow-xs font-semibold dark:bg-card dark:text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-muted/50'
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Languages />
            <Modes />
            <a
              href={site.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden whitespace-nowrap items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-500/25 transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
              <span>{t('downloadCV')}</span>
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground transition-all hover:bg-accent hover:border-border hover:text-foreground sm:h-9 sm:w-9 lg:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="animate-dropdown mt-2 overflow-hidden rounded-3xl border border-border/70 bg-background/95 p-3 shadow-2xl shadow-black/10 backdrop-blur-2xl lg:hidden">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span>{t(item.key)}</span>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 pt-3 border-t border-border/60 sm:hidden">
              <a
                href={site.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all"
              >
                <Download className="h-4 w-4" />
                <span>{t('downloadCV')}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}