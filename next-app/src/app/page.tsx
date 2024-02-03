import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/**
 * HomePage
 * - 회원: feeds page로 이동
 * - 비회원: 회원 가입 페이지로 이동
 */
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  } else {
    redirect("/feeds");
  }
}
