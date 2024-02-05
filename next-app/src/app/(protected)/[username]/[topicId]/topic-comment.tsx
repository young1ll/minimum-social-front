import { Box } from "@/components/ui/box";
import { useGetCommentsInfinite } from "@/lib/query/use-comment";
import { useEffect, useRef } from "react";

interface TopicPageCommentArea {
  username: string;
  topicId: string;
}

const TopicPageCommentArea = (props: TopicPageCommentArea) => {
  const { username, topicId } = props;
  const nextTargetRef = useRef<HTMLDivElement | null>(null);

  // const {data, hasNextPage, fetchNextPage, status, isLoading} = useGetCommentsInfinite({ topicId: topicId });

  // const isLoadingInitialData = status === "pending" && data === undefined;
  // const feeds = data?.pages.flatMap((page) => page.data) || [];
  // const hasNext = data?.pages.flatMap((page) => page.pagination.hasNextPage)[0];
  // const isLoadingMore = status === "pending" && !!data && hasNextPage;

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.5,
  //   };
  //   const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  //     const [entry] = entries;
  //     if (entry.isIntersecting && hasNext) {
  //       fetchNextPage();
  //     }
  //   };
  //   const observer = new IntersectionObserver(handleIntersection, options);

  //   if (nextTargetRef.current) {
  //     observer.observe(nextTargetRef.current);
  //   }

  //   return () => {
  //     if (nextTargetRef.current) {
  //       observer.unobserve(nextTargetRef.current);
  //     }
  //   };
  // }, [fetchNextPage, hasNext]);

  return (
    <Box>
      <span>{username}</span>
      <span>{topicId}</span>

      {/* {isLoadingMore && <LoadingCircle />}
      {!isLoading && hasNext && <div ref={nextTargetRef} />} */}
    </Box>
  );
};

export default TopicPageCommentArea;
