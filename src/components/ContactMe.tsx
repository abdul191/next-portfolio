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
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaSpinner,
  FaTimesCircle,
  FaTwitter,
  FaUser,
  FaWhatsapp
} from 'react-icons/fa';
import type {ReactElement} from 'react';
import {site} from '@/data/site';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? 'service_gx0f59h';
const TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? 'template_gvovijl';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

const baseField =
  'mt-1.5 w-full rounded-xl border border-border bg-background/70 py-2.5 text-sm outline-none ring-indigo-500/25 backdrop-blur transition focus:border-indigo-400 focus:ring-2';
const plainField = `${baseField} px-4`;
const iconField = `${baseField} ps-11 pe-4`;
const selectField = `${baseField} px-4 appearance-none`;
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

  const contacts: Array<{
    icon: ReactElement;
    label: string;
    value: string;
    href?: string;
  }> = [
    {
      icon: <FaWhatsapp className="h-4 w-4" />,
      label: t('phoneLabel'),
      value: site.phone,
      href: `https://wa.me/${site.whatsapp}`
    },
    {
      icon: <FaGithub className="h-4 w-4" />,
      label: 'GitHub',
      value: 'github.com/abdul191',
      href: site.github
    },
    {
      icon: <FaLinkedin className="h-4 w-4" />,
      label: 'LinkedIn',
      value: 'in/abdul-rehman-08bb78200',
      href: site.linkedin
    },
    {
      icon: <FaTwitter className="h-4 w-4" />,
      label: 'X / Twitter',
      value: '@Abdul15721',
      href: site.twitter
    },
    {
      icon: <FaEnvelope className="h-4 w-4" />,
      label: t('emailLabel'),
      value: site.email,
      href: `mailto:${site.email}`
    },
    {
      icon: <FaGlobe className="h-4 w-4" />,
      label: t('websiteLabel'),
      value: 'abdulrehman-site.vercel.app',
      href: site.website
    },
    {
      icon: <FaMapMarkerAlt className="h-4 w-4" />,
      label: t('locationLabel'),
      value: t('location')
    }
  ];

  return (
    <section
      id="contactMe"
      className="container-section"
    >
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* Info panel */}
        <div className="glass relative overflow-hidden rounded-3xl p-8 lg:col-span-2">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500/30 to-blue-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-violet-500/20 blur-2xl" />

          <div className="relative space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t('title')}
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t('heading')}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {t('infoTitle')}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('infoNote')}
              </p>
            </div>

            <ul className="space-y-3">
              {contacts.map(({icon, label, value, href}) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-white/15 bg-white/10 p-3.5 transition-colors hover:border-indigo-400/40 hover:bg-white/20 dark:border-white/10"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                        {icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-muted-foreground">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {value}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/10 p-3.5">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md">
                        {icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-muted-foreground">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {value}
                        </span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              {t('replyNote')}
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          noValidate
          className="glass grid max-w-3xl content-start gap-5 rounded-3xl p-6 sm:grid-cols-2 sm:p-8 lg:col-span-3"
        >
          <div className="sm:col-span-2">
            <h3 className="text-xl font-bold">{t('formTitle')}</h3>
          </div>

          <label className={labelCls}>
            {t('firstName')}
            <span className="relative block">
              <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-muted-foreground/70">
                <FaUser className="h-4 w-4" />
              </span>
              <input
                required
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={form.firstName}
                onChange={set('firstName')}
                className={iconField}
              />
            </span>
          </label>

          <label className={labelCls}>
            {t('lastName')}
            <span className="relative block">
              <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-muted-foreground/70">
                <FaUser className="h-4 w-4" />
              </span>
              <input
                required
                type="text"
                name="lastName"
                autoComplete="family-name"
                value={form.lastName}
                onChange={set('lastName')}
                className={iconField}
              />
            </span>
          </label>

          <label className={labelCls}>
            {t('email')}
            <span className="relative block">
              <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-muted-foreground/70">
                <FaEnvelope className="h-4 w-4" />
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={set('email')}
                className={iconField}
              />
            </span>
          </label>

          <label className={labelCls}>
            {t('phoneNumber')}
            <span className="relative block">
              <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-muted-foreground/70">
                <FaPhoneAlt className="h-4 w-4" />
              </span>
              <input
                type="tel"
                name="phoneNumber"
                autoComplete="tel"
                value={form.phoneNumber}
                onChange={set('phoneNumber')}
                className={iconField}
              />
            </span>
          </label>

          <div className="sm:col-span-2">
            <label className={labelCls}>{t('chooseTopic')}</label>
            <span className="relative block">
              <select
                required
                name="topic"
                value={form.topic}
                onChange={set('topic')}
                style={{paddingInlineEnd: '2.5rem'}}
                className={selectField}
              >
                <option value="">{t('selectOne')}</option>
                <option value="frontend">{t('topics.frontend')}</option>
                <option value="react">{t('topics.react')}</option>
                <option value="web">{t('topics.web')}</option>
                <option value="collab">{t('topics.collab')}</option>
                <option value="general">{t('topics.general')}</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-muted-foreground/70">
                <FaChevronDown className="h-3.5 w-3.5" />
              </span>
            </span>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>{t('message')}</label>
            <span className="relative block">
              <textarea
                required
                rows={5}
                name="message"
                maxLength={500}
                value={form.message}
                onChange={set('message')}
                style={{paddingInlineEnd: '5rem'}}
                className={`${plainField} resize-y`}
              />
              <span className="pointer-events-none absolute bottom-3 end-3 text-[11px] tabular-nums text-muted-foreground/70">
                {form.message.length}/500
              </span>
            </span>
          </div>

          <div className="sm:col-span-2">
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

            {state === 'success' && (
              <div className="mt-4 animate-in fade-in zoom-in-95 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
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
              <div className="mt-4 animate-in fade-in zoom-in-95 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center">
                <FaTimesCircle className="mx-auto h-7 w-7 text-red-500" />
                <p className="mt-2 text-sm font-semibold text-red-700 dark:text-red-300">
                  {t('error')}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}