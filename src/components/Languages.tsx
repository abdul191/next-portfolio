"use client";

import {useState, useEffect, useRef} from "react";
import {useParams} from "next/navigation";
import {useTranslations} from "next-intl";
import {routing} from "@/i18n/routing";
import {usePathname, useRouter} from "@/i18n/navigation";
import {Globe, Check} from "lucide-react";

export default function Languages() {
  const t = useTranslations("Languages");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const flags: Record<string, string> = {
    en: "🇺🇸",
    ur: "🇵🇰",
    ar: "🇸🇦"
  };

  const labels: Record<string, string> = {
    en: "EN",
    ur: "UR",
    ar: "AR"
  };

  const locale = useParams<{locale: string}>().locale;

  const switchTo = (next: string) => {
    router.replace(pathname, {locale: next});
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label={t("chooseLanguage")}
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex h-8 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-full border border-border/60 bg-background/50 px-2 sm:px-3 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all hover:border-border hover:bg-accent/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground/80 transition-transform group-hover:rotate-12" />
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-foreground">
          {labels[locale] ?? "EN"}
        </span>
      </button>

      {open && (
        <div className="animate-dropdown absolute end-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border/70 bg-popover/95 p-1.5 text-popover-foreground shadow-xl shadow-black/10 backdrop-blur-xl">
          <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t("chooseLanguage")}
          </div>
          <div className="space-y-0.5">
            {routing.locales.map((l) => {
              const isSelected = l === locale;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => switchTo(l)}
                  className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors ${
                    isSelected
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm leading-none">{flags[l]}</span>
                    <span>{t(`options.${l}`)}</span>
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

