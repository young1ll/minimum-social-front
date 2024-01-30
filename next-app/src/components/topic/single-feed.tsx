"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { axiosClient } from "@/lib/axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Box } from "../ui/box";
import { Button, buttonVariants } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { cn, remainingTimeAsString } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CandidateItem } from "./types";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface SingleFeedProps {
  id: string;
  userId: string;
  title: string;
  type: "event" | "poll";
  status: "pending" | "open" | "close";
  isSecretVote: boolean;
  isMultiChoice: boolean;
  castingVote: string;
  resultOpen: boolean;
  view: number;
  candidateItemCount: number;
  startDate: Date | string;
  endDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const SingleFeedCard = ({
  id,
  userId,
  title,
  type,
  status,
  isSecretVote,
  isMultiChoice,
  castingVote,
  resultOpen,
  view,
  candidateItemCount,
  startDate,
  endDate,
  createdAt,
  updatedAt,
}: SingleFeedProps) => {
  const renderDate = () => {
    const date =
      createdAt === updatedAt ? new Date(createdAt) : new Date(updatedAt);
    return (
      <p className="tw-text-[11px] tw-text-zinc-500">
        {createdAt !== updatedAt ? "수정됨 " : ""}
        {date.toLocaleString("ko-KR")}
      </p>
    );
  };

  return (
    <Card
      className={cn(
        "tw-relative tw-overflow-hidden",
        "tw-flex tw-flex-row tw-gap-3 tw-p-2",
        status === "pending" && "tw-border-orange-300",
        status === "open" && "tw-border-primary",
        status === "close" && "tw-border-destructive",
      )}
    >
      <FeedInfo
        status={status}
        isSecretVote={isSecretVote}
        isMultiChoice={isMultiChoice}
        startDate={startDate as string}
        endDate={endDate as string}
      />
      <Box className="tw-flex-1 tw-justify-between">
        <Box direction={"row"} className="tw-justify-between tw-items-center">
          <h2
            className={cn(
              "tw-text-xl tw-font-base tw-pl-2 tw-align-text-top tw-flex-1",
              status === "pending" && "tw-text-orange-400",
              status === "open" && "tw-text-primary",
              status === "close" && "tw-text-destructive",
            )}
          >
            <Link href={`/feeds/${id}`}>{title}</Link>
          </h2>

          <Button variant={"ghost"} size={"icon"} className="tw-w-8 tw-h-8">
            <DotsHorizontalIcon />
          </Button>
        </Box>

        <Box
          direction={"row"}
          gap={4}
          className="tw-items-center tw-justify-end tw-px-2 !tw-mt-0"
        >
          <FeedProfileArea userId={userId} size="sm" />

          {renderDate()}
        </Box>
      </Box>

      {/* <CardContent className="tw-px-2">
        <FeedContent key={id} topicId={id} />
      </CardContent> */}
    </Card>
  );
};

export default SingleFeedCard;

export const FeedProfileArea = ({
  userId,
  size,
}: {
  userId: string;
  size?: "sm" | "md" | "lg";
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["feed-owner"],
    queryFn: async () =>
      await axiosClient.get("/user", {
        params: {
          id: userId,
        },
      }),
  });

  const user = data?.data.data;

  return (
    <div className="tw-flex tw-items-center tw-gap-1">
      <Avatar
        className={cn(
          size === "sm"
            ? "tw-w-4 tw-h-4 tw-rounded-sm"
            : size === "md"
              ? "tw-w-6 tw-h-6 tw-rounded-md"
              : "tw-w-8 tw-h-8 tw-rounded-lg",
        )}
      >
        <AvatarImage src={user?.profileImage} alt={user?.username} />
        <AvatarFallback
          className={cn(
            "tw-rounded-lg",
            size === "sm"
              ? "tw-text-[10px]"
              : size === "md"
                ? "tw-text-[12px]"
                : "",
          )}
        >
          {user?.username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <p
        className={cn(
          size === "sm"
            ? "tw-text-sm"
            : size === "md"
              ? "tw-text-md"
              : "tw-text-lg",
          "tw-leading-none tw-font-medium",
        )}
      >
        {user?.username}
        {/* 뱃지 여부 */}
      </p>
    </div>
  );
};

const FeedInfo = ({
  status,
  isSecretVote,
  isMultiChoice,
  startDate,
  endDate,
}: {
  status: string;
  isSecretVote: boolean;
  isMultiChoice: boolean;
  startDate: string;
  endDate: string;
}) => {
  const [timer, setTimer] = useState(remainingTimeAsString(endDate as string));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(remainingTimeAsString(endDate as string));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderInfoTag = (value: string) => {
    return (
      <Badge variant={"outline"} className="tw-text-[11px] tw-justify-center">
        {value}
      </Badge>
    );
  };

  return (
    <Box className="tw-w-[100px] tw-truncate tw-py-2">
      {!isSecretVote && renderInfoTag("Signed Vote")}
      {renderInfoTag(isMultiChoice ? "Multi-Choice" : "Single-Choice")}

      <DateTooltip
        status={status}
        tooltipContent={
          <>
            <p>start date: {new Date(startDate).toLocaleString("ko-KR")}</p>
            <p>end date: {new Date(endDate).toLocaleString("ko-KR")}</p>
          </>
        }
      />
    </Box>
  );
};

const DateTooltip = ({
  status,
  tooltipContent,
}: {
  status: string;
  tooltipContent: ReactNode;
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger className={cn("tw-h-6 tw-w-full")}>
          <Badge
            variant={"outline"}
            className={cn(
              "tw-text-[11px] tw-justify-center tw-w-full",
              status === "pending"
                ? "tw-border-orange-500 tw-text-orange-500"
                : status === "close"
                  ? "tw-border-red-500 tw-text-red-500"
                  : "tw-border-green-500 tw-text-green-500",
            )}
          >
            {status.toUpperCase()}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
