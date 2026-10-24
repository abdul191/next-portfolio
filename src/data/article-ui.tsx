import type {IconType} from 'react-icons';
import {FaCss3Alt, FaLayerGroup, FaReact} from 'react-icons/fa';

type ArticleAccent = {
  icon: IconType;
  gradient: string;
};

const accents: Record<'react' | 'css' | 'frontend', ArticleAccent> = {
  react: {
    icon: FaReact,
    gradient: 'from-cyan-500 via-sky-500 to-blue-600'
  },
  css: {
    icon: FaCss3Alt,
    gradient: 'from-sky-500 via-indigo-500 to-blue-700'
  },
  frontend: {
    icon: FaLayerGroup,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-600'
  }
};

export function getReadingMinutes(...parts: string[]) {
  const words = parts.join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 180));
}

export function getArticleAccent(slug: string) {
  if (slug === 'react-performance-tips' || slug === 'use-effect-patterns') {
    return accents.react;
  }
  if (slug === 'design-systems') {
    return accents.frontend;
  }
  return accents.css;
}
