import { getFruits, themeColors } from '@/utils/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BackButton from '@/components/back-button'
import { getServerSideToken } from '@/lib/getServerSideToken';

export async function generateStaticParams() {
  const fruits = await getFruits('en');
  const locales = ['en', 'my'];

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
  const token = await getServerSideToken();
  const isGuest = !token;
  const fruits = await getFruits(locale);
  const fruit = fruits.find((f) => f.slug === slug);

  if (!fruit) {
    notFound();
  }

  // ⬇️ ⬇️ ⬇️ THE FIX IS HERE ⬇️ ⬇️ ⬇️
  // Logic: Check if the JSON is "Nested" (has .en) or "Flat" (has .name at root)
  let data;

  if (fruit[locale]) {
    // Scenario A: JSON has 'en' and 'my' keys (The Multi-lang structure)
    data = fruit[locale];
  } else if (fruit['en']) {
    // Scenario B: Missing MY, fallback to EN
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
    <div className="max-w-xl mx-auto space-y-6 pb-12 pt-safe bg-[#AFD164]">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0 relative">
        <Link href="/e-learning" className="">
            <BackButton />
        </Link>
        <h1 className="font-semibold text-[22px] absolute mx-auto left-0 right-0 w-fit">{t("E-learning")}</h1>
      </div>
      {/* Hero Card */}
      <div className='px-4'>
        <div className={`
          bg-white rounded-[2.5rem] py-8 px-5 shadow-[0_4px_0_0_#DAE2DA] text-center relative overflow-hidden
        `}>
        <div className="relative z-10 mb-6 inline-block animate-float">
            <Image
              // Handle image being at root (flat) or inside data (nested)
              src={fruit.image || data.image}
              alt={data.name}
              className="w-35 h-35 object-contain drop-shadow-xl"
              width={160}
              height={160}
            />
          </div>

          <h1 className="relative z-10 text-[24px] font-bold mb-2 text-[#313F3A]">{data.name}</h1>
          <p className="relative z-10 text-[19px] opacity-80 italic font-semibold text-[#313F3A]">{data.scientific}</p>
          <div className="mt-2 inline-block bg-[#F1F5F9] text-[#A0AFC4] text-[16px] font-semibold px-3 py-2 rounded-full border border-[#E2E8F0]">
            {fruit.origin}
          </div>
          {!isGuest && (
            <div className="mt-6 relative z-10">
              <Link
                href={`/quiz/${fruit.slug}`}
                className="inline-block bg-white text-slate-800 font-black text-xl px-8 py-3 rounded-2xl shadow-lg border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 transition-all"
              >
                🎮 {t('play')}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4">

        {/* Helps Section */}
        <Section title={t('helps')} emoji="strong" >
          <div className="flex flex-wrap gap-2">
            {data.health_benefits.map((item, i) => (
              <span key={i} className="bg-[#F1F5F9] border-2 border-[#E2E8F0] px-2 py-1 rounded-[10px] text-[16px] font-semibold text-[#313F3A] flex items-center gap-2">
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
          <Section title={t('nutrients')} emoji="nutrition" >
            <ul className="text-sm space-y-1 font-semibold text-slate-600">
              {data.nutrients.map((n, i) => <li key={i}>• {n}</li>)}
            </ul>
          </Section>

          <Section title={t('makes')} emoji="grocery" >
            <ul className="text-sm space-y-1 font-semibold text-slate-600">
              {data.product_uses.map((item, i) => <li key={i}>• {item.text}</li>)}
            </ul>
          </Section>
        </div>

        {/* Fun Facts */}
          <Section title={t('facts')} emoji="smile" >
            <ul className="text-sm space-y-1 font-semibold text-slate-600">
              {data.interesting_facts.map((n, i) => <li className="flex items-center gap-3 bg-[#F1F5F9] p-2 rounded-xl border border-[#E2E8F0]" key={i}><Image src={'/images/star.png'} alt="star" width={18} height={18} /> {n.text}</li>)}
            </ul>
          </Section>
      </div>
    </div>
  );
}

function Section({ title, emoji, children }) {
  return (
    <div className={`bg-white rounded-3xl p-5 shadow-[0_4px_0_0_#DAE2DA]`}>
      <h2 className={`text-[19px] font-semibold mb-3 flex items-center gap-2 text-[#313F3A]`}>
        <div className='flex items-center gap-x-2'>
          <Image src={`/images/${emoji}.png`} alt={emoji} width={30} height={30} />
          <span>{title}</span> 
        </div>
      </h2>
      {children}
    </div>
  );
}
