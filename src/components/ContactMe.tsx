"use client";

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import emailjs from '@emailjs/browser';
import {
  FaChevronDown,
  FaCheckCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaSpinner,
  FaTimesCircle
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

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  topic: '',
  message: ''
};

export default function ContactMe() {
  const t = useTranslations('Contact');
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState(initialForm);

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
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelCls}>
            {t('firstName')}
            <input
              required
              type="text"
              name="firstName"
              autoComplete="given-name"
              value={form.firstName}
              onChange={set('firstName')}
              className={fieldCls}
            />
          </label>

          <label className={labelCls}>
            {t('lastName')}
            <input
              required
              type="text"
              name="lastName"
              autoComplete="family-name"
              value={form.lastName}
              onChange={set('lastName')}
              className={fieldCls}
            />
          </label>
        </div>

        <label className={labelCls}>
          {t('email')}
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={set('email')}
            className={fieldCls}
          />
        </label>

        <label className={labelCls}>
          {t('phoneNumber')}
          <input
            type="tel"
            name="phoneNumber"
            autoComplete="tel"
            value={form.phoneNumber}
            onChange={set('phoneNumber')}
            className={fieldCls}
          />
        </label>

        <label className={`${labelCls} relative`}>
          {t('chooseTopic')}
          <select
            required
            name="topic"
            value={form.topic}
            onChange={set('topic')}
            style={{paddingInlineEnd: '2.5rem'}}
            className={`${fieldCls} appearance-none`}
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

        <label className={labelCls}>
          {t('message')}
          <textarea
            required
            rows={5}
            name="message"
            maxLength={500}
            value={form.message}
            onChange={set('message')}
            className={`${fieldCls} resize-y`}
          />
        </label>

        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === 'sending' ? (
            <FaSpinner className="h-4 w-4 animate-spin" />
          ) : (
            <FaPaperPlane className="h-4 w-4" />
          )}
          {state === 'sending' ? t('sending') : t('submit')}
        </button>

        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          {t('replyNote')}
        </p>

        {state === 'success' && (
          <div className="animate-in fade-in zoom-in-95 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
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
          <div className="animate-in fade-in zoom-in-95 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center">
            <FaTimesCircle className="mx-auto h-7 w-7 text-red-500" />
            <p className="mt-2 text-sm font-semibold text-red-700 dark:text-red-300">
              {t('error')}
            </p>
          </div>
        )}
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
