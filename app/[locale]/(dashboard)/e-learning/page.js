import { Link } from '@/i18n/navigation';
import BackButton from '@/components/back-button';
import { getTranslations } from 'next-intl/server';

const SECTIONS = [
  {
    slug: 'fruits-friends',
    title: 'Fruits Friends',
    description: 'Discover tropical fruits, their origins and amazing facts.',
    emoji: '🍎',
    gradient: 'from-yellow-400 to-orange-400',
    shadowColor: '#f97316',
  },
  {
    slug: 'crop-doctors',
    title: 'Crop Doctors',
    description: 'Learn to identify 10 common plant pests and their symptoms.',
    emoji: '🐞',
    gradient: 'from-emerald-400 to-teal-500',
    shadowColor: '#14b8a6',
  },
  {
    slug: 'carbon-footprints',
    title: 'Carbon Footprints',
    description: 'Understand the CO₂ impact of everyday items around us.',
    emoji: '🌍',
    gradient: 'from-sky-400 to-blue-600',
    shadowColor: '#3b82f6',
  },
];

export default async function ELearningHub() {
  const t = await getTranslations();

  return (
    <div className="bg-[url('/images/bg8-e_learning.png')] bg-cover bg-top min-h-screen pt-safe pb-10">

      <div className="flex flex-row items-center justify-between relative w-full pt-[17px] px-[20px]">
        <Link href="/">
          <BackButton />
        </Link>
        <h1 className="font-semibold text-[22px] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          E-Learning
        </h1>
      </div>

      <div className="px-5 mt-10 flex flex-col gap-5 max-w-md mx-auto">
        {SECTIONS.map((section) => (
          <Link
            key={section.slug}
            href={`/e-learning/${section.slug}`}
            className="group relative flex items-center gap-4 bg-white rounded-3xl px-5 py-5 active:scale-95 transition-all duration-150 active:translate-y-1"
            style={{
              boxShadow: `0 5px 0 ${section.shadowColor}`,
            }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shrink-0 shadow-md`}>
              <span className="text-3xl">{section.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[17px] font-black text-[#313F3A] leading-tight">{section.title}</h2>
              <p className="text-xs text-slate-500 mt-1 leading-snug">{section.description}</p>
            </div>
            <span className="text-slate-300 text-2xl shrink-0 font-light">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
