import Link from 'next/link';
import { getFruits, themeColors } from '@/utils/api';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import LanguageToggle from '@/components/LanguageToggle';

export default async function Home({ params }) {
  const { locale } = await params; 
  const t = await getTranslations();
  const fruits = await getFruits(locale); 

  return (
    <div className="min-h-screen bg-sky-50 bg-[radial-gradient(#bae6fd_2px,transparent_2px)] [background-size:24px_24px] pb-12">
      <LanguageToggle />
      {/* ☁️ Hero Section */}
      <div className="pt-8 pb-8 px-4 text-center">
        <div className="inline-block bg-white border-4 border-sky-400 p-6 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(56,189,248,0.4)] transform -rotate-1">
          <h1 className="text-4xl font-black text-sky-500 tracking-tight drop-shadow-sm">
            Fruit Friends!
          </h1>
          <p className="text-slate-400 font-bold mt-2 text-lg">
            Tap a fruit to play! 👇
          </p>
        </div>
      </div>

      {/* 📱 Mobile Grid: 2 Columns */}
      <div className="px-4 max-w-lg mx-auto grid grid-cols-2 gap-4">
        {fruits.map((fruit, index) => {
          const data = fruit[locale] || fruit['en']; 
          const rawTheme = themeColors[fruit.theme] || themeColors.yellow;
          const bgClass = rawTheme.split(' ').find(c => c.startsWith('bg-'));
          
          // Random-ish rotation for sticker effect
          const rotateClass = index % 2 === 0 ? '-rotate-1 hover:rotate-1' : 'rotate-1 hover:-rotate-1';

          return (
            <Link 
              href={`/fruit/${fruit.slug}`} 
              key={fruit.slug}
              className={`
                group relative block bg-white 
                border-4 border-slate-800 
                rounded-3xl 
                transition-all duration-200 
                hover:scale-105 active:scale-95 active:border-b-4
                shadow-[4px_6px_0px_0px_rgba(30,41,59,0.2)]
                active:shadow-none
                ${rotateClass}
                overflow-hidden
              `}
            >
              <div className="p-3   flex flex-col items-center">
                
                {/* 🎨 Image Bubble */}
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center mb-3
                  ${bgClass} border-2 border-slate-100 group-hover:scale-110 transition-transform duration-300
                `}>
                  {/* Replaced Text Emoji with Image Tag */}
                  <Image 
                    src={fruit.image} 
                    alt={fruit.name}
                    className="w-12 h-12 object-contain drop-shadow-md group-hover:animate-bounce"
                    width={50}
                    height={50}
                  />
                </div>

                {/* 📝 Text Info */}
                <div className="text-center w-full z-10 relative">
                  <h2 className="text-[15px] font-black text-slate-700 leading-tight">
                    {fruit.name}
                  </h2>
                  <div className="mt-2 inline-block bg-slate-100 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                    {fruit.origin}
                  </div>
                </div>

              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 text-center text-sky-300 opacity-50 font-black tracking-widest">
        •••
      </div>
    </div>
  );
}