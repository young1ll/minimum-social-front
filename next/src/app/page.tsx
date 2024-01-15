import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
  // 서버사이드 세션
  const session = await getServerSession(authOptions);
  const { user } = session || {};

  return (
    <main className="">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
