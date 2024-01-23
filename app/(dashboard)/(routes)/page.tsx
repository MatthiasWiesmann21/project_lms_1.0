import { redirect } from 'next/navigation';
export default async function Home() {
    redirect('/dashboard');
  // Redirects automatically users which goes to the root of the app
}