"use client";

import {useState} from "react";
import {useParams} from "next/navigation";
import {useTranslations} from "next-intl";
import {routing} from "@/i18n/routing";
import {usePathname, useRouter} from "@/i18n/navigation";
import {FaGlobe} from "react-icons/fa";

export default function Languages() {
  const t = useTranslations("Languages");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const flags: Record<string, string> = {
    en: "🇺🇸",
    ur: "🇵🇰",
    ar: "🇸🇦"
  };

  const locale = useParams<{locale: string}>().locale;

  const switchTo = (next: string) => {
    router.replace(pathname, {locale: next});
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t("chooseLanguage")}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 items-center gap-1.5 rounded-md border border-border/60 px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <FaGlobe className="h-3.5 w-3.5" />
        <span>{flags[locale] ?? flags.en}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md">
            {routing.locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchTo(l)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent ${
                  l === locale ? "bg-accent font-medium" : ""
                }`}
              >
                <span>{flags[l]}</span>
                {t(`options.${l}`)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
