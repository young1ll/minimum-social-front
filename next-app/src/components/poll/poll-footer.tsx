"use client";

import { useEffect, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import {
  ChatBubbleIcon,
  DrawingPinIcon,
  PaperPlaneIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { cn, remainingTimeAsString } from "@/lib/utils";

type PollCardFooterProps = {
  expired: string;
};

const PollCardFooter = ({ expired }: PollCardFooterProps) => {
  const [expiredTime, setExpiredTime] = useState(
    remainingTimeAsString(expired),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setExpiredTime(remainingTimeAsString(expired));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <CardFooter className="tw-flex tw-justify-between !tw-p-4 !tw-py-2 tw-border-t">
      <div className="tw-flex tw-gap-2">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="tw-h-8 tw-w-8 tw-items-center tw-gap-2"
        >
          <DrawingPinIcon />
        </Button>

        <Button
          variant={"ghost"}
          size={"icon"}
          className="tw-h-8 tw-w-8 tw-items-center tw-gap-2"
        >
          <PaperPlaneIcon />
        </Button>

        <Button
          variant={"ghost"}
          size={"icon"}
          className="tw-h-8 tw-w-8 tw-items-center tw-gap-2"
        >
          <ChatBubbleIcon />
        </Button>
      </div>

      <div
        className={cn(
          buttonVariants({ variant: "outline" }),
          "tw-h-8 tw-w-30 tw-items-center tw-gap-2",
          "hover:tw-bg-transparent",
        )}
      >
        <TimerIcon />
        <span
          className={cn(
            expiredTime.days < 5
              ? "tw-text-red-500"
              : expiredTime.days < 10
                ? "tw-text-orange-500"
                : "",
            "tw-font-bold",
          )}
        >
          {expiredTime.days}D {expiredTime.hours}:{expiredTime.minutes}:
          {expiredTime.seconds}
        </span>
      </div>
    </CardFooter>
  );
};

export default PollCardFooter;
