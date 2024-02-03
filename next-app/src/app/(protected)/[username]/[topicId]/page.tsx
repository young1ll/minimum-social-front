"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  ChatBubbleIcon,
  DotsHorizontalIcon,
  DrawingPinIcon,
  EyeOpenIcon,
  HeartIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

const SingleTopicPage = () => {
  const { username, topicId } = useParams();

  const getUserByUsername = async () => {
    const url = new URL(`/api/user`);
    url.searchParams.append("username", username as string);

    const response = await fetch(url);
    const result = await response.json();
    return result.data;
  };
  const getTopicByTopicId = async () => {
    const url = new URL(`/api/topic/detail`);
    url.searchParams.append("id", topicId as string);

    const response = await fetch(url);
    const result = await response.json();
    return result.data;
  };

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", username],
    queryFn: getUserByUsername,
  });
  const { data: topicData, isLoading: isTopicLoading } = useQuery({
    queryKey: [username, "topic", topicId],
    queryFn: getTopicByTopicId,
  });

  const buttonList = [
    {
      id: "comment",
      content: (
        <>
          <ChatBubbleIcon className="tw-h-5 tw-w-5" />
          <span className="tw-ml-2">{topicData?.commentCount || 0}</span>
        </>
      ),
      onClick: () => {},
    },
    {
      id: "like",
      content: (
        <>
          <HeartIcon className="tw-h-5 tw-w-5" />
          <span className="tw-ml-2">{topicData?.likes || 0}</span>
        </>
      ),
      onClick: () => {},
    },
    {
      id: "pinned",
      content: <DrawingPinIcon className="tw-h-5 tw-w-5" />,
      onClick: () => {},
    },
    {
      id: "share",
      content: <PaperPlaneIcon className="tw-h-5 tw-w-5" />,
      onClick: () => {},
    },
  ];

  return (
    <div className={cn("tw-flex tw-flex-col")}>
      <div className="tw-p-4">
        <Card className="tw-relative">
          <Button
            className="tw-absolute tw-top-2 tw-right-2"
            variant={"outline"}
            size={"icon"}
          >
            <DotsHorizontalIcon className="tw-h-6 tw-w-6" />
          </Button>

          <div
            className={cn(
              "tw-flex tw-flex-row tw-gap-2",
              "tw-flex-1 tw-items-center",
              "tw-p-2",
            )}
          >
            <UserAvatar
              profileImage={userData?.profileImage}
              username={username as string}
              size={"2xl"}
            />

            <div className="tw-flex tw-flex-col">
              {username ? (
                <span className="tw-text-lg tw-font-semibold">{username}</span>
              ) : (
                <Skeleton className="tw-h-7 tw-w-60" />
              )}
              {userData?.email ? (
                <span>{userData?.email}</span>
              ) : (
                <Skeleton className="tw-h-4 tw-w-32" />
              )}
            </div>
          </div>

          {/* feed contents */}
          <div className="tw-mt-1 tw-px-4 tw-flex tw-flex-col tw-gap-2">
            {topicData?.description ? (
              <p>{topicData?.description}</p>
            ) : (
              <Skeleton className="tw-h-6 tw-w-full" />
            )}

            {topicData?.image ? (
              <Image src={topicData?.image.src} alt={topicData?.image.alt} />
            ) : (
              <Skeleton className="tw-h-64 tw-w-full" />
            )}
          </div>

          {/* additional info */}
          <div className="tw-my-4 tw-px-4 tw-flex tw-gap-4 tw-text-zinc-500">
            <div className="tw-w-1/4 tw-flex tw-gap-2">
              <CalendarIcon />
              {topicData?.createdAt === topicData?.updatedAt
                ? renderDate({ date: topicData?.createdAt, isUpdated: false })
                : renderDate({
                    date: topicData?.updatedAt,
                    isUpdated: true,
                  })}
            </div>

            <span className="tw-text-sm tw-flex tw-gap-2">
              <EyeOpenIcon />
              {topicData?.view}
            </span>
          </div>
        </Card>
      </div>

      <div className="tw-border-y tw-flex tw-justify-between">
        {buttonList.map((button, index) => (
          <>
            <Button
              key={button.id}
              variant={"ghost"}
              size={"icon"}
              className="tw-w-full tw-rounded-none tw-text-zinc-500"
            >
              {button.content}
            </Button>
            {index < buttonList.length - 1 && (
              <Separator orientation="vertical" />
            )}
          </>
        ))}
      </div>

      <div className={cn("tw-flex tw-flex-col")}></div>
    </div>
  );
};

export default SingleTopicPage;

export const renderDate = ({
  date,
  isUpdated,
}: {
  date?: string;
  isUpdated: boolean;
}) => {
  if (!date) {
    return <Skeleton className="tw-h-full tw-w-full" />;
  }
  return (
    <span className="tw-text-sm">
      {new Date(date).toLocaleString("ko-KR")}
      {isUpdated && " (수정됨)"}
    </span>
  );
};
