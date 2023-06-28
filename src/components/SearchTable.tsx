import { getSearchResult } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { NotFoundIcon } from "./NotFoundIcon";
import { ResultCard } from "./ResultCard";

export const SearchTable: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="flex flex-col max-w-full max-h-full py-4 rounded-md drop-shadow bg-search-bg">
      <div className="flex items-center flex-shrink-0 h-12 gap-2 px-4 m-4 bg-white border-2 rounded-md border-search-line">
        <FiSearch className="flex-shrink-0 w-6 h-6 text-search-line" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full text-lg outline-none"
          placeholder="Search news"
        />
        {query !== "" && (
          <MdClose
            className="w-6 h-6 cursor-pointer hover:text-search-line"
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
  const { data, isInitialLoading, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 0 }) =>
      getSearchResult({ query, page: pageParam, hitsPerPage: 10 }),
    getNextPageParam: (lastPage) => lastPage.page + 1,
    enabled: query !== "",
    keepPreviousData: true,
  });

  if (query === "") {
    return (
      <section className="flex flex-col items-center py-10 mx-6 overflow-auto">
        <h3 className="text-sm select-none text-search-help">
          No recent searches
        </h3>
      </section>
    );
  }

  if (isInitialLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data?.pages[0].nbHits === 0) {
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
    <section className="px-6 overflow-y-auto">
      <div className="flex flex-col gap-2">
        {data?.pages.map((page) => (
          <div key={page.page} className="flex flex-col gap-2">
            {page.hits.map((hit) => (
              <ResultCard key={hit.objectID} hit={hit} />
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => fetchNextPage()}>Load more...</button>
    </section>
  );
};
