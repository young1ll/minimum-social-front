import React, { HTMLAttributes, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { addDays, format } from "date-fns";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";

interface DateRangeProps {
  date: DateRange | undefined;
  setDate: SelectRangeEventHandler;
}

const ThrowDateRangePicker = ({
  date,
  setDate,
  className,
}: DateRangeProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("tw-grid tw-gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "tw-justify-start tw-h-8",
              !date && "tw-text-muted-foreground",
            )}
          >
            <CalendarIcon className="tw-mr-2 tw-h-4 tw-w-4" />
            {date?.from ? (
              date?.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} -{" "}
                  {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
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
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThrowDateRangePicker;
