'use client';
import { useState } from 'react';
import { categories } from '@/utils/quizLogic';

// Import components
import QuizMenu from '@/components/quiz/QuizMenu';
import QuizMultipleChoice from '@/components/quiz/QuizMultipleChoice';
import QuizMatching from '@/components/quiz/QuizMatching';
import QuizMultiSelect from '@/components/quiz/QuizMultiSelect';
import QuizImageLabel from '@/components/quiz/QuizImageLabel';
import QuizDragDrop from '@/components/quiz/QuizDragDrop';

const GAME_COMPONENTS = {
  mcq: QuizMultipleChoice,
  matching: QuizMatching,
  multiselect: QuizMultiSelect,
  imagelabel: QuizImageLabel,
  dragdrop: QuizDragDrop,
};

export default function QuizClientWrapper({ fruit, allFruits }) {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  if (!activeCategoryId) {
    return <QuizMenu fruit={fruit} onSelectCategory={setActiveCategoryId} />;
  }

  const selectedCategory = categories.find(c => c.id === activeCategoryId);
  const GameComponent = GAME_COMPONENTS[selectedCategory.type];

  return (
    <GameComponent 
      fruit={fruit} 
      allFruits={allFruits} 
      categoryId={activeCategoryId} 
      onBack={() => setActiveCategoryId(null)} 
    />
  );
}