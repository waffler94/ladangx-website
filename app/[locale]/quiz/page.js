import Image from 'next/image';
import Link from 'next/link';
import { getFruits, themeColors } from '@/utils/api';
import LanguageToggle from '@/components/LanguageToggle';

export default async function QuizHome({ params }) {
  const { locale } = await params;
  const fruits = await getFruits(locale);

  return (
    <div className="min-h-screen bg-fuchsia-50 bg-[radial-gradient(#e879f9_2px,transparent_2px)] [background-size:24px_24px] pb-12">
      <LanguageToggle />
      <div className="pt-8 pb-8 px-4 text-center">
        <div className="inline-block bg-white border-4 border-fuchsia-400 p-6 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(232,121,249,0.4)] transform rotate-1">
          <h1 className="text-4xl font-black text-fuchsia-500 tracking-tight">
             Rapid Fire Quiz! ⚡
          </h1>
          <p className="text-slate-400 font-bold mt-2">
            Pick a fruit to start!
          </p>
        </div>
      </div>

      <div className="px-4 max-w-lg mx-auto grid grid-cols-2 gap-4">
        {fruits.map((fruit, index) => {
          const data = fruit[locale] || fruit['en'];
          const rawTheme = themeColors[fruit.theme] || themeColors.yellow;
          const bgClass = rawTheme.split(' ').find(c => c.startsWith('bg-'));
          
          return (
            <Link 
              href={`/quiz/${fruit.slug}`} 
              key={fruit.slug}
              className={`
                group block bg-white border-4 border-slate-800 rounded-3xl 
                active:scale-95 active:border-b-4 transition-all
                shadow-[4px_6px_0px_0px_rgba(30,41,59,0.2)]
              `}
            >
              <div className="p-4 flex flex-col items-center">
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center mb-2
                  ${bgClass} border-2 border-slate-100
                `}>
                  <Image src={fruit.image} alt={fruit.name} className="w-12 h-12 object-contain" width={80} height={80} />
                </div>
                <h2 className="text-lg font-black text-slate-700">{fruit.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}