"use client";

import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TopicCard from "./topic-card";
import { Topic } from "./types";

const FeedArea = () => {
  // TODO: 무한스크롤
  // const { data } = useQuery({
  //   queryKey: ["feeds"],
  //   queryFn: async () => {
  //     const responseData = await axiosClient.get("/feeds");
  //     return responseData;
  //   },
  // });

  return (
    <div className="tw-gap-4 tw-columns-1 xl:tw-columns-2 tw-space-y-4">
      <p>hello</p>
      {/* <div className="tw-overflow-hidden">{JSON.stringify(data)}</div> */}
      {/* {data?.map((feed: Topic, index: number) => (
        <TopicCard key={feed.id} className="tw-break-inside-avoid" {...feed} />
      ))} */}
    </div>
  );
};

export default FeedArea;
