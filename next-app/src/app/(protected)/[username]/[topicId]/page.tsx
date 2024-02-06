"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { renderDate } from "@/components/topic/render-date";
import TopicMoreButton from "@/components/topic/topic-more-button";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { useTopicByTopicId } from "@/lib/query/use-topic";
import { useUserByUsername } from "@/lib/query/use-user";
import { cn } from "@/lib/utils";
import { CandidateItem } from "@/types/topic";
import { CalendarIcon, CheckIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import TopicPageCommentArea from "./topic-comment";
import TopicFnsArea from "./topic-fns";
import { useSession } from "next-auth/react";

interface SingleTopicPageParams {
  params: {
    username: string;
    topicId: string;
  };
}

const SingleTopicPage = (props: SingleTopicPageParams) => {
  const session = useSession();

  const { params } = props;
  const { username, topicId } = params;
  const decodedUsername = decodeURIComponent(username);

  const { data: userData, isFetched: isUserDataFetched } = useUserByUsername({
    username: username as string,
  });

  const {
    data: topicData,
    isFetched,
    isLoading,
    refetch,
  } = useTopicByTopicId({
    topicId: topicId as string,
  });

  const handleVoted = () => {};

  return (
    <div className={cn("tw-flex tw-flex-col")}>
      {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(topicData, null, 2)}</pre> */}

      <div className="tw-p-4">
        <Card className="tw-relative tw-min-h-[280px]">
          <TopicMoreButton
            className="!tw-mr-0 tw-absolute tw-top-2 tw-right-2"
            userId={session.data?.user?.id}
            topicId={topicData?.id}
            ownerId={userData?.id}
            ownerUsername={userData?.username}
          />

          <div
            className={cn(
              "tw-flex tw-flex-col",
              "tw-flex-1",
              "tw-px-4 tw-py-2",
            )}
          >
            <div className="tw-flex tw-items-center tw-pt-2">
              {topicData ? (
                <h2 className="tw-text-xl">{topicData?.title}</h2>
              ) : (
                <Skeleton className="tw-h-8 tw-w-full" />
              )}
            </div>

            <Box direction={"row"} className="tw-items-center">
              <UserAvatar
                profileImage={userData?.profileImage}
                username={decodedUsername}
                size={"default"}
              />

              <div className="tw-flex tw-flex-col">
                {isUserDataFetched ? (
                  <span className="tw-text-sm tw-font-semibold">
                    {decodedUsername}
                  </span>
                ) : (
                  <Skeleton className="tw-h-7 tw-w-40" />
                )}
              </div>

              <Box
                direction={"row"}
                gap={2}
                className="tw-flex-1 tw-justify-end tw-text-sm tw-text-zinc-500"
              >
                {topicData ? (
                  <>
                    <Badge
                      variant={"outline"}
                      className={cn(
                        topicData.status === "pending"
                          ? "tw-text-orange-600"
                          : topicData.status === "closed"
                            ? "tw-text-red-600"
                            : "tw-text-green-600",
                      )}
                    >
                      {topicData.status}
                    </Badge>
                    <Badge variant={"outline"}>
                      {topicData.isSecretVote ? "secret" : "open"}-vote
                    </Badge>
                    <Badge variant={"outline"}>
                      {topicData.isMultiChoice ? "multi" : "single"}-choice
                    </Badge>
                    {topicData.resultOpen && (
                      <Badge variant={"outline"}>result open</Badge>
                    )}
                  </>
                ) : (
                  <Skeleton className="tw-h-6 tw-w-full" />
                )}
              </Box>
            </Box>
          </div>

          {/* feed contents */}
          <Box direction={"column"} className="tw-mt-1 tw-px-4 tw-gap-2">
            {isLoading ? (
              <Skeleton className="tw-h-6 tw-w-full" />
            ) : isFetched && !topicData?.description ? null : (
              <div className="tw-my-2">
                <p>{topicData.description}</p>
              </div>
            )}

            {topicData?.image && (
              <Image src={topicData?.image.src} alt={topicData?.image.alt} />
            )}

            <Box className="tw-my-2">
              {topicData ? (
                topicData?.candidates.map((item: CandidateItem) => (
                  <AlertDialog key={item.id}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("!tw-justify-start")}
                        disabled={
                          topicData?.status === "pending" ||
                          topicData?.status === "closed"
                        }
                      >
                        {item.detail}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          이 투표는 되돌릴 수 없습니다.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleVoted}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ))
              ) : (
                <>
                  <Skeleton className="tw-h-8 tw-w-full" />
                  <Skeleton className="tw-h-8 tw-w-full" />
                </>
              )}
            </Box>
          </Box>

          {/* additional info */}
          <Box direction={"row"} gap={4} className="tw-p-4 tw-text-zinc-500">
            <div className="tw-flex tw-gap-2 tw-items-center">
              <CalendarIcon />
              {topicData?.createdAt && topicData?.updatedAt ? (
                <span>
                  {renderDate({
                    createdAt: topicData?.createdAt,
                    updatedAt: topicData?.updatedAt,
                  })}
                </span>
              ) : (
                <Skeleton className="tw-h-6 tw-w-full" />
              )}
            </div>

            <div className="tw-text-sm tw-flex tw-items-center tw-gap-2">
              <EyeOpenIcon />
              <span>{topicData?.view}</span>
            </div>

            <div className="tw-text-sm tw-flex tw-items-center tw-gap-2">
              <CheckIcon />
              <span>{topicData?.vetedCount}</span>
            </div>

            <div className="tw-text-xs tw-flex tw-items-center tw-gap-2">
              <span>{renderSimpleDate(topicData?.startDate)}</span>
              <span>~</span>
              <span>{renderSimpleDate(topicData?.endDate)}</span>
            </div>
          </Box>
        </Card>
      </div>

      <TopicFnsArea topicId={topicId} />

      <TopicPageCommentArea username={username} topicId={topicId} />
    </div>
  );
};

export default SingleTopicPage;

const renderSimpleDate = (date: string) => {
  const thisDate = new Date(date);

  const year = thisDate.getFullYear();
  const month = (thisDate.getMonth() + 1).toString().padStart(2, "0");
  const day = thisDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
