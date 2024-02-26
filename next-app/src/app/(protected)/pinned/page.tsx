"use client";

import SectionHeader from "@/components/section-header";
import H2 from "@/components/ui/h2";
import { cn } from "@/lib/utils";
import TagArea from "../tag-area";
import MainSection from "@/components/main-section";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingCircle from "@/components/loading-circle";
import config from "@/config";

const PinnedPage = () => {
  const session = useSession();
  const user = session.data?.user;

  //TODO: api 작성...
  const getPinnedByUserId = async () => {
    const url = new URL(`${config.rootUrl}/api/topic`);
    url.searchParams.append("userId", user?.id as string);

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.username, "pinned"],
    queryFn: getPinnedByUserId,
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
            <span>Pin Topics for later</span>
          </div>
          <div>
            <span className="tw-text-zinc-500">
              Pin topics to easily find them again in the future.
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
      <MainSection>
        <SectionHeader>
          <div className={cn("tw-flex tw-flex-1", "tw-w-full tw-h-full")}>
            <div className="tw-flex tw-flex-col tw-flex-1">
              <H2 className="tw-w-full">Pinned topics</H2>
              <span className="tw-px-4 tw-text-base -tw-mt-2 tw-pb-1 tw-text-zinc-500">
                {user?.username ? (
                  user.username
                ) : (
                  <Skeleton className="tw-w-[120px] tw-h-[24px]" />
                )}
              </span>
            </div>
          </div>
        </SectionHeader>

        {/* TODO: notification list  */}
        <div className={cn("tw-p-4")}>
          {isLoading ? <LoadingCircle /> : !data ? renderNoData() : null}
        </div>
      </MainSection>

      <TagArea />
    </div>
  );
};

export default PinnedPage;
