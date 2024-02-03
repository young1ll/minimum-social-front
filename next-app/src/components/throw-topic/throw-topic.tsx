"use client";

import { Dispatch, Reducer, useEffect, useReducer, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "../ui/card";
import { toast } from "../ui/use-toast";
import UserAvatar from "../user-avatar";
import { Input } from "../ui/input";
import { Box } from "../ui/box";

import ThrowTopicOptionsArea from "./throw-topic-options";
import ThrowTopicSelectsArea from "./throw-topic-selects";
import ThrowTopicTextarea from "./throw-topic-textarea";
import CandidateArea from "./throw-topic-candidate";
import { CandidateItem } from "@/types/topic";
import ThrowTopicInputArea from "./throw-topic-input";

type StatusType = "pending" | "open" | "close";
type TypeType = "poll" | "event";
type MediaType = {
  src: string;
  alt?: string;
};

const initCandidates = [
  {
    order: 1 as number,
    detail: "Approve",
  },
  {
    order: 2 as number,
    detail: "Disapprove",
  },
];

// 상태 타입 정의
export interface ThrowTopicState {
  throwOpen: boolean;
  title: string;
  description: string;
  // media: MediaType;
  status: StatusType | string;
  type: TypeType | string;
  date: DateRange | undefined;
  isSecretVote: boolean;
  isResultOpen: boolean;
  castingVote: string;
  isMultiChoice: boolean;
  eventDate: string;
  eventLocation: string;
  candidateItems: Omit<CandidateItem, "id" | "elected">[];
}

// 액션 타입 정의
export type ThrowTopicActionType =
  | { type: "set"; payload: Partial<ThrowTopicState> }
  | { type: "reset" }
  | { type: "addCandidate"; item: Omit<CandidateItem, "id" | "elected"> }
  | { type: "updateCandidate"; index: number; value: string }
  | { type: "removeCandidate"; index: number };

// 리듀서 함수 정의
const reducer: Reducer<ThrowTopicState, ThrowTopicActionType> = (
  state,
  action,
) => {
  switch (action.type) {
    case "set":
      return { ...state, ...action.payload };
    case "reset":
      return initialState;
    case "addCandidate":
      return {
        ...state,
        candidateItems: [...state.candidateItems, action.item],
      };
    case "updateCandidate":
      const updatedItem = [...state.candidateItems];
      updatedItem[action.index] = {
        ...updatedItem[action.index],
        detail: action.value,
      };
      return { ...state, candidateItems: updatedItem };
    case "removeCandidate":
      const filteredItems = state.candidateItems.filter(
        (_, index) => index !== action.index,
      );
      return { ...state, candidateItems: filteredItems };
    default:
      return state;
  }
};

const initialState: ThrowTopicState = {
  throwOpen: false,
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
  isResultOpen: true,
  castingVote: "",
  isMultiChoice: false,
  eventDate: "",
  eventLocation: "",
  candidateItems: initCandidates,
};

interface ThrowTopicProps {
  isCandidateMoal?: boolean;
}

const ThrowTopic = (
  props: ThrowTopicProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { isCandidateMoal = true, className } = props;
  const queryClient = useQueryClient();
  const session = useSession();
  const user = session.data?.user;

  const [state, dispatch]: [ThrowTopicState, Dispatch<ThrowTopicActionType>] =
    useReducer(reducer, initialState);
  const [startWrite, setStartWrite] = useState(false);
  const [throwOpen, setThrowOpen] = useState(false); // throwarea open/close

  const requestBody = {
    userId: user?.id as string,
    title: state.title as string,
    type: state.type as TypeType,
    status: state.status as StatusType,
    description: state.description,
    // media: state.media, // 추가 예정
    resultOpen: state.isResultOpen,
    isSecretVote: state.isSecretVote,
    castingVote: state.castingVote,
    isMultiChoice: state.isMultiChoice,
    startDate: state.date?.from?.toString() as string,
    endDate: state.date?.to?.toString() as string,
    ...(state.type === "event" && {
      eventDate: state.eventDate.toString() as string,
      eventLocation: state.eventLocation,
    }),
  };

  const postTopicAndCandidatesFn = async () => {
    try {
      const topicReq = await fetch("/topic", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      const topicRes = await topicReq.json();
      const topicId = topicRes?.data?.data.topicId;

      if (topicId) {
        const candidateRes = await Promise.all(
          state.candidateItems.map(async (item: Partial<CandidateItem>) => {
            await fetch("/topic/candidate", {
              method: "POST",
              body: JSON.stringify({
                topicId: topicId,
                ...item,
              }),
            });
          }),
        );

        return { topicRes, candidateRes };
      }
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  };

  const usePostTopic = useMutation({
    mutationFn: postTopicAndCandidatesFn,
    onSuccess: async () => {
      toast({
        title: "Throw Topic Success",
        description: "토픽이 생성되었습니다.",
      });
      dispatch({ type: "reset" });
      setThrowOpen(false);

      await queryClient.fetchQuery({ queryKey: ["feeds"] }); // TopicList를 리로드
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Throw Topic Failed",
        description: `토픽 생성 중 에러 발생! 다시 시도해주세요! ${error.message}`,
      });
    },
  });

  const handleThrow = () => {
    const topicResult = usePostTopic.mutate();
    console.log({ topicResult });
  };

  // 상세정보 입력란 펼치기
  useEffect(() => {
    if (state.title.length > 5) {
      setStartWrite(true);
    } else {
      setStartWrite(false);
    }
  }, [state.title.length]);

  return (
    <div className={cn(className)}>
      <Box className="tw-items-center tw-w-full" direction={"row"} gap={4}>
        <UserAvatar
          className="!tw-border-primary tw-border"
          profileImage={user?.profileImage}
          username={user?.username}
          size={"xl"}
        />
        {/* TODO: 포커스 시, 제한 글자 수 표시 */}

        <ThrowTopicInputArea state={state} dispatch={dispatch} />
      </Box>

      <ThrowTopicTextarea
        startWrite={startWrite}
        state={state}
        dispatch={dispatch}
      />

      {/* Options Area */}
      <ThrowTopicOptionsArea
        key={"topic-options"}
        className={cn(
          startWrite
            ? "tw-h-auto tw-opacity-100 tw-mt-2"
            : "hidden tw-h-0 tw-opacity-0 tw-mt-0",
          "tw-transition-all tw-duration-400",
        )}
        userId={user?.id}
        state={state}
        dispatch={dispatch}
      />

      <Box
        className="tw-items-start tw-w-full tw-mt-2"
        direction={"column"}
        gap={4}
      >
        <ThrowTopicSelectsArea state={state} dispatch={dispatch} />

        <div className="tw-w-full tw-flex tw-justify-end">
          <CandidateArea
            open={throwOpen}
            isModal={isCandidateMoal}
            setOpen={setThrowOpen}
            startTopic={startWrite}
            isPending={usePostTopic.isPending}
            state={state}
            dispatch={dispatch}
            throwTopic={handleThrow} // topic 생성 함수
          />
        </div>
      </Box>
    </div>
  );
};

export default ThrowTopic;
