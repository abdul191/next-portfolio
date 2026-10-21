import {FaArrowRight, FaHome} from 'react-icons/fa';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-[84rem] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="text-gradient text-7xl font-extrabold tracking-tight sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t('description')}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          <FaHome className="h-4 w-4" />
          {t('backHome')}
        </Link>
        <Link href="/projects" className="btn-outline">
          {t('viewProjects')}
          <FaArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
