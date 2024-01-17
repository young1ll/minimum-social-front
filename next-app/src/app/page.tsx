import SignoutButton from "@/components/test/signout";
import { Container } from "@/components/ui/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * HomePage
 * - 회원: 메인 기능 조회 페이지
 * - 비회원: 랜딩 페이지(조회)
 */
export default async function Home() {
  // 서버사이드 세션
  const session = await getServerSession(authOptions);

  const { user } = session || {};

  return <Container className="">Welcome!</Container>;
}
