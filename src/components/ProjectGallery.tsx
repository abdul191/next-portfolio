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
  label
}: {
  images: GalleryImage[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[Math.min(active, images.length - 1)];

  if (!current) return null;

  return (
    <div>
      <div className="glass relative overflow-hidden rounded-3xl p-2">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-muted">
          <Image
            src={current.src}
            alt={current.alt}
            sizes="(min-width: 1024px) 36rem, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
      </div>

      {images.length > 1 && (
        <div
          role="group"
          aria-label={label}
          className="mt-3 flex gap-2 sm:gap-3"
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
