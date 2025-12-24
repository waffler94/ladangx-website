'use client';
import { useState } from 'react';
import { categories, getNextCategory } from '@/utils/quizLogic';

// Import components
import QuizMenu from '@/components/quiz/QuizMenu';
import QuizMultipleChoice from '@/components/quiz/QuizMultipleChoice';
import QuizMatching from '@/components/quiz/QuizMatching';
import QuizMultiSelect from '@/components/quiz/QuizMultiSelect';
import QuizImageLabel from '@/components/quiz/QuizImageLabel';
import QuizDragDrop from '@/components/quiz/QuizDragDrop';
import QuizParts from '@/components/quiz/QuizParts';

const GAME_COMPONENTS = {
  mcq: QuizMultipleChoice,
  matching: QuizMatching,
  multiselect: QuizMultiSelect,
  imagelabel: QuizImageLabel,
  dragdrop: QuizDragDrop,
  labeling: QuizParts,
};

export default function QuizClientWrapper({ fruit, allFruits, locale, userQuizId, token, apiUrl }) {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  if (!activeCategoryId) {
    return <QuizMenu fruit={fruit} onSelectCategory={setActiveCategoryId} locale={locale} />;
  }

  const selectedCategory = categories.find(c => c.id === activeCategoryId);
  const GameComponent = GAME_COMPONENTS[selectedCategory.type];

  const nextCategoryId = getNextCategory(activeCategoryId);
  
  const handleNextLevel = () => {
    if (nextCategoryId) {
      setActiveCategoryId(nextCategoryId); // Go to next
    } else {
      setActiveCategoryId(null); // Finish (Go back to menu)
    }
  };

  return (
    <GameComponent 
      fruit={fruit} 
      allFruits={allFruits} 
      categoryId={activeCategoryId} 
      onBack={() => setActiveCategoryId(null)} 
      onNext={handleNextLevel}
      locale={locale} 
      isLastLevel={!nextCategoryId}
      userQuizId={userQuizId}
      token={token}
      apiUrl={apiUrl}
    />
  );
}