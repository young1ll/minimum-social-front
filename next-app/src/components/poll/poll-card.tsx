"use client";

import { Card, CardContent, CardFooter } from "../ui/card";

import { cn, formatDateIntl, remainingTimeAsString } from "@/lib/utils";
import PollCardHeader from "./poll-header";
import { Separator } from "../ui/separator";
import PollCardFooter from "./poll-footer";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Box } from "../ui/box";
import EventTypeContent from "./event-type-content";
import PollTypeContent from "./poll-type-content";
import VersusTypeContent from "./versus-type-content";
import { HTMLAttributes } from "react";

type Topic = {
  id: string;
  authorId: string;
  description: string;
  type: "event" | "poll" | "versus";
  allowDupl: boolean; // 중복 허용
  allowAnon: boolean; // 익명 허용
  expired: string;
  createdAt: string;
  updatedAt: string;
};
type Event = {
  eventTitle: string;
  eventDate: string;
};

export interface PollCardProps {
  topic: Topic;
  media?: {
    url: string;
    alt: string;
    type: string;
  };
  versusId?: string[];
  event?: Event;
}

const PollCard = ({
  topic,
  event,
  media,
  versusId,
  className,
}: PollCardProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className={cn("tw-w-full tw-h-fit", className)}>
      <PollCardHeader authorId={topic.id} createdAt={topic.createdAt} />

      <CardContent className="tw-w-full !tw-p-4 tw-space-y-2">
        {/* <Separator className="tw-my-2" /> */}

        {topic.type === "poll" ? (
          <PollTypeContent
            id={topic.id}
            description={topic.description}
            media={media}
          />
        ) : topic.type === "versus" ? (
          <VersusTypeContent
            id={topic.id}
            media={media}
            description={topic.description}
            versusId={versusId!}
          />
        ) : (
          <EventTypeContent
            id={topic.id}
            eventTitle={event?.eventTitle!}
            description={topic.description}
            event_date={event?.eventDate!}
          />
        )}
      </CardContent>

      <PollCardFooter expired={topic.expired} />
    </Card>
  );
};

export default PollCard;
