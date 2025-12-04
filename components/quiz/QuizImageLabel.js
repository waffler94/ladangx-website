'use client';
import { useState, useMemo } from 'react';
import { getDynamicIcon } from '@/utils/iconHelper';

const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizImageLabel({ fruit, allFruits, onBack }) {
  
  // 1. Setup Data
  const gameData = useMemo(() => {
    const items = fruit.makes.map((m, i) => ({
      id: i,
      text: m.text,
      image: m.image,
      icon: getDynamicIcon(text) 
    }));

    // Shuffle the text labels for the pool
    const shuffledLabels = shuffle([...items]);

    return { items, shuffledLabels };
  }, [fruit]);

  // slots: Array storing the ID of the Label placed in that slot
  const [slots, setSlots] = useState(new Array(gameData.items.length).fill(null));
  
  // selectedLabelId: The ID of the text label currently picked up
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const getScore = () => {
    let correct = 0;
    slots.forEach((labelId, index) => {
      // Correct if the label ID matches the Image ID (index)
      if (labelId === gameData.items[index].id) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4 flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={onBack} className="font-bold text-yellow-600 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-yellow-200">
           Exit
        </button>
        <h2 className="font-black text-2xl text-yellow-500 uppercase tracking-widest">Name It!</h2>
      </div>

      <p className="text-slate-500 font-bold mb-6 text-center text-sm">
        Tap a name below, then tap the box under the picture.
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
            onClick={() => setIsSubmitted(true)}
            disabled={slots.includes(null)}
            className="w-full bg-yellow-500 text-white py-4 rounded-2xl font-black text-xl hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_#ca8a04] active:shadow-none active:translate-y-1 transition-all"
          >
            Check Names
          </button>
        ) : (
          <div className="text-center animate-bounce">
             {getScore() === gameData.items.length ? (
               <div className="bg-green-100 text-green-700 p-4 rounded-2xl font-bold border-2 border-green-400">
                  🎉 Yummy! You got them all!
               </div>
             ) : (
               <div className="bg-orange-100 text-orange-700 p-4 rounded-2xl font-bold border-2 border-orange-400">
                  You got {getScore()} out of {gameData.items.length}.
               </div>
             )}
             <button onClick={onBack} className="mt-4 text-slate-400 font-bold underline">Try another challenge</button>
          </div>
        )}
      </div>

    </div>
  );
}