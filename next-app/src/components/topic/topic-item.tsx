"use client";

import { cn } from "@/lib/utils";
import { Box } from "../ui/box";
import { Topic } from "@/types/topic";
import UserAvatar from "../user-avatar";
import { Skeleton } from "../ui/skeleton";
import {
  CalendarIcon,
  CheckIcon,
  EyeOpenIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useUserByUserId } from "@/lib/query/use-user";
import { useTopicVotedByTopicId } from "@/lib/query/use-topic";
import { renderDate } from "./render-date";
import TopicMoreButton from "./topic-more-button";

interface TopicItemProps extends Topic {
  description: string;
}

const TopicItem = (
  props: TopicItemProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const {
    id,
    userId,
    title,
    description,
    type,
    // tags, //TODO: 지원 예정
    // media, //TODO: 지원 예정
    status,
    isSecretVote,
    resultOpen,
    isMultiChoice,
    castingVote,
    view,
    vetedCount,
    // like, //TODO: 지원 예정
    candidateItemCount,
    startDate,
    endDate,
    createdAt,
    updatedAt,
    className,
    ...rest
  } = props;

  const { data: userData, isLoading: isUserLoading } = useUserByUserId({
    userId,
  });

  // const { data: topicVoted } = useTopicVotedByTopicId({ topicId: id });

  return (
    <Box
      direction={"row"}
      className={cn(
        "tw-min-h-[120px] tw-border-b",
        "tw-relative",
        "hover:tw-bg-accent",
        className,
      )}
      {...rest}
    >
      {status !== "open" && (
        <div
          className={cn(
            "tw-pointer-events-none",
            "tw-absolute tw-z-20",
            "tw-w-full tw-h-full",
            "tw-bg-zinc-500/10",
          )}
        />
      )}
      <div className="tw-w-40 tw-p-4 tw-flex tw-flex-col tw-gap-1 tw-justify-center tw-items-end">
        <Badge className="tw-w-full tw-justify-center" variant={"outline"}>
          {isSecretVote ? "비밀 투표" : "공개 투표"}
        </Badge>
        <Badge className="tw-w-full tw-justify-center" variant={"outline"}>
          {isMultiChoice ? "다중 선택" : "단일 선택"}
        </Badge>
        <Badge className="tw-w-full tw-justify-center" variant={"outline"}>
          {isMultiChoice ? "결과 공개" : "결과 비공개"}
        </Badge>
      </div>

      {/* <Separator orientation="vertical" /> */}

      <div className="tw-w-full tw-p-4 tw-flex tw-flex-col tw-justify-between">
        <div className="tw-flex tw-flex-col">
          <div className="tw-flex tw-gap-1 tw-items-center tw-font-semibold tw-text-xl">
            <div className="tw-flex-1 tw-flex tw-gap-1 tw-items-center">
              {type === "event" && <CalendarIcon className="tw-w-6 tw-h-6" />}
              <Link
                href={`/${userData?.username}/${id}`}
                className="hover:tw-underline"
              >
                {title ? (
                  <span className="tw-line-clamp-1">{title}</span>
                ) : (
                  <Skeleton className="tw-w-full tw-h-7" />
                )}
              </Link>
            </div>
            <Badge
              className={cn(
                "tw-font-normal tw-text-sm",
                status === "pending" &&
                  "tw-text-orange-500 tw-border-orange-500",
                status === "open" && "tw-text-green-500 tw-border-green-500",
                status === "close" && "tw-text-red-500 tw-border-red-500",
              )}
              variant={"outline"}
            >
              {status === "close" ? endDate.toLocaleString("ko-KR") : status}
            </Badge>

            <TopicMoreButton
              className="-tw-mr-2"
              userId={userId}
              topicId={id}
              ownerId={userData?.id}
              ownerUsername={userData?.username}
            />
          </div>
          <span className="tw-text-base">{description}</span>

          <span className="tw-flex tw-items-center tw-gap-2">
            <CalendarIcon className="tw-text-zinc-500" />
            {renderDate({
              createdAt: createdAt as string,
              updatedAt: updatedAt as string,
            })}
          </span>
        </div>

        {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}

        <div className="tw-flex tw-justify-between tw-items-center">
          <div className="tw-flex tw-gap-4 tw-text-zinc-500">
            <span className="tw-text-sm tw-flex tw-items-center tw-gap-1">
              <EyeOpenIcon />
              {view}
            </span>

            <span className="tw-text-sm tw-flex tw-items-center tw-gap-1">
              <HeartIcon />
              {/* {like} */}
              {0}
            </span>

            <span className="tw-text-sm tw-flex tw-items-center tw-gap-1">
              <CheckIcon />
              {vetedCount}
            </span>
          </div>

          <div className="tw-flex tw-gap-2 tw-items-center tw-pointer-events-auto">
            <UserAvatar
              size={"sm"}
              profileImage={userData?.profileImage}
              username={userData?.username}
            />

            {isUserLoading ? (
              <Skeleton className="tw-h-4 tw-w-16" />
            ) : (
              <span className="tw-text-sm tw-leading-3 tw-py-2">
                {userData?.username}
              </span>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TopicItem;
