import { categories } from '@/utils/quizLogic';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import BackButton from '@/components/back-button'
import { useGetQuizAnswerStatus } from '@/lib/hooks/useGetQuizAnswerStatus';
import { X } from 'lucide-react';

export default function QuizMenu({ fruit, onSelectCategory, userQuizId }) {
  const router = useRouter();
  const t = useTranslations();
  const { data: quizAnswerStatusData, isLoading: quizAnswerStatusLoading } = useGetQuizAnswerStatus({ user_quiz_id: userQuizId });
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
      <div className="grid grid-cols-1 w-full max-w-md gap-4 px-4 pb-12 mx-auto">
        {categories.map((cat) => {

          const key = cat.id === 'benefits' ? 'health_benefits' : (cat.id === 'makes' ? 'product_uses' : (cat.id === "funfact" ? "interesting_facts" : cat.id));
          const quizAnswerStatus = quizAnswerStatusData?.data ? quizAnswerStatusData.data[key] : null;
          const isCompleted = (quizAnswerStatus?.total_questions) && (quizAnswerStatus?.total_questions != 0) && (quizAnswerStatus?.total_questions == quizAnswerStatus?.correct_answers);
          const isWrong = (quizAnswerStatus?.total_questions) && (quizAnswerStatus?.total_questions != 0) && (quizAnswerStatus?.total_questions != quizAnswerStatus?.correct_answers);
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`
              
              relative w-full rounded-3xl active:translate-y-1 
              flex items-center justify-between group transition-all duration-150
            `}
            >
              {
                isCompleted && !quizAnswerStatusLoading && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white  rounded-full text-xs z-10 flex items-center gap-1">
                    <i className="text-white icon-check text-[24px]"></i>
                  </div>
                )
              }
              
              <Image src={`/images/${cat.background}.png`} alt={cat.label} className="w-full" width={800} height={200} />
            </button>
          )
        }


        )}
      </div>
    </div>
  );
}