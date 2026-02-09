'use client';
import { useState } from 'react';
import { generateQuestion } from '@/utils/quizLogic';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CloseButton from '@/components/close-button'
import { useGetQuizAnswerStatus } from '@/lib/hooks/useGetQuizAnswerStatus';

export default function QuizMultipleChoice({ fruit, allFruits, categoryId, onBack, locale, onNext, isLastLevel, userQuizId, token, apiUrl }) {
  const t = useTranslations();
  const [currentQuestion, setCurrentQuestion] = useState(() => generateQuestion(fruit, categoryId, allFruits, locale, t));
  const { data: quizAnswerStatusData, isLoading: quizAnswerStatusLoading, refresh: quizAnswerStatusRefresh } = useGetQuizAnswerStatus({ user_quiz_id: userQuizId });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [view, setView] = useState('playing'); // 'playing', 'result'
  const [isCorrect, setIsCorrect] = useState(false);

  const submitAnswerToApi = async (answer) => {
    if (!userQuizId || !token) return;

    try {
      const payload = {
        user_quiz_id: userQuizId,
        quiz_locale: locale,
        answers: [
          {
            question_type: categoryId, // e.g. "origin"
            user_selection: answer     // e.g. "Central America"
          }
        ]
      };

      await fetch(`${apiUrl}/user-quizzes/answers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log("✅ Answer submitted:", payload);
      await quizAnswerStatusRefresh();
    } catch (error) {
      console.error("❌ Failed to submit answer:", error);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === currentQuestion.correctAnswer);
    submitAnswerToApi(answer);
    setView('result');
  };

  const handleNext = () => {
    const nextQ = generateQuestion(fruit, categoryId, allFruits, t);
    setCurrentQuestion(nextQ);
    setSelectedAnswer(null);
    setView('playing');
  };

  const handleRetry = () => {
    const nextQ = generateQuestion(fruit, categoryId, allFruits, locale, t);
    setCurrentQuestion(nextQ);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setView('playing');
  };

  return (
    <div className="bg-[url('/images/bg9-origin.png')] bg-cover bg-top min-h-screen relative pt-safe">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0 mb-24 relative">
        <button onClick={onBack}>
          <CloseButton />
        </button>
        <h1 className="font-semibold text-[22px] absolute mx-auto left-0 right-0 w-fit uppercase">{t('origi')}</h1>
      </div>
      <div className="w-full max-w-md relative z-10 px-4">
        <div className="bg-white border-b-8 rounded-3xl p-8 text-center border-slate-200 mb-8">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-100 p-3 rounded-full border-4 border-white shadow-lg">
            <Image src={fruit.image} className="w-16 h-16" alt={fruit.name} width={50} height={50} />
          </div>
          <h2 className="mt-8 text-[19px] font-semibold text-[#313F3A] leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.answers.map((answer, index) => {
            let btnStyle = "bg-white border-slate-200 text-[#313F3A] hover:bg-sky-50 text-[19px] font-semibold";
            if (view === 'result') {
              if (answer === currentQuestion.correctAnswer) btnStyle = "bg-[#E0FFC2] border-[#77A44D] text-[#688F44]";
              else if (answer === selectedAnswer) btnStyle = "bg-[#FFB2B2] border-[#F00606] text-[#F00606]";
              else btnStyle = "bg-slate-200 border-slate-300 text-slate-400 opacity-50";
            }

            return (
              <button
                key={index}
                disabled={view === 'result'}
                onClick={() => handleAnswer(answer)}
                className={`w-full p-4 rounded-2xl border-b-8 font-semibold text-[19px] transition-all ${btnStyle} ${view !== 'result' ? 'active:border-b-0 active:translate-y-2' : ''}`}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {view === 'result' && (
          <div className="mt-8 animate-float text-center">
            {isCorrect ? (
              <div className="bg-[#79A74E] text-white p-6 rounded-3xl border-b-8 border-[#688F44]">
                <h3 className="text-2xl font-medium mb-2"> {t('awesome')} 🎉</h3>
                <p className="font-medium mb-4"> {t('you_picked_it_right')}</p>
                {/* 3. BUTTON: Next Level */}
                <button
                  onClick={onNext}
                  className="bg-white text-[#313F3A] px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform border-b-6 border-slate-200"
                >
                  {isLastLevel ? t('finish_game') + " 🏆" : t('next_game') + " ➡"}
                </button>
              </div>
            ) : (
              <div className="bg-[#FE3939] text-white p-6 rounded-3xl border-b-8 border-[#F00606]">
                <h3 className="text-2xl font-medium mb-2 flex items-center gap-x-2 mx-auto w-fit">
                  <span>{t('oops')}</span>
                  <Image src={'/images/oops.png'} className="" alt={fruit.name} width={30} height={30} />
                </h3>
                <p className="font-medium mb-4">{t('the_correct_answer')} <br /> {currentQuestion.correctAnswer}</p>
                {/* 4. BUTTON: Try Again (New Question) */}
                <button
                  onClick={handleRetry}
                  className="bg-white text-[#313F3A] px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform border-b-6 border-slate-200"
                >
                  {t('try_again')} ↺
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}