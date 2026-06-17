'use client';
import { useState } from 'react';
import Image from 'next/image';
import CloseButton from '@/components/close-button';

const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const PESTS = [
  {
    id: 1,
    name: 'Aphids',
    pestImage: '/cropdoctors/aphids.png',
    symptomImage: '/cropdoctors/conditions/aphids.png',
    hint: 'Tiny, soft-bodied insects (green, black, yellow, or brown). Usually cluster on new growth or under leaves.',
    correctMessage: "If your plant looks sticky and you see tiny bugs packed together like dots, it's probably aphids.",
    description: "If your plant looks sticky and you see tiny bugs packed together like dots, it's probably aphids. They suck sap from plants and excrete a sticky substance called honeydew.",
  },
  {
    id: 2,
    name: 'Spider Mites',
    pestImage: '/cropdoctors/spider_mites.png',
    symptomImage: '/cropdoctors/conditions/spider_mites.png',
    hint: 'Extremely small (almost invisible). Often found on the underside of leaves.',
    correctMessage: "If your plant has fine webbing like a spider web and leaves look dusty or speckled, it's spider mites.",
    description: "If your plant has fine webbing like a spider web and leaves look dusty or speckled, it's spider mites. They thrive in hot, dry conditions.",
  },
  {
    id: 3,
    name: 'Whiteflies',
    pestImage: '/cropdoctors/whiteflies.png',
    symptomImage: '/cropdoctors/conditions/whiteflies.png',
    hint: 'Tiny white flying insects. Fly up in a cloud when the plant is disturbed.',
    correctMessage: "If you shake the plant and a bunch of tiny white bugs fly up, those are whiteflies.",
    description: "If you shake the plant and a bunch of tiny white bugs fly up, those are whiteflies. They feed on the underside of leaves and weaken the plant over time.",
  },
  {
    id: 4,
    name: 'Caterpillars',
    pestImage: '/cropdoctors/caterpillars.png',
    symptomImage: '/cropdoctors/conditions/caterpillars.png',
    hint: 'Larvae of butterflies and moths. Visible, worm-like bodies.',
    correctMessage: "If chunks of your leaves are missing like something took bites out of them, look for caterpillars.",
    description: "If chunks of your leaves are missing like something took bites out of them, look for caterpillars. They are the larval stage of moths and butterflies.",
  },
  {
    id: 5,
    name: 'Beetles',
    pestImage: '/cropdoctors/beetles.png',
    symptomImage: '/cropdoctors/conditions/beetles.png',
    hint: 'Hard-bodied insects, often visible. Many shapes and colors.',
    correctMessage: "If you see solid bugs chewing holes in leaves during the day, it's likely beetles.",
    description: "If you see solid bugs chewing holes in leaves during the day, it's likely beetles. Many species are pests but some are beneficial predators.",
  },
  {
    id: 6,
    name: 'Mealybugs',
    pestImage: '/cropdoctors/mealybugs.png',
    symptomImage: '/cropdoctors/conditions/mealybugs.png',
    hint: 'White, cotton-like clusters. Found in leaf joints or stems.',
    correctMessage: "If your plant has white fluffy stuff that looks like cotton stuck to it, it's mealybugs.",
    description: "If your plant has white fluffy stuff that looks like cotton stuck to it, it's mealybugs. They hide in crevices and are hard to remove once established.",
  },
  {
    id: 7,
    name: 'Fungus Gnats',
    pestImage: '/cropdoctors/fungus_gnats.png',
    symptomImage: '/cropdoctors/conditions/fungus_gnats.png',
    hint: 'Small black flies around soil. Larvae live in soil.',
    correctMessage: "If tiny flies come out when you water your plant, it's fungus gnats.",
    description: "If tiny flies come out when you water your plant, it's fungus gnats. Their larvae feed on roots and organic matter in moist soil.",
  },
  {
    id: 8,
    name: 'Thrips',
    pestImage: '/cropdoctors/thrips.png',
    symptomImage: '/cropdoctors/conditions/thrips.png',
    hint: 'Very tiny, slender insects. Hard to see clearly.',
    correctMessage: "If leaves look scratched, silvery, or streaky instead of green, thrips may be the cause.",
    description: "If leaves look scratched, silvery, or streaky instead of green, thrips may be the cause. They rasp plant tissue and suck the sap that leaks out.",
  },
  {
    id: 9,
    name: 'Scale Insects',
    pestImage: '/cropdoctors/scale_insects.png',
    symptomImage: '/cropdoctors/conditions/scale_insects.png',
    hint: "Look like small bumps or shells on stems/leaves. Don't move much.",
    correctMessage: "If your plant has weird brown or black bumps that don't wipe off easily, it's scale.",
    description: "If your plant has weird brown or black bumps that don't wipe off easily, it's scale. They attach firmly to the plant and drain its energy.",
  },
  {
    id: 10,
    name: 'Leaf Miners',
    pestImage: '/cropdoctors/leaf_miners.png',
    symptomImage: '/cropdoctors/conditions/leaf_miners.png',
    hint: 'Larvae inside leaves.',
    correctMessage: "If you see squiggly lines drawn inside the leaf, something is living inside it—leaf miners.",
    description: "If you see squiggly lines drawn inside the leaf, something is living inside it — leaf miners. The larvae tunnel between the upper and lower surfaces of the leaf.",
  },
];

