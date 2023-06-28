import { getSearchResult } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ResultCard } from "./ResultCard";

export const SearchTable = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <>
      <div className="flex flex-col w-1/2 h-1/2 bg-search-bg">
        <div className="flex items-center flex-shrink-0 h-12 gap-4 px-4 m-4 bg-white border-2 rounded-md border-search-line">
          <AiOutlineSearch className="h-full" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-full outline-none"
            placeholder="Search news"
          />
        </div>
        <SearchResults query={query} />
      </div>
    </>
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
    return <div>No recent searches</div>;
  }

  if (isInitialLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data?.pages.length === 0) {
    return (
      <div>
        No results were found. Check your spelling or try different keywords.
      </div>
    );
  }

  return (
    <section className="flex flex-col flex-shrink overflow-auto">
      {data?.pages.map((page) => (
        <div key={page.page} className="flex flex-col h-full gap-2">
          {page.hits.map((hit) => (
            <ResultCard key={hit.objectID} hit={hit} />
          ))}
        </div>
      ))}
      <button onClick={() => fetchNextPage()}>Load more...</button>
    </section>
  );
};
