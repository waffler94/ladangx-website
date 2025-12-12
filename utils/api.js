// src/utils/api.js

// 🔴 UPDATE THESE WITH YOUR REAL URLs
// const DATA_URLS = {
//   en: 'https://gist.githubusercontent.com/waffler94/971dbbeb694d2dccebf322dfa8ed8f31/raw/964ada185cb9ba741a5513a028b50b1b84eb0637/fruits_en.json',
//   bm: 'https://gist.githubusercontent.com/waffler94/43bd855cce387978331794a0d05058c2/raw/bea45237e3b4d55c8b6cf5e8f460097ed27d7941/fruits_bm.json'
// };
const DATA_URLS = {
  en: 'https://ladangxadmin.upplex.com.my/api/v1/field-items?locale=en',
  bm: 'https://ladangxadmin.upplex.com.my/api/v1/field-items?locale=my'
};

export const themeColors = {
  amber: "bg-amber-100 border-amber-400 text-amber-900",
  yellow: "bg-yellow-100 border-yellow-400 text-yellow-900",
  purple: "bg-purple-100 border-purple-400 text-purple-900",
  orange: "bg-orange-100 border-orange-400 text-orange-900",
  green: "bg-green-100 border-green-400 text-green-900",
  fuchsia: "bg-fuchsia-100 border-fuchsia-400 text-fuchsia-900",
  emerald: "bg-emerald-100 border-emerald-400 text-emerald-900",
  rose: "bg-rose-100 border-rose-400 text-rose-900",
  pink: "bg-pink-100 border-pink-400 text-pink-900",
  stone: "bg-stone-100 border-stone-400 text-stone-900",
  brown: "bg-orange-200 border-orange-500 text-orange-900",
  magenta: "bg-fuchsia-200 border-fuchsia-500 text-fuchsia-900",
  red: "bg-red-100 border-red-400 text-red-900",
  maroon: "bg-rose-200 border-rose-600 text-rose-950",
  "light-green": "bg-lime-100 border-lime-400 text-lime-900",
  "yellow-green": "bg-lime-200 border-lime-500 text-lime-900",
  "dark-purple": "bg-purple-200 border-purple-600 text-purple-950",
};

/**
 * Fetches fruits based on the provided locale.
 * @param {string} locale - 'en' or 'bm' (default 'en')
 */
export async function getFruits(locale = 'en') {
  // Select URL, fallback to 'en' if the locale is unknown
  const url = DATA_URLS[locale] || DATA_URLS['en'];

  try {
    const res = await fetch(url, { 
      // 0 = No Cache (Good for debugging). 
      // Change to 60 or 3600 for production.
      next: { revalidate: 0 } 
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data for ${locale}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error loading fruits for ${locale}:`, error);
    return []; // Return empty array to prevent crash
  }
}