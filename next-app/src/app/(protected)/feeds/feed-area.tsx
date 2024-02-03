"use client";

import LoadingCircle from "@/components/loading-circle";
import TopicItem from "@/components/topic/topic-item";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface FeedAreaProps {
  sort: string;
}

const FeedArea = (
  props: FeedAreaProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { sort, className, ...rest } = props;
  const nextTargetRef = useRef<HTMLDivElement | null>(null);

  const getFeeds = async ({ pageParam }: { pageParam: number }) => {
    const url = new URL(`/api/topic`);
    url.searchParams.append("page", pageParam.toString());
    url.searchParams.append("order", sort);

    const response = await fetch(url);
    const result = await response.json();
    return result.data;
  };

  const { data, hasNextPage, fetchNextPage, status, isLoading } =
    useInfiniteQuery({
      queryKey: ["feed", sort],
      queryFn: async ({ pageParam }) => await getFeeds({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        // pageParam에 전달할 값
        const curr = lastPage.pagination.currentPage;
        const total = lastPage.pagination.totalPages;

        if (lastPage.pagination.hasNextPage === false || curr === total) {
          return false;
        }
        return curr + 1;
      },
    });

  const isLoadingInitialData = status === "pending" && data === undefined;
  const feeds = data?.pages.flatMap((page) => page.data) || [];
  const hasNext = data?.pages.flatMap((page) => page.pagination.hasNextPage)[0];
  const isLoadingMore = status === "pending" && !!data && hasNextPage;

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNext) {
        fetchNextPage();
      }
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    if (nextTargetRef.current) {
      observer.observe(nextTargetRef.current);
    }

    return () => {
      if (nextTargetRef.current) {
        observer.unobserve(nextTargetRef.current);
      }
    };
  }, [fetchNextPage, hasNext]);

  return (
    <>
      <Separator className="tw-mb-4" />

      <div className={cn("tw-flex tw-flex-col", className)} {...rest}>
        {isLoadingInitialData ? (
          <LoadingCircle />
        ) : feeds.length ? (
          feeds.map((f) => (
            <>
              <pre className="tw-w-full">{JSON.stringify(f, null, 2)}</pre>
              <TopicItem key={f.id} className="last:!tw-border-none" {...f} />
            </>
          ))
        ) : (
          renderNoData()
        )}
      </div>

      {isLoadingMore && <LoadingCircle />}
      {!isLoading && hasNext && <div ref={nextTargetRef} />}
    </>
  );
};

export default FeedArea;

const renderNoData = () => {
  return (
    <div
      className={cn(
        "tw-w-3/4 tw-mx-auto tw-my-8",
        "tw-flex tw-flex-col tw-basis-auto tw-items-center",
        "tw-px-8",
      )}
    >
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
        <div className="tw-text-3xl tw-font-bold tw-leading-8">
          <span>No feed data from server...</span>
        </div>
        <div>
          <span className="tw-text-zinc-500">
            No feed data from server yet.. Maybe you throw one first!
          </span>
        </div>
      </div>
    </div>
  );
};
