import type {ReactElement} from 'react';
import {
  FaBoxes,
  FaCode,
  FaFileSignature,
  FaGlobe,
  FaLayerGroup,
  FaShieldAlt,
  FaShoppingCart,
  FaTachometerAlt,
  FaUserClock,
  FaWarehouse
} from 'react-icons/fa';

export const projectIcons: Record<string, ReactElement> = {
  'gtrack-esignature': <FaFileSignature className="h-5 w-5" />,
  'groute-admin': <FaTachometerAlt className="h-5 w-5" />,
  'trust-corners': <FaShieldAlt className="h-5 w-5" />,
  'rs-flavour': <FaShoppingCart className="h-5 w-5" />,
  'innovazy-suite': <FaLayerGroup className="h-5 w-5" />,
  'knk-associates': <FaBoxes className="h-5 w-5" />,
  'code-frenetics': <FaCode className="h-5 w-5" />,
  'innovazy-website': <FaGlobe className="h-5 w-5" />,
  'attendance-management': <FaUserClock className="h-5 w-5" />,
  'warehouse-management': <FaWarehouse className="h-5 w-5" />
};

export const projectColors: Record<string, string> = {
  'gtrack-esignature': 'from-indigo-500 to-blue-600',
  'groute-admin': 'from-violet-500 to-purple-600',
  'trust-corners': 'from-sky-500 to-blue-600',
  'rs-flavour': 'from-amber-500 to-orange-600',
  'innovazy-suite': 'from-cyan-500 to-sky-600',
  'knk-associates': 'from-emerald-500 to-teal-600',
  'code-frenetics': 'from-rose-500 to-pink-600',
  'innovazy-website': 'from-fuchsia-500 to-violet-600',
  'attendance-management': 'from-teal-500 to-emerald-600',
  'warehouse-management': 'from-slate-500 to-slate-700'
};

export const defaultProjectColor = 'from-indigo-500 to-blue-600';

export function getProjectColor(slug: string) {
  return projectColors[slug] ?? defaultProjectColor;
}

export function getProjectIcon(slug: string) {
  return projectIcons[slug] ?? <FaCode className="h-5 w-5" />;
}
