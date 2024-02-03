"use client";

import LoadingCircle from "@/components/loading-circle";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const UserProfilePage = () => {
  const session = useSession();
  const user = session.data?.user;

  const getTopicsByUserId = async () => {
    const url = new URL(`/api/topic`);
    url.searchParams.append("userId", user?.id as string);

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.username, "topics"],
    queryFn: getTopicsByUserId,
  });

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
    <div className={cn("tw-p-4")}>
      {isLoading ? <LoadingCircle /> : !data ? renderNoData() : null}
    </div>
  );
};

export default UserProfilePage;
