"use client";

import { Dispatch, HTMLAttributes, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { ThrowTopicActionType, ThrowTopicState } from "./throw-topic";
import { DateRange } from "react-day-picker";

interface DateRangeProps {
  state: ThrowTopicState;
  dispatch: Dispatch<ThrowTopicActionType>;
}

const ThrowDateRangePicker = ({
  state,
  dispatch,
  className,
}: DateRangeProps & HTMLAttributes<HTMLDivElement>) => {
  const [dateRange, setDateRange] = useState(state.date);

  useEffect(() => {
    if (dateRange) {
      dispatch({ type: "set", payload: { date: dateRange } });
    }
  }, [dateRange]);

  return (
    <div className={cn("tw-grid tw-gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "tw-justify-start tw-h-8",
              "tw-text-xs",
              !dateRange && "tw-text-muted-foreground",
            )}
          >
            <CalendarIcon className="tw-mr-2 tw-h-4 tw-w-4" />
            {dateRange?.from ? (
              dateRange?.to ? (
                <>
                  {format(dateRange.from, "yyyy-MM-dd")} -{" "}
                  {format(dateRange.to, "yyyy-MM-dd")}
                </>
              ) : (
                <>{format(dateRange.from!, "yyyy-MM-dd")}</>
              )
            ) : (
              <span>Select Date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="tw-w-auto !tw-p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            classNames={{
              nav_button: cn("tw-p-0 tw-text-zinc-500 hover:tw-text-zinc-900"),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThrowDateRangePicker;
