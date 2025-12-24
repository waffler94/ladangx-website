import { useTranslations } from 'next-intl';

const getRandom = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const getText = (item) => {
  if (!item) return "";
  return typeof item === 'object' ? item.text : item;
};

export const generateQuestion = (fruit, category, allFruits, locale, t) => {
  let question = "";
  let correctAnswer = "";
  let wrongAnswers = [];

  const otherFruits = allFruits.filter(f => f.slug !== fruit.slug);

  switch (category) {
    case 'origin':
      question = t('origin', { name: fruit.name });
      correctAnswer = fruit.origin;
      wrongAnswers = getRandom(otherFruits.map(f => f.origin), 3);
      break;

    case 'nutrients': 
      question = t('quiz_nutrients', { name: fruit.name });
      correctAnswer = fruit.health_benefits[0]; // Nutrients are strings, safe.
      wrongAnswers = getRandom(otherFruits.map(f => f.nutrients[0]), 3);
      break;
    
    case 'parts':
      question = t('quiz_parts', { name: fruit.name });
      correctAnswer = data.scientific;
      wrongAnswers = getRandom(otherFruitsData.map(d => d.scientific), 3);
      break;

    case 'makes':
      question = t('quiz_makes', { name: fruit.name });
      correctAnswer = getText(data.makes[0]); 
      wrongAnswers = getRandom(otherFruits.map(d => getText(d.makes[0])), 3);
      break;
    
    case 'funfact':
      question = t('funfact', { name: fruit.name });
      correctAnswer = fruit.interesting_facts[0];
      wrongAnswers = getRandom(otherFruits.map(f => f.interesting_facts[0]), 3);
      break;

    default: 
      question = t('special', { name: fruit.name });
      correctAnswer = fruit.interesting_facts[1] || fruit.interesting_facts[0];
      wrongAnswers = getRandom(otherFruits.map(f => f.interesting_facts[1] || f.interesting_facts[0]), 3);
      break;
  }

  const allAnswers = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());

  return { question, answers: allAnswers, correctAnswer };
};

// UPDATE: Added 'type' property to map to components
export const categories = [
  { id: 'origin', type: 'mcq', label: 'origi', icon: '🌍', color: 'bg-orange-100 border-orange-400 text-orange-800' },
  { id: 'benefits', type: 'matching', label: 'benefits', icon: '💪', color: 'bg-rose-100 border-rose-400 text-rose-800' },
  { id: 'parts', type: 'labeling', label: 'fruit_parts', icon: '🌱', color: 'bg-green-100 border-green-400 text-green-800' }, 
  { id: 'nutrients', type: 'multiselect', label: 'vitamin', icon: '💊', color: 'bg-purple-100 border-purple-400 text-purple-800'},
  { id: 'makes', type: 'imagelabel', label: 'end_product', icon: '🍰', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
  { id: 'funfact', type: 'dragdrop', label: 'fun_fact', icon: '🤩', color: 'bg-sky-100 border-sky-400 text-sky-800' },
];


export const getNextCategory = (currentId) => {
  const index = categories.findIndex(c => c.id === currentId);
  if (index === -1 || index === categories.length - 1) return null;
  return categories[index + 1].id;
};