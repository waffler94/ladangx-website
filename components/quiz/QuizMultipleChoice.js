'use client';
import { useState } from 'react';
import { generateQuestion } from '@/utils/quizLogic';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function QuizMultipleChoice({ fruit, allFruits, categoryId, onBack }) {
  const t = useTranslations(); 
  const [currentQuestion, setCurrentQuestion] = useState(() => generateQuestion(fruit, categoryId, allFruits, t));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [view, setView] = useState('playing'); // 'playing', 'result'
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === currentQuestion.correctAnswer);
    setView('result');
  };

  const handleNext = () => {
    const nextQ = generateQuestion(fruit, categoryId, allFruits, t);
    setCurrentQuestion(nextQ);
    setSelectedAnswer(null);
    setView('playing');
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-800 to-slate-900"></div>

      <button onClick={onBack} className="absolute top-6 left-6 text-white font-bold bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm z-20">
        ❌ {t('back')}
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl p-8 text-center border-4 border-slate-300 shadow-2xl mb-8">
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-100 p-3 rounded-full border-4 border-white shadow-lg">
              <Image src={fruit.image} className="w-16 h-16" alt={fruit.name} width={50} height={50} />
           </div>
           <h2 className="mt-8 text-2xl font-black text-slate-700 leading-snug">
             {currentQuestion.question}
           </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.answers.map((answer, index) => {
            let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-sky-50";
            if (view === 'result') {
              if (answer === currentQuestion.correctAnswer) btnStyle = "bg-green-400 border-green-600 text-white"; 
              else if (answer === selectedAnswer) btnStyle = "bg-red-400 border-red-600 text-white"; 
              else btnStyle = "bg-slate-200 border-slate-300 text-slate-400 opacity-50"; 
            }

            return (
              <button
                key={index}
                disabled={view === 'result'}
                onClick={() => handleAnswer(answer)}
                className={`w-full p-4 rounded-2xl border-b-8 font-bold text-lg transition-all ${btnStyle} ${view !== 'result' ? 'active:border-b-0 active:translate-y-2' : ''}`}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {view === 'result' && (
          <div className="mt-8 animate-float text-center">
            {isCorrect ? (
              <div className="bg-green-500 text-white p-6 rounded-3xl border-b-8 border-green-700">
                <h3 className="text-3xl font-black mb-2">🎉 {t('awesome')}</h3>
                <button onClick={handleNext} className="bg-white text-green-600 px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform">{t('next')} ➡</button>
              </div>
            ) : (
              <div className="bg-rose-500 text-white p-6 rounded-3xl border-b-8 border-rose-700">
                <h3 className="text-3xl font-black mb-2">🙈 {t('oops')}</h3>
                <p className="font-bold mb-4">{t('correct')}: {currentQuestion.correctAnswer}</p>
                <button onClick={handleNext} className="bg-white text-rose-600 px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform">{t('try_again')} ↺</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}