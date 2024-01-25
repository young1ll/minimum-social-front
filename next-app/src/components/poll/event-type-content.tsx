import React from "react";
import { Box } from "../ui/box";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn, formatDateIntl } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface EventTypeContentProps {
  id: string;
  eventTitle: string;
  description: string;
  event_date: string;
}
const EventTypeContent = ({
  id,
  eventTitle,
  description,
  event_date,
}: EventTypeContentProps) => {
  // TODO: onclick
  return (
    <Box
      direction={"column"}
      gap={2}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "tw-w-full tw-h-full !tw-justify-start !tw-items-start",
      )}
    >
      <Box
        direction={"row"}
        className="tw-w-full tw-font-semibold tw-justify-between tw-items-center"
      >
        <Box direction={"row"} gap={2}>
          <CalendarIcon className="tw-m-0.5" />
          <h2>{eventTitle}</h2>
        </Box>

        <span
          className={cn(
            buttonVariants({ variant: "outline" }),
            "tw-font-semibold",
          )}
        >
          {formatDateIntl("ko", event_date, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </Box>

      <p className="tw-pb-2">{description}</p>
    </Box>
  );
};

export default EventTypeContent;
