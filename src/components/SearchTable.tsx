import { useSearchNews } from "@/hooks/useSearchNews";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { InfiniteScroll } from "./InfiniteScroll";
import { NotFoundIcon } from "./NotFoundIcon";

export const SearchTable: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col max-w-full max-h-full py-4 rounded-md drop-shadow bg-search-bg">
      <div className="flex items-center flex-shrink-0 h-12 gap-2 px-4 m-4 bg-white border-2 rounded-md border-search-line">
        {isLoading ? (
          <VscLoading className="flex-shrink-0 w-6 h-6 animate-spin text-search-line" />
        ) : (
          <FiSearch className="flex-shrink-0 w-6 h-6 text-search-line" />
        )}
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
      <SearchResults query={query} setIsLoading={setIsLoading} />
    </div>
  );
};

type SearchResultsProps = {
  query: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  setIsLoading,
}) => {
  const {
    data,
    isInitialLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useSearchNews({ query });

  setIsLoading(isFetching);

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
    <section className="px-6 overflow-y-auto">
      <InfiniteScroll
        pages={data.pages}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
      />
    </section>
  );
};
