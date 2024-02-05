"use client";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  ChatBubbleIcon,
  DrawingPinIcon,
  HeartIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TopicFnsAreaProps {
  topicId: string;
}

const TopicFnsArea = (props: TopicFnsAreaProps) => {
  const { topicId } = props;
  const router = useRouter();
  const pathname = usePathname();

  const [currUrl, setCurrUrl] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isHeart, setIsHeart] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setCurrUrl(window.location.href);
  }, []);

  const queryClient = useQueryClient();
  const topicData: any = queryClient.getQueryData(["topics", topicId]);

  const buttonList = [
    {
      id: "comment",
      content: (
        <>
          <ChatBubbleIcon className="tw-h-5 tw-w-5" />
          <span className="tw-ml-2">{topicData?.commentCount || 0}</span>
        </>
      ),
      onClick: () => {
        router.push(`${pathname}/comments`);
      },
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
      id: "copy",
      content: <Share1Icon className="tw-h-5 tw-w-5" />,
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(currUrl);

          toast({
            title: "Copied",
            description: "URL was copied to clipboard",
          });
        } catch (error) {}
      },
    },
  ];

  return (
    <>
      <div className="tw-border-y tw-flex tw-justify-between">
        <TooltipProvider>
          {buttonList.map((button, index) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  key={button.id}
                  variant={"ghost"}
                  size={"icon"}
                  className={cn(
                    "tw-w-full tw-rounded-none tw-text-zinc-500",
                    index < buttonList.length - 1 && "tw-border-r",
                  )}
                  onClick={button.onClick}
                >
                  {button.content}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white"
              >
                {button.id.charAt(0).toUpperCase() + button.id.slice(1)}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </>
  );
};

export default TopicFnsArea;
