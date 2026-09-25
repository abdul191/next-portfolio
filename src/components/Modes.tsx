"use client";

import {IoMoon, IoSunny} from 'react-icons/io5';
import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {useTheme} from 'next-themes';

export default function Modes() {
  const {setTheme, resolvedTheme} = useTheme();
  const t = useTranslations('Theme');
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('toggleLight') : t('toggleDark')}
      title={isDark ? t('toggleLight') : t('toggleDark')}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {isDark ? <IoMoon className="h-4 w-4" /> : <IoSunny className="h-4 w-4" />}
    </button>
  );
}
