"use client";
import LoadingCircle from "@/components/loading-circle";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const UserProfileMediaPage = () => {
  const session = useSession();
  const user = session.data?.user;

  const getMediaByUserId = async () => {
    const url = new URL(`${config.rootUrl}/api/user`);
    url.searchParams.append("type", "media");

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.username, "media"],
    queryFn: getMediaByUserId,
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
            <span>You have any medias yet</span>
          </div>
          <div>
            <span className="tw-text-zinc-500">
              When you post photos or videos, they will show up here.
            </span>
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

export default UserProfileMediaPage;
