import { getFruits } from '@/utils/api';
import { notFound } from 'next/navigation';
import QuizClientWrapper from './QuizClientWrapper'; // We will create this

export default async function QuizPage({ params }) {
  const { slug, locale } = await params;
  const fruits = await getFruits(locale);
  const fruit = fruits.find((f) => f.slug === slug);

  if (!fruit) return notFound();

  // Pass ALL fruits to the client wrapper so it can generate random wrong answers
  return <QuizClientWrapper fruit={fruit} allFruits={fruits} locale={locale}  />;
}