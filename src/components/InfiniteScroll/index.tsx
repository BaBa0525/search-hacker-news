import { changePageActions, useActiveResult } from "@/hooks/useFocusResult";
import { useLastElementRef } from "@/hooks/useLastElementRef";
import type { ComponentProps, PropsWithChildren } from "react";
import { useEffect, type ComponentType } from "react";

export type InfiniteScrollProps<T, TData> = {
  pages: T[];
  getPageResult: (index: number, array: T[]) => TData[];
  getUrl: (index: number, array: TData[]) => string;
  hasNextPage: boolean;
  resetActiveResult?: boolean;
  fetchNextPage: () => void | Promise<void>;
  children: ComponentType<{
    page: T;
    isLastPage: boolean;
    lastElementRef: (node: HTMLElement | null) => void;
    focusedResult?: number;
  }>;
};

export const InfiniteScroll = <T, TData>({
  pages,
  hasNextPage,
  resetActiveResult,
  getPageResult,
  getUrl,
  fetchNextPage,
  children: Component,
}: InfiniteScrollProps<T, TData>) => {
  // InfiniteScroll observer
  const lastElementRef = useLastElementRef({
    hasMore: hasNextPage,
    next: fetchNextPage,
  });

  // Add event listener to arrow keys
  const { focusedPage, focusedResult, dispatch } = useActiveResult({
    pages,
    getPageResult,
    getUrl,
  });

  useEffect(() => {
    if (resetActiveResult) {
      dispatch({ type: changePageActions.FIRST, changePage: true });
    }
  }, [resetActiveResult, dispatch]);

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

type LinkProps = PropsWithChildren<ComponentProps<"a">>;

const InfiniteScrollLink = ({ children, ...props }: LinkProps) => {
  return <a {...props}>{children}</a>;
};

InfiniteScrollLink.displayName = "InfiniteScroll.Link";

InfiniteScroll.Link = InfiniteScrollLink;
