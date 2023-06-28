import { getSearchResult } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseSearchNewsProps = {
  query: string;
};

export const useSearchNews = ({ query }: UseSearchNewsProps) => {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 0 }) =>
      getSearchResult({ query, page: pageParam, hitsPerPage: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.nbPages === lastPage.page + 1) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    enabled: query !== "",
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
};
