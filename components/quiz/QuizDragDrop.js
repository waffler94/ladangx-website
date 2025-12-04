'use client';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { getDynamicIcon } from '@/utils/iconHelper'; 

// Helper to shuffle
const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizDragDrop({ fruit, allFruits, onBack }) {
  
  // 1. Prepare Game Data
  const gameData = useMemo(() => {
    // Convert facts into items with unique IDs
    const items = fruit.facts.map((f, i) => ({
      id: i,
      text: f.text,
      image: f.image,
      icon: getDynamicIcon(text) 
    }));

    // Shuffle the images for the top pool so they aren't in order
    const shuffledPool = shuffle([...items]);

    return { items, shuffledPool };
  }, [fruit]);

  // 2. State
  // slots: Array matching 'items'. Stores the ID of the image placed there. 
  // e.g. [2, null, 0] means Slot 0 has Image 2, Slot 1 is empty, Slot 2 has Image 0.
  const [slots, setSlots] = useState(new Array(gameData.items.length).fill(null));
  
  // selection: The ID of the image currently "picked up" from the top pool
  const [selectedImageId, setSelectedImageId] = useState(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  return (
    <div className="min-h-screen bg-sky-50 p-4 flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={onBack} className="font-bold text-sky-600 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-sky-200">
           Exit
        </button>
        <h2 className="font-black text-2xl text-sky-400 uppercase tracking-widest">Fun Facts!</h2>
      </div>

      <p className="text-slate-500 font-bold mb-4 text-center">
        Tap a picture, then tap the box that matches!
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
            onClick={() => setIsSubmitted(true)}
            disabled={slots.includes(null)} // Disable until all filled
            className="w-full bg-sky-500 text-white py-4 rounded-2xl font-black text-xl hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_#0284c7] active:shadow-none active:translate-y-1 transition-all"
          >
            Check Matches
          </button>
        ) : (
          <div className="text-center animate-bounce">
             {getScore() === gameData.items.length ? (
               <div className="bg-green-100 text-green-700 p-4 rounded-2xl font-bold border-2 border-green-400">
                  🎉 All Correct! Smarty pants!
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