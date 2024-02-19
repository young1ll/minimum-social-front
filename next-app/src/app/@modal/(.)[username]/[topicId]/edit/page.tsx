"use client";

import LoadingCircle from "@/components/loading-circle";
import {
  ThrowTopicActionType,
  ThrowTopicState,
  reducer,
} from "@/components/throw-topic/throw-topic";
import ThrowTopicInputArea from "@/components/throw-topic/throw-topic-input";
import ThrowTopicOptionsArea from "@/components/throw-topic/throw-topic-options";
import ThrowTopicSelectsArea from "@/components/throw-topic/throw-topic-selects";
import ThrowTopicTextarea from "@/components/throw-topic/throw-topic-textarea";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { CandidateItem } from "@/types/topic";
import UserAvatar from "@/components/user-avatar";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import Image from "next/image";
import { Dispatch, useEffect, useReducer } from "react";
import { useTopicByTopicId, useUpdateTopic } from "@/lib/query/use-topic";
import { useUpdateCandidate } from "@/lib/query/use-candidate";
import { useUserByUsername } from "@/lib/query/use-user";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import isEqual from "lodash/isEqual";

const initialState: ThrowTopicState = {
  title: "",
  description: "",
  // media: {
  //   src: "",
  //   alt: "",
  // },
  status: "pending",
  type: "poll",
  date: {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  isSecretVote: true,
  resultOpen: true,
  castingVote: "",
  isMultiChoice: false,
  eventDate: "",
  eventLocation: "",
  candidateItems: [],
};

interface TopicEditModalPageProps {
  params: {
    username: string;
    topicId: string;
  };
}

const TopicEditModalPage = (props: TopicEditModalPageProps) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const router = useRouter();

  const { data: userData } = useUserByUsername({
    username: props.params.username,
  });
  const {
    data: topicData,
    isFetched,
    refetch,
  } = useTopicByTopicId({
    topicId: props.params.topicId as string,
  });

  const { mutate: topicMutate } = useUpdateTopic();
  const { mutate: candidateMutate } = useUpdateCandidate();

  const [state, dispatch]: [ThrowTopicState, Dispatch<ThrowTopicActionType>] =
    useReducer(reducer, initialState);

  useEffect(() => {
    if (isFetched && topicData) {
      const updatedInitialState: ThrowTopicState = {
        title: topicData?.title,
        description: topicData?.description,
        status: topicData?.status,
        type: topicData?.type,
        date: {
          from: new Date(topicData?.startDate),
          to: new Date(topicData?.endDate),
        },
        isSecretVote: topicData?.isSecretVote,
        resultOpen: topicData?.resultOpen,
        castingVote: topicData?.castingVote,
        isMultiChoice: topicData?.isMultiChoice,
        eventDate: topicData?.eventDate || "",
        eventLocation: topicData?.eventLocation || "",
        candidateItems: topicData?.candidates,
      };

      dispatch({ type: "set", payload: updatedInitialState });
    }
  }, [isFetched]);

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

  const handleEditSubmit = () => {
    const { candidateItems, date, eventDate, eventLocation, ...restState } =
      state;

    const topicStates = {
      candidates: candidateItems,
      candidateItemCount: candidateItems.length,
      startDate: date?.from?.toString(),
      endDate: date?.to?.toString(),
      ...(state.type === "event" && {
        eventDate: eventDate.toString(),
        eventLocation,
      }),
      ...topicData,
      ...restState,
    };

    const { candidates: topicCandidates, ...restTopicData } = topicData;
    const { candidates: stateCandidates, ...restTopicStates } = topicStates;

    // 0 모든 데이터 비교
    if (isEqual(topicData, topicStates)) {
      router.back(); // nothing to do(종료)
    } else {
      console.log({ restTopicData, restTopicStates });
      console.log({ topicCandidates, stateCandidates });
      console.log({ state });

      // 1 선택지 외 데이터 비교(Topic)
      if (!isEqual(restTopicData, restTopicStates)) {
        const { id: topicId, ...restTopicState } = restTopicStates;

        const putTopicData = {
          topicId,
          ...restTopicState,
        };
        // "isMultiChoice must be a number conforming to the specified constraints,
        // startDate must be a Date instance, endDate must be a Date instance"

        topicMutate(putTopicData, {
          onSuccess: (data) => {
            console.log({ data });
          },
          onError: (error) => {
            toast({
              title: "Error",
              variant: "destructive",
              description: error.message,
            });
          },
        });
      }

      // 2 선택지 비교(Candidates)
      if (isEqual(topicCandidates, stateCandidates)) {
        candidateMutate(
          { candidates: state.candidateItems },
          {
            onSuccess: async (data) => {
              console.log({ data });
            },
            onError: (error) => {
              toast({
                title: "Error",
                variant: "destructive",
                description: error.message,
              });
            },
          },
        );
      }
    }

    toast({ title: "Success", description: "Topic is updated." });
    refetch();

    // router.back();
  };

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent
        className={cn("!tw-gap-0", "tw-h-4/5", "!tw-p-2 !tw-pt-6")}
      >
        <ScrollArea className={cn("tw-relative", "tw-h-full")}>
          {/* <pre>{JSON.stringify(state, null, 2)}</pre>
          <pre>{JSON.stringify(topicData, null, 2)}</pre> */}

          {!isFetched ? (
            <Box gap={4} className={cn("tw-px-4")}>
              <LoadingCircle />
            </Box>
          ) : (
            <Box gap={4} className={cn("tw-px-4")}>
              <Box direction={"row"} gap={2} className="tw-items-center">
                <UserAvatar
                  username={userData?.username}
                  profileImage={userData?.profileImage}
                />

                <Box direction={"row"} gap={2} className="tw-items-center">
                  <span className="tw-font-bold tw-text-base">
                    {userData?.username}
                  </span>
                  <span className="tw-text-xs tw-text-zinc-500">
                    {userData?.email}
                  </span>
                </Box>
              </Box>

              <ThrowTopicInputArea state={state} dispatch={dispatch} />

              <Box className="tw-border tw-rounded-md">
                {/* {state.media && (
                <Image src={state.media.src} alt={state.media.alt} width={460} height={320} />
              )} */}
                <ThrowTopicTextarea
                  state={state}
                  dispatch={dispatch}
                  startWrite
                  textareaProps={{ className: "tw-border-none !tw-mt-0" }}
                />
              </Box>

              <ThrowTopicOptionsArea
                userId={userId}
                state={state}
                dispatch={dispatch}
              />

              <div className="tw-w-full">
                <ThrowTopicSelectsArea state={state} dispatch={dispatch} />
              </div>

              <Separator />

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
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                      <Button
                        variant="destructive"
                        size={"icon"}
                        className={cn(
                          "tw-absolute tw-right-2 tw-top-1/2",
                          "-tw-translate-y-1/2",
                          "tw-h-6 tw-w-6 tw-p-1",
                          "tw-transition-opacity",
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
            </Box>
          )}

          <Box className="tw-px-4 tw-p-4">
            <Button
              variant={"default"}
              className="tw-w-full !tw-bg-orange-300 hover:!tw-bg-orange-500 tw-gap-2 tw-h-8"
              onClick={handleEditSubmit}
            >
              Save
            </Button>
          </Box>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default TopicEditModalPage;
