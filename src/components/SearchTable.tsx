import { getSearchResult } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const SearchTable = () => {
  const [query, setQuery] = useState("");

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 0 }) =>
      getSearchResult({ query, page: pageParam, hitsPerPage: 10 }),
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col w-1/2 h-[36rem] bg-search-bg">
        <div className="flex items-center h-12 gap-4 px-4 m-4 bg-white border-2 rounded-md border-search-line">
          <AiOutlineSearch className="h-full" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-full"
            placeholder="Search news"
          />
        </div>
        <section className="flex flex-col gap-4 overflow-auto">
          {data?.pages.map((page) => (
            <div key={page.page} className="flex flex-col h-full gap-4">
              {page.hits.map((hit) => (
                <div key={hit.objectID} className="flex flex-col gap-2">
                  <a href={hit.url} className="text-lg font-bold">
                    {hit.title}
                  </a>
                  <p className="text-sm">{hit.url}</p>
                </div>
              ))}
            </div>
          ))}
          <button onClick={() => fetchNextPage()}>Load More</button>
        </section>
      </div>
    </>
  );
};
