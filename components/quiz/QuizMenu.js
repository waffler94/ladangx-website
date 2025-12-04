import Link from 'next/link';
import { categories } from '@/utils/quizLogic';
import { useTranslations } from 'next-intl';

export default function QuizMenu({ fruit, onSelectCategory }) {
  const t = useTranslations();
  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <Link href="/quiz" className="font-bold text-green-600 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-green-200">
          ⬅ {t('Hello')}
        </Link>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-slate-200 shadow-sm">
           <img src={fruit.image} className="w-8 h-8" alt={fruit.name} /> 
           <span className="font-black text-slate-700">{fruit.name}</span>
        </div>
      </div>

      <h1 className="text-3xl font-black text-center text-slate-700 mb-6">
        Pick a Challenge!
      </h1>

      <div className="grid grid-cols-1 w-full max-w-md gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`
              ${cat.color} 
              relative w-full p-4 rounded-3xl border-b-8 active:border-b-4 active:translate-y-1 
              flex items-center justify-between group transition-all duration-150
            `}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl bg-white/40 w-14 h-14 flex items-center justify-center rounded-2xl">
                {cat.icon}
              </span>
              <span className="text-2xl font-black tracking-wide uppercase">
                {cat.label}
              </span>
            </div>
            <div className="bg-white/40 rounded-full p-2 w-[40px] h-[40px]">➡</div>
          </button>
        ))}
      </div>
    </div>
  );
}