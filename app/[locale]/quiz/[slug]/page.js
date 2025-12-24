import { getFruits } from '@/utils/api';
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers'; 
import QuizClientWrapper from './QuizClientWrapper';

// 1. Update function to accept ID
async function checkAuth(id) {
  const cookieStore = await cookies();
  
  // 🟢 HARDCODED TOKEN (As requested)
  const token = "4|3tNUf4GvnzFHJfgwUAvI48FnqfI4L5umXd7faJFn"; 

  if (!token) return false;

  try {
    const res = await fetch(process.env.API_URL + '/user-quizzes/start', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // ⬇️ Send the ID here
      body: JSON.stringify({ field_item_id: id }),
      cache: 'no-store'
    });

    if (res.ok) {
      const data = await res.json();
      // Assuming the API returns something like { data: { id: 101 } } or just { id: 101 }
      // Adjust 'data.data.id' based on your actual API response structure
      const userQuizId = data.data?.id || data.id; 
      
      return { isAuthorized: true, token, userQuizId }; // ✅ Return ID and Token
    } else {
      console.error('Auth Check Failed:', await res.text());
      return { isAuthorized: false };
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    return false;
  }
}

export default async function QuizPage({ params }) {
  const { slug, locale } = await params;

  // 2. FETCH DATA FIRST (To get the ID)
  const fruits = await getFruits(locale);
  const fruit = fruits.find((f) => f.slug === slug);

  if (!fruit) return notFound();

  // 3. RUN AUTH CHECK USING THE FOUND ID
  // Now we have fruit.id available
  const auth = await checkAuth(fruit.id);

  if (!auth.isAuthorized) {
    console.log("❌ Auth failed");
    // Handle redirect or error here
  }

  // 4. Render Game
  return (
    <QuizClientWrapper 
      fruit={fruit} 
      allFruits={fruits} 
      locale={locale} 
      userQuizId={auth.userQuizId}
      token={auth.token}          
      apiUrl={process.env.API_URL}
    />
  );
}