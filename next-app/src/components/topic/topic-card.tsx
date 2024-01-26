"use client";

import { Card, CardContent, CardFooter } from "../ui/card";

import { cn, formatDateIntl, remainingTimeAsString } from "@/lib/utils";
import PollCardHeader from "./poll-header";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Box } from "../ui/box";
import EventTypeContent from "./event-type-content";
import PollTypeContent from "./poll-type-content";
import VersusTypeContent from "./versus-type-content";
import { HTMLAttributes } from "react";
import { Topic } from "./types";
import TopicCardFooter from "./topic-footer";

const TopicCard = ({
  className,
  ...rest
}: Topic & HTMLAttributes<HTMLDivElement>) => {
  const { id, type, createdAt, endDate } = rest;
  return (
    <Card className={cn("tw-w-full tw-h-fit", className)}>
      <PollCardHeader authorId={id} createdAt={createdAt} />

      <CardContent className="tw-w-full !tw-p-4 tw-space-y-2">
        {/* <Separator className="tw-my-2" /> */}
      </CardContent>

      <TopicCardFooter expired={endDate} />
    </Card>
  );
};

export default TopicCard;
