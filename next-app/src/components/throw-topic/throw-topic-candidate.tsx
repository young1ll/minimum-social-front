import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ThrowTopicActionType, ThrowTopicState } from "./throw-topic";
import { CandidateItem } from "@/types/topic";
import { toast } from "../ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Box } from "../ui/box";
import { Input } from "../ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

const CandidateArea = ({
  open,
  isModal = true,
  setOpen,
  startTopic,
  isPending,
  state,
  dispatch,
  throwTopic,
}: {
  open: boolean;
  isModal: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  startTopic: boolean;
  isPending: boolean;
  state: ThrowTopicState;
  dispatch: Dispatch<ThrowTopicActionType>;

  throwTopic: () => void;
}) => {
  const [processing, setProcessing] = useState(0);

  const sortedCandidates = state.candidateItems.sort(
    (a: Partial<CandidateItem>, b: Partial<CandidateItem>) =>
      (a?.order ?? 0) - (b?.order ?? 0),
  );

  const handleInputChange = (index: number, value: string) => {
    dispatch({ type: "updateCandidate", index, value });
  };

  const handleAddCandidate = () => {
    if (state.candidateItems.length >= 5) {
      toast({
        title: "Max 5 Options",
        variant: "destructive",
        description: "선택지는 최대 5개만 추가할 수 있습니다!",
      });
      return false;
    }
    dispatch({
      type: "addCandidate",
      item: { detail: "", order: state.candidateItems.length + 1 },
    });
  };

  const handleRemoveCandidate = (index: number) => {
    if (state.candidateItems.length <= 2) {
      toast({
        title: "Min 2 Options",
        variant: "destructive",
        description: "선택지는 최소한 2개이상 존재해야만 합니다!",
      });
      return false;
    }
    dispatch({ type: "removeCandidate", index });
  };

  const handleSubmitCandidates = () => {
    const nullItems = state.candidateItems.filter(
      (item: Partial<CandidateItem>) => item.detail == "",
    );

    if (nullItems.length > 0) {
      toast({
        title: "Empty Option",
        variant: "destructive",
        description: "빈 선택지는 추가할 수 없습니다.",
      });
    } else {
      throwTopic();
    }

    console.log(state.candidateItems);
  };

  const handleSubmitProcessing = () => {
    if (processing === 0) {
      setProcessing(1);
    } else if (processing === 1) {
      handleSubmitCandidates();
    }
  };

  useEffect(() => {
    if (!open) {
      setProcessing(0);
    }
  }, [open]);

  return isModal ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={!startTopic}
        // onClick={handleThrow}
        className={cn(
          buttonVariants({ variant: "default" }),
          "!tw-bg-orange-300 hover:!tw-bg-orange-500 tw-gap-2 tw-h-8 tw-w-[100px]",
        )}
      >
        {isPending ? <Loader2 className="tw-animate-spin" /> : "Throw"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Topic Options</DialogHeader>
        <Box>
          {sortedCandidates.map(
            (candidate: Partial<CandidateItem>, index: number) => (
              <div
                key={index}
                className="tw-relative tw-flex tw-gap-2 tw-items-center"
              >
                <span className="tw-text-sm">{candidate.order}</span>
                <Input
                  key={index}
                  value={candidate.detail}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <Button
                  variant="destructive"
                  size={"icon"}
                  className={cn(
                    "tw-absolute tw-right-2 tw-top-1/2",
                    "-tw-translate-y-1/2",
                    "tw-h-6 tw-w-6 tw-p-1",
                    sortedCandidates.length <= 2
                      ? "tw-opacity-0"
                      : "tw-opacity-100",
                  )}
                  onClick={() => handleRemoveCandidate(index)}
                >
                  <Cross2Icon />
                </Button>
              </div>
            ),
          )}

          <Separator className="tw-my-4" />
          <Button variant={"outline"} onClick={handleAddCandidate}>
            Add Options
          </Button>
        </Box>
        <DialogFooter>
          <Button variant={"default"} onClick={handleSubmitCandidates}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Box className="tw-w-full">
      <Separator className="tw-my-4" />

      <Box
        className={cn(
          "tw-my-2 tw-transition-all",
          processing === 0 ? "tw-hidden tw-h-0" : "tw-flex tw-h-full",
        )}
      >
        {sortedCandidates.map(
          (candidate: Partial<CandidateItem>, index: number) => (
            <div
              key={index}
              className="tw-relative tw-flex tw-gap-2 tw-items-center"
            >
              <span className="tw-text-sm">{candidate.order}</span>
              <Input
                key={index}
                value={candidate.detail}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <Button
                variant="destructive"
                size={"icon"}
                className={cn(
                  "tw-absolute tw-right-2 tw-top-1/2",
                  "-tw-translate-y-1/2",
                  "tw-h-6 tw-w-6 tw-p-1",
                  sortedCandidates.length <= 2
                    ? "tw-opacity-0"
                    : "tw-opacity-100",
                )}
                onClick={() => handleRemoveCandidate(index)}
              >
                <Cross2Icon />
              </Button>
            </div>
          ),
        )}

        <Button
          variant={"outline"}
          className="tw-h-8 tw-mt-4"
          onClick={handleAddCandidate}
        >
          Add Options
        </Button>
      </Box>

      <Button
        variant={"default"}
        className="tw-w-full !tw-bg-orange-300 hover:!tw-bg-orange-500 tw-gap-2 tw-h-8"
        disabled={!startTopic}
        onClick={handleSubmitProcessing}
      >
        {isPending ? <Loader2 className="tw-animate-spin" /> : "Throw"}
      </Button>
    </Box>
  );
};

export default CandidateArea;
