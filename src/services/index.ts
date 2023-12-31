import type { SearchResults } from "@/types/api";

const API_URL = "https://hn.algolia.com/api/v1/search";

type SearchParams = {
  query: string;
  hitsPerPage: number;
  page: number;
};

export const getSearchResult = async ({
  query,
  hitsPerPage,
  page,
}: SearchParams): Promise<SearchResults> => {
  const searchParams = new URLSearchParams({
    query,
    hitsPerPage: hitsPerPage.toString(),
    page: page.toString(),
    tags: "story",
  });

  const response = await fetch(`${API_URL}?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error("Something went wrong@getSearchResult");
  }

  return response.json();
};
