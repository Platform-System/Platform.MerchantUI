import { redirect } from '@/i18n/navigation';

/**
 * Root HomePage: Routes directly to the store experience.
 */
export default function HomePage() {
  redirect('/store/home');
}
