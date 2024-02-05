"use client";

import { renderDate } from "@/components/topic/render-date";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/user-avatar";
import { usePostComment } from "@/lib/query/use-comment";
import { useTopicByTopicId } from "@/lib/query/use-topic";
import { useUserByUsername } from "@/lib/query/use-user";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CommentModlaPageProps {
  params: {
    username: string;
    topicId: string;
  };
}

const CommentsModalPage = (props: CommentModlaPageProps) => {
  const { params } = props;
  const { username, topicId } = params;

  const session = useSession();

  const router = useRouter();
  const [startWrite, setStartWrite] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const { data: userData } = useUserByUsername({
    username: username as string,
  });
  const { data: topicData } = useTopicByTopicId({ topicId: topicId as string });

  const { mutate, isPending } = usePostComment();
  const handleSubmitComment = () => {
    mutate();
  };

  useEffect(() => {
    if (commentValue.length > 5) {
      setStartWrite(true);
    } else {
      setStartWrite(false);
    }
  }, [commentValue.length]);

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="!tw-gap-0">
        <Box direction={"row"} gap={4} className="tw-mt-4 tw-items-start">
          <UserAvatar
            username={decodeURIComponent(username)}
            profileImage={userData?.profileImage}
            routeUserPage={false}
          />
          <Box>
            <Box
              direction={"row"}
              className="tw-flex-1 tw-justify-between tw-items-center tw-text-sm"
            >
              <Box direction={"row"} className="tw-items-center">
                <span className="tw-font-bold">{userData?.username}</span>
                <span className="tw-text-xs tw-text-zinc-500">
                  {userData?.email}
                </span>
              </Box>

              <span className="tw-text-xs tw-text-zinc-500">
                {renderDate({
                  createdAt: topicData?.createdAt,
                  updatedAt: topicData?.updatedAt,
                })}
              </span>
            </Box>
            <span className="tw-text-sm">{topicData?.title}</span>
          </Box>
        </Box>

        <Separator className="tw-my-4" />

        <Box gap={4}>
          <Box direction={"row"} gap={4}>
            <UserAvatar
              username={session.data?.user?.username}
              profileImage={session.data?.user?.profileImage}
              routeUserPage={false}
            />
            <Textarea
              className={cn("tw-resize-none", "tw-border-none !tw-p-0")}
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Write a comment..."
            />
          </Box>

          <Button
            variant={"default"}
            className="tw-w-full !tw-bg-orange-300 hover:!tw-bg-orange-500 tw-gap-2 tw-h-8"
            disabled={!startWrite}
            onClick={handleSubmitComment}
          >
            {isPending ? <Loader2 className="tw-animate-spin" /> : "Comment"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModalPage;
