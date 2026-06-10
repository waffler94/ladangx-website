import { getFruits, themeColors } from '@/utils/api';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BackButton from '@/components/back-button';

export default async function FruitsFriends({ params }) {
  const { locale } = await params;
  const t = await getTranslations();
  const fruits = await getFruits(locale);

  return (
    <div className="bg-[url('/images/bg5-fruit_friends1.png')] bg-cover bg-top min-h-screen relative pt-safe">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0 relative">
        <Link href="/e-learning">
          <BackButton />
        </Link>
        <h1 className="font-semibold text-[22px] absolute mx-auto left-0 right-0 w-fit">{t("E-learning")}</h1>
      </div>
      <div className='h-[55vw] md:h-[55vh]'></div>
      <h2 className='text-[#313F3A] text-[19px] text-center flex items-center justify-center gap-4 font-semibold py-4'>
        {t("tap_a_fruit")} <Image src={'/images/pointing.png'} alt="" width={40} height={40} />
      </h2>
      <div className="px-4 max-w-lg mx-auto grid grid-cols-2 gap-4">
        {fruits.map((fruit, index) => {
          const rawTheme = themeColors[fruit.theme] || themeColors.yellow;
          const bgClass = rawTheme.split(' ').find(c => c.startsWith('bg-'));
          const rotateClass = index % 2 === 0 ? '-rotate-1 hover:rotate-1' : 'rotate-1 hover:-rotate-1';

          return (
            <Link
              href={`/fruit/${fruit.slug}`}
              key={fruit.slug}
              className={`
                group relative block bg-white rounded-3xl
                transition-all duration-200 hover:scale-105 active:scale-95
                shadow-[0px_4px_0px_0px_#DAE2DA] active:shadow-none
                ${rotateClass} overflow-hidden
              `}
            >
              <div className="p-3 flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 ${bgClass} border-2 border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                  <Image
                    src={fruit.image}
                    alt={fruit.name}
                    className="w-12 h-12 object-contain drop-shadow-md group-hover:animate-bounce"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="text-center w-full z-10 relative">
                  <h2 className="text-[16px] font-semibold text-[#313F3A] leading-tight">{fruit.name}</h2>
                  <div className="mt-2 inline-block bg-[#F1F5F9] text-[#A0AFC4] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-[#E2E8F0]">
                    {fruit.origin}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
