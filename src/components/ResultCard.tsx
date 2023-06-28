import type { Hit } from "@/types/api";
import { sanitize } from "dompurify";
import { AiOutlineHeart } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { MdArticle } from "react-icons/md";
import { PiUserLight } from "react-icons/pi";

type ResultCardProps = {
  hit: Hit;
};

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export const ResultCard: React.FC<ResultCardProps> = ({ hit }) => {
  const createdAt = new Date(hit.created_at);
  const title = hit._highlightResult.title
    ? sanitize(hit._highlightResult.title.value, {
        USE_PROFILES: { html: true },
      })
    : hit.title;

  const author = hit._highlightResult.author
    ? sanitize(hit._highlightResult.author.value, {
        USE_PROFILES: { html: true },
      })
    : hit.author;

  return (
    <a
      className="flex items-center gap-4 p-2 bg-white rounded group hover:bg-search-line hover:text-white"
      href={hit.url}
    >
      <MdArticle className="flex-shrink-0 w-6 h-6 ml-2 text-search-line group-hover:text-white" />
      <article className="flex flex-col flex-1 min-w-0">
        <h4
          className="font-medium truncate SearchHighlight"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="flex gap-4 text-sm font-light text-gray-600 group-hover:text-white">
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

/**
 * <a
      className="flex items-center gap-4 p-2 bg-white rounded group hover:bg-search-line hover:text-white"
      href={hit.url}
    >
      <MdArticle className="flex-shrink-0 w-6 h-6 ml-2 text-search-line group-hover:text-white" />
      <article className="flex flex-col flex-1 min-w-0">
        <h4
          className="font-medium truncate SearchHighlight"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="text-sm font-light text-gray-600 group-hover:text-white">{`${
          hit.points
        } points by ${author} on ${formatter.format(createdAt)} | ${
          hit.num_comments
        } comments`}</p>
      </article>
    </a>
 */
