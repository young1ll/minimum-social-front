import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchTopics = ({ q }: { q: string }) => {
  const getAllFeeds = async (pageParam: number) => {
    const response = await fetch(`/api/topic?page=${pageParam}&q=${q}`);
    const result = await response.json();

    return result;
  };

  const useUserTopics = useInfiniteQuery({
    queryKey: ["topics", "search", q],
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
