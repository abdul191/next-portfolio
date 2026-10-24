"use client";

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import emailjs from '@emailjs/browser';
import {
  FaChevronDown,
  FaCheckCircle,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaSpinner,
  FaTimesCircle,
  FaTwitter
} from 'react-icons/fa';
import {site} from '@/data/site';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? 'service_gx0f59h';
const TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? 'template_gvovijl';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

const fieldCls =
  'mt-2 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20';
const labelCls = 'block text-sm font-medium';
const pageFieldCls =
  'mt-2 w-full rounded-xl border border-border/80 bg-background/60 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/15';
const pageLabelCls =
  'block text-xs font-semibold uppercase tracking-wider text-muted-foreground';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  topic: '',
  message: ''
};

export default function ContactMe({
  variant = 'section'
}: {
  variant?: 'section' | 'page';
}) {
  const t = useTranslations('Contact');
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState(initialForm);
  const isPage = variant === 'page';
  const inputCls = isPage ? pageFieldCls : fieldCls;
  const labelClasses = isPage ? pageLabelCls : labelCls;

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((f) => ({...f, [key]: e.target.value}));
    };

  const reset = () => {
    setForm(initialForm);
    setState('idle');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!PUBLIC_KEY) {
      setState('error');
      return;
    }
    setState('sending');
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, form, {publicKey: PUBLIC_KEY})
      .then(() => setState('success'))
      .catch(() => setState('error'));
  };

  const formFields = (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClasses}>
          {t('firstName')}
          <input
            required
            type="text"
            name="firstName"
            autoComplete="given-name"
            value={form.firstName}
            onChange={set('firstName')}
            className={inputCls}
          />
        </label>

        <label className={labelClasses}>
          {t('lastName')}
          <input
            required
            type="text"
            name="lastName"
            autoComplete="family-name"
            value={form.lastName}
            onChange={set('lastName')}
            className={inputCls}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClasses}>
          {t('email')}
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={set('email')}
            className={inputCls}
          />
        </label>

        <label className={labelClasses}>
          {t('phoneNumber')}
          <input
            type="tel"
            name="phoneNumber"
            autoComplete="tel"
            value={form.phoneNumber}
            onChange={set('phoneNumber')}
            className={inputCls}
          />
        </label>
      </div>

      <label className={`${labelClasses} relative`}>
        {t('chooseTopic')}
        <select
          required
          name="topic"
          value={form.topic}
          onChange={set('topic')}
          style={{paddingInlineEnd: '2.5rem'}}
          className={`${inputCls} appearance-none`}
        >
          <option value="">{t('selectOne')}</option>
          <option value="frontend">{t('topics.frontend')}</option>
          <option value="react">{t('topics.react')}</option>
          <option value="web">{t('topics.web')}</option>
          <option value="collab">{t('topics.collab')}</option>
          <option value="general">{t('topics.general')}</option>
        </select>
        <span className="pointer-events-none absolute bottom-3 end-3.5 flex items-center text-muted-foreground/70">
          <FaChevronDown className="h-3.5 w-3.5" />
        </span>
      </label>

      <label className={labelClasses}>
        {t('message')}
        <textarea
          required
          rows={4}
          name="message"
          maxLength={500}
          placeholder={t('placeholderMessage')}
          value={form.message}
          onChange={set('message')}
          className={`${inputCls} resize-y`}
        />
      </label>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-44"
        >
          {state === 'sending' ? (
            <FaSpinner className="h-4 w-4 animate-spin" />
          ) : (
            <FaPaperPlane className="h-4 w-4" />
          )}
          {state === 'sending' ? t('sending') : t('submit')}
        </button>

        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground sm:justify-end">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t('replyNote')}
        </p>
      </div>

      {state === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="animate-in fade-in zoom-in-95 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center"
        >
          <FaCheckCircle className="mx-auto h-7 w-7 text-emerald-500" />
          <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {t('success')}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 text-xs font-semibold text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
          >
            {t('sendAnother')}
          </button>
        </div>
      )}
      {state === 'error' && (
        <div
          role="alert"
          className="animate-in fade-in zoom-in-95 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center"
        >
          <FaTimesCircle className="mx-auto h-7 w-7 text-red-500" />
          <p className="mt-2 text-sm font-semibold text-red-700 dark:text-red-300">
            {t('error')}
          </p>
        </div>
      )}
    </>
  );

  if (isPage) {
    const contactItems = [
      {
        Icon: FaEnvelope,
        label: t('emailLabel'),
        value: site.email,
        href: `mailto:${site.email}`,
        external: false
      },
      {
        Icon: FaPhoneAlt,
        label: t('phoneLabel'),
        value: site.phone,
        href: `https://wa.me/${site.whatsapp}`,
        external: true
      },
      {
        Icon: FaGlobe,
        label: t('websiteLabel'),
        value: site.website.replace(/^https?:\/\//, ''),
        href: site.website,
        external: true
      },
      {
        Icon: FaMapMarkerAlt,
        label: t('locationLabel'),
        value: t('location'),
        href: `https://maps.google.com/?q=${encodeURIComponent(t('location'))}`,
        external: true
      }
    ];

    const socials = [
      {Icon: FaGithub, label: 'GitHub', href: site.github},
      {Icon: FaLinkedinIn, label: 'LinkedIn', href: site.linkedin},
      {Icon: FaTwitter, label: 'X', href: site.twitter}
    ];

    return (
      <section id="contactMe" className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-[84rem] px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t('title')}
              </p>
              <h1 className="mt-3 max-w-xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                {t('infoTitle')}
              </h1>
              <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                {t('infoNote')}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t('availability')}
              </div>

              <div className="mt-8 space-y-2.5">
                {contactItems.map(
                  ({Icon, label, value, href, external}) => (
                    <a
                      key={label}
                      href={href}
                      {...(external
                        ? {target: '_blank', rel: 'noopener noreferrer'}
                        : {})}
                      className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-background/40 p-3 transition-colors hover:border-primary/30 hover:bg-background/70"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-semibold">
                          {value}
                        </span>
                      </span>
                    </a>
                  )
                )}
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t('socialLabel')}
                </span>
                <span className="h-px flex-1 bg-border/70" />
                <div className="flex items-center gap-2">
                  {socials.map(({Icon, label, href}) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-5">
                <div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight">
                    {t('formTitle')}
                  </h2>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t('description')}
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/20">
                  <FaPaperPlane className="h-4 w-4" />
                </span>
              </div>

              <form onSubmit={submit} noValidate className="mt-6 grid gap-4">
                {formFields}
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contactMe" className="container-section relative isolate">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -z-10 h-56 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-blue-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t('title')}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t('heading')}
        </h2>
        <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600" />
        <p className="mt-4 text-muted-foreground">{t('description')}</p>
      </div>

      <form onSubmit={submit} noValidate className="mx-auto mt-10 grid max-w-xl gap-5">
        {formFields}
      </form>

      <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 transition-colors hover:text-primary"
        >
          <FaEnvelope className="h-3.5 w-3.5 text-primary/70" />
          {site.email}
        </a>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-primary"
        >
          <FaPhoneAlt className="h-3.5 w-3.5 text-primary/70" />
          {site.phone}
        </a>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <span className="inline-flex items-center gap-2">
          <FaMapMarkerAlt className="h-3.5 w-3.5 text-primary/70" />
          {t('location')}
        </span>
      </div>
    </section>
  );
}
