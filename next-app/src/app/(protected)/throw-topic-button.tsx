"use client";

import ThrowTopic from "@/components/throw-topic/throw-topic";
import { Box } from "@/components/ui/box";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Pencil1Icon } from "@radix-ui/react-icons";

interface ThrowTopicButtonProps {}

const ThrowTopicButton = (
  props: ThrowTopicButtonProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { className } = props;
  return (
    <div
      className={cn(
        "tw-flex tw-grow tw-items-center  tw-justify-center",
        "tw-min-w-[32px] tw-p-4",
        className,
      )}
    >
      <Dialog>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DialogTrigger
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                }),
                "!tw-rounded-full",
                "tw-w-12 tw-h-12",
                "tw-border-none",
                "tw-bg-orange-500 tw-text-white",
                "hover:tw-bg-orange-600 hover:tw-text-white",
                "tw-p-2",
              )}
            >
              <Pencil1Icon className="tw-h-full tw-w-full" />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white"
          >
            Throw New Topic
          </TooltipContent>
          <DialogContent className="!tw-py-12 !tw-px-4">
            <div className="tw-flex tw-box-border tw-w-full">
              <ThrowTopic className="tw-w-full" isCandidateMoal={false} />
            </div>
          </DialogContent>
        </Tooltip>
      </Dialog>
    </div>
  );
};

export default ThrowTopicButton;
