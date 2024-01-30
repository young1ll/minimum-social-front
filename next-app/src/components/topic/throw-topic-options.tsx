import { axiosClient } from "@/lib/axios";
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
import { PersonIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";

interface ThrowTopicOptionsAreaProps {
  userId: string;
  isSecretVote: boolean;
  setIsSecretVote: Dispatch<SetStateAction<boolean>>;

  isResultOpen: boolean;
  setIsResultOpen: Dispatch<SetStateAction<boolean>>;

  castingVote: string;
  setCastingVote: Dispatch<SetStateAction<string>>;

  isMultiChoice: boolean;
  setIsMultiChoice: Dispatch<SetStateAction<boolean>>;

  type: "poll" | "event" | string;
}

const ThrowTopicOptionsArea = ({
  className,
  userId,
  isSecretVote,
  setIsSecretVote,
  isResultOpen,
  setIsResultOpen,
  castingVote,
  setCastingVote,
  isMultiChoice,
  setIsMultiChoice,
  type,
}: ThrowTopicOptionsAreaProps & HTMLAttributes<HTMLDivElement>) => {
  const [candidateId, setCandidateId] = useState<string>(userId); // TODO: 최종 결정자 생성

  const { data: idUser } = useQuery({
    queryKey: ["castingVoteUser"],
    queryFn: () =>
      axiosClient.get("/user", {
        params: {
          id: candidateId,
        },
      }),
    enabled: false,
  });

  const [castingVoteInputValue, setCastingVoteInputValue] = useState<string>(
    idUser?.data.username,
  );
  const { data: usernameUser } = useQuery({
    queryKey: ["castingVoteUser"],
    queryFn: () =>
      axiosClient.get("/user", {
        params: {
          username: castingVoteInputValue,
        },
      }),
  });

  return (
    <div className={cn("tw-w-full tw-flex tw-justify-between", className)}>
      <div className="tw-flex tw-gap-4">
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Checkbox
            id={"secret-vote"}
            checked={isSecretVote}
            onCheckedChange={() => setIsSecretVote(!isSecretVote)}
          />
          <label
            htmlFor="secret-vote"
            className="tw-text-sm tw-font-medium tw-leading-none"
          >
            Secret Vote
          </label>
        </div>

        <div className="tw-flex tw-items-center tw-space-x-2">
          <Checkbox
            id={"result-open"}
            checked={isResultOpen}
            onCheckedChange={() => setIsResultOpen(!isResultOpen)}
          />
          <label
            htmlFor="result-open"
            className="tw-text-sm tw-font-medium tw-leading-none"
          >
            Result Open
          </label>
        </div>

        <div className="tw-flex tw-items-center tw-space-x-2">
          <Checkbox
            id={"multi-choice"}
            checked={isMultiChoice}
            onCheckedChange={() => setIsMultiChoice(!isMultiChoice)}
          />
          <label
            htmlFor="multi-choice"
            className="tw-text-sm tw-font-medium tw-leading-none"
          >
            Multiple Selection
          </label>
        </div>

        {type === "event" && (
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
        <Dialog>
          <TooltipProvider>
            <Tooltip>
              <DialogTrigger>
                <TooltipTrigger
                  asChild
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "tw-h-8 tw-w-8 tw-p-1",
                  )}
                >
                  <PersonIcon />
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>Final Decision Maker</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Final Decision Maker</DialogTitle>
            </DialogHeader>
            <div>
              <Input
                value={castingVoteInputValue}
                onChange={(e) => setCastingVoteInputValue(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant={"default"}
                className="!tw-bg-orange-300 hover:!tw-bg-orange-500 "
                onClick={() => setCastingVote(usernameUser?.data.id)}
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
