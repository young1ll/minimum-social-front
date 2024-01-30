"use client";
import { FeedPageProps } from "@/app/(protected)/feeds/[topicId]/page";
import { FeedProfileArea } from "@/components/topic/single-feed";
import { CandidateItem, Topic } from "@/components/topic/types";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// Modal Page

const FeedPage = (props: FeedPageProps) => {
  const { topicId } = props.params;
  const router = useRouter();

  const {
    data: topicData,
    isLoading,
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
  const detail: Topic = topicData?.data.data;

  const sortedCandidates = detail?.candidates?.sort(
    (a: CandidateItem, b: CandidateItem) => a.order - b.order,
  );

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="min-h-[400px]">
        {isLoading ? (
          <div className="tw-flex tw-justify-center tw-w-full">
            <Loader2 className="tw-animate-spin" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{detail.title}</DialogTitle>
              <DialogDescription>
                <FeedProfileArea userId={detail.userId} size="md" />
              </DialogDescription>
            </DialogHeader>

            <Box>
              <pre>{JSON.stringify(detail, null, 2)}</pre>

              {detail.candidateItemCount > 0 &&
                sortedCandidates?.map((item: CandidateItem) => (
                  <p key={item.id}>{item.order}</p>
                ))}
            </Box>

            <DialogFooter>asdlfkj</DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedPage;
