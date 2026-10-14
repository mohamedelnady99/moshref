import React from 'react';
import { Link } from 'react-router-dom';
import { MaterialSymbol } from 'react-material-symbols';
import { useI18n } from '../i18n';
import LanguageSwitcher from '../i18n/LanguageSwitcher';
import { usePlatform } from '../context/PlatformContext';
import { storageUrl } from '../utils/api';

const copy = {
  ar: {
    eyebrow: 'إدارة ذكية للثروة الحيوانية',
    title: 'كل ما تحتاجه لمتابعة حيواناتك في مكان واحد.',
    description: 'تابع مواقع الحيوانات وأجهزتها وصحتها وتنبيهاتها لحظة بلحظة، واتخذ قرارات أسرع بثقة.',
    start: 'ابدأ الآن',
    signIn: 'تسجيل الدخول',
    dashboard: 'لوحة تحكم واحدة',
    dashboardText: 'رؤية واضحة لقطيعك من أي مكان.',
    tracking: 'تتبّع مباشر',
    trackingText: 'اعرف موقع كل حيوان وتنبيهات الحركة فورًا.',
    health: 'رعاية استباقية',
    healthText: 'نظّم السجلات الطبية والتطعيمات بسهولة.',
    footer: 'منصة موثوقة لإدارة ومتابعة الثروة الحيوانية',
  },
  en: {
    eyebrow: 'Smarter livestock management',
    title: 'Everything you need to manage your animals in one place.',
    description: 'Follow animal locations, devices, health, and alerts in real time so you can make confident decisions faster.',
    start: 'Get started',
    signIn: 'Sign in',
    dashboard: 'One clear dashboard',
    dashboardText: 'A complete view of your herd from anywhere.',
    tracking: 'Live tracking',
    trackingText: 'Know each animal’s location and movement alerts instantly.',
    health: 'Proactive care',
    healthText: 'Keep medical records and vaccinations organized.',
    footer: 'A trusted platform for livestock management and tracking',
  },
};

export default function LandingPage() {
  const { locale, dir } = useI18n();
  const { platformName, logoUrl, loginBackgroundUrl, copyrightText } = usePlatform();
  const isRtl = dir === 'rtl';
  const text = copy[locale] || copy.en;
  const heroImage = loginBackgroundUrl
    ? storageUrl(loginBackgroundUrl)
    : 'https://images.unsplash.com/photo-1684509842402-05193d33907d?q=85&w=1800&auto=format&fit=crop';

  const features = [
    { icon: 'dashboard', title: text.dashboard, description: text.dashboardText },
    { icon: 'location_on', title: text.tracking, description: text.trackingText },
    { icon: 'health_and_safety', title: text.health, description: text.healthText },
  ];

  return (
    <main className={`min-h-screen overflow-hidden bg-[#fbf4e7] text-[#4b2e1d] ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="relative isolate min-h-[650px] overflow-hidden bg-[#4b2e1d]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4b2e1d]/70 via-[#4b2e1d]/85 to-[#3a2115]" />
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl flex-col px-6 pb-16 pt-6 sm:px-10 lg:px-16">
          <header className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 text-white">
              {logoUrl ? (
                <img src={storageUrl(logoUrl)} alt={platformName} className="h-11 max-w-[150px] object-contain" />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8b85c] text-[#4b2e1d] shadow-lg shadow-black/20">
                  <MaterialSymbol icon="track_changes" size={25} weight="fill" />
                </span>
              )}
              <span className="text-lg font-extrabold tracking-tight sm:text-xl">{platformName}</span>
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher compact className="!bg-[#fff7e8] !text-[#4b2e1d] hover:!bg-[#f4dfb8]" />
              <Link to="/login" className="hidden rounded-xl border border-white/35 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 sm:inline-block">
                {text.signIn}
              </Link>
            </div>
          </header>

          <div className="my-auto max-w-3xl py-20 text-center sm:text-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8b85c]/55 bg-[#e8b85c]/15 px-4 py-2 text-sm font-bold text-[#f5cf7b]">
              <MaterialSymbol icon="verified" size={18} weight="fill" />
              {text.eyebrow}
            </div>
            <h1 className="font-headline text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {text.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75 sm:mx-0 sm:text-lg">
              {text.description}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:justify-start">
              <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e8b85c] px-6 py-3.5 font-extrabold text-[#4b2e1d] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#f5cf7b]">
                {text.start}
                <MaterialSymbol icon={isRtl ? 'arrow_back' : 'arrow_forward'} size={20} />
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-xl border border-white/35 px-6 py-3.5 font-bold text-white transition hover:bg-white/10 sm:hidden">
                {text.signIn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.icon} className="rounded-2xl bg-[#fffaf1] p-6 shadow-[0_14px_35px_rgba(75,46,29,0.12)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8b85c]/25 text-[#9a5b21]">
                <MaterialSymbol icon={feature.icon} size={25} weight="fill" />
              </div>
              <h2 className="text-lg font-extrabold">{feature.title}</h2>
              <p className="mt-2 leading-7 text-[#765c4a]">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#8a5a36]/15 px-6 py-6 text-center text-sm text-[#765c4a] sm:px-10">
        {copyrightText || text.footer}
      </footer>
    </main>
  );
}
