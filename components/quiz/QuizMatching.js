'use client';
import { useState, useRef, useEffect, useCallback  } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Helper to shuffle an array
const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizMatching({ fruit, onBack, onNext, isLastLevel }) {
  const t = useTranslations();
  // 1. Initialize Game Data
  const generateData = useCallback(() => {
    // Note: Ensure fruit.health_benefits exists in your JSON
    const benefits = fruit.health_benefits || []; 
    
    const allPairs = benefits.map((item, i) => ({
      id: i, 
      text: item.text, 
      image: item.image
    }));

    const selectedPairs = shuffle(allPairs).slice(0, 12);

    return { 
      left: shuffle(selectedPairs), 
      right: shuffle(selectedPairs),
      originalLength: selectedPairs.length
    };
  }, [fruit]);

  const [data, setData] = useState(generateData());
  const [connections, setConnections] = useState({}); 
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState([]);

  // Refs for Line Drawing
  const containerRef = useRef(null);
  const leftDotRefs = useRef([]);
  const rightDotRefs = useRef([]);

  // --- Line Drawing Logic ---
   const handleRetry = () => {
    setConnections({});
    setSelectedLeft(null);
    setIsSubmitted(false);
    setScore(0);
    setLines([]);
    setData(generateData()); // Re-shuffle new cards
  };


  const updateLines = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines = [];

    Object.entries(connections).map(([leftId, rightId]) => {
      // Find the visual index of the item with this specific ID
      // (Because the arrays are shuffled, ID 0 might be at index 2)
      
      // We stored refs by ITEM ID, so we can access them directly:
      const leftDot = leftDotRefs.current[leftId];
      const rightDot = rightDotRefs.current[rightId]; // Note: logic depends on how we assign refs below

      if (leftDot && rightDot) {
        const lRect = leftDot.getBoundingClientRect();
        const rRect = rightDot.getBoundingClientRect();

        newLines.push({
          key: leftId,
          x1: lRect.left + lRect.width / 2 - containerRect.left,
          y1: lRect.top + lRect.height / 2 - containerRect.top,
          x2: rRect.left + rRect.width / 2 - containerRect.left,
          y2: rRect.top + rRect.height / 2 - containerRect.top,
          isCorrect: parseInt(leftId) === parseInt(rightId)
        });
      }
    });
    setLines(newLines);
  };

  useEffect(() => {
    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, [connections, isSubmitted]);

  // --- Interaction Logic ---
  const handleLeftClick = (id) => {
    if (isSubmitted) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (rightId) => {
    if (isSubmitted) return;
    if (selectedLeft === null) return; 
    setConnections(prev => ({ ...prev, [selectedLeft]: rightId }));
    setSelectedLeft(null); 
  };

  const handleSubmit = () => {
    let correct = 0;
    // Iterate through the actual pairs we selected
    data.left.forEach(l => {
      if (connections[l.id] === l.id) correct++;
    });
    setScore(correct);
    setIsSubmitted(true);
  };

  const isPerfect = score === data.originalLength;

  return (
    <div className="min-h-screen bg-rose-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={onBack} className="font-bold text-rose-500 bg-white px-4 py-2 rounded-xl shadow-sm">
           {t('back')}
        </button>
        <h2 className="font-black text-2xl text-rose-400 uppercase tracking-widest">{t('match_it')}</h2>
      </div>

      <div className="w-full max-w-md text-center mb-4">
        <p className="text-slate-500 font-bold">{t('tap_icon')}</p>
      </div>

      {/* GAME BOARD */}
      <div ref={containerRef} className="relative w-full max-w-md flex justify-between gap-8 mb-8">
        
        {/* SVG Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-visible">
          {lines.map((line) => {
            let strokeColor = "#fb7185"; 
            if (isSubmitted) strokeColor = line.isCorrect ? "#4ade80" : "#ef4444"; 
            return (
              <line
                key={line.key}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={strokeColor}
                strokeWidth="6"
                strokeLinecap="round"
                className="transition-all duration-300 drop-shadow-sm"
              />
            );
          })}
        </svg>

        {/* LEFT COLUMN (Randomized Icons) */}
        <div className="flex flex-col gap-6 w-1/3 relative z-20">
          {data.left.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLeftClick(item.id)}
              className={`
                relative h-24 w-full bg-white rounded-2xl border-4 flex items-center justify-center shadow-sm transition-all
                ${selectedLeft === item.id ? 'border-rose-500 scale-105 bg-rose-50' : 'border-slate-200'}
                ${isSubmitted && connections[item.id] === item.id ? 'border-green-400 bg-green-50' : ''}
              `}
            >
              <Image src={item.image || "/next.svg"} className="w-12 h-12" alt="icon" width={50} height={50} />
              {/* IMPORTANT: Use item.id for the Ref Key so lines track correctly regardless of shuffle */}
              <div ref={el => leftDotRefs.current[item.id] = el} className={`absolute -right-3 w-5 h-5 rounded-full border-2 border-white ${selectedLeft === item.id || connections[item.id] !== undefined ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
            </button>
          ))}
        </div>

        {/* RIGHT COLUMN (Randomized Text) */}
        <div className="flex flex-col gap-6 w-1/3 relative z-20">
          {data.right.map((item) => (
            <button
              key={item.id}
              onClick={() => handleRightClick(item.id)}
              className={`
                relative h-24 w-full bg-white rounded-2xl border-4 flex items-center px-4 shadow-sm text-left transition-all
                ${Object.values(connections).includes(item.id) ? 'border-rose-200' : 'border-slate-200'}
                ${isSubmitted && connections[item.id] === item.id ? 'border-green-400 bg-green-50' : ''}
              `}
            >
               <div ref={el => rightDotRefs.current[item.id] = el} className={`absolute -left-3 w-5 h-5 rounded-full border-2 border-white ${Object.values(connections).includes(item.id) ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
              <span className="font-bold text-sm text-slate-700 leading-tight pl-2">{item.text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            disabled={Object.keys(connections).length < data.originalLength}
            className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black text-xl hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_#0f172a] active:shadow-none active:translate-y-1 transition-all"
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
               <div className="bg-rose-100 text-rose-700 p-4 rounded-2xl font-bold border-2 border-rose-400 mb-4">
                  {t('you_got', {
                    score: score,
                    length: data.originalLength
                  })}
               </div>
             )}

             {isPerfect ? (
               <button 
                 onClick={onNext} // Proceed to Next Level (or Finish if last)
                 className="w-full bg-green-500 text-white py-3 rounded-xl font-black text-lg hover:bg-green-600 shadow-md active:translate-y-1 transition-all"
               >
                 {isLastLevel ? t('finish_game')+" 🏆" : t('next_game')+" ➡"}
               </button>
             ) : (
               <button 
                 onClick={handleRetry} // Reset Game
                 className="w-full bg-rose-500 text-white py-3 rounded-xl font-black text-lg hover:bg-rose-600 shadow-md active:translate-y-1 transition-all"
               >
                 {t('try_again')} ↺
               </button>
             )}
          </div>
        )}
      </div>
    </div>
  );
}