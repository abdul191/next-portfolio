"use client";

import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';

export default function PageReveal({children}: {children: ReactNode}) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="animate-page-enter motion-reduce:animate-none"
    >
      {children}
    </div>
  );
}