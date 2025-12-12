'use client';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

// Helper to shuffle array
const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

const getText = (item) => {
  if (!item) return "";
  return typeof item === 'object' ? item.text : item;
};

export default function QuizMultiSelect({ fruit, allFruits, onBack, onNext, isLastLevel }) {
  const t = useTranslations(); 
  // 1. Setup Data (Run once using useMemo so it doesn't reshuffle on re-renders)
   const generateData = useCallback(() => {
    // A. Get Correct Answers (limit to 3)
    // We map to text immediately to make comparison easier
    const correctRaw = fruit.nutrients || [];
    const correctTexts = correctRaw.map(getText);
    const correctSet = new Set(correctTexts);
    
    // B. Get Wrong Answers from other fruits
    // Check if allFruits is passed, otherwise fallback to empty to prevent crash
    const safeAllFruits = allFruits || [];
    const otherFruits = safeAllFruits.filter(f => f.slug !== fruit.slug);
    
    const allOtherNutrients = [
      ...new Set(
        otherFruits.flatMap(f => (f.nutrients || []).map(getText))
      )
    ];

    // Filter out any that might actually be in the current fruit
    const trulyWrong = allOtherNutrients.filter(n => !correctSet.has(n));
    
    // Pick 3 wrong options
    const wrongOptions = shuffle(trulyWrong).slice(0, 3);
    
    // Pick 3 correct options (shuffle first so it's not always the first 3)
    const correctOptions = shuffle(correctTexts).slice(0, 3);

    // C. Combine and Shuffle
    const options = shuffle([...correctOptions, ...wrongOptions]);

    return { options, correctSet: new Set(correctOptions) };
  }, [fruit, allFruits]);

  const [gameData, setGameData] = useState(generateData());
  const [selected, setSelected] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Toggle Selection
  const handleToggle = (optionText) => {
    if (isSubmitted) return;
    
    if (selected.includes(optionText)) {
      setSelected(selected.filter(item => item !== optionText));
    } else {
      setSelected([...selected, optionText]);
    }
  };

  const handleRetry = () => {
    setSelected([]);
    setIsSubmitted(false);
    setGameData(generateData()); // Re-shuffle
  };

  // Check Results
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Determine Score Message
  const getResult = () => {
    // Logic: User must find ALL correct options displayed in the grid
    // (gameData.correctSet only contains the 3 correct ones we selected for this round)
    const correctPicks = selected.filter(s => gameData.correctSet.has(s)).length;
    const wrongPicks = selected.filter(s => !gameData.correctSet.has(s)).length;
    const totalCorrectInGrid = gameData.correctSet.size;

    if (correctPicks === totalCorrectInGrid && wrongPicks === 0) return "perfect";
    if (correctPicks > 0 && wrongPicks === 0) return "good"; 
    return (correctPicks === totalCorrectInGrid && wrongPicks === 0) ? "perfect" : "try_again";
  };

  

  return (
    <div className="min-h-screen bg-purple-50 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-purple-100 to-purple-200"></div>

      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 relative z-10">
        <button onClick={onBack} className="font-bold text-purple-600 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-purple-200">
           {t('back')}
        </button>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-purple-200 shadow-sm">
           <Image src={fruit.image} className="w-8 h-8" alt={fruit.name} width={40} height={40} /> 
           <span className="font-black text-slate-700">{fruit.name}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl p-6 text-center border-4 border-purple-300 shadow-xl mb-6">
           <h2 className="text-xl font-black text-slate-700 leading-snug">
             {t('tap')} <span className="text-purple-500 underline decoration-wavy">{t('all')}</span> {t('the_vitamins_inside_me')}
           </h2>
           <p className="text-slate-400 text-sm font-bold mt-2">({t('you_can_pick')})</p>
        </div>

        {/* 🔘 OPTIONS GRID */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {gameData.options.map((optionText, index) => {
            const isSelected = selected.includes(optionText);
            const isCorrect = gameData.correctSet.has(optionText);
            
            // --- STYLING LOGIC ---
            let bgClass = "bg-white border-slate-200 hover:border-purple-300";
            let icon = null;

            if (!isSubmitted) {
              // Playing State
              if (isSelected) {
                bgClass = "bg-purple-100 border-purple-500 ring-2 ring-purple-200";
                icon = <span className="text-purple-600 text-xl">✅</span>;
              }
            } else {
              // Result State
              if (isCorrect) {
                // It was a correct answer
                bgClass = "bg-green-100 border-green-500";
                icon = <span className="text-green-600 text-xl">{t('correct')}!</span>;
                // If user MISSED it, maybe make it lighter green?
                if (!isSelected) bgClass = "bg-green-50 border-green-300 opacity-70";
              } else if (isSelected && !isCorrect) {
                // User picked a WRONG answer
                bgClass = "bg-red-100 border-red-500";
                icon = <span className="text-red-600 text-xl">❌</span>;
              } else {
                // Not correct, not selected (Ignore)
                bgClass = "bg-slate-100 border-slate-200 opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleToggle(optionText)}
                disabled={isSubmitted}
                className={`
                  relative h-20 rounded-2xl border-b-8 border-4 transition-all active:translate-y-1 active:border-b-4
                  flex items-center justify-center flex-col
                  ${bgClass}
                `}
              >
                <span className="font-bold text-slate-700">{optionText}</span>
                {icon && <div className="absolute top-1 right-2 text-xs font-black">{icon}</div>}
              </button>
            );
          })}
        </div>

        {/* 🚀 ACTION BUTTON */}
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_#4c1d95] active:shadow-none active:translate-y-1 transition-all"
          >
            {t('submit_answer')}
          </button>
        ) : (
           <div className="animate-float text-center">
            {getResult() === "perfect" ? (
              <>
                <div className="bg-green-100 text-green-700 p-6 rounded-3xl border-b-8 border-green-700 mb-4">
                  <h3 className="text-3xl font-black">🎉 {t('perfect_score')}</h3>
                </div>
                <button 
                  onClick={onNext} 
                  className="w-full bg-green-500 text-white py-3 rounded-xl font-black text-lg hover:bg-green-600 shadow-md active:translate-y-1 transition-all"
                >
                  {isLastLevel ? t('finish_game')+" 🏆" : t('next_game')+" ➡"}
                </button>
              </>
            ) : (
              <>
                <div className="bg-rose-500 text-white p-6 rounded-3xl border-b-8 border-rose-700 mb-4">
                  <h3 className="text-3xl font-black">🙈 {t('oops')}</h3>
                  <p>{t('missed_some_try_again')}</p>
                </div>
                <button 
                  onClick={handleRetry} 
                  className="w-full bg-rose-600 text-white py-3 rounded-xl font-black text-lg hover:bg-rose-700 shadow-md active:translate-y-1 transition-all"
                >
                  {t('try_again')} ↺
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}