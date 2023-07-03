import { sanitize } from "dompurify";
import { AiOutlineHeart } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { MdArticle } from "react-icons/md";
import { PiUserLight } from "react-icons/pi";

import { useHit } from "@/context/HitContext";

type ResultCardProps = {
  isSelected: boolean;
};

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

type Highlight = {
  value: string;
};

const highlight = (highlight: Highlight, raw: string) => {
  return highlight
    ? sanitize(highlight.value, {
        USE_PROFILES: { html: true },
      })
    : raw;
};

export const ResultCard: React.FC<ResultCardProps> = ({ isSelected }) => {
  if (isSelected) {
    return <SelectedCard />;
  }
  return <UnSelectedCard />;
};

const SelectedCard = () => {
  const hit = useHit();

  const createdAt = new Date(hit.created_at);
  const title = highlight(hit._highlightResult.title, hit.title);
  const author = highlight(hit._highlightResult.author, hit.author);

  return (
    <a
      className="flex items-center gap-4 p-2 text-white rounded group bg-search-line-light dark:bg-search-line-dark"
      href={hit.url}
    >
      <MdArticle className="flex-shrink-0 w-6 h-6 ml-2 text-white dark:text-black" />
      <article className="flex flex-col flex-1 min-w-0 group-hover:text-white">
        <h4
          className="text-sm font-medium truncate SearchHighlightSelected md:text-base"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="flex gap-4 text-xs font-light text-white md:text-sm dark:text-black">
          <div className="flex gap-1">
            <AiOutlineHeart className="h-full" />
            <span>{hit.points}</span>
          </div>
          <div className="flex gap-1">
            <PiUserLight className="h-full" />
            <span
              className="SearchHighlightSelected"
              dangerouslySetInnerHTML={{ __html: author }}
            />
          </div>
          <div className="flex gap-1">
            <BsClock className="h-full" />
            <span>{formatter.format(createdAt)}</span>
          </div>
          <div className="flex gap-1">
            <GoComment className="h-full" />
            <span>{hit.num_comments}</span>
          </div>
        </div>
      </article>
    </a>
  );
};

const UnSelectedCard = () => {
  const hit = useHit();

  const createdAt = new Date(hit.created_at);
  const title = highlight(hit._highlightResult.title, hit.title);
  const author = highlight(hit._highlightResult.author, hit.author);

  return (
    <a
      className="flex items-center gap-4 p-2 bg-white rounded dark:bg-search-card-dark group hover:bg-search-line-light/80 dark:hover:bg-search-line-dark/80"
      href={hit.url}
    >
      <MdArticle className="flex-shrink-0 w-6 h-6 ml-2 text-gray-400 group-hover:text-white dark:group-hover:text-black" />
      <article className="flex flex-col flex-1 min-w-0 group-hover:text-white">
        <h4
          className="text-sm font-medium truncate SearchHighlight md:text-base"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="flex gap-4 text-xs font-light text-gray-600 dark:text-search-info-dark md:text-sm group-hover:text-white dark:group-hover:text-black">
          <div className="flex gap-1">
            <AiOutlineHeart className="h-full" />
            <span>{hit.points}</span>
          </div>
          <div className="flex gap-1">
            <PiUserLight className="h-full" />
            <span
              className="SearchHighlight"
              dangerouslySetInnerHTML={{ __html: author }}
            />
          </div>
          <div className="flex gap-1">
            <BsClock className="h-full" />
            <span>{formatter.format(createdAt)}</span>
          </div>
          <div className="flex gap-1">
            <GoComment className="h-full" />
            <span>{hit.num_comments}</span>
          </div>
        </div>
      </article>
    </a>
  );
};
