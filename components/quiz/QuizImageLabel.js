'use client';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import CloseButton from '@/components/close-button'
import { useGetQuizAnswerStatus } from '@/lib/hooks/useGetQuizAnswerStatus'

const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizImageLabel({ fruit, onBack, onNext, isLastLevel, userQuizId, token, apiUrl, locale }) {
  const t = useTranslations();
  const { data: quizAnswerStatusData, isLoading: quizAnswerStatusLoading, refresh: quizAnswerStatusRefresh } = useGetQuizAnswerStatus({ user_quiz_id: userQuizId });
  // 1. Setup Data
  const generateData = useCallback(() => {
    const items = fruit.product_uses.map((m, i) => {
      const text = typeof m === 'object' ? m.text : m;
      const image = typeof m === 'object' ? m.image : null;
      const apiId = typeof m === 'object' ? m.id : null;
      const apiLabelId = typeof m === 'object' ? m.image_id : null;

      return {
        id: i,
        apiId,
        apiLabelId,
        text,
        image: (typeof image === 'object' && image.url) ? image.url : image
      };
    });

    // Shuffle the text labels for the pool
    const shuffledLabels = shuffle([...items]);

    return { items, shuffledLabels };
  }, [fruit]);

  const [gameData, setGameData] = useState(generateData());
  const [slots, setSlots] = useState(new Array(gameData.items.length).fill(null));
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitAnswerToApi = async () => {
    if (!userQuizId || !token) return;

    const userSelection = gameData.items.map((targetItem, index) => {
      const placedLabelLocalId = slots[index];
      const placedLabel = gameData.shuffledLabels.find(l => l.id === placedLabelLocalId);

      return {
        id: targetItem.apiId, // The ID of the Image (Target)
        image_id: placedLabel?.apiLabelId // The ID of the Text Label (Selection)
      };
    });

    try {
      const payload = {
        user_quiz_id: userQuizId,
        quiz_locale: locale,
        answers: [
          {
            question_type: "product_uses", // Matches API Key
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

      console.log("✅ ImageLabel Answer submitted:", payload);
      await quizAnswerStatusRefresh();
    } catch (error) {
      console.error("❌ Failed to submit ImageLabel answer:", error);
    }
  };


  // --- ACTIONS ---

  // Click a Text Label (Pool)
  const handlePoolClick = (id) => {
    if (isSubmitted) return;

    // If label is already on the board, remove it from board and select it
    const currentSlotIndex = slots.indexOf(id);
    if (currentSlotIndex !== -1) {
      const newSlots = [...slots];
      newSlots[currentSlotIndex] = null;
      setSlots(newSlots);
    }

    // Toggle selection
    setSelectedLabelId(id === selectedLabelId ? null : id);
  };


  const getScore = () => {
    let correct = 0;
    slots.forEach((labelId, index) => {
      // Correct if the label ID matches the Image ID (index)
      if (labelId === gameData.items[index].id) correct++;
    });
    return correct;
  };

  // Click a Slot (Below Image)
  const handleSlotClick = (index) => {
    if (isSubmitted) return;

    if (selectedLabelId !== null) {
      // Place selection into slot
      const newSlots = [...slots];
      newSlots[index] = selectedLabelId;
      setSlots(newSlots);
      setSelectedLabelId(null);
    } else if (slots[index] !== null) {
      // Pick up item from slot
      const labelId = slots[index];
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setSelectedLabelId(labelId);
    }
  };

  const handleRetry = () => {
    setSlots(new Array(gameData.items.length).fill(null));
    setSelectedLabelId(null);
    setIsSubmitted(false);
    setGameData(generateData()); // Re-shuffle labels
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    submitAnswerToApi(); // ⬅️ Call API
  };

  const isPerfect = getScore() === gameData.items.length;

  return (
    <div className="bg-[url('/images/bg13-end_product.png')] bg-cover bg-top min-h-screen relative pt-safe pb-12">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0 relative">
        <button onClick={onBack}>
          <CloseButton />
        </button>
        <h1 className="font-semibold text-[22px] absolute mx-auto left-0 right-0 w-fit uppercase">{t('name_it')}</h1>
      </div>
      <h2 className='text-[#313F3A] text-[19px] text-center gap-2 py-6 px-4 leading-[1.2]'>{t("tap_name")} </h2>


      {/* 🖼️ IMAGE GRID (Questions) */}
      <div className='w-full max-w-md px-4'>
        <div className=" grid grid-cols-2 gap-4 mb-8">
          {gameData.items.map((item, index) => {
            const placedLabelId = slots[index];
            const placedLabelText = placedLabelId !== null
              ? gameData.items.find(i => i.id === placedLabelId)?.text
              : null;

            let slotStyle = "bg-white border-slate-200";

            if (isSubmitted) {
              if (placedLabelId === item.id) slotStyle = "bg-[#E0FFC2] border-[#79A74E] text-[#79A74E]";
              else slotStyle = "bg-red-100 border-red-400 text-red-700";
            } else if (selectedLabelId !== null && placedLabelId === null) {
              slotStyle = "bg-yellow-100 border-yellow-400 animate-pulse"; // Hint
            }

            return (
              <div key={item.id} className="flex flex-col items-center">
                {/* The Image */}
                <div className="w-full h-32 bg-white rounded-2xl border-4 border-slate-100 flex items-center justify-center mb-2 shadow-sm p-4">
                  <img src={item.image} className="w-20 h-20 object-contain drop-shadow-md" />
                </div>

                {/* The Drop Slot */}
                <button
                  onClick={() => handleSlotClick(index)}
                  disabled={isSubmitted}
                  className={`
                    w-full h-12 rounded-xl border-b-4 border-2 font-medium text-sm transition-all
                    ${slotStyle}
                  `}
                >
                  {placedLabelText || <span className="opacity-20">???</span>}
                </button>
              </div>
            );
          })}
        </div>


        <div className="w-full max-w-md bg-white/50 rounded-3xl p-4 border-2 border-slate-200">
          <div className="flex flex-wrap justify-center gap-3">
            {gameData.shuffledLabels.map((label) => {
              const isUsed = slots.includes(label.id);
              const isSelected = selectedLabelId === label.id;

              if (isUsed && !isSubmitted) return null; // Hide from pool if placed (unless showing results)

              return (
                <button
                  key={label.id}
                  onClick={() => handlePoolClick(label.id)}
                  disabled={isSubmitted || isUsed}
                  className={`
                    px-4 py-2 rounded-xl font-medium border-b-4 border-2 transition-all
                    ${isSelected ? 'bg-yellow-400 border-yellow-600 text-white scale-110 shadow-lg' : 'bg-white border-slate-300 text-slate-700'}
                    ${isUsed && isSubmitted ? 'opacity-50 grayscale' : ''}
                  `}
                >
                  {label.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="w-full max-w-md mt-6 px-4 pb-12">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={slots.includes(null)}
            className="w-full bg-[#60BBEC] text-white py-4 rounded-full font-medium text-xl hover:bg-[#60BBEC] disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_0_#559FC7] active:shadow-none active:translate-y-1 transition-all"
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