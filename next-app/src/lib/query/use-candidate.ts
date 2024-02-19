import { CandidateItem } from "@/types/topic";
import { useMutation } from "@tanstack/react-query";

type CandidateProps = Omit<CandidateItem, "id" | "elected">[];

export const useUpdateCandidate = () => {
  const putTopic = async ({ candidates }: { candidates: CandidateProps }) => {
    const candidateRes = await Promise.all(
      candidates.map(async (candidate) => {
        const response = await fetch(`/api/topic/candidate`, {
          method: "PUT",
          body: JSON.stringify(candidate),
        });
        const result = await response.json();

        return result;
      }),
    );
    return candidateRes;
  };

  const useUpdateCandidate = useMutation({
    mutationFn: ({ candidates }: { candidates: CandidateProps }) =>
      putTopic({ candidates }),
  });

  return useUpdateCandidate;
};
