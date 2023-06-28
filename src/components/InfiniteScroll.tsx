import { useLastElementRef } from "@/hooks/useLastElementRef";
import type { SearchResults } from "@/types/api";
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { ResultCard } from "./ResultCard";

type InfiniteScrollProps = {
  pages: SearchResults[];
  next: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<SearchResults, unknown>>;
  hasMore: boolean;
};

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  pages,
  next,
  hasMore,
}) => {
  const lastElementRef = useLastElementRef({ hasMore, next });

  return (
    <div className="flex flex-col gap-4">
      {pages.map((page, pageIndex) => (
        <PageSection
          key={pageIndex}
          page={page}
          isLastPage={pageIndex === pages.length - 1}
          lastElementRef={lastElementRef}
        />
      ))}
    </div>
  );
};

type PageSectionProps = {
  page: SearchResults;
  isLastPage: boolean;
  lastElementRef: (node: HTMLLIElement | null) => void;
};

const PageSection: React.FC<PageSectionProps> = ({
  page,
  isLastPage,
  lastElementRef,
}) => {
  const resultStart = page.hitsPerPage * page.page + 1;
  const resultEnd = page.hitsPerPage * page.page + page.hits.length;

  return (
    <div key={page.page} className="flex flex-col">
      <h4 className="text-xs font-semibold md:text-sm text-search-line-light dark:text-search-line-dark">
        {`Result ${resultStart} ~ ${resultEnd}`}
      </h4>
      <ul className="flex flex-col gap-2">
        {page.hits.map((hit, postIndex) =>
          isLastPage && page.hits.length === postIndex + 2 ? (
            <li ref={lastElementRef} key={hit.objectID}>
              <ResultCard key={hit.objectID} hit={hit} />
            </li>
          ) : (
            <li key={hit.objectID}>
              <ResultCard key={hit.objectID} hit={hit} />
            </li>
          )
        )}
      </ul>
    </div>
  );
};
