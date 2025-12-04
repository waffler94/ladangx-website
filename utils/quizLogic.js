// import { fruits } from '@/data/fruits';

const getRandom = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const generateQuestion = (fruit, category, allFruits) => {
  let question = "";
  let correctAnswer = "";
  let wrongAnswers = [];

  const otherFruits = allFruits.filter(f => f.slug !== fruit.slug);

  switch (category) {
    case 'origin':
      question = `Where does the ${fruit.name} come from?`;
      correctAnswer = fruit.origin;
      wrongAnswers = getRandom(otherFruits.map(f => f.origin), 3);
      break;

    case 'nutrients': 
      question = `Which nutrient is found in ${fruit.name}?`;
      correctAnswer = fruit.nutrients[0];
      wrongAnswers = getRandom(otherFruits.map(f => f.nutrients[0]), 3);
      break;

    case 'makes':
      question = `What can you make using ${fruit.name}?`;
      correctAnswer = fruit.makes[0];
      wrongAnswers = getRandom(otherFruits.map(f => f.makes[0]), 3);
      break;
    
    case 'funfact':
      question = `Did you know this about ${fruit.name}?`;
      correctAnswer = fruit.facts[0];
      wrongAnswers = getRandom(otherFruits.map(f => f.facts[0]), 3);
      break;

    default: 
      question = `What is special about the ${fruit.name}?`;
      correctAnswer = fruit.facts[1] || fruit.facts[0];
      wrongAnswers = getRandom(otherFruits.map(f => f.facts[1] || f.facts[0]), 3);
      break;
  }

  const allAnswers = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());

  return { question, answers: allAnswers, correctAnswer };
};

// UPDATE: Added 'type' property to map to components
export const categories = [
  { id: 'origin', type: 'mcq', label: 'Origin', icon: '🌍', color: 'bg-orange-100 border-orange-400 text-orange-800' },
  { id: 'benefits', type: 'matching', label: 'Benefits', icon: '💪', color: 'bg-rose-100 border-rose-400 text-rose-800' },
  { id: 'parts', type: 'mcq', label: 'Fruit Parts', icon: '🌱', color: 'bg-green-100 border-green-400 text-green-800' }, 
  { id: 'nutrients', type: 'multiselect', label: 'Vitamins', icon: '💊', color: 'bg-purple-100 border-purple-400 text-purple-800'},
  { id: 'makes', type: 'imagelabel', label: 'End Product', icon: '🍰', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
  { id: 'funfact', type: 'dragdrop', label: 'Fun Fact!', icon: '🤩', color: 'bg-sky-100 border-sky-400 text-sky-800' },
];