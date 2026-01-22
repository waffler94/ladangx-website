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
  { id: 'origin', type: 'mcq', label: 'origi', icon: '🌍', background: 'image4-origin' },
  { id: 'benefits', type: 'matching', label: 'benefits', icon: '💪', background: 'image5-benefits' },
  { id: 'parts', type: 'labeling', label: 'fruit_parts', icon: '🌱', background: 'image6-fruit_parts' }, 
  { id: 'nutrients', type: 'multiselect', label: 'vitamin', icon: '💊', background: 'image7-vitamins'},
  { id: 'makes', type: 'imagelabel', label: 'end_product', icon: '🍰', background: 'image8-end_product' },
  { id: 'funfact', type: 'dragdrop', label: 'fun_fact', icon: '🤩', background: 'image9-fun_fact' },
];


export const getNextCategory = (currentId) => {
  const index = categories.findIndex(c => c.id === currentId);
  if (index === -1 || index === categories.length - 1) return null;
  return categories[index + 1].id;
};