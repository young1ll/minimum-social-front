"use client";

import { axiosClient } from "@/lib/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";

import { Loader2 } from "lucide-react";
import FeedSeparator from "./feed-separator";
import SingleFeedCard from "./single-feed";

export type SortByProps = "latest" | "recommended";

const FeedArea = () => {
  const [sortBy, setSortBy] = useState<SortByProps>("latest");
  const nextTargetRef = useRef<HTMLDivElement | null>(null);

  // TODO: 무한스크롤
  const { data, hasNextPage, fetchNextPage, status, isLoading } =
    useInfiniteQuery({
      queryKey: ["feeds"],
      queryFn: async ({ pageParam }) => {
        const responseData = await axiosClient.get("/topic", {
          params: {
            // order: sortBy, //TODO: topic api 수정 필요
            page: pageParam,
          },
        });
        return responseData.data;
      },
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

  const feeds = data?.pages.flatMap((page) => page.data) || [];
  const hasNext = data?.pages.flatMap((page) => page.pagination.hasNextPage)[0];
  const isLoadingInitialData = status === "pending" && data === undefined;
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
      <FeedSeparator
        key={"feed-separator"}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="tw-gap-4 tw-columns-1 xl:tw-columns-2 tw-space-y-4">
        {isLoadingInitialData ? (
          <div className="tw-flex tw-justify-center tw-w-full">
            <Loader2 className="tw-animate-spin" />
          </div>
        ) : (
          feeds.map((f, index) => (
            <SingleFeedCard key={`${f.id}-${index}`} {...f} />
          ))
        )}
        {isLoadingMore && (
          <div className="tw-flex tw-justify-center tw-w-full">
            <Loader2 className="tw-animate-spin" />
          </div>
        )}

        {/* {hasNextPage && <Button onClick={() => fetchNextPage()}></Button>} */}
        {!isLoading && hasNext && <div ref={nextTargetRef} />}
      </div>
    </>
  );
};

export default FeedArea;
