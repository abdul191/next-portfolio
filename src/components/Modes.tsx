"use client";

import {Sun, Moon} from 'lucide-react';
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

  if (!mounted) {
    return (
      <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-border/60 bg-background/50 opacity-0" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('toggleLight') : t('toggleDark')}
      title={isDark ? t('toggleLight') : t('toggleDark')}
      className="group inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-border hover:bg-accent/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {isDark ? (
        <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:-rotate-12 text-indigo-400" />
      ) : (
        <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:rotate-45 text-amber-500" />
      )}
    </button>
  );
}

