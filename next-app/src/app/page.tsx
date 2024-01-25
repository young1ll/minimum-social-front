import FeedCard from "@/components/feed-card";
import ThrowTopicCard from "@/components/card-throw-topic";
import { Box } from "@/components/ui/box";
import { Container } from "@/components/ui/container";
import FeedSeperator from "@/components/poll/feed-seperator";
import FeedSidebar from "@/components/poll/feed-sidebar";

/**
 * HomePage
 * - 회원: 기본 기능 조회 페이지 + 사용자 추천
 * - 비회원: 기본 기능 조회 페이지
 */
export default async function Home() {
  return (
    <Container
      size={"xl"}
      className="!tw-px-0 tw-flex-col tw-mt-4"
      innerContainerProps={{ className: "tw-justify-start tw-w-full" }}
    ></Container>
  );
}
