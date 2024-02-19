"use client";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const UserProfileLikesPage = () => {
  const session = useSession();
  const user = session.data?.user;

  const getLikesByUserId = async () => {
    const url = new URL(`/api/user`);
    url.searchParams.append("type", "likes");

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.username, "likes"],
    queryFn: getLikesByUserId,
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
            <span>You have any likes yet</span>
          </div>
          <div>
            <span className="tw-text-zinc-500">
              Tap the heart on any post to show it some love. When you do, it’ll
              show up here.
            </span>
          </div>
        </div>
      </div>
    );
  };

  return <div className={cn("tw-p-4")}>{!data && renderNoData()}</div>;
};

export default UserProfileLikesPage;
