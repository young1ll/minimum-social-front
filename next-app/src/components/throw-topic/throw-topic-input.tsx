"use client";
import { cn } from "@/lib/utils";
import { ThrowTopicActionType, ThrowTopicState } from "./throw-topic";
import { Dispatch, useEffect, useState } from "react";
import { Input } from "../ui/input";

interface ThrowTopicAreaProps {
  state: ThrowTopicState;
  dispatch: Dispatch<ThrowTopicActionType>;
}

const ThrowTopicInputArea = (
  props: ThrowTopicAreaProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { state, dispatch, className, ...rest } = props;
  const [startWrite, setStartWrite] = useState(false);

  useEffect(() => {
    if (state.title.length > 0) {
      setStartWrite(true);
    } else {
      setStartWrite(false);
    }
  });
  return (
    <div className={cn("tw-relative tw-w-full", className)} {...rest}>
      <Input
        placeholder="Throw new topic!"
        value={state.title}
        maxLength={50}
        onChange={(e) =>
          dispatch({ type: "set", payload: { title: e.target.value } })
        }
      />
      <span
        className={cn(
          "tw-absolute tw-top-0 tw-right-4 tw-translate-y-1/2",
          "tw-text-sm tw-text-secondary-foreground",
          "tw-transition-all tw-duration-300",
          startWrite ? "tw-opacity-100 tw-text-primary" : "tw-opacity-0",
        )}
      >
        {state.title.length}/{50}
      </span>
    </div>
  );
};

export default ThrowTopicInputArea;
