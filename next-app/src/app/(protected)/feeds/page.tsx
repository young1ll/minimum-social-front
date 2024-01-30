import FeedArea from "@/components/topic/feed-area";
import FeedSidebar from "@/components/topic/feed-sidebar";
import ThrowTopicCard from "@/components/topic/throw-topic";
import { Box } from "@/components/ui/box";
import { Container } from "@/components/ui/container";

const FeedPage = () => {
  return (
    <Container
      size={"xl"}
      className="tw-flex-col tw-mt-4"
      innerContainerProps={{ className: "tw-justify-start tw-w-full" }}
    >
      <Box className="md:!tw-flex-row tw-gap-4">
        <FeedSidebar />

        <Box className="tw-flex-1 tw-overflow-hidden">
          {/* Add Topic: client component */}
          <ThrowTopicCard />

          <FeedArea />
        </Box>
      </Box>
    </Container>
  );
};

export default FeedPage;
