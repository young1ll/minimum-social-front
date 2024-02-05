"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  CrossCircledIcon,
  Crosshair1Icon,
  DotsHorizontalIcon,
  GearIcon,
  Pencil2Icon,
  PlusCircledIcon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface TopicMoreButtonProps {
  userId: string;
  topicId: string;
  ownerId: string;
  ownerUsername: string;
}

const TopicMoreButton = (
  props: TopicMoreButtonProps & React.HTMLAttributes<HTMLButtonElement>,
) => {
  const { userId, topicId, ownerId, ownerUsername, className } = props;
  const router = useRouter();

  const moreButtonsForUser = [
    {
      name: `Share this topic`,
      icon: Share1Icon,
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(`/${ownerUsername}/${topicId}`);

          toast({
            title: "Copied",
            description: "URL was copied to clipboard",
          });
        } catch (error) {}
      },
    },
    {
      name: `Follow ${ownerUsername}`,
      icon: PlusCircledIcon,
      onClick: () => {},
    },
    {
      name: `Block ${ownerUsername}`,
      icon: CrossCircledIcon,
      onClick: () => {},
    },
    {
      name: `Report this topic`,
      icon: Crosshair1Icon,
      onClick: () => {},
    },
  ];
  const moreButtonsForOwner = [
    {
      name: `Share this topic`,
      icon: Share1Icon,
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(`/${ownerUsername}/${topicId}`);

          toast({
            title: "Copied",
            description: "URL was copied to clipboard",
          });
        } catch (error) {}
      },
    },
    {
      name: `Edit this topic`,
      icon: Pencil2Icon,
      onClick: () => {
        router.push(`/${ownerUsername}/${topicId}/edit`);
      },
    },
    {
      name: `Delete this topic`,
      icon: TrashIcon,
      onClick: () => {},
    },
  ];

  return (
    <TooltipProvider>
      <Popover>
        <Tooltip delayDuration={200}>
          <PopoverTrigger
            className={cn(
              "tw-p-2 tw-h-8 tw-w-8 tw-z-20",
              "tw-text-zinc-500",
              "tw-flex tw-justify-center tw-items-center",
              "tw-rounded-full tw-border tw-border-transparent",
              "hover:tw-text-primary hover:tw-bg-background hover:tw-border-zinc-800",
              "tw-transition-all",
              className,
            )}
          >
            <TooltipTrigger asChild>
              {userId === ownerId ? (
                <GearIcon className="tw-w-6 tw-h-6" />
              ) : (
                <DotsHorizontalIcon className="tw-w-6 tw-h-6" />
              )}
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent
            side="top"
            className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white"
          >
            More about this topic
          </TooltipContent>
        </Tooltip>
        <PopoverContent side="bottom" align="end" className="!tw-p-0 tw-w-full">
          <Box className="tw-w-[180px]">
            {userId === ownerId
              ? moreButtonsForOwner.map((item) => (
                  <Button
                    key={item.name}
                    variant={"ghost"}
                    className="tw-h-9 tw-flex !tw-justify-start tw-items-center tw-gap-2 tw-text-sm"
                    onClick={item.onClick}
                  >
                    {<item.icon className="tw-w-4 tw-h-4" />}
                    <span className="tw-w-full tw-text-start tw-line-clamp-1">
                      {item.name}
                    </span>
                  </Button>
                ))
              : moreButtonsForUser.map((item) => (
                  <Button
                    key={item.name}
                    variant={"ghost"}
                    className="tw-h-9 tw-flex !tw-justify-start tw-items-center tw-gap-2 tw-text-sm"
                    onClick={item.onClick}
                  >
                    {<item.icon className="tw-w-4 tw-h-4" />}
                    <span className="tw-w-full tw-text-start tw-line-clamp-1">
                      {item.name}
                    </span>
                  </Button>
                ))}
          </Box>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default TopicMoreButton;
