"use client";

import BackButton from "@/components/button-back";
import SectionHeader from "@/components/section-header";
import H2 from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import {
  useUserByUsername,
  useUserTopicCountByUserId,
} from "@/lib/query/use-user";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface UserHeaderProps {
  username: string;
}

const UserHeader = (props: UserHeaderProps) => {
  const { username } = props;

  const userDataQuery = useUserByUsername({ username });
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isFetched: isUserFetched,
  } = userDataQuery;

  const userTopicCountsQuery = useUserTopicCountByUserId({
    userId: userData?.id,
  });
  const {
    data: userTopicCount,
    isLoading: isUserTopicCountLoading,
    refetch: refetchUserTopicCount,
  } = userTopicCountsQuery;

  useEffect(() => {
    if (isUserFetched) {
      refetchUserTopicCount();
    }
  }, [isUserFetched]);

  return (
    <SectionHeader>
      <BackButton className="tw-w-[53px] tw-h-[53px] tw-rounded-none" />

      <Separator orientation="vertical" />

      <div className={cn("tw-flex tw-flex-1", "tw-w-full tw-h-full")}>
        <div className="tw-flex tw-flex-col tw-flex-1">
          <H2 className="tw-w-full">{username}</H2>
          <div
            className={cn(
              "tw-px-4 -tw-mt-2 tw-pb-1",
              "tw-flex tw-items-center tw-gap-2",
              "tw-text-sm tw-text-zinc-500",
            )}
          >
            <span>{userTopicCount?.data || 0}</span>
            <span>posts</span>
          </div>
        </div>
      </div>
    </SectionHeader>
  );
};

export default UserHeader;
