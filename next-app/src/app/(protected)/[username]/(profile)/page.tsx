"use client";

import LoadingCircle from "@/components/loading-circle";
import TopicItem from "@/components/topic/topic-item";
import { useUserTopicsInfiniteByUserId } from "@/lib/query/use-topic";
import { useUserByUsername } from "@/lib/query/use-user";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface UserProfilePageProps {
  params: { username: string };
}

const UserProfilePage = (props: UserProfilePageProps) => {
  const { params } = props;
  const username = params.username;

  const { data: userData, isFetched: isUserDataFetched } = useUserByUsername({
    username,
  });
  const {
    data: userTopics,
    isLoading: isUserTopicsLoading,
    status,
    hasNextPage,
    refetch,
  } = useUserTopicsInfiniteByUserId({ userId: userData?.id });

  const isLoadingInitialData = status === "pending" && userTopics === undefined;
  const feeds = userTopics?.pages.flatMap((page) => page.data) || [];
  const hasNext = userTopics?.pages.flatMap(
    (page) => page.pagination.hasNextPage,
  )[0];
  const isLoadingMore = status === "pending" && !!userTopics && hasNextPage;

  useEffect(() => {
    if (isUserDataFetched) {
      refetch();
    }
  }, [isUserDataFetched]);

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
            <span>You have no topics yet</span>
          </div>
          <div>
            <span className="tw-text-zinc-500">Try to throw one now!</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("tw-flex tw-flex-col")}>
      {isUserTopicsLoading ? (
        <div className="tw-mt-8">
          <LoadingCircle />
        </div>
      ) : !userTopics ? (
        renderNoData()
      ) : (
        feeds.map((f) => (
          <TopicItem key={f.id} className="last:!tw-border-none" {...f} />
        ))
      )}
    </div>
  );
};

export default UserProfilePage;
