import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {hasLocale} from "next-intl";
import AboutMe from "@/components/AboutMe";
import Articles from "@/components/Articles";
import ContactMe from "@/components/ContactMe";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Reveal from "@/components/Reveal";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params     ;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal delay={80}>
        <Skills />
      </Reveal>
      <Reveal delay={120}>
        <Services />
      </Reveal>
      <Reveal delay={80}>
        <Experience />
      </Reveal>
      <Reveal delay={80}>
        <AboutMe />
      </Reveal>
      <Reveal delay={80}>
        <Portfolio />
      </Reveal>
      <Reveal delay={80}>
        <Testimonials />
      </Reveal>
      <Reveal delay={80}>
        <Articles />
      </Reveal>
      <Reveal delay={80}>
        <ContactMe />
      </Reveal>
    </>
  );
}
