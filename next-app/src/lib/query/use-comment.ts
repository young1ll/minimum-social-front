import config from "@/config";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

export const usePostComment = () => {
  const postComment = async () => {};

  const usePostComment = useMutation({
    mutationFn: postComment,
    onSuccess: () => {},
    onError: () => {},
  });

  return usePostComment;
};

export const useGetCommentsInfinite = ({ topicId }: { topicId: string }) => {
  const getAllComments = async (pageParam: number) => {
    const url = `${config.rootUrl}/api/topic/${topicId}/comments`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  };

  const useTopicComments = useInfiniteQuery({
    queryKey: ["topics", topicId, "comments"],
    queryFn: ({ pageParam }) => getAllComments(pageParam),
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

  return useTopicComments;
};
