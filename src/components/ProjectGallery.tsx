'use client';

import {useState} from 'react';
import Image from 'next/image';
import type {StaticImageData} from 'next/image';

type GalleryImage = {
  src: StaticImageData;
  alt: string;
};

export default function ProjectGallery({
  images,
  label,
  variant = 'default'
}: {
  images: GalleryImage[];
  label: string;
  variant?: 'default' | 'wide';
}) {
  const [active, setActive] = useState(0);
  const current = images[Math.min(active, images.length - 1)];
  const wide = variant === 'wide';

  if (!current) return null;

  return (
    <div>
      <div
        className={`glass relative overflow-hidden rounded-3xl ${
          wide ? 'p-2 sm:p-3' : 'p-2'
        }`}
      >
        <div className="relative overflow-hidden rounded-[1.4rem] bg-muted">
          <Image
            src={current.src}
            alt={current.alt}
            sizes="(min-width: 1024px) 72rem, 100vw"
            className={`w-full object-cover ${
              wide
                ? 'aspect-[16/10] sm:aspect-[2/1]'
                : 'aspect-[3/2]'
            }`}
          />
        </div>
      </div>

      {images.length > 1 && (
        <div
          role="group"
          aria-label={label}
          className={
            wide
              ? 'mx-auto mt-4 flex max-w-3xl gap-2 sm:gap-3'
              : 'mt-3 flex gap-2 sm:gap-3'
          }
        >
          {images.map((image, i) => (
            <button
              key={`${image.alt}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={image.alt}
              aria-pressed={i === active}
              className={`relative aspect-video flex-1 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                i === active
                  ? 'border-primary shadow-sm'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image.src}
                alt=""
                sizes="(min-width: 1024px) 12rem, 30vw"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
