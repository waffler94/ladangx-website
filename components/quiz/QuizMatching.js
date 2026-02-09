'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CloseButton from '@/components/close-button'
import { useGetQuizAnswerStatus } from '@/lib/hooks/useGetQuizAnswerStatus'

// Helper to shuffle an array
const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizMatching({ fruit, onBack, onNext, isLastLevel, userQuizId, token, apiUrl, locale }) {
  const t = useTranslations();
  const { data: quizAnswerStatusData, isLoading: quizAnswerStatusLoading, refresh: quizAnswerStatusRefresh } = useGetQuizAnswerStatus({ user_quiz_id: userQuizId });
  // 1. Initialize Game Data
  const generateData = useCallback(() => {
    // Note: Ensure fruit.health_benefits exists in your JSON
    const rawData = fruit.health_benefits || [];

    // const allPairs = benefits.map((item, i) => ({
    //   id: i, 
    //   text: item.text, 
    //   image: item.image
    // }));
    const allPairs = rawData.map((item, i) => {
      // Handle Object vs String safely
      const text = typeof item === 'object' ? item.text : item;
      const image = typeof item === 'object' ? item.image : null;
      const apiId = typeof item === 'object' ? item.id : null;
      const apiImageId = typeof item === 'object' ? item.image_id : null;

      return {
        id: i, // Local ID used for React keys and matching logic
        apiId, // DB ID for API submission
        apiImageId,
        text,
        image
      };
    });

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

  const submitAnswerToApi = async () => {
    if (!userQuizId || !token) return;

    // Construct Payload: Map the user's connections to DB IDs
    // We map over the LEFT items because that's usually the starting point
    const userSelection = Object.entries(connections).map(([leftLocalId, rightLocalId]) => {
      const leftItem = data.left.find(i => i.id === parseInt(leftLocalId));
      const rightItem = data.right.find(i => i.id === parseInt(rightLocalId));

      return {
        id: leftItem?.apiId,       // The ID of the item on the left (Icon)
        image_id: rightItem?.apiImageId // The ID of the item on the right (Text)
      };
    });

    try {
      const payload = {
        user_quiz_id: userQuizId,
        quiz_locale: locale,
        answers: [
          {
            question_type: "health_benefits", // Matches API Key
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

      console.log("✅ Matching Answer submitted:", payload);
      await quizAnswerStatusRefresh();
    } catch (error) {
      console.error("❌ Failed to submit matching answer:", error);
    }
  };


  const updateLines = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines = [];

    Object.entries(connections).map(([leftId, rightId]) => {
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
    submitAnswerToApi();
  };

  const isPerfect = score === data.originalLength;

  return (
    <div className="bg-[url('/images/bg10-benefits.png')] bg-cover bg-top min-h-screen relative pt-safe pb-12">
      <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0 relative">
        <button onClick={onBack}>
          <CloseButton />
        </button>
        <h1 className="font-semibold text-[22px] absolute mx-auto left-0 right-0 w-fit uppercase">{t('match_it')}</h1>
      </div>
      <h2 className='text-[#313F3A] text-[19px] text-center gap-2 py-6 px-4 leading-[1.2]'>{t("matching_it_desc")} </h2>
      {/* GAME BOARD */}
      <div ref={containerRef} className="relative w-full max-w-md flex justify-between gap-8 mb-12 px-4">

        {/* SVG Overlay (Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-visible">
          {lines.map((line) => {
            // Line Logic: Orange (Active) -> Green (Correct) -> Red (Wrong)
            let strokeColor = "#FFB323";
            if (isSubmitted) strokeColor = line.isCorrect ? "#79A74E" : "#FE3939";

            return (
              <line
                key={line.key}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={strokeColor}
                strokeWidth="4"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* LEFT COLUMN (Icons) */}
        <div className="flex flex-col gap-6 w-1/3 relative z-20">
          {data.left.map((item) => {
            const isSelected = selectedLeft === item.id;
            const isConnected = connections[item.id] !== undefined;

            // Result Logic
            const isCorrect = isSubmitted && connections[item.id] === item.id;
            const isWrong = isSubmitted && isConnected && !isCorrect;

            // Determine Styles based on state
            let borderClass = 'border-slate-200';
            let bgClass = 'bg-white';
            let dotColor = 'bg-slate-300';

            if (isSelected || isConnected) {
              borderClass = 'border-[#FFB323]';
              dotColor = 'bg-[#FFB323]';
              if (isSelected) bgClass = 'bg-orange-50 scale-105'; // Little pop when selecting
            }

            if (isCorrect) {
              borderClass = 'border-[#79A74E]'; // Green
              bgClass = 'bg-green-50';
              dotColor = 'bg-[#79A74E]';
            } else if (isWrong) {
              borderClass = 'border-[#FE3939]'; // Red
              bgClass = 'bg-rose-50';
              dotColor = 'bg-[#FE3939]';
            }

            return (
              <button
                key={item.id}
                onClick={() => handleLeftClick(item.id)}
                disabled={isSubmitted} // Disable clicking after submit
                className={`
                  relative h-24 w-full rounded-2xl border-2 flex items-center justify-center shadow-sm transition-all
                  ${borderClass} ${bgClass}
                `}
              >
                <Image src={item.image || "/next.svg"} className="w-12 h-12" alt="icon" width={50} height={50} />
                <div ref={el => leftDotRefs.current[item.id] = el} className={`absolute -right-2 w-4 h-4 rounded-full ${dotColor}`}></div>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN (Text) */}
        <div className="flex flex-col gap-6 w-1/3 relative z-20">
          {data.right.map((item) => {
            // Find if this right item is connected to ANY left item
            const connectedLeftId = Object.keys(connections).find(key => connections[key] === item.id);
            const isConnected = connectedLeftId !== undefined;

            // Result Logic
            // It is correct if the connected Left ID (parsed to int) equals this item's ID
            const isCorrect = isSubmitted && isConnected && parseInt(connectedLeftId) === item.id;
            const isWrong = isSubmitted && isConnected && !isCorrect;

            // Determine Styles
            let borderClass = 'border-slate-200';
            let bgClass = 'bg-white';
            let dotColor = 'bg-slate-300';

            if (isConnected) {
              borderClass = 'border-[#FFB323]';
              dotColor = 'bg-[#FFB323]';
            }

            if (isCorrect) {
              borderClass = 'border-[#79A74E]'; // Green
              bgClass = 'bg-green-50';
              dotColor = 'bg-[#79A74E]';
            } else if (isWrong) {
              borderClass = 'border-[#FE3939]'; // Red
              bgClass = 'bg-rose-50';
              dotColor = 'bg-[#FE3939]';
            }

            return (
              <button
                key={item.id}
                onClick={() => handleRightClick(item.id)}
                disabled={isSubmitted}
                className={`
                  relative h-24 w-full rounded-2xl border-2 flex items-center px-3 shadow-sm text-left transition-all
                  ${borderClass} ${bgClass}
                `}
              >
                <div ref={el => rightDotRefs.current[item.id] = el} className={`absolute -left-2 w-4 h-4 rounded-full ${dotColor}`}></div>
                <span className="font-medium text-[14px] text-[#313F3A] leading-tight">{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-md px-4">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(connections).length < data.originalLength}
            className="w-full bg-[#FFBB68] text-white py-4 rounded-full font-medium text-xl hover:bg-[#FFBB68] disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_0_#FFA536] active:shadow-none active:translate-y-1 transition-all"
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
                  score: score,
                  length: data.originalLength
                })}
                <Image src={'/images/oops.png'} className="" alt={fruit.name} width={30} height={30} />
              </div>
            )}

            {isPerfect ? (
              <button
                onClick={onNext} // Proceed to Next Level (or Finish if last)
                className="w-full text-[#313F3A] font-medium underline active:translate-y-1 transition-all active:translate-y-1 transition-all"
              >
                {isLastLevel ? t('finish_game') + " 🏆" : t('next_game') + " ➡"}
              </button>
            ) : (
              <button
                onClick={handleRetry} // Reset Game
                className="w-full text-[#313F3A] font-medium underline active:translate-y-1 transition-all"
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