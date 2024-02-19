import {
  ThrowTopicActionType,
  ThrowTopicState,
} from "@/components/throw-topic/throw-topic";
import { toast } from "@/components/ui/use-toast";
import { CandidateItem } from "@/types/topic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch } from "react";

export const useThrowTopic = ({
  state,
  dispatch,
  requestBody,
  setThrowOpen,
}: {
  state: ThrowTopicState;
  dispatch: Dispatch<ThrowTopicActionType>;
  requestBody: any;
  setThrowOpen: any;
}) => {
  const queryClient = useQueryClient();

  const postTopicAndCandidatesFn = async () => {
    try {
      const topicReq = await fetch("/api/topic", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      const topicRes = await topicReq.json();
      console.log({ topicRes });
      const topicId = topicRes?.data?.topicId;

      try {
        if (topicId) {
          const candidateRes = await Promise.all(
            state.candidateItems.map(async (item: Partial<CandidateItem>) => {
              await fetch("/api/topic/candidate", {
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

      await queryClient.fetchQuery({ queryKey: ["topics", "latest"] }); // TopicList 리로드
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Throw Topic Failed",
        description: `토픽 생성 중 에러 발생! 다시 시도해주세요! ${error.message}`,
      });
    },
  });

  return usePostTopic;
};
