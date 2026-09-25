import type {Metadata} from 'next';
import {Inter, JetBrains_Mono, Noto_Sans_Arabic, Space_Grotesk} from 'next/font/google';
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

const notoSansArabic = Noto_Sans_Arabic({
  variable: '--font-noto-arabic',
  subsets: ['arabic'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Abdul Rehman — Frontend & React Developer',
  description:
    'Portfolio of Abdul Rehman, a skilled Frontend & React.js Developer passionate about building engaging digital experiences.'
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSansArabic.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
