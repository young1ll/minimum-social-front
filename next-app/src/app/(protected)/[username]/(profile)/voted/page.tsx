"use client";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const UserProfileVotedPage = () => {
  const session = useSession();
  const user = session.data?.user;

  const getVotedByUserId = async () => {
    const url = new URL(`/api/topic/vote`);
    url.searchParams.append("userId", user?.id as string);

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.username, "voted"],
    queryFn: getVotedByUserId,
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
            <span>Vote in topics you want anytime!</span>
          </div>
          <div>
            <span className="tw-text-zinc-500">
              When you vote in any topics, they will show up here.
            </span>
          </div>
        </div>
      </div>
    );
  };

  return <div className={cn("tw-p-4")}>{!data && renderNoData()}</div>;
};

export default UserProfileVotedPage;
