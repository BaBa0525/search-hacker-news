/* eslint-disable @typescript-eslint/no-explicit-any */

export type SearchResults = {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  query: string;
  params: string;
};

export type Hit = {
  created_at: string;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text?: any;
  comment_text?: any;
  num_comments: number;
  story_id?: any;
  story_title?: any;
  story_url?: any;
  parent_id?: any;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
};

export type HighlightResult = {
  title: Title;
  url: Url;
  author: Url;
};

export type Url = {
  value: string;
  matchLevel: string;
  matchedWords: any[];
};

export type Title = {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
};
