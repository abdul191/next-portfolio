'use client';

import {useEffect} from 'react';
import {FaHome, FaRedo} from 'react-icons/fa';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function ErrorPage({
  error,
  retry
}: {
  error: Error & {digest?: string};
  retry: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-[84rem] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="text-gradient text-6xl font-extrabold tracking-tight sm:text-7xl">
        500
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t('description')}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => retry()} className="btn-primary">
          <FaRedo className="h-3.5 w-3.5" />
          {t('retry')}
        </button>
        <Link href="/" className="btn-outline">
          <FaHome className="h-4 w-4" />
          {t('backHome')}
        </Link>
      </div>
    </section>
  );
}
