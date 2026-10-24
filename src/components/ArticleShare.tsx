"use client";

import {useState} from 'react';
import {FaCheck, FaLink, FaLinkedin, FaTwitter} from 'react-icons/fa';

type Labels = {
  share: string;
  copy: string;
  copied: string;
  x: string;
  linkedin: string;
};

export default function ArticleShare({
  url,
  title,
  labels
}: {
  url: string;
  title: string;
  labels: Labels;
}) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {labels.share}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/70 bg-background/50 px-3 py-2 text-xs font-semibold transition-colors hover:bg-accent"
        >
          {copied ? (
            <FaCheck className="h-3 w-3 text-emerald-500" />
          ) : (
            <FaLink className="h-3 w-3" />
          )}
          {copied ? labels.copied : labels.copy}
        </button>

        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.x}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/70 bg-background/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <FaTwitter className="h-3.5 w-3.5" />
        </a>

        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.linkedin}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/70 bg-background/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <FaLinkedin className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
