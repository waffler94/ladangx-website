import { getFruits, themeColors } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
  const fruits = await getFruits('en');
  const locales = ['en', 'bm'];
  
  const params = [];
  fruits.forEach((fruit) => {
    locales.forEach((locale) => {
      params.push({ slug: fruit.slug, locale });
    });
  });
  
  return params;
}

export default async function FruitPage({ params }) {
  const { slug, locale } = await params;
  
  const t = await getTranslations();
  const fruits = await getFruits(locale);
  const fruit = fruits.find((f) => f.slug === slug);

  if (!fruit) {
    notFound();
  }

  // ⬇️ ⬇️ ⬇️ THE FIX IS HERE ⬇️ ⬇️ ⬇️
  // Logic: Check if the JSON is "Nested" (has .en) or "Flat" (has .name at root)
  let data;
  
  if (fruit[locale]) {
    // Scenario A: JSON has 'en' and 'bm' keys (The Multi-lang structure)
    data = fruit[locale];
  } else if (fruit['en']) {
    // Scenario B: Missing BM, fallback to EN
    data = fruit['en'];
  } else {
    // Scenario C: JSON is Flat (The structure you just pasted)
    // We use the fruit object itself as the data
    data = fruit;
  }
  // ⬆️ ⬆️ ⬆️ END FIX ⬆️ ⬆️ ⬆️
console.log(data);
  if (!data || !data.name) {
    // Debugging: Print to your VS Code terminal to see what is wrong
    console.log("❌ DATA MISSING DEBUG:", JSON.stringify(fruit, null, 2));
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Data missing. Check server console.
      </div>
    );
  }

  const colors = themeColors[fruit.theme] || themeColors.yellow;
  const borderColor = colors.split(' ').find(c => c.startsWith('border-'));
  const textColor = colors.split(' ').find(c => c.startsWith('text-'));

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 px-4">
      <Link 
        href={`/${locale}`}
        className="inline-flex items-center font-bold text-sky-500 hover:bg-sky-100 px-4 py-2 rounded-xl transition-colors"
      >
        ⬅ {t('back')}
      </Link>

      {/* Hero Card */}
      <div className={`
        rounded-[2.5rem] py-8 px-5 border-4 border-b-8 text-center relative overflow-hidden
        ${colors}
      `}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/30 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 mb-6 inline-block animate-float">
          <Image 
            // Handle image being at root (flat) or inside data (nested)
            src={fruit.image || data.image} 
            alt={data.name}
            className="w-40 h-40 object-contain drop-shadow-xl"
            width={160}
            height={160}
          />
        </div>
        
        <h1 className="relative z-10 text-4xl font-black mb-2 text-slate-800">{data.name}</h1>
        <p className="relative z-10 text-lg opacity-80 italic font-bold">{data.scientific}</p>

        <div className="mt-6 relative z-10">
          <Link 
            href={`/${locale}/quiz/${fruit.slug}`}
            className="inline-block bg-white text-slate-800 font-black text-xl px-8 py-3 rounded-2xl shadow-lg border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 transition-all"
          >
            🎮 {t('play')}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        
        {/* Helps Section */}
        <Section title={t('helps')} emoji="💪" border={borderColor} textColor={textColor}>
          <div className="flex flex-wrap gap-2">
            {data.health_benefits.map((item, i) => (
              <span key={i} className="bg-slate-50 border-2 border-slate-100 px-3 py-2 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2">
                <Image 
                  src={item.image || '/next.svg'} 
                  alt="" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5" 
                />
                {item.text} 
              </span>
            ))}
          </div>
        </Section>

        {/* Nutrients & Makes */}
        <div className="grid grid-cols-1 min-[425px]:grid-cols-2 gap-4">
          <Section title={t('nutrients')} emoji="⚡" border={borderColor} textColor={textColor}>
            <ul className="text-sm space-y-1 font-semibold text-slate-600">
               {data.nutrients.map((n, i) => <li key={i}>• {n}</li>)}
            </ul>
          </Section>
          
          <Section title={t('makes')} emoji="🍰" border={borderColor} textColor={textColor}>
             <ul className="text-sm space-y-1 font-semibold text-slate-600">
               {data.product_uses.map((item, i) => <li key={i}>• {item.text}</li>)}
            </ul>
          </Section>
        </div>

        {/* Fun Facts */}
        <div className={`bg-white rounded-3xl p-5 border-4 ${borderColor} relative overflow-hidden`}>
          <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
            <Image 
               src={fruit.image || 'next.svg'} 
               className="w-32 h-32" 
               alt={data.name} 
               width={128} 
               height={128} 
            />
          </div>
          <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${textColor}`}>
            <span>🤩</span> {t('facts')}
          </h2>
          <ul className="space-y-3 relative z-10">
            {data.interesting_facts.map((item, i) => (
              <li key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-yellow-400 text-xl">★</span>
                <p className="font-bold text-slate-700 leading-[1.2] text-sm">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

function Section({ title, emoji, children, border, textColor }) {
  return (
    <div className={`bg-white rounded-3xl p-5 border-4 ${border}`}>
      <h2 className={`text-lg font-black mb-3 flex items-center gap-2 ${textColor}`}>
        <span>{emoji}</span> {title}
      </h2>
      {children}
    </div>
  );
}