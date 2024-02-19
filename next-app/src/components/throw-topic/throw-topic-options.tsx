"use client";

import { useQuery } from "@tanstack/react-query";
import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { ImageIcon, PersonIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { ThrowTopicActionType, ThrowTopicState } from "./throw-topic";

interface ThrowTopicOptionsAreaProps {
  userId: string;
  state: ThrowTopicState;
  dispatch: Dispatch<ThrowTopicActionType>;
}

const ThrowTopicOptionsArea = (
  props: ThrowTopicOptionsAreaProps & HTMLAttributes<HTMLDivElement>,
) => {
  const { userId, state, dispatch, className, ...rest } = props;
  // const [candidateId, setCandidateId] = useState<string>();
  const [castingVoteInput, setCastingVoteInput] = useState<string>(
    state.castingVote,
  );

  const { data: usernameUser } = useQuery({
    queryKey: ["castingVoteUser"],
    queryFn: async () => {
      const data = await fetch(`/user?username=${state.castingVote}`);
      return data.json();
    },
  });

  const optionList = [
    {
      id: "secret-vote",
      name: "Secret Vote",
      checked: state.isSecretVote,
      onChange: () =>
        dispatch({
          type: "set",
          payload: { isSecretVote: !state.isSecretVote },
        }),
    },
    {
      id: "result-open",
      name: "Result Open",
      checked: state.resultOpen,
      onChange: () =>
        dispatch({
          type: "set",
          payload: { isSecretVote: !state.resultOpen },
        }),
    },
    {
      id: "multi-choice",
      name: "Multi Choice",
      checked: state.isMultiChoice,
      onChange: () =>
        dispatch({
          type: "set",
          payload: { isSecretVote: !state.isMultiChoice },
        }),
    },
  ];

  return (
    <div
      className={cn("tw-w-full tw-flex tw-justify-between", className)}
      {...rest}
    >
      <div className="tw-flex tw-gap-4">
        {optionList.map((option) => (
          <div
            key={option.name}
            className="tw-flex tw-items-center tw-space-x-2"
          >
            <Checkbox
              id={option.id}
              checked={option.checked}
              onCheckedChange={option.onChange}
            />
            <label
              htmlFor={option.id}
              className="tw-text-sm tw-font-medium tw-leading-none"
            >
              {option.name}
            </label>
          </div>
        ))}

        {state.type === "event" && (
          <>
            {/* TODO: Event Date, Event Location */}
            <div className="tw-flex tw-items-center tw-space-x-2">
              <label
                htmlFor="event-date"
                className="tw-text-sm tw-font-medium tw-leading-none"
              >
                Event Date
              </label>
            </div>

            <div className="tw-flex tw-items-center tw-space-x-2">
              <label
                htmlFor="event-location"
                className="tw-text-sm tw-font-medium tw-leading-none"
              >
                Event Location
              </label>
            </div>
          </>
        )}
      </div>

      <div className="tw-flex tw-items-center tw-space-x-2">
        {/* TODO: S3 Upload */}
        <Button
          variant={"outline"}
          className={cn(
            "tw-h-8 tw-w-8",
            "tw-border-orange-400 tw-text-orange-400",
            "hover:tw-border-orange-500 hover:tw-text-orange-500",
            "!tw-p-1",
          )}
        >
          <ImageIcon className="tw-h-6 tw-w-6" />
        </Button>

        <Dialog>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <DialogTrigger>
                <TooltipTrigger
                  asChild
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "tw-h-8 tw-w-8 tw-p-1",
                    state.castingVote
                      ? "tw-border-orange-400 tw-text-orange-400 hover:tw-border-orange-500 hover:tw-text-orange-500"
                      : "tw-border-zinc-400 tw-text-zinc-400 hover:tw-border-zinc-500 hover:tw-text-zinc-500",
                  )}
                >
                  <PersonIcon />
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white">
                Final Decision Maker
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Final Decision Maker</DialogTitle>
            </DialogHeader>
            <div>
              <Input
                value={castingVoteInput}
                onChange={(e) => setCastingVoteInput(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant={"default"}
                className="!tw-bg-orange-300 hover:!tw-bg-orange-500 "
                onClick={() =>
                  dispatch({
                    type: "set",
                    payload: { castingVote: castingVoteInput },
                  })
                }
                disabled={!usernameUser}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ThrowTopicOptionsArea;
