'use client';
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import CloseButton from '@/components/close-button';

const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const ALL_CARDS = [
  { id: 'tap_water',   name: '1 Litre of Tap Water',   co2: 0.0005, co2Label: '0.0005 kg CO₂', image: '/carbon/tap_water.png',   answerImage: '/carbon/tap_water_answer.png' },
  { id: 'led_bulb',    name: 'LED Bulb (10hr use)',     co2: 0.03,   co2Label: '0.03 kg CO₂',   image: '/carbon/led_bulb.png',    answerImage: '/carbon/led_bulb_answer.png' },
  { id: 'eggs',        name: '2 Eggs',                  co2: 0.5,    co2Label: '0.5 kg CO₂',    image: '/carbon/eggs.png',        answerImage: '/carbon/eggs_answer.png' },
  { id: 'bread',       name: 'A Loaf of Bread',         co2: 1,      co2Label: '~1 kg CO₂',     image: '/carbon/bread.png',       answerImage: '/carbon/bread_answer.png' },
  { id: 'chocolate',   name: 'Chocolate (100g)',         co2: 2.5,    co2Label: '2.5 kg CO₂',    image: '/carbon/chocolate.png',   answerImage: '/carbon/chocolate_answer.png' },
  { id: 'cheese',      name: '200g of Cheese',          co2: 4,      co2Label: '4 kg CO₂',      image: '/carbon/cheese.png',      answerImage: '/carbon/cheese_answer.png' },
  { id: 'beef_burger', name: 'Beef Burger (1 serving)', co2: 5,      co2Label: '5 kg CO₂',      image: '/carbon/beef_burger.png', answerImage: '/carbon/beef_burger_answer.png' },
  { id: 'sports_shoe', name: 'Sports Shoe (1 pair)',    co2: 14,     co2Label: '14 kg CO₂',     image: '/carbon/sports_shoe.png', answerImage: '/carbon/sports_shoe_answer.png' },
  { id: 'petrol_car',  name: 'Petrol Car (100km)',      co2: 20,     co2Label: '20 kg CO₂',     image: '/carbon/petrol_car.png',  answerImage: '/carbon/petrol_car_answer.png' },
  { id: 'jeans',       name: 'A Pair of Jeans',         co2: 30,     co2Label: '30 kg CO₂',     image: '/carbon/jeans.png',       answerImage: '/carbon/jeans_answer.png' },
  { id: 'smartphone',  name: 'Smartphone (2yr use)',    co2: 80,     co2Label: '~80 kg CO₂',    image: '/carbon/smartphone.png',  answerImage: '/carbon/smartphone_answer.png' },
];

const NUM_CARDS = 6;
const pickGameCards = () => shuffle(ALL_CARDS).slice(0, NUM_CARDS);
const ROTATIONS = [1.2, -1.5, 0.8, -1.0, 1.8, -0.6, 1.3, -1.7, 0.5, -1.2, 1.0];
const CARD_W = 130;
const CARD_H = 182;
const PEEK = 18;

