"use client";

import {useTranslations} from 'next-intl';
import {FaWhatsapp} from 'react-icons/fa6';

export default function Whatsapp() {
  const t = useTranslations('Whatsapp');
  const phone = '923335942681';

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(t('message'))}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('label')}
      title={t('label')}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/25 transition-transform hover:scale-110"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
