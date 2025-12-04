'use client';

import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation'; // 1. Import Link from HERE, not next/link

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname(); // This returns the path WITHOUT the locale (e.g. "/quiz")

  const isEnglish = locale === 'en';
  const targetLocale = isEnglish ? 'bm' : 'en';

  return (
    <Link
      href={pathname} // 2. Pass the clean path
      locale={targetLocale} // 3. Explicitly tell it the target language
      className={`
        fixed bottom-6 right-6 z-50 
        flex items-center gap-3 px-6 py-3 rounded-full 
        bg-white border-4 border-slate-800 
        shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] 
        transition-all duration-200 
        hover:scale-105 hover:-translate-y-1 
        active:translate-y-0 active:shadow-none
        cursor-pointer no-underline
      `}
    >
      {/* Flag Icon */}
      <span className="text-2xl">
        {isEnglish ? '🇲🇾' : '🇬🇧'}
      </span>

      {/* Text Label */}
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {isEnglish ? 'Switch to' : 'Tukar ke'}
        </span>
        <span className="text-lg font-black text-slate-700 uppercase">
          {isEnglish ? 'Bahasa' : 'English'}
        </span>
      </div>
    </Link>
  );
}