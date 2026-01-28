'use client';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import CloseButton from '@/components/close-button'

// Helper to shuffle array
const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

const getText = (item) => {
  if (!item) return "";
  return typeof item === 'object' ? item.text : item;
};

export default function QuizMultiSelect({ fruit, allFruits, onBack, onNext, isLastLevel, userQuizId, token, apiUrl, locale }) {
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
    const wrongOptions = shuffle(trulyWrong).slice(0, 12);
    
    // Pick 3 correct options (shuffle first so it's not always the first 3)
    const correctOptions = shuffle(correctTexts).slice(0, 12);

    // C. Combine and Shuffle
    const options = shuffle([...correctOptions, ...wrongOptions]);

    return { options, correctSet: new Set(correctOptions) };
  }, [fruit, allFruits]);

  const [gameData, setGameData] = useState(generateData());
  const [selected, setSelected] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitAnswerToApi = async () => {
    if (!userQuizId || !token) return;

    try {
      const payload = {
        user_quiz_id: userQuizId,
        quiz_locale: locale,
        answers: [
          {
            question_type: "nutrients", // Matches the category ID
            user_selection: selected // Sends Array: ["Vitamin A", "Fiber", ...]
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
      
      console.log("✅ Nutrients Answer submitted:", payload);
    } catch (error) {
      console.error("❌ Failed to submit nutrients answer:", error);
    }
  };

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
    submitAnswerToApi();
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
    <div className="bg-[url('/images/bg12-vitamin.png')] bg-cover bg-top min-h-screen relative pt-safe pb-12">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0 relative">
        <button onClick={onBack}>
          <CloseButton />
        </button>
        <h1 className="font-semibold text-[22px] absolute mx-auto left-0 right-0 w-fit uppercase">{t('tap_me')}</h1>
      </div>
      

      {/* Question Card */}
      <div className="w-full max-w-md relative z-10 mt-20 px-4">
        <div className="bg-white border-b-8 rounded-3xl p-8 text-center border-slate-200 mb-8 relative pt-20">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-100 p-3 rounded-full border-4 border-white shadow-lg">
            <Image src={fruit.image} className="w-16 h-16" alt={fruit.name} width={50} height={50} />
          </div>
          <h2 className="text-xl font-medium text-slate-700 leading-snug">
             {t('tap')} <span className="text-[#F4D958] underline decoration-wavy">{t('all')}</span> {t('the_vitamins_inside_me')}
           </h2>
           <p className="text-slate-400 text-sm font-medium mt-2">({t('you_can_pick')})</p>
        </div>

        {/* 🔘 OPTIONS GRID */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {gameData.options.map((optionText, index) => {
            const isSelected = selected.includes(optionText);
            const isCorrect = gameData.correctSet.has(optionText);
            
            // --- STYLING LOGIC ---
            let bgClass = "bg-white border-slate-200 hover:border-[#AFD164]";
            let icon = null;
            let textColor = "text-slate-700";

            if (!isSubmitted) {
              // Playing State
              if (isSelected) {
                bgClass = "bg-[#E0FFC2] border-[#AFD164]";
                icon = <span className="text-[#AFD164] text-xl"></span>;
              }
            } else {
              // Result State
              if (isCorrect) {
                // It was a correct answer
                bgClass = "bg-[#E0FFC2] border-[#688F44]";
                icon = <span className="text-green-600 text-xl"><i className='text-[#688F44] icon-check_thick'></i></span>;
                textColor = "text-[#79A74E]"
                // If user MISSED it, maybe make it lighter green?
                if (!isSelected) bgClass = "bg-green-50 border-green-300 opacity-70";
              } else if (isSelected && !isCorrect) {
                // User picked a WRON[G answer
                bgClass = "bg-[#FFB2B2] border-[#F00606]";
                icon = <span className="text-[#F00606] text-xl icon-close_thick"></span>;
                textColor = "text-[#F00606]"
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
                <span className={`font-medium ${textColor} `}>{optionText}</span>
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
            className="w-full bg-[#AFD164] text-white py-4 rounded-full font-medium text-xl hover:bg-[#AFD164] disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_0_#93B24E] active:shadow-none active:translate-y-1 transition-all"
          >
            {t('submit_answer')}
          </button>
        ) : (
           <div className="animate-float text-center">
            {getResult() === "perfect" ? (
              <>
                <div className="bg-[#79A74E] text-white p-4 rounded-2xl font-medium border-b-8 border-[#688F44] mb-4">
                  <h3 className="text-3xl font-black">🎉 {t('perfect_score')}</h3>
                </div>
                <button 
                  onClick={onNext} 
                  className="w-full text-[#313F3A] font-medium underline active:translate-y-1 transition-all active:translate-y-1 transition-all"
                >
                  {isLastLevel ? t('finish_game')+" 🏆" : t('next_game')+" ➡"}
                </button>
              </>
            ) : (
              <>
                <div className="bg-[#FE3939] text-white p-4 rounded-2xl font-medium border-b-8 border-[#F20D0D] mb-4 flex items-center gap-x-2 justify-center">
                  <h3 className="text-2xl font-medium flex items-center gap-x-2 mx-auto w-fit">
                    <span>{t('oops')}</span>
                    <Image src={'/images/oops.png'} className="" alt={fruit.name} width={30} height={30} />
                  </h3>
                </div>
                <button 
                  onClick={handleRetry} 
                  className="w-full text-[#313F3A] font-medium underline active:translate-y-1 transition-all"
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