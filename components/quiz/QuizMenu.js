import { categories } from '@/utils/quizLogic';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import BackButton from '@/components/back-button'

export default function QuizMenu({ fruit, onSelectCategory }) {
  const router = useRouter();
  const t = useTranslations();
  return (
    <div className="bg-[url('/images/bg8-e_learning.png')] bg-cover bg-top min-h-screen relative pt-safe">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0">
        <button onClick={() => router.back()} className="">
            <BackButton />
        </button>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-slate-200 shadow-sm">
          <Image src={fruit.image} className="w-8 h-8" alt={fruit.name} width={30} height={30} />
          <span className="font-semibold text-[#313F3A]">{fruit.name}</span>
        </div>
      </div>
      <h1 className='text-[#313F3A] text-[22px] text-center flex items-center justify-center gap-2 font-semibold py-4'>{t("pick_challenge")} <Image src={'/images/lightning.png'} alt="lightning" width={30} height={30} /> </h1>
      <div className="grid grid-cols-1 w-full max-w-md gap-4 px-4 pb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`
              
              relative w-full rounded-3xl active:translate-y-1 
              flex items-center justify-between group transition-all duration-150
            `}
          >
            <Image src={`/images/${cat.background}.png`} alt={cat.label} className="w-full" width={800} height={200} />
          </button>
        ))}
      </div>
    </div>
  );
}