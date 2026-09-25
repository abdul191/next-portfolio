"use client";

import {useSyncExternalStore} from 'react';
import {Lottie} from 'lottie-react';
import rings from '@/animations/rings.json';

const MQ_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(cb: () => void) {
  const mq = window.matchMedia(MQ_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

function getSnapshot() {
  return window.matchMedia(MQ_QUERY).matches;
}

export default function LottieAnimation({className = ''}: {className?: string}) {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, () => false);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Lottie
        src={rings}
        loop={!reduced}
        autoplay={!reduced}
        style={{width: '100%', height: '100%'}}
      />
    </div>
  );
}