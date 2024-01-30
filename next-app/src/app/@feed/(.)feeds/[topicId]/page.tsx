"use client";
import { FeedPageProps } from "@/app/(protected)/feeds/[topicId]/page";
import { FeedProfileArea } from "@/components/topic/single-feed";
import {
  CandidateItem,
  EventCardProps,
  PollCardProps,
  Topic,
} from "@/components/topic/types";
import { Box } from "@/components/ui/box";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { axiosClient } from "@/lib/axios";
import { cn, remainingTimeAsString } from "@/lib/utils";
import {
  ChatBubbleIcon,
  DrawingPinIcon,
  EyeOpenIcon,
  PaperPlaneIcon,
  Pencil2Icon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Modal Page

const FeedPage = (props: FeedPageProps) => {
  const { topicId } = props.params;
  const [isMine, setIsMine] = useState(false);
  const { data } = useSession();
  const userId = data?.user?.id;
  const router = useRouter();

  const {
    data: topicData,
    isLoading: isTopicLoading,
    isError,
  } = useQuery({
    queryKey: ["feed-body"],
    queryFn: async () =>
      await axiosClient.get("/topic/detail", {
        params: {
          topicId,
        },
      }),
  });
  const detail: Topic & (PollCardProps | EventCardProps) = topicData?.data.data;

  const { data: userVoted, isLoading: isVotedLoading } = useQuery({
    queryKey: ["topic-voted"],
    queryFn: async () =>
      await axiosClient.get("/topic/vote", { params: { topicId, userId } }),
  });
  const userVotedItem = userVoted?.data.data[0];

  console.log({ userVotedItem });

  const sortedCandidates = detail?.candidates?.sort(
    (a: CandidateItem, b: CandidateItem) => a.order - b.order,
  );

  useEffect(() => {
    if (data?.user?.id === detail?.userId) {
      setIsMine(true);
    }
  });

  const renderDate = () => {
    const { createdAt, updatedAt } = detail;
    const date =
      createdAt === updatedAt
        ? new Date(createdAt as string)
        : `수정됨 ${new Date(updatedAt as string)}`;
    return (
      <p className="tw-text-[11px] tw-text-zinc-500">
        {date.toLocaleString("ko-KR")}
      </p>
    );
  };

  const postVote = useMutation({
    mutationFn: async (data: any) => {
      return await axiosClient.post("/topic/vote", data);
    },
    onSuccess: () => {
      toast({
        title: "투표 성공!",
        description: "투표 성공!",
      });
    },
  });

  const handleLinkEdit = () => {
    router.back();
    // router.back() 이후에 추가로 코드를 실행하기 위해 setTimeout 사용
    setTimeout(() => {
      router.push(`/topic/${topicId}?edit=true`);
    }, 100); // 적절한 시간(ms)
  };

  const handleVote = (item: Partial<CandidateItem>) => {
    postVote.mutate({ topicId, candidateId: item.id, userId });
  };

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="min-h-[400px]">
        {isTopicLoading ? (
          <div className="tw-flex tw-justify-center tw-w-full">
            <Loader2 className="tw-animate-spin" />
          </div>
        ) : (
          <ScrollArea>
            <DialogHeader>
              <DialogTitle className="tw-flex tw-items-center tw-justify-start">
                <span className="tw-line-clamp-1">{detail?.title}</span>
                {isMine && (
                  // <Link
                  //   className={cn(
                  //     buttonVariants({ variant: "outline", size: "icon" }),
                  //     "tw-h-8 tw-w-8 tw-ml-2",
                  //   )}
                  //   href={`/topic/${topicId}?edit=true`}
                  // >
                  //   <Pencil2Icon />
                  // </Link>
                  <Button
                    variant="outline"
                    size={"icon"}
                    className="tw-w-8 tw-h-8 tw-ml-2"
                    onClick={handleLinkEdit}
                  >
                    <Pencil2Icon />
                  </Button>
                )}
              </DialogTitle>

              <DialogDescription className="tw-flex tw-justify-between tw-items-center">
                <div className="tw-flex tw-items-center tw-gap-4">
                  <FeedProfileArea userId={detail.userId} size="md" />
                  <span className="tw-text-xs">{renderDate()}</span>
                </div>

                <Box direction={"row"} gap={2}>
                  <div className="tw-flex tw-gap-1 tw-items-center">
                    <EyeOpenIcon />{" "}
                    <span className="tw-text-xs">{detail.view}</span>
                  </div>

                  <EndDateTimer endDate={detail.endDate as string} />
                </Box>
              </DialogDescription>
            </DialogHeader>

            <Box>
              <p>{detail.description}</p>
            </Box>
            {/* <pre>{JSON.stringify(detail, null, 2)}</pre> */}

            <Box
              // onClick vote!
              className="tw-mt-4"
            >
              {!isVotedLoading &&
                detail.candidateItemCount > 0 &&
                sortedCandidates?.map((item: CandidateItem) => (
                  <Button
                    key={item.id}
                    variant="outline"
                    onClick={(e) => handleVote(item)}
                    className={cn(
                      userVotedItem.candidateItemId === item.id &&
                        "tw-border-orange-500 tw-text-orange-500 tw-font-bold",
                      "hover:!tw-bg-white hover:!tw-text-orange-500",
                    )}
                  >
                    {item.detail}
                  </Button>
                ))}
            </Box>

            <Separator className="tw-my-4" />

            <Box>
              <Box direction={"row"} gap={2}>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="tw-w-8 tw-h-8"
                >
                  <ChatBubbleIcon />
                </Button>

                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="tw-w-8 tw-h-8"
                >
                  <DrawingPinIcon />
                </Button>

                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="tw-w-8 tw-h-8"
                >
                  <PaperPlaneIcon />
                </Button>
              </Box>
            </Box>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedPage;

const EndDateTimer = ({ endDate }: { endDate: string }) => {
  const [timer, setTimer] = useState(remainingTimeAsString(endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(remainingTimeAsString(endDate));
    });

    return () => clearInterval(interval);
  });
  return (
    <span className="tw-text-xs tw-border tw-rounded-md tw-p-1">
      {timer.days}D, {timer.hours}:{timer.minutes}:{timer.seconds}
    </span>
  );
};
