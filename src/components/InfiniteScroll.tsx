import type { SearchResults } from "@/types/api";
import { useCallback, useRef } from "react";
import { ResultCard } from "./ResultCard";

type InfiniteScrollProps = {
  pages: SearchResults[];
  next: () => any;
  hasMore: boolean;
};

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  pages,
  next,
  hasMore,
}) => {
  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback<(node: HTMLDivElement | null) => void>(
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

  return (
    <div className="flex flex-col gap-2">
      {pages.map((page, pageIndex) => (
        <div key={page.page} className="flex flex-col gap-2">
          {page.hits.map((hit, postIndex) => {
            if (
              pages.length === pageIndex + 1 &&
              page.hits.length === postIndex + 1
            ) {
              return (
                <div ref={(r) => lastElementRef(r)} key={hit.objectID}>
                  <ResultCard key={hit.objectID} hit={hit} />
                </div>
              );
            } else {
              return (
                <div key={hit.objectID}>
                  <ResultCard key={hit.objectID} hit={hit} />
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};
