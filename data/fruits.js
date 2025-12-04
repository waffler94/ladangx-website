// src/data/fruits.js

const getIcon = (code) => `https://api.iconify.design/twemoji:${code}.svg`;

// Helper to keep data clean
const help = (text, iconCode) => ({ text, icon: getIcon(iconCode) });
const make = (text, iconCode) => ({ text, image: getIcon(iconCode) }); 
const fact = (text, iconCode) => ({ text, image: getIcon(iconCode) });

export const fruits = [
  {
    slug: "ciku",
    name: "Ciku",
    scientific: "Manilkara zapota",
    image: getIcon('potato'), 
    origin: "Mexico, Malaysia & Thailand",
    theme: "amber",
    helps: [
      help("Gives energy", "high-voltage"),
      help("Helps digestion", "pot-of-food"),
      help("Strong bones", "bone"),
      help("Good for eyes", "eye"),
      help("Helps wounds heal", "adhesive-bandage")
    ],
    nutrients: ["Vitamin A", "Vitamin C", "Potassium", "Fiber", "Natural Sugars"],
    makes: [
      make("Ice cream", "ice-cream"),
      make("Milkshake", "glass-of-milk"),
      make("Jam", "jar"),
      make("Smoothie", "tropical-drink")
    ],
    facts: [
      fact("Tastes like caramel 🍬", "candy"),
      fact("Soft + sweet 😋", "deciduous-tree"),
      fact("Tree can live 100+ years 🌳", "deciduous-tree"),
      fact("Sticky milk inside fruit 🥛", "glass-of-milk")
    ]
  },
  {
    slug: "durian",
    name: "Durian",
    scientific: "Durio zibethinus",
    image: getIcon('hedgehog'), 
    origin: "Malaysia, Indonesia, Thailand",
    theme: "yellow",
    helps: [
      help("Big energy", "high-voltage"),
      help("Strong muscles", "flexed-biceps"),
      help("Healthy tummy", "pot-of-food"),
      help("Good for brain", "brain")
    ],
    nutrients: ["Vitamin C", "Healthy fats", "Potassium", "Fiber", "Iron"],
    makes: [
      make("Durian Cake", "shortcake"),
      make("Ice Cream", "soft-ice-cream"),
      make("Dodol", "candy"), 
      make("Crepe", "pancakes")
    ],
    facts: [
      fact("King of fruits 👑", "crown"),
      fact("Strong smell 😆", "airplane"),
      fact("Banned on planes ✈️", "airplane"),
      fact("Spiky outside, soft inside", "cactus")
    ]
  },
];

export const themeColors = {
  amber: "bg-amber-100 border-amber-400 text-amber-900",
  yellow: "bg-yellow-100 border-yellow-400 text-yellow-900",
  purple: "bg-purple-100 border-purple-400 text-purple-900",
  orange: "bg-orange-100 border-orange-400 text-orange-900",
  stone: "bg-stone-100 border-stone-400 text-stone-900",
  green: "bg-green-100 border-green-400 text-green-900",
  fuchsia: "bg-fuchsia-100 border-fuchsia-400 text-fuchsia-900",
  emerald: "bg-emerald-100 border-emerald-400 text-emerald-900",
  rose: "bg-rose-100 border-rose-400 text-rose-900",
  pink: "bg-pink-100 border-pink-400 text-pink-900",
};