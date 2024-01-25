import ThrowTopicCard from "@/components/poll/throw-topic";
import PollCard, { PollCardProps } from "@/components/poll/poll-card";
import FeedSeparator from "@/components/poll/feed-separator";
import FeedSidebar from "@/components/poll/feed-sidebar";
import { Box } from "@/components/ui/box";
import { Container } from "@/components/ui/container";

const feeds: PollCardProps[] = [
  {
    topic: {
      id: "1",
      authorId: "1",
      description: "description",
      type: "poll",
      allowAnon: true,
      allowDupl: true,
      expired: "2024-01-31T12:00:00Z",
      createdAt: "2024-01-31T12:00:00Z",
      updatedAt: "2024-01-31T12:00:00Z",
    },
    media: {
      url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      alt: "alt",
      type: "image",
    },
  },
  {
    topic: {
      id: "2",
      authorId: "2",
      description: "description",
      type: "event",
      allowAnon: false,
      allowDupl: false,
      expired: "2024-02-01T12:00:00Z",
      createdAt: "2024-01-15T01:00:00Z",
      updatedAt: "2024-01-15T01:00:00Z",
    },
    event: {
      eventDate: "2024-02-08T01:00:00Z",
      eventTitle: "eventTitle",
    },
    media: {
      url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      alt: "alt",
      type: "image",
    },
  },
  {
    topic: {
      id: "3",
      authorId: "3",
      description: "description",
      type: "versus",
      allowAnon: false,
      allowDupl: false,
      expired: "2024-01-20T12:00:00Z",
      createdAt: "2024-01-15T01:00:00Z",
      updatedAt: "2024-01-15T01:00:00Z",
    },
    versusId: ["1", "2"],
  },
  {
    topic: {
      id: "4",
      authorId: "3",
      description: "description",
      type: "versus",
      allowAnon: false,
      allowDupl: false,
      expired: "2024-02-01T12:00:00Z",
      createdAt: "2024-01-15T01:00:00Z",
      updatedAt: "2024-01-15T01:00:00Z",
    },
    versusId: ["2", "3"],
  },
];

const FeedPage = () => {
  return (
    <Container
      size={"xl"}
      className="tw-flex-col tw-mt-4"
      innerContainerProps={{ className: "tw-justify-start tw-w-full" }}
    >
      <Box className="md:!tw-flex-row tw-gap-4">
        <FeedSidebar />

        <Box className="tw-flex-1">
          {/* Add Topic: client component */}
          <ThrowTopicCard />

          <FeedSeparator />

          <div className="tw-gap-4 tw-columns-1 xl:tw-columns-2 tw-space-y-4">
            {feeds.map((feed, index) => (
              <PollCard
                key={feed.topic.id}
                className="tw-break-inside-avoid"
                topic={feed.topic}
                event={feed?.event}
                versusId={feed?.versusId}
                media={feed?.media}
              />
            ))}
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default FeedPage;
