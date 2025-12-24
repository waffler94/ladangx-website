'use client';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizImageLabel({ fruit, onBack, onNext, isLastLevel, userQuizId, token, apiUrl, locale }) {
  const t = useTranslations(); 
  // 1. Setup Data
  const generateData = useCallback(() => {
    const items = fruit.product_uses.map((m, i) => {
      const text = typeof m === 'object' ? m.text : m;
      const image = typeof m === 'object' ? m.image : null;
      const apiId = typeof m === 'object' ? m.id : null;
      const apiLabelId = apiId;

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
    <div className="min-h-screen bg-yellow-50 p-4 flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={onBack} className="font-bold text-yellow-600 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-yellow-200">
           {t('back')}
        </button>
        <h2 className="font-black text-2xl text-yellow-500 uppercase tracking-widest">{t('name_it')}</h2>
      </div>

      <p className="text-slate-500 font-bold mb-6 text-center text-sm">
        {t('tap_name')}
      </p>

      {/* 🖼️ IMAGE GRID (Questions) */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-8">
        {gameData.items.map((item, index) => {
          const placedLabelId = slots[index];
          const placedLabelText = placedLabelId !== null 
            ? gameData.items.find(i => i.id === placedLabelId)?.text 
            : null;

          let slotStyle = "bg-white border-slate-200";
          
          if (isSubmitted) {
            if (placedLabelId === item.id) slotStyle = "bg-green-100 border-green-500 text-green-700";
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
                  w-full h-12 rounded-xl border-b-4 border-2 font-black text-sm transition-all
                  ${slotStyle}
                `}
              >
                {placedLabelText || <span className="opacity-20">???</span>}
              </button>
            </div>
          );
        })}
      </div>

      {/* 🏷️ LABEL POOL (Answers) */}
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
                  px-4 py-2 rounded-xl font-bold border-b-4 border-2 transition-all
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

      {/* FOOTER */}
      <div className="w-full max-w-md mt-6">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            disabled={slots.includes(null)}
            className="w-full bg-yellow-500 text-white py-4 rounded-2xl font-black text-xl hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_#ca8a04] active:shadow-none active:translate-y-1 transition-all"
          >
            {t('submit_answer')}
          </button>
        ) : (
          <div className="text-center animate-bounce">
             {isPerfect ? (
               <div className="bg-green-100 text-green-700 p-4 rounded-2xl font-bold border-2 border-green-400 mb-4">
                  🎉 {t('perfect_score')}
               </div>
             ) : (
               <div className="bg-orange-100 text-orange-700 p-4 rounded-2xl font-bold border-2 border-orange-400 mb-4">
                  {t('you_got', {
                    score: getScore(),
                    length: gameData.items.length
                  })}
               </div>
             )}

             {isPerfect ? (
               <button onClick={onNext} className="w-full bg-green-500 text-white py-3 rounded-xl font-black text-lg hover:bg-green-600 shadow-md">
                 {isLastLevel ? t('finish_game')+" 🏆" : t('next_game')+" ➡"}
               </button>
             ) : (
               <button onClick={handleRetry} className="w-full bg-rose-500 text-white py-3 rounded-xl font-black text-lg hover:bg-rose-600 shadow-md">
                 {t('try_again')} ↺
               </button>
             )}
          </div>
        )}
      </div>

    </div>
  );
}