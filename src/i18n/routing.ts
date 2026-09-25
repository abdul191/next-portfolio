import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ur', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const {locales, defaultLocale} = routing;
