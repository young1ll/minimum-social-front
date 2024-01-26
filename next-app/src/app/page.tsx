import { Container } from "@/components/ui/container";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

/**
 * HomePage
 * - 회원: 기본 기능 조회 페이지 + 사용자 추천
 * - 비회원: 기본 기능 조회 페이지
 */
export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="tw-p-2 tw-flex-1 tw-flex">
      <Container
        size={"xl"}
        className="!tw-px-0 tw-flex-col tw-mt-4"
        innerContainerProps={{ className: "tw-justify-start tw-w-full" }}
      >
        {JSON.stringify(session)}
      </Container>
    </main>
  );
}
