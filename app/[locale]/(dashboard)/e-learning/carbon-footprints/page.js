'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import BackButton from '@/components/back-button';

const ITEMS = [
  { id: 'tap_water',   name: '1 Litre of Tap Water',   co2: 0.0005, image: '/carbon/tap_water.png',   answerImage: '/carbon/tap_water_answer.png' },
  { id: 'led_bulb',    name: 'LED Bulb (10hr use)',     co2: 0.03,   image: '/carbon/led_bulb.png',    answerImage: '/carbon/led_bulb_answer.png' },
  { id: 'eggs',        name: '2 Eggs',                  co2: 0.5,    image: '/carbon/eggs.png',        answerImage: '/carbon/eggs_answer.png' },
  { id: 'bread',       name: 'A Loaf of Bread',         co2: 1,      image: '/carbon/bread.png',       answerImage: '/carbon/bread_answer.png' },
  { id: 'chocolate',   name: 'Chocolate (100g)',         co2: 2.5,    image: '/carbon/chocolate.png',   answerImage: '/carbon/chocolate_answer.png' },
  { id: 'cheese',      name: '200g of Cheese',          co2: 4,      image: '/carbon/cheese.png',      answerImage: '/carbon/cheese_answer.png' },
  { id: 'beef_burger', name: 'Beef Burger (1 serving)', co2: 5,      image: '/carbon/beef_burger.png', answerImage: '/carbon/beef_burger_answer.png' },
  { id: 'sports_shoe', name: 'Sports Shoe (1 pair)',    co2: 14,     image: '/carbon/sports_shoe.png', answerImage: '/carbon/sports_shoe_answer.png' },
  { id: 'petrol_car',  name: 'Petrol Car (100km)',      co2: 20,     image: '/carbon/petrol_car.png',  answerImage: '/carbon/petrol_car_answer.png' },
  { id: 'jeans',       name: 'A Pair of Jeans',         co2: 30,     image: '/carbon/jeans.png',       answerImage: '/carbon/jeans_answer.png' },
  { id: 'smartphone',  name: 'Smartphone (2yr use)',    co2: 80,     image: '/carbon/smartphone.png',  answerImage: '/carbon/smartphone_answer.png' },
].sort((a, b) => a.co2 - b.co2);

// card dimensions: 130 × 182 → aspect ratio kept for zoom
const ZOOM_W = 240;
const ZOOM_H = Math.round(ZOOM_W * 182 / 110);

export default function CarbonFootprints() {
  const [selectedId, setSelectedId] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const selected = ITEMS.find(i => i.id === selectedId);

  const open = (item) => {
    setSelectedId(item.id);
    setIsFlipped(false);
  };

  const close = () => {
    setSelectedId(null);
    setIsFlipped(false);
  };

  return (
    <div className="bg-[url('/images/bg14-fun_fact.png')] bg-cover bg-top min-h-screen pt-safe pb-10">

      <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .card-zoom-in { animation: zoomIn 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        .flip-inner {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          position: relative;
        }
        .flip-inner.flipped { transform: rotateY(180deg); }

        .flip-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-back {
          position: absolute;
          inset: 0;
          transform: rotateY(180deg);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      {/* ── Header ── */}
      <div className="flex flex-row items-center justify-between relative w-full pt-[17px] px-[15px]">
        <Link href="/e-learning">
          <BackButton />
        </Link>
        <h1 className="font-semibold text-[22px] text-[#313F3A] absolute left-1/2 -translate-x-1/2 uppercase whitespace-nowrap">
          Carbon Footprints
        </h1>
      </div>

      <p className="text-center text-sm font-semibold text-[#313F3A] mt-4 mb-1 px-4">
        Ranked from <span className="text-green-600 font-black">LEAST</span> → <span className="text-red-500 font-black">MOST</span> CO₂ 🌍
      </p>
      <p className="text-center text-xs text-slate-500 mb-5">Tap a card to zoom in, tap again to flip</p>

      {/* ── Cards grid ── */}
      <div className="px-4 max-w-md mx-auto grid grid-cols-3 gap-3">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => open(item)}
            className="rounded-[15px] overflow-hidden shadow-[0px_3px_0px_0px_#DAE2DA] active:shadow-none active:translate-y-0.5 transition-all duration-150 active:scale-95 bg-white"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={168}
              className="w-full h-auto block"
            />
          </button>
        ))}
      </div>

      {/* ── Zoomed card overlay ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={close}
        >
          {/* Flip card — stop propagation so tapping card doesn't close */}
          <div
            className="card-zoom-in"
            style={{ perspective: '1000px', width: ZOOM_W, height: ZOOM_H }}
            onClick={(e) => { e.stopPropagation(); setIsFlipped(p => !p); }}
          >
            <div
              className={`flip-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}
            >
              {/* Front — item card */}
              <div className="flip-face w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  width={ZOOM_W}
                  height={ZOOM_H}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Back — answer card */}
              <div className="flip-back w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
                <Image
                  src={selected.answerImage}
                  alt={selected.name}
                  width={ZOOM_W}
                  height={ZOOM_H}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Hint text */}
          <p className="mt-5 text-white/80 text-xs font-semibold text-center">
            {isFlipped ? 'Tap card to flip back · Tap outside to close' : 'Tap card to reveal CO₂ · Tap outside to close'}
          </p>
        </div>
      )}

    </div>
  );
}
