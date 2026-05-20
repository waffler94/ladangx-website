'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import BackButton from '@/components/back-button';
import CloseButton from '@/components/close-button';

const PESTS = [
  {
    id: 1,
    name: 'Aphids',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'Tiny, soft-bodied insects (green, black, yellow, or brown). Usually cluster on new growth or under leaves.',
    description: "If your plant looks sticky and you see tiny bugs packed together like dots, it's probably aphids. They suck sap from plants and excrete a sticky substance called honeydew.",
  },
  {
    id: 2,
    name: 'Spider Mites',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'Extremely small (almost invisible). Often found on the underside of leaves.',
    description: "If your plant has fine webbing like a spider web and leaves look dusty or speckled, it's spider mites. They thrive in hot, dry conditions.",
  },
  {
    id: 3,
    name: 'Whiteflies',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'Tiny white flying insects. Fly up in a cloud when the plant is disturbed.',
    description: "If you shake the plant and a bunch of tiny white bugs fly up, those are whiteflies. They feed on the underside of leaves and weaken the plant over time.",
  },
  {
    id: 4,
    name: 'Caterpillars',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'Larvae of butterflies and moths. Visible, worm-like bodies.',
    description: "If chunks of your leaves are missing like something took bites out of them, look for caterpillars. They are the larval stage of moths and butterflies.",
  },
  {
    id: 5,
    name: 'Beetles',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'Hard-bodied insects, often visible. Many shapes and colors.',
    description: "If you see solid bugs chewing holes in leaves during the day, it's likely beetles. Many species are pests but some are beneficial predators.",
  },
  {
    id: 6,
    name: 'Mealybugs',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'White, cotton-like clusters. Found in leaf joints or stems.',
    description: "If your plant has white fluffy stuff that looks like cotton stuck to it, it's mealybugs. They hide in crevices and are hard to remove once established.",
  },
  {
    id: 7,
    name: 'Fungus Gnats',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'Small black flies around soil. Larvae live in soil.',
    description: "If tiny flies come out when you water your plant, it's fungus gnats. Their larvae feed on roots and organic matter in moist soil.",
  },
  {
    id: 8,
    name: 'Thrips',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'Very tiny, slender insects. Hard to see clearly.',
    description: "If leaves look scratched, silvery, or streaky instead of green, thrips may be the cause. They rasp plant tissue and suck the sap that leaks out.",
  },
  {
    id: 9,
    name: 'Scale Insects',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: "Look like small bumps or shells on stems or leaves. Don't move much.",
    description: "If your plant has weird brown or black bumps that don't wipe off easily, it's scale. They attach firmly to the plant and drain its energy.",
  },
  {
    id: 10,
    name: 'Leaf Miners',
    pestImage: '/images/ladangx_logo1.png',
    symptomImage: '/images/image11-info2.png',
    hint: 'Larvae that tunnel inside leaves, leaving winding trails.',
    description: "If you see squiggly lines drawn inside the leaf, something is living inside it — leaf miners. The larvae tunnel between the upper and lower surfaces of the leaf.",
  },
];

export default function CropDoctors() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-[url('/images/bg11-fruit_part.png')] bg-cover bg-top min-h-screen pt-safe pb-10">

      {/* Header */}
      <div className="flex flex-row items-center justify-between relative w-full pt-[17px] px-[20px]">
        <Link href="/e-learning">
          <BackButton />
        </Link>
        <h1 className="font-semibold text-[22px] text-[#313F3A] absolute left-1/2 -translate-x-1/2 uppercase whitespace-nowrap">
          Crop Doctors
        </h1>
      </div>

      <p className="text-center text-sm font-semibold text-[#313F3A] mt-4 mb-5 px-4">
        Tap a pest to learn how to identify it 🔍
      </p>

      {/* Pest grid */}
      <div className="px-4 max-w-md mx-auto grid grid-cols-2 gap-4">
        {PESTS.map((pest, index) => {
          const rotateClass = index % 2 === 0 ? '-rotate-1' : 'rotate-1';
          return (
            <button
              key={pest.id}
              onClick={() => setSelected(pest)}
              className={`group bg-white rounded-3xl shadow-[0px_4px_0px_0px_#DAE2DA] active:shadow-none active:translate-y-1 transition-all duration-150 active:scale-95 overflow-hidden ${rotateClass}`}
            >
              <div className="p-4 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center group-active:scale-90 transition-transform">
                  <Image
                    src={pest.pestImage}
                    alt={pest.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-[14px] font-bold text-[#313F3A] text-center leading-tight">{pest.name}</p>
                <p className="text-[10px] text-slate-400 text-center leading-snug line-clamp-2 px-1">{pest.hint}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail overlay */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl px-5 pt-5 pb-10 animate-slide-up">

            {/* Close */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-black text-[#313F3A]">{selected.name}</h2>
              <button onClick={() => setSelected(null)}>
                <CloseButton />
              </button>
            </div>

            {/* Images row */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-emerald-50 rounded-2xl p-3 flex flex-col items-center gap-1">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">The Pest</p>
                <Image src={selected.pestImage} alt={selected.name} width={80} height={80} className="w-20 h-20 object-contain" />
              </div>
              <div className="flex-1 bg-amber-50 rounded-2xl p-3 flex flex-col items-center gap-1">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Symptom</p>
                <Image src={selected.symptomImage} alt="symptom" width={80} height={80} className="w-20 h-20 object-contain rounded-xl" />
              </div>
            </div>

            {/* Hint */}
            <div className="bg-slate-50 rounded-2xl px-4 py-3 mb-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">How to spot it</p>
              <p className="text-[13px] font-semibold text-[#313F3A] leading-snug">{selected.hint}</p>
            </div>

            {/* Description */}
            <div className="bg-emerald-50 rounded-2xl px-4 py-3">
              <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide mb-1">Did you know?</p>
              <p className="text-[13px] text-[#313F3A] leading-snug">{selected.description}</p>
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
