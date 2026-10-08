import type {Metadata} from 'next';
import {
  Cairo,
  Inter,
  JetBrains_Mono,
  Noto_Nastaliq_Urdu,
  Space_Grotesk
} from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap'
});

const cairo = Cairo({
  variable: '--font-arabic',
  subsets: ['arabic'],
  display: 'swap'
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  variable: '--font-urdu',
  subsets: ['arabic'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Abdul Rehman — Full Stack Software Developer',
  description:
    'Portfolio of Abdul Rehman, a Full Stack Developer based in Riyadh building scalable web and mobile applications with React, Next.js, TypeScript, Node.js, PostgreSQL and MSSQL.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cairo.variable} ${notoNastaliq.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
