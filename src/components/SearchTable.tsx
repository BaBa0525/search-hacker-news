import { HitProvider } from "@/context/HitContext";
import { useSearchNews } from "@/hooks/useSearchNews";
import { SearchResults } from "@/types/api";
import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { InfiniteScroll } from "./InfiniteScroll";
import { NotFoundIcon } from "./NotFoundIcon";
import { ResultCard } from "./ResultCard";

export const SearchTable: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const fetchingNum = useIsFetching({ queryKey: ["search", query] });

  return (
    <div className="flex flex-col max-w-full max-h-full py-4 rounded-md drop-shadow bg-search-bg-light dark:bg-search-bg-dark dark:outline-search-outline-dark dark:outline">
      <div className="flex items-center flex-shrink-0 h-12 gap-2 px-4 m-4 bg-white border-2 rounded-md dark:bg-search-card-dark border-search-line-light dark:border-search-line-dark">
        {fetchingNum !== 0 ? (
          <VscLoading className="flex-shrink-0 w-6 h-6 animate-spin text-search-line-light dark:text-search-line-dark " />
        ) : (
          <FiSearch className="flex-shrink-0 w-6 h-6 text-search-line-light dark:text-search-line-dark" />
        )}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full text-lg bg-transparent outline-none"
          placeholder="Search news"
        />
        {query !== "" && (
          <MdClose
            className="w-6 h-6 cursor-pointer dark:text-white hover:text-search-line-light dark:hover:dark:text-search-line-dark"
            onClick={() => setQuery("")}
          />
        )}
      </div>
      <SearchResults query={query} />
    </div>
  );
};

type SearchResultsProps = {
  query: string;
};

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const scrollRef = useRef<HTMLElement>(null);
  const {
    data,
    isInitialLoading,
    isError,
    hasNextPage,
    isFetchedAfterMount,
    fetchNextPage,
  } = useSearchNews({ query });

  useEffect(() => {
    if (isFetchedAfterMount) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [isFetchedAfterMount]);

  if (query === "" || isInitialLoading || !data) {
    return (
      <section className="flex flex-col items-center py-10 mx-6 overflow-auto">
        <h3 className="text-sm select-none text-search-help">
          No recent searches
        </h3>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex flex-col items-center gap-2 py-10 mx-6 overflow-auto text-sm select-none text-search-help">
        <NotFoundIcon />
        <h3>API error occurred. Please try again later or contact support.</h3>
      </section>
    );
  }

  if (data.pages[0].nbHits === 0) {
    return (
      <section className="flex flex-col items-center gap-2 py-10 mx-6 overflow-auto text-sm select-none text-search-help">
        <NotFoundIcon />
        <h3>
          No results were found. Check your spelling or try different keywords.
        </h3>
      </section>
    );
  }

  return (
    <section
      className="px-6 overflow-y-auto scrollbar-thin scrollbar-thumb-search-scrollbar-light dark:scrollbar-thumb-search-scrollbar-dark scrollbar-thumb-rounded-full"
      ref={scrollRef}
    >
      <InfiniteScroll
        pages={data.pages}
        getPageResult={(index, array) => array[index].hits}
        hasNextPage={hasNextPage ?? false}
        fetchNextPage={() => void fetchNextPage()}
      >
        {(props) => <PageSection {...props} />}
      </InfiniteScroll>
    </section>
  );
};

type PageSectionProps = {
  page: SearchResults;
  isLastPage: boolean;
  lastElementRef: (node: HTMLLIElement | null) => void;
  focusedResult?: number;
};

const PageSection: React.FC<PageSectionProps> = ({
  page,
  isLastPage,
  lastElementRef,
  focusedResult,
}) => {
  const resultStart = page.hitsPerPage * page.page + 1;
  const resultEnd = page.hitsPerPage * page.page + page.hits.length;

  return (
    <div className="flex flex-col">
      <h4 className="text-xs font-semibold md:text-sm text-search-line-light dark:text-search-line-dark">
        {`Result ${resultStart} ~ ${resultEnd}`}
      </h4>
      <ul className="flex flex-col gap-2">
        {page.hits.map((hit, postIndex) => {
          const shouldBindRef =
            isLastPage && postIndex + 2 === page.hits.length;

          const isSelected = focusedResult === postIndex;

          return (
            <li key={hit.objectID} ref={shouldBindRef ? lastElementRef : null}>
              <HitProvider value={hit}>
                <ResultCard isSelected={isSelected} />
              </HitProvider>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
