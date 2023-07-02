import { useFocusResult } from "@/hooks/useFocusResult";
import { useLastElementRef } from "@/hooks/useLastElementRef";
import type { ComponentType } from "react";

export type InfiniteScrollProps<T> = {
  pages: T[];
  getPageResult: (index: number, array: T[]) => unknown[];
  hasNextPage: boolean;
  fetchNextPage: () => void | Promise<void>;
  children: ComponentType<{
    page: T;
    isLastPage: boolean;
    lastElementRef: (node: HTMLElement | null) => void;
    focusedResult?: number;
  }>;
};

export const InfiniteScroll = <T,>({
  pages,
  hasNextPage,
  getPageResult,
  fetchNextPage,
  children: Component,
}: InfiniteScrollProps<T>) => {
  // InfiniteScroll observer
  const lastElementRef = useLastElementRef({
    hasMore: hasNextPage,
    next: fetchNextPage,
  });

  // Add event listener to arrow keys
  const { focusedPage, focusedResult } = useFocusResult({
    pages,
    getPageResult,
  });

  return (
    <div className="flex flex-col gap-4">
      {pages.map((page, pageIndex) => (
        <Component
          isLastPage={pageIndex === pages.length - 1}
          lastElementRef={lastElementRef}
          page={page}
          focusedResult={focusedPage === pageIndex ? focusedResult : undefined}
          key={pageIndex}
        />
      ))}
    </div>
  );
};
