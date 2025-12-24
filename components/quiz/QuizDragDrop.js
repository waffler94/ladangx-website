'use client';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

// Helper to shuffle
const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizDragDrop({ fruit, onBack, onNext, isLastLevel, userQuizId, token, apiUrl, locale }) {
  const t = useTranslations(); 
  // 1. Prepare Game Data
  const generateData = useCallback(() => {
    // Convert facts into items with unique IDs
    const items = fruit.interesting_facts.map((f, i) => {
      const text = typeof f === 'object' ? f.text : f;
      const image = typeof f === 'object' ? f.image : null; 
      const apiId = typeof f === 'object' ? f.id : null;
      const apiImageId = (typeof f === 'object' && typeof f.image === 'object') ? f.image.id : null;
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
        image_id: placedItem?.apiImageId || placedItem?.apiId // The ID of the Image (Selection)
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
    <div className="min-h-screen bg-sky-50 p-4 flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={onBack} className="font-bold text-sky-600 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-sky-200">
            {t('back')}
        </button>
        <h2 className="font-black text-2xl text-sky-400 uppercase tracking-widest">{t('facts')}!</h2>
      </div>

      <p className="text-slate-500 font-bold mb-4 text-center">
        {t('tap_picture')}
      </p>

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
                  ${isSelected ? 'border-sky-500 bg-sky-100 scale-110 shadow-lg z-10' : 'border-slate-100 bg-slate-50'}
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
          if (placedId !== null) slotColor = "border-sky-300 bg-sky-50 border-solid"; // Filled
          
          if (isSubmitted) {
            if (placedId === fact.id) slotColor = "border-green-500 bg-green-100 border-solid"; // Correct
            else slotColor = "border-red-400 bg-red-100 border-solid"; // Wrong
          } else if (selectedImageId !== null && placedId === null) {
            slotColor = "border-sky-400 bg-sky-50 animate-pulse border-dashed"; // Hint: "Drop here!"
          }

          return (
            <div key={fact.id} className="flex items-center justify-between gap-4">
              
              {/* Text Fact */}
              <div className="flex-1 font-bold text-slate-700 text-lg leading-tight text-left">
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
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border">
                    {placedId === fact.id ? '✅' : '❌'}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* FOOTER ACTION */}
      <div className="w-full max-w-md">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            disabled={slots.includes(null)} // Disable until all filled
            className="w-full bg-sky-500 text-white py-4 rounded-2xl font-black text-xl hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_#0284c7] active:shadow-none active:translate-y-1 transition-all"
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