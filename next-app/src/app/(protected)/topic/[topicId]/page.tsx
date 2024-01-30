"use client";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export interface FeedPageProps {
  params: { topicId: string };
  searchParams: { edit?: string };
}

const TopicPage = (props: FeedPageProps) => {
  const { topicId } = props.params;
  const { edit } = props.searchParams;

  const { data: session } = useSession();

  const { data, isLoading: isTopicLoading } = useQuery({
    queryKey: ["topic"],
    queryFn: async () =>
      await axiosClient.get("/topic/detail", { params: { topicId } }),
  });

  const topicData = data?.data.data;
  const user = session?.user;

  useEffect(() => {
    if (topicData?.userId !== user?.id) {
      redirect("/feeds");
    }
  });

  return (
    <Container>
      {isTopicLoading ? (
        <div className="tw-flex tw-justify-center tw-w-full">
          <Loader2 className="tw-animate-spin" />
        </div>
      ) : (
        <Card className="tw-w-full tw-p-2">
          <h2 className="tw-text-xl">{topicData?.title}</h2>
          <Box direction={"row"}>
            <p className="tw-text-sm">
              {new Date(topicData.createdAt).toLocaleString("ko-KR")}
            </p>
          </Box>

          <Box>
            <p>{topicData?.description}</p>
          </Box>

          <Box className="tw-mt-4">
            {topicData.candidates.map((item: any) => (
              <Button variant={"outline"} key={item.id}>
                {item.detail}
              </Button>
            ))}
          </Box>
        </Card>
      )}
    </Container>
  );
};

export default TopicPage;
