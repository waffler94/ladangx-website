'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CloseButton from '@/components/close-button'

// Helper to shuffle array
const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizParts({ fruit, allFruits, onBack, onNext, isLastLevel, userQuizId, token, apiUrl, locale }) {
  const t = useTranslations();
  // 1. Setup Data
  const generateData = useCallback(() => {
    // A. Get Correct Answers
    const rawParts = fruit.parts || ["Part 1", "Part 2", "Part 3"];
    const diagramImage = fruit.parts_image || fruit.image;

    // Create Targets (The numbered slots)
    // ID = 0, 1, 2...
    const targets = rawParts.map((name, i) => ({
      id: i,
      labelNumber: i + 1, 
      correctName: name
    }));

    // B. Create Options (Correct Answers)
    const correctOptions = targets.map(t => ({
      id: t.id, // ID matches the Target ID
      name: t.correctName,
      isCorrect: true
    }));

    // C. Create Distractors (Wrong Answers)
    // 1. Collect all parts from OTHER fruits
    let potentialDistractors = [];
    
    if (allFruits && allFruits.length > 0) {
      potentialDistractors = allFruits
        .filter(f => f.slug !== fruit.slug) // Exclude current fruit
        .flatMap(f => f.parts || []); // Flatten all parts arrays
    } else {
      // Fallback if allFruits is missing (Generic nature words)
      potentialDistractors = ["Akar (Roots)", "Daun (Leaf)", "Dahan (Branch)", "Bunga (Flower)", "Batang (Stem)"];
    }

    // 2. Filter out duplicates and names that are actually correct for this fruit
    const uniqueDistractors = [...new Set(potentialDistractors)]
      .filter(name => !rawParts.includes(name));

    // 3. Pick 2 random wrong answers
    const selectedDistractors = shuffle(uniqueDistractors).slice(0, 2).map((name, i) => ({
      id: `wrong-${i}`, // Give unique string ID so it never == target.id (which is number)
      name: name,
      isCorrect: false
    }));

    // D. Combine and Shuffle Everything
    const options = shuffle([...correctOptions, ...selectedDistractors]);

    return { targets, options, diagramImage };
  }, [fruit, allFruits]);

  // State
  const [gameData, setGameData] = useState(generateData());
  const [matches, setMatches] = useState({});
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitAnswerToApi = async () => {
    if (!userQuizId || !token) return;

    // Construct the array: [Answer for Slot 1, Answer for Slot 2, ...]
    // We iterate through targets because they are ordered (ID 0, 1, 2...)
    const userSelectionArray = gameData.targets.map(target => {
      const placedOptionId = matches[target.id];
      const placedOption = gameData.options.find(o => o.id === placedOptionId);
      return placedOption ? placedOption.name : null;
    });

    try {
      const payload = {
        user_quiz_id: userQuizId,
        quiz_locale: locale,
        answers: [
          {
            question_type: "parts", // Matches category ID
            user_selection: userSelectionArray // Array of strings
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
      
      console.log("✅ Parts Answer submitted:", payload);
    } catch (error) {
      console.error("❌ Failed to submit parts answer:", error);
    }
  };

  // --- ACTIONS ---

  const handleOptionClick = (optId) => {
    if (isSubmitted) return;
    
    // If clicking an option that is already placed, remove it
    const placedTargetId = Object.keys(matches).find(key => matches[key] === optId);
    if (placedTargetId) {
      const newMatches = { ...matches };
      delete newMatches[placedTargetId];
      setMatches(newMatches);
    }

    setSelectedOptionId(optId === selectedOptionId ? null : optId);
  };

  const handleSlotClick = (targetId) => {
    if (isSubmitted) return;

    if (selectedOptionId !== null) {
      // Place selection
      setMatches(prev => ({ ...prev, [targetId]: selectedOptionId }));
      setSelectedOptionId(null);
    } else if (matches[targetId] !== undefined) {
      // Pick up existing item
      const optId = matches[targetId];
      const newMatches = { ...matches };
      delete newMatches[targetId];
      setMatches(newMatches);
      setSelectedOptionId(optId);
    }
  };

  const handleRetry = () => {
    setMatches({});
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setGameData(generateData()); // Re-shuffle & pick new distractors
  };

  const getScore = () => {
    let correct = 0;
    gameData.targets.forEach(t => {
      // Logic: It is correct ONLY if the IDs match exactly (0 === 0)
      // Distractors have string IDs ("wrong-1"), so they will never match.
      if (matches[t.id] === t.id) correct++;
    });
    return correct;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    submitAnswerToApi(); // ⬅️ Call API
  };

  const isPerfect = getScore() === gameData.targets.length;

  return (
    <div className="bg-[url('/images/bg11-fruit_part.png')] bg-cover bg-top min-h-screen relative pt-safe pb-12">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0 relative">
        <button onClick={onBack}>
          <CloseButton />
        </button>
        <h1 className="font-semibold text-[22px] absolute mx-auto left-0 right-0 w-fit uppercase">{t('label_it')}</h1>
      </div>
      <h2 className='text-[#313F3A] text-[19px] text-center gap-2 py-6'>{t("match_the_names")} </h2>

      {/* 🖼️ DIAGRAM IMAGE */}
      <div className='px-4'>
        <div className="w-full max-w-md h-64 bg-white rounded-3xl border-b-4 border-[#DAE2DA] shadow-sm mb-6 flex items-center justify-center p-4 relative overflow-hidden">
          <Image 
            src={gameData.diagramImage} 
            alt="Diagram" 
            fill 
            className="object-contain" 
          />
        </div>

        {/* 📥 NUMBERED SLOTS */}
        <div className="w-full max-w-md space-y-3 mb-8">
          {gameData.targets.map((target) => {
            const placedOptionId = matches[target.id];
            
            const placedText = placedOptionId !== undefined 
              ? gameData.options.find(o => o.id === placedOptionId)?.name 
              : null;

            let slotStyle = "bg-white border-slate-300 text-slate-400"; // Empty
            
            if (placedOptionId !== undefined) {
              slotStyle = "bg-[#E0FFC2] border-[#79A74E] text-[#688F44]"; // Filled
            }

            if (isSubmitted) {
              if (placedOptionId === target.id) slotStyle = "bg-green-100 border-green-600 text-green-800"; // Correct
              else slotStyle = "bg-red-100 border-red-500 text-red-800"; // Wrong
            } else if (selectedOptionId !== null && placedOptionId === undefined) {
              slotStyle = "bg-yellow-50 border-yellow-400 animate-pulse border-dashed"; // Hint
            }

            return (
              <div key={target.id} className="flex items-center gap-3">
                {/* Number Circle */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFD323] text-white font-medium text-[16px] border-4 border-white">
                  {target.labelNumber}
                </div>

                {/* The Input Box */}
                <button
                  onClick={() => handleSlotClick(target.id)}
                  disabled={isSubmitted}
                  className={`
                    flex-1 h-12 rounded-[16px] border-b-4 border-[#DAE2DA] font-medium text-center flex items-center justify-center transition-all relative
                    ${slotStyle}
                  `}
                >
                  {placedText || <span className="opacity-30 text-sm italic">{t('tap_to_place')}</span>}
                    {isSubmitted && (
                    <div className="text-[14px] text-center absolute right-3">
                      {placedOptionId === target.id ? <div className='w-[25px] h-[25px] rounded-full flex items-center justify-center bg-[#688F44] text-[#E0FFC2]'><i className="icon-check_thick"></i></div> : <div className='w-[25px] h-[25px] rounded-full flex items-center justify-center bg-[#F00606] text-[#FFB2B2]'><i className="icon-close_thick"></i></div>}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* 🏷️ OPTIONS POOL (Targets + Wrong Answers) */}
        <div className="w-full max-w-md bg-white/60 p-4 rounded-2xl border-2 border-slate-200">
          <div className="flex flex-wrap justify-center gap-3">
            {gameData.options.map((opt) => {
              const isUsed = Object.values(matches).includes(opt.id);
              const isSelected = selectedOptionId === opt.id;

              if (isUsed && !isSubmitted) return null; 

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.id)}
                  disabled={isSubmitted}
                  className={`
                    px-4 py-2 rounded-xl font-medium border-b-4 border-2 transition-all text-sm
                    ${isSelected 
                      ? 'bg-emerald-500 border-emerald-700 text-white scale-110 shadow-lg' 
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}
                    ${isUsed && isSubmitted ? 'opacity-50 grayscale' : ''}
                  `}
                >
                  {opt.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="w-full max-w-md mt-8 pb-12">
          {!isSubmitted ? (
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(matches).length < gameData.targets.length}
              className="w-full bg-[#FFE064] text-white py-4 rounded-full font-semibold hover:bg-[#FFE064] disabled:opacity-50 shadow-[0_4px_0_#E7C230] active:translate-y-1 active:shadow-none transition-all"
            >
              {t('submit_answer')}
            </button>
          ) : (
            <div className="text-center animate-bounce">
              {isPerfect ? (
                <div className="bg-[#79A74E] text-white p-4 rounded-2xl font-medium border-b-8 border-[#688F44] mb-4">
                    {t('you_got_all')} 🎉
                </div>
              ) : (
                <div className="bg-[#FE3939] text-white p-4 rounded-2xl font-medium border-b-8 border-[#F20D0D] mb-4 flex items-center gap-x-2 justify-center">
                    {t('you_got', {
                      score: getScore(),
                      length: gameData.targets.length
                    })}
                    <Image src={'/images/oops.png'} className="" alt={fruit.name} width={30} height={30} />
                </div>
              )}

              {isPerfect ? (
                <button onClick={onNext} className="w-full text-[#313F3A] font-medium underline active:translate-y-1 transition-all active:translate-y-1 transition-all">
                  {isLastLevel ? t('finish_game')+" 🏆" : t('next_game')+" ➡"}
                </button>
              ) : (
                <button onClick={handleRetry} className="w-full text-[#313F3A] font-medium underline active:translate-y-1 transition-all">
                  {t('try_again')} ↺
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}