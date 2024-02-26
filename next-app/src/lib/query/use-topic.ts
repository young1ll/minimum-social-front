import config from "@/config";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useAllTopicsInfinite = ({ sort }: { sort: string }) => {
  const getAllFeeds = async (pageParam: number) => {
    const response = await fetch(
      `${config.rootUrl}/api/topic?page=${pageParam}&order=${sort === "latest" ? "desc" : "asc"}`,
    );
    const result = await response.json();

    return result;
  };

  const useUserTopics = useInfiniteQuery({
    queryKey: ["topics", sort],
    queryFn: ({ pageParam }) => getAllFeeds(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const curr = lastPage.pagination.currentPage;
      const total = lastPage.pagination.totalPages;

      if (lastPage.pagination.hasNextPage === false || curr === total) {
        return false;
      }
      return curr + 1;
    },
  });

  return useUserTopics;
};

export const useUserTopicsInfiniteByUserId = ({
  userId,
}: {
  userId: string;
}) => {
  const getTopicsByUserId = async (pageParam: number) => {
    const url = `${config.rootUrl}/api/topic?userId=${userId}&page=${pageParam}`;

    const response = await fetch(url);
    return response.json();
  };

  const useUserTopics = useInfiniteQuery({
    queryKey: ["users", userId, "topics"],
    queryFn: ({ pageParam }) => getTopicsByUserId(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const curr = lastPage.pagination.currentPage;
      const total = lastPage.pagination.totalPages;

      if (lastPage.pagination.hasNextPage === false || curr === total) {
        return false;
      }
      return curr + 1;
    },
  });

  return useUserTopics;
};

export const useTopicByTopicId = ({ topicId }: { topicId: string }) => {
  const getTopicByTopicId = async () => {
    const url = `${config.rootUrl}/api/topic/${topicId}`;

    const response = await fetch(url);
    const result = await response.json();
    return result.data;
  };

  const useTopic = useQuery({
    queryKey: ["topics", topicId],
    queryFn: getTopicByTopicId,
  });

  return useTopic;
};

export const useTopicVotedByTopicId = ({ topicId }: { topicId: string }) => {
  const getVotedByTopicId = async () => {
    const response = await fetch(
      `${config.rootUrl}/api/topic/${topicId}/voted`,
    );
    const result = await response.json();

    return result.data;
  };

  const useTopicVoted = useQuery({
    queryKey: ["topics", topicId, "voted"],
    queryFn: getVotedByTopicId,
  });

  return useTopicVoted;
};

interface requestBodyProps {
  topicId: string;
  userId: string;
  type?: number;
  title?: string;
  status?: boolean;
  isSecretVote?: boolean;
  isMultiChoice?: number;
  castingVote?: string;
  resultOpen?: boolean;
  startDate?: Date;
  endDate?: Date;

  //type
  description?: Date;
  eventDate?: Date;
  eventLocation?: string;
}
export const useUpdateTopic = () => {
  const putTopic = async (body: requestBodyProps) => {
    const response = await fetch(`${config.rootUrl}/api/topic`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    const result = await response.json();

    return result;
  };

  const useUpdateTopic = useMutation({
    mutationFn: (body: requestBodyProps) => putTopic(body),
  });

  return useUpdateTopic;
};