function generateQuestion() {
  const pest = PESTS[Math.floor(Math.random() * PESTS.length)];
  const wrongOptions = shuffle(PESTS.filter((p) => p.id !== pest.id)).slice(0, 4);
  return { pest, options: shuffle([...wrongOptions, pest]) };
}

export default function QuizCropDoctor({ onBack }) {
  const [question, setQuestion] = useState(generateQuestion);
  const [droppedPest, setDroppedPest] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const isCorrect = isSubmitted && droppedPest?.id === question.pest.id;

  const handlePestClick = (pest) => {
    if (isSubmitted) return;
    setDroppedPest((prev) => (prev?.id === pest.id ? null : pest));
  };

  const handleDragStart = (e, pest) => {
    setDraggedId(pest.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const pest = question.options.find((p) => p.id === draggedId);
    if (pest) setDroppedPest(pest);
    setDraggedId(null);
  };

  const handleDropZoneClick = () => {
    if (isSubmitted) return;
    setDroppedPest(null);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleTryAgain = () => {
    setQuestion(generateQuestion());
    setDroppedPest(null);
    setIsSubmitted(false);
    setShowAnswer(false);
  };

  return (
    <div className="bg-[url('/images/bg11-fruit_part.png')] bg-cover bg-top min-h-screen relative pt-safe pb-12">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-[17px] mb-4 relative">
        <button onClick={onBack}>
          <CloseButton />
        </button>
        <h1 className="font-semibold text-[22px] text-[#313F3A] absolute mx-auto left-0 right-0 w-fit uppercase">
          Crop Doctor
        </h1>
      </div>

      <div className="px-4 max-w-md mx-auto space-y-4 mt-4">

        {/* Symptom Card */}
        <div className="bg-white rounded-3xl border-b-4 border-[#DAE2DA] shadow-lg p-5 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">🌱 What happened to my plant?</p>
          <Image
            src={question.pest.symptomImage}
            alt="symptom"
            width={160}
            height={160}
            className="w-40 h-40 object-contain mx-auto mb-4 rounded-2xl"
          />
          <p className="text-[15px] font-semibold text-[#313F3A] leading-snug">
            {question.pest.hint}
          </p>
        </div>

        {/* Drop Zone */}
        <div>
          <p className="text-[#313F3A] font-bold text-center mb-2 text-sm">
            🎯 Which pest caused this? Drop it here!
          </p>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleDropZoneClick}
            className={`
              w-full h-[160px] rounded-3xl border-4 border-dashed flex items-center justify-center transition-all duration-200
              ${isSubmitted
                ? isCorrect
                  ? 'border-green-400 bg-green-100'
                  : 'border-red-400 bg-red-100'
                : droppedPest
                  ? 'border-[#DAE2DA] bg-white/80'
                  : 'border-[#DAE2DA] bg-white/40'
              }
              ${!isSubmitted && draggedId ? 'scale-105 bg-white/70' : ''}
            `}
          >
            {droppedPest ? (
              <div className="flex flex-col items-center gap-2 select-none">
                <Image
                  src={droppedPest.pestImage}
                  alt={droppedPest.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain drop-shadow-md"
                />
                <span className={`text-xs font-bold px-3 py-0.5 rounded-full
                  ${isSubmitted
                    ? isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    : 'bg-white text-[#313F3A]'}`}
                >
                  {droppedPest.name}
                </span>
                {isSubmitted && (
                  <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-3xl opacity-30">🎯</p>
                <p className="text-[#313F3A]/50 text-xs font-medium mt-1">Tap or drag a pest here</p>
              </div>
            )}
          </div>
        </div>

        {/* Pest Options */}
        <div className="grid grid-cols-5 gap-2">
          {question.options.map((pest) => {
            const isDropped = droppedPest?.id === pest.id;
            const isDragging = draggedId === pest.id;
            return (
              <button
                key={pest.id}
                draggable={!isSubmitted}
                onDragStart={(e) => handleDragStart(e, pest)}
                onClick={() => handlePestClick(pest)}
                disabled={isSubmitted}
                className={`
                  flex flex-col items-center justify-center gap-1 py-3 rounded-2xl border-b-4 border-2
                  bg-white border-[#DAE2DA]
                  transition-all duration-150 active:translate-y-1 active:border-b-2 select-none
                  ${isDropped ? 'scale-90 opacity-40 border-b-2' : 'scale-100 opacity-100'}
                  ${isDragging ? 'opacity-50 scale-95' : ''}
                  ${isSubmitted ? 'pointer-events-none' : ''}
                `}
              >
                <Image
                  src={pest.pestImage}
                  alt={pest.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-[9px] font-bold leading-tight text-center px-0.5 text-[#313F3A]">
                  {pest.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result message */}
        {isSubmitted && (
          <div className={`rounded-3xl border-b-8 p-5 text-center shadow-lg
            ${isCorrect
              ? 'bg-[#79A74E] border-[#4e7a2e] text-white'
              : 'bg-[#FFF3CD] border-[#e8a900] text-[#8a5c00]'
            }`}
          >
            {isCorrect ? (
              <>
                <p className="text-2xl font-black mb-1">🎉 That's right!</p>
                <p className="text-sm font-medium leading-snug">{question.pest.correctMessage}</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-black mb-1">🌟 Almost!</p>
                <p className="text-sm font-semibold">Every mistake is a great lesson!</p>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="mt-3 w-full flex items-center gap-3 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-[#e8a900]/30 active:scale-95 transition-transform"
                >
                  <Image src={question.pest.pestImage} alt={question.pest.name} width={40} height={40} className="w-10 h-10 object-contain shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#e8a900] uppercase tracking-wide">Correct answer</p>
                    <p className="text-[15px] font-black text-[#313F3A] truncate">{question.pest.name}</p>
                  </div>
                  <span className="text-xs font-bold text-[#8a5c00] bg-amber-100 px-2.5 py-1 rounded-full shrink-0">Tap to learn 👀</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!droppedPest}
            className="w-full bg-[#313F3A] text-white font-black text-xl py-4 rounded-full shadow-[0_5px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            Check Answer! 🔍
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            {isCorrect ? (
              <button
                onClick={onBack}
                className="w-full bg-[#313F3A] text-white font-black text-xl py-4 rounded-full shadow-[0_5px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all"
              >
                Back to Stamp Quest
              </button>
            ) : (
              <button
                onClick={handleTryAgain}
                className="w-full bg-[#313F3A] text-white font-black text-xl py-4 rounded-full shadow-[0_5px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all"
              >
                Try Again ↺
              </button>
            )}
          </div>
        )}

      </div>

      {/* Correct-answer detail overlay */}
      {showAnswer && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowAnswer(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl px-5 pt-5 pb-10 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-black text-[#313F3A]">{question.pest.name}</h2>
              <button onClick={() => setShowAnswer(false)}>
                <CloseButton />
              </button>
            </div>

            {/* Images row */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-emerald-50 rounded-2xl p-3 flex flex-col items-center gap-1">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">The Pest</p>
                <Image src={question.pest.pestImage} alt={question.pest.name} width={80} height={80} className="w-20 h-20 object-contain" />
              </div>
              <div className="flex-1 bg-amber-50 rounded-2xl p-3 flex flex-col items-center gap-1">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Symptom</p>
                <Image src={question.pest.symptomImage} alt="symptom" width={80} height={80} className="w-20 h-20 object-contain rounded-xl" />
              </div>
            </div>

            {/* Hint */}
            <div className="bg-slate-50 rounded-2xl px-4 py-3 mb-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">How to spot it</p>
              <p className="text-[13px] font-semibold text-[#313F3A] leading-snug">{question.pest.hint}</p>
            </div>

            {/* Description */}
            <div className="bg-emerald-50 rounded-2xl px-4 py-3">
              <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide mb-1">Did you know?</p>
              <p className="text-[13px] text-[#313F3A] leading-snug">{question.pest.description}</p>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>
    </div>
  );
}
