import type { SearchResults } from "@/types/api";
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useCallback, useRef } from "react";

type UseLastElementRefProps = {
  hasMore: boolean;
  next: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<SearchResults, unknown>>;
};

export const useLastElementRef = ({
  hasMore,
  next,
}: UseLastElementRefProps) => {
  const observer = useRef<IntersectionObserver>();
  return useCallback<(node: HTMLLIElement | null) => void>(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          next();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [hasMore, next]
  );
};
