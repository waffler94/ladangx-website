'use client';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import CloseButton from '@/components/close-button'
import { useGetQuizAnswerStatus } from '@/lib/hooks/useGetQuizAnswerStatus'

// Helper to shuffle
const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizDragDrop({ fruit, onBack, onNext, isLastLevel, userQuizId, token, apiUrl, locale }) {
  const t = useTranslations();
  const { data: quizAnswerStatusData, isLoading: quizAnswerStatusLoading, refresh: quizAnswerStatusRefresh } = useGetQuizAnswerStatus({ user_quiz_id: userQuizId });
  // 1. Prepare Game Data
  const generateData = useCallback(() => {
    // Convert facts into items with unique IDs
    const items = fruit.interesting_facts.map((f, i) => {
      const text = typeof f === 'object' ? f.text : f;
      const image = typeof f === 'object' ? f.image : null;
      const apiId = typeof f === 'object' ? f.id : null;
      const apiImageId = typeof f === 'object' ? f.image_id : null;
      return {
        id: i,
        apiId,
        apiImageId,
        text: text,
        image: (typeof image === 'object' && image.url) ? image.url : image
      };
    });

    // Shuffle the images for the top pool so they aren't in order
    const shuffledPool = shuffle([...items]);

    return { items, shuffledPool };
  }, [fruit]);

  // 2. State
  const [gameData, setGameData] = useState(generateData());
  const [slots, setSlots] = useState(new Array(gameData.items.length).fill(null));
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitAnswerToApi = async () => {
    if (!userQuizId || !token) return;

    // Map the slots to the API format
    const userSelection = gameData.items.map((targetItem, index) => {
      const placedLocalId = slots[index];
      // Find the item object that was placed here (it came from the pool)
      const placedItem = gameData.shuffledPool.find(p => p.id === placedLocalId);

      return {
        id: targetItem.apiId, // The ID of the Fact (Target)
        image_id: placedItem?.apiImageId // The ID of the Image (Selection)
      };
    });

    try {
      const payload = {
        user_quiz_id: userQuizId,
        quiz_locale: locale,
        answers: [
          {
            question_type: "interesting_facts", // Matches API Key
            user_selection: userSelection
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

      console.log("✅ DragDrop Answer submitted:", payload);
      await quizAnswerStatusRefresh();
    } catch (error) {
      console.error("❌ Failed to submit DragDrop answer:", error);
    }
  };

  // --- ACTIONS ---

  // A. Click Top Image
  const handlePoolClick = (id) => {
    if (isSubmitted) return;

    // If this image is already used in a slot, find where it is and remove it (reset)
    const usedInSlotIndex = slots.indexOf(id);
    if (usedInSlotIndex !== -1) {
      const newSlots = [...slots];
      newSlots[usedInSlotIndex] = null;
      setSlots(newSlots);
      setSelectedImageId(id); // Auto-select it so user can move it elsewhere
    } else {
      // It's in the pool, just select it
      setSelectedImageId(id === selectedImageId ? null : id);
    }
  };

  // B. Click Empty Slot (To Place)
  const handleSlotClick = (slotIndex) => {
    if (isSubmitted) return;

    // If we have an image selected, place it here
    if (selectedImageId !== null) {
      const newSlots = [...slots];

      // If this slot already had something, return that thing to pool (by just overwriting it)
      newSlots[slotIndex] = selectedImageId;
      setSlots(newSlots);
      setSelectedImageId(null); // Deselect after placing
    }
    // If we clicked a filled slot but nothing is selected, clear the slot
    else if (slots[slotIndex] !== null) {
      const newSlots = [...slots];
      // Optional: Auto-select the item we just removed to move it quickly
      setSelectedImageId(newSlots[slotIndex]);
      newSlots[slotIndex] = null;
      setSlots(newSlots);
    }
  };

  // C. Calculate Score
  const getScore = () => {
    let correct = 0;
    slots.forEach((placedId, index) => {
      // The slot index matches the gameData.items index.
      // So if placedId === index, it's the correct image for this fact.
      if (placedId === gameData.items[index].id) correct++;
    });
    return correct;
  };

  const handleRetry = () => {
    setSlots(new Array(gameData.items.length).fill(null));
    setSelectedImageId(null);
    setIsSubmitted(false);
    setGameData(generateData()); // Re-shuffle pool
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    submitAnswerToApi();
  };

  const isPerfect = getScore() === gameData.items.length;

  return (
    <div className="bg-[url('/images/bg14-fun_fact.png')] bg-cover bg-top min-h-screen relative pt-safe pb-12">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0 relative">
        <button onClick={onBack}>
          <CloseButton />
        </button>
        <h1 className="font-semibold text-[22px] absolute mx-auto left-0 right-0 w-fit uppercase">{t('facts')}</h1>
      </div>
      <h2 className='text-[#313F3A] text-[19px] text-center gap-2 py-6 px-4 leading-[1.2]'>{t("tap_picture")} </h2>

      <div className='px-4'>
        {/* 🖼️ IMAGE POOL (Top Box) */}
        <div className="w-full max-w-md bg-white rounded-3xl border-4 border-slate-300 p-4 mb-8 shadow-sm">
          <div className="flex flex-wrap justify-center gap-4">
            {gameData.shuffledPool.map((item) => {
              const isUsed = slots.includes(item.id);
              const isSelected = selectedImageId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handlePoolClick(item.id)}
                  disabled={isSubmitted}
                  className={`
                    w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-200 border-2
                    ${isSelected ? 'border-[#967FF5] bg-[#967FF5] scale-110 shadow-lg z-10' : 'border-slate-100 bg-[#EBEEFF]'}
                    ${isUsed ? 'opacity-20 grayscale' : 'opacity-100'}
                  `}
                >
                  <Image src={item.image} className="w-10 h-10" alt={item.text} width={80} height={80} />
                </button>
              );
            })}
          </div>
        </div>

        {/* 📥 DROP ZONES (Bottom List) */}
        <div className="w-full max-w-md space-y-4 mb-8">
          {gameData.items.map((fact, index) => {
            const placedId = slots[index];

            // Find the image object if something is placed here
            const placedImage = placedId !== null
              ? gameData.items.find(i => i.id === placedId)?.image
              : null;

            // Styles for Validation
            let slotColor = "border-slate-300 bg-white border-dashed"; // Default empty
            if (placedId !== null) slotColor = "border-[#967FF5] bg-[#EBEEFF] border-solid"; // Filled

            if (isSubmitted) {
              if (placedId === fact.id) slotColor = "border-green-500 bg-green-100 border-solid"; // Correct
              else slotColor = "border-red-400 bg-red-100 border-solid"; // Wrong
            } else if (selectedImageId !== null && placedId === null) {
              slotColor = "border-[#967FF5] bg-sky-50 animate-pulse border-dashed"; // Hint: "Drop here!"
            }

            return (
              <div key={fact.id} className="flex items-center justify-between gap-4 leading-[1.2]">

                {/* Text Fact */}
                <div className="flex-1 font-medium text-[#313F3A]0 text-[19px] text-left">
                  {fact.text}
                </div>

                {/* The Slot Box */}
                <button
                  onClick={() => handleSlotClick(index)}
                  disabled={isSubmitted}
                  className={`
                    w-24 h-24 rounded-2xl border-4 flex items-center justify-center transition-all relative
                    ${slotColor}
                  `}
                >
                  {placedImage ? (
                    <Image src={placedImage} alt='image' width={120} height={120} className="w-14 h-14 drop-shadow-sm animate-float" />
                  ) : (
                    <span className="text-slate-200 text-3xl font-black opacity-50">?</span>
                  )}

                  {/* Validation Icon */}
                  {isSubmitted && (
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border flex items-center ">
                      {placedId === fact.id ? <i className='icon-check_thick text-green-500'></i> : <i className='icon-close_thick text-red -500'></i>}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/* FOOTER ACTION */}
      <div className="w-full max-w-md px-4 pb-12">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={slots.includes(null)} // Disable until all filled
            className="w-full bg-[#967FF5] text-white py-4 rounded-full font-medium text-xl hover:bg-[#967FF5] disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_0_#8677C2] active:shadow-none active:translate-y-1 transition-all"
          >
            {t('submit_answer')}
          </button>
        ) : (
          <div className="text-center animate-bounce">
            {isPerfect ? (
              <div className="bg-[#79A74E] text-white p-4 rounded-2xl font-medium border-b-8 border-[#688F44] mb-4">
                🎉 {t('perfect_score')}
              </div>
            ) : (
              <div className="bg-[#FE3939] text-white p-4 rounded-2xl font-medium border-b-8 border-[#F20D0D] mb-4 flex items-center gap-x-2 justify-center">
                {t('you_got', {
                  score: getScore(),
                  length: gameData.items.length
                })}
                <Image src={'/images/oops.png'} className="" alt={fruit.name} width={30} height={30} />
              </div>
            )}

            {isPerfect ? (
              <button onClick={onNext} className="w-full text-[#313F3A] font-medium underline active:translate-y-1 transition-all active:translate-y-1 transition-all">
                {isLastLevel ? t('finish_game') + " 🏆" : t('next_game') + " ➡"}
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
  );
}