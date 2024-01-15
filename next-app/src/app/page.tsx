import SignoutButton from "@/components/test/signout";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  // 서버사이드 세션
  const session = await getServerSession(authOptions);

  const { user } = session || {};

  return (
    <main className="">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {session ? <SignoutButton /> : <Link href={"/signin"}>로그인</Link>}
    </main>
  );
}