export default function QuizCarbonFootprint({ onBack }) {
  const [gameCards, setGameCards] = useState(pickGameCards);
  const correctIds = useMemo(
    () => [...gameCards].sort((a, b) => a.co2 - b.co2).map(c => c.id),
    [gameCards]
  );
  const [pool, setPool] = useState(() => shuffle(gameCards));
  const [stack, setStack] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const [justAddedId, setJustAddedId] = useState(null);
  const [dragListId, setDragListId] = useState(null);
  const [dragOverListIdx, setDragOverListIdx] = useState(null);

  // Refs for touch drag
  const dropZoneRef = useRef(null);
  const touchRef = useRef({ type: null, id: null });

  const allPlaced = pool.length === 0;

  const addCard = (card) => {
    if (isSubmitted) return;
    setPool(prev => prev.filter(c => c.id !== card.id));
    setStack(prev => [...prev, card]);
    setJustAddedId(card.id);
    setTimeout(() => setJustAddedId(null), 450);
  };

  const reorderList = (fromId, toListIdx) => {
    const reversed = [...stack].reverse();
    const fromListIdx = reversed.findIndex(c => c.id === fromId);
    if (fromListIdx === -1 || fromListIdx === toListIdx) return;
    const [item] = reversed.splice(fromListIdx, 1);
    reversed.splice(toListIdx, 0, item);
    setStack(reversed.reverse());
  };

  // ── Mouse drag: pool → stack ──────────────────────────────────────────────
  const handleDragStart = (e, card) => {
    setDraggedId(card.id);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragEnd = () => setDraggedId(null);

  const handleDragOver = (e) => {
    if (!draggedId) return;
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (draggedId) {
      const card = pool.find(c => c.id === draggedId);
      if (card) addCard(card);
      setDraggedId(null);
    }
  };

  // ── Touch drag: pool → stack ──────────────────────────────────────────────
  const handlePoolTouchStart = (_e, card) => {
    touchRef.current = { type: 'pool', id: card.id };
    setDraggedId(card.id);
  };
  const handlePoolTouchMove = (e) => {
    if (touchRef.current.type !== 'pool') return;
    const touch = e.touches[0];
    const zone = dropZoneRef.current?.getBoundingClientRect();
    if (zone) {
      const over = touch.clientX >= zone.left && touch.clientX <= zone.right &&
                   touch.clientY >= zone.top  && touch.clientY <= zone.bottom;
      setIsDragOver(over);
    }
  };
  const handlePoolTouchEnd = (e) => {
    if (touchRef.current.type !== 'pool') return;
    const touch = e.changedTouches[0];
    const zone = dropZoneRef.current?.getBoundingClientRect();
    if (zone) {
      const over = touch.clientX >= zone.left && touch.clientX <= zone.right &&
                   touch.clientY >= zone.top  && touch.clientY <= zone.bottom;
      if (over) {
        const card = pool.find(c => c.id === touchRef.current.id);
        if (card) addCard(card);
      }
    }
    setIsDragOver(false);
    setDraggedId(null);
    touchRef.current = { type: null, id: null };
  };

  // ── Mouse drag: list reorder ──────────────────────────────────────────────
  const handleListDragStart = (e, card) => {
    setDragListId(card.id);
    e.dataTransfer.effectAllowed = 'move';
    e.stopPropagation();
  };
  const handleListDragOver = (e, listIdx) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverListIdx(listIdx);
  };
  const handleListDrop = (e, toListIdx) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragListId) reorderList(dragListId, toListIdx);
    setDragListId(null);
    setDragOverListIdx(null);
  };
  const handleListDragEnd = () => {
    setDragListId(null);
    setDragOverListIdx(null);
  };

  // ── Touch drag: list reorder ──────────────────────────────────────────────
  const handleListTouchStart = (_e, card) => {
    touchRef.current = { type: 'list', id: card.id };
    setDragListId(card.id);
  };
  const handleListTouchMove = (e) => {
    if (touchRef.current.type !== 'list') return;
    const touch = e.touches[0];
    // Temporarily hide dragged element so elementFromPoint finds the target beneath
    const draggingEl = document.querySelector(`[data-card-id="${touchRef.current.id}"]`);
    if (draggingEl) draggingEl.style.pointerEvents = 'none';
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (draggingEl) draggingEl.style.pointerEvents = '';
    const listItem = el?.closest('[data-list-idx]');
    if (listItem) setDragOverListIdx(parseInt(listItem.dataset.listIdx));
  };
  const handleListTouchEnd = (e) => {
    if (touchRef.current.type !== 'list') return;
    const touch = e.changedTouches[0];
    const draggingEl = document.querySelector(`[data-card-id="${touchRef.current.id}"]`);
    if (draggingEl) draggingEl.style.pointerEvents = 'none';
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (draggingEl) draggingEl.style.pointerEvents = '';
    const listItem = el?.closest('[data-list-idx]');
    if (listItem) reorderList(touchRef.current.id, parseInt(listItem.dataset.listIdx));
    setDragListId(null);
    setDragOverListIdx(null);
    touchRef.current = { type: null, id: null };
  };

  // ── Game actions ───────────────────────────────────────────────────────────
  const handleCheck = () => {
    const correct = stack.every((card, i) => card.id === correctIds[i]);
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    const fresh = pickGameCards();
    setGameCards(fresh);
    setPool(shuffle(fresh));
    setStack([]);
    setIsSubmitted(false);
    setIsCorrect(false);
    setDragListId(null);
    setDragOverListIdx(null);
    touchRef.current = { type: null, id: null };
  };

  const stackContainerH = stack.length === 0
    ? CARD_H
    : CARD_H + (stack.length - 1) * PEEK;

  return (
    <div className="bg-[url('/images/bg14-fun_fact.png')] bg-cover bg-top min-h-screen pt-safe pb-36">
      <style>{`
        @keyframes cardDrop {
          0%   { transform: translateY(-50px) scale(0.75) rotate(0deg); opacity: 0; }
          65%  { transform: translateY(6px) scale(1.04); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .card-drop { animation: cardDrop 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes stackPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
          50%       { box-shadow: 0 0 0 10px rgba(99,102,241,0.25); }
        }
        .drop-zone-active { animation: stackPulse 0.8s ease-in-out infinite; }
      `}</style>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-[17px] mb-2">
        <button onClick={onBack}><CloseButton /></button>
        <h1 className="font-semibold text-[22px] text-[#313F3A] uppercase">Carbon Footprint</h1>
        <button
          onClick={handleReset}
          className="text-[11px] font-bold text-slate-500 bg-white/70 px-3 py-1.5 rounded-full active:scale-95 transition-transform whitespace-nowrap"
        >
          Reset 🔄
        </button>
      </div>

      <p className="text-center text-sm font-semibold text-[#313F3A] mb-4 px-4">
        Stack from <span className="text-green-600 font-black">LEAST</span> → <span className="text-red-500 font-black">MOST</span> CO₂ 🌍
      </p>

      {/* ── STACK ZONE + SIDE LIST ── */}
      <div className="flex items-start justify-center gap-3 px-3">

        {/* LEFT: Drop zone */}
        <div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            w-1/2 flex flex-col items-center justify-start rounded-3xl
            transition-all duration-200 py-6 px-3
            ${isDragOver ? 'bg-indigo-50/60 drop-zone-active' : 'bg-transparent'}
          `}
        >
          <div className="relative" style={{ width: CARD_W, height: stackContainerH }}>
            {stack.length === 0 ? (
              <div className={`absolute inset-0 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center gap-2 transition-colors duration-200
                ${isDragOver ? 'border-indigo-400 bg-indigo-50' : 'border-[#DAE2DA] bg-white/50'}`}
              >
                <span className="text-3xl opacity-40">🃏</span>
                <p className="text-xs text-slate-400 font-medium text-center leading-snug px-2">
                  Drag or tap<br />a card here
                </p>
              </div>
            ) : (
              stack.map((card, i) => {
                const isTop = i === stack.length - 1;
                const topOffset = (stack.length - 1 - i) * PEEK;
                const rotation = isTop ? 0 : ROTATIONS[i % ROTATIONS.length];

                let borderCol = '#DAE2DA';
                if (isSubmitted) {
                  borderCol = card.id === correctIds[i] ? '#4ade80' : '#f87171';
                } else if (isTop && isDragOver) {
                  borderCol = '#818cf8';
                }

                return (
                  <div
                    key={card.id}
                    className={`absolute rounded-2xl overflow-hidden border-4
                      ${isTop && card.id === justAddedId ? 'card-drop' : ''}
                    `}
                    style={{
                      width: CARD_W,
                      top: topOffset,
                      zIndex: i + 1,
                      borderColor: borderCol,
                      transform: `rotate(${rotation}deg)`,
                      boxShadow: isTop
                        ? '0 12px 28px rgba(0,0,0,0.22)'
                        : '0 3px 8px rgba(0,0,0,0.12)',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <Image
                      src={isSubmitted && isCorrect ? card.answerImage : card.image}
                      alt={card.name}
                      width={CARD_W}
                      height={CARD_H}
                      className="w-full h-auto block"
                    />
                    {isSubmitted && isTop && (
                      <div className="absolute top-1 right-1 text-lg leading-none">
                        {card.id === correctIds[i] ? '✅' : '❌'}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT: Reorderable stacked list */}
        <div className="w-1/2 flex flex-col pt-6">
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              {isSubmitted ? 'Your order' : 'Drag to reorder ↕'}
            </p>
            <span className="text-xs font-bold bg-white/70 px-2 py-1 rounded-full text-[#313F3A]">
              {stack.length}/{gameCards.length}
            </span>
          </div>
          {stack.length === 0 ? (
            <p className="text-xs text-slate-400 text-center mt-10 leading-relaxed px-2">
              Tap a card below<br />to start stacking
            </p>
          ) : (
            <div className="flex flex-col">
              {[...stack].reverse().map((card, revIdx) => {
                const stackIdx = stack.length - 1 - revIdx;
                const pos = stack.length - revIdx;
                const isDragging = dragListId === card.id;
                const isOver = dragOverListIdx === revIdx && dragListId !== card.id;
                const cardCorrect = isSubmitted && card.id === correctIds[stackIdx];
                const cardWrong = isSubmitted && card.id !== correctIds[stackIdx];

                return (
                  <div
                    key={card.id}
                    data-card-id={card.id}
                    data-list-idx={revIdx}
                    draggable={!isSubmitted}
                    onDragStart={(e) => handleListDragStart(e, card)}
                    onDragOver={(e) => handleListDragOver(e, revIdx)}
                    onDrop={(e) => handleListDrop(e, revIdx)}
                    onDragEnd={handleListDragEnd}
                    onTouchStart={(e) => handleListTouchStart(e, card)}
                    onTouchMove={handleListTouchMove}
                    onTouchEnd={handleListTouchEnd}
                    className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 mb-1 shadow-sm select-none transition-all duration-100
                      ${!isSubmitted ? 'cursor-grab active:cursor-grabbing bg-white/80' : ''}
                      ${cardCorrect ? 'bg-green-100 border border-green-300' : ''}
                      ${cardWrong ? 'bg-red-50 border border-red-200' : ''}
                      ${isDragging ? 'opacity-30 scale-95' : 'opacity-100'}
                      ${isOver ? 'border-t-2 border-indigo-400 -mt-px' : ''}
                    `}
                    style={{ touchAction: 'none' }}
                  >
                    {!isSubmitted && (
                      <span className="text-slate-300 text-sm shrink-0 leading-none">⠿</span>
                    )}
                    {isSubmitted && (
                      <span className="text-sm shrink-0 leading-none">{cardCorrect ? '✅' : '❌'}</span>
                    )}
                    <span className="text-[10px] font-black text-slate-400 shrink-0 w-4">#{pos}</span>
                    <span className="text-[11px] font-semibold text-[#313F3A] truncate flex-1 leading-tight">{card.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ── POOL ── */}
      {pool.length > 0 && !isSubmitted && (
        <div className="px-4 max-w-md mx-auto mt-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Tap or drag to stack ({pool.length} left)
          </p>
          <div className="grid grid-cols-4 gap-2">
            {pool.map(card => (
              <button
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
                onDragEnd={handleDragEnd}
                onClick={() => addCard(card)}
                onTouchStart={(e) => handlePoolTouchStart(e, card)}
                onTouchMove={handlePoolTouchMove}
                onTouchEnd={handlePoolTouchEnd}
                className={`rounded-2xl overflow-hidden border-2 bg-white shadow-sm
                  transition-all duration-150 active:scale-90 active:shadow-none
                  ${draggedId === card.id ? 'opacity-40 scale-95' : 'border-[#DAE2DA]'}
                `}
                style={{ touchAction: 'none' }}
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  width={100}
                  height={140}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULT MESSAGE ── */}
      {isSubmitted && (
        <div className={`mx-4 max-w-md mt-5 rounded-3xl border-b-8 p-5 text-center shadow-lg
          ${isCorrect
            ? 'bg-[#79A74E] border-[#4e7a2e] text-white'
            : 'bg-[#FFF3CD] border-[#e8a900] text-[#8a5c00]'
          }`}
        >
          {isCorrect ? (
            <>
              <p className="text-2xl font-black mb-1">🎉 Perfect Stack!</p>
              <p className="text-sm font-medium">You ranked all {gameCards.length} items correctly!</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-black mb-1">🌟 Not quite!</p>
              <p className="text-sm font-semibold">The ranking wasn't quite right. Try again!</p>
            </>
          )}
        </div>
      )}

      {/* ── STICKY BOTTOM BUTTON ── */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-gradient-to-t from-white via-white/80 to-transparent">
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <button
              onClick={handleCheck}
              disabled={!allPlaced}
              className="w-full bg-[#313F3A] text-white font-black text-xl py-4 rounded-full shadow-[0_5px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              Check My Stack! 🌍
            </button>
          ) : isCorrect ? (
            <button
              onClick={onBack}
              className="w-full bg-[#313F3A] text-white font-black text-xl py-4 rounded-full shadow-[0_5px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all"
            >
              Back to Stamp Quest
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="w-full bg-[#313F3A] text-white font-black text-xl py-4 rounded-full shadow-[0_5px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all"
            >
              Try Again ↺
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
