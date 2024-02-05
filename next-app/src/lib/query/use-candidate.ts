import { useMutation } from "@tanstack/react-query";

interface CandidateProps {
  candidateId: string;
  order?: number;
  detail?: string;
  elected?: boolean;
}

export const useUpdateCandidate = () => {
  const putTopic = async ({
    topicId,
    candidates,
  }: {
    topicId: string;
    candidates: CandidateProps[];
  }) => {
    const candidateRes = await Promise.all(
      candidates.map(async (candidate) => {
        const { candidateId, ...restBody } = candidate;
        const response = await fetch(`/api/topic/candidate`, {
          method: "PUT",
          body: JSON.stringify({
            id: candidateId,
            ...restBody,
          }),
        });
      }),
    );
    return candidateRes;
  };

  const useUpdateCandidate = useMutation({
    mutationFn: ({
      topicId,
      candidates,
    }: {
      topicId: string;
      candidates: CandidateProps[];
    }) => putTopic({ topicId, candidates }),
  });

  return useUpdateCandidate;
};
