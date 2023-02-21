import { Inter } from '@next/font/google';
import Link from 'next/link';
import { loadSession } from '~/lib/session';

const inter = Inter({ subsets: ['latin'] });

export default function MutatePage() {
  const session = loadSession();
  if (!session) {
    return <>You must log in first</>;
  }
  return (
    <>
      <h1>Transaction Send Page</h1>
      <p>Session Content:</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Link href="/auth/logout">Click Here to Log Out</Link>
    </>
  );
}
