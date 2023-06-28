import type { Hit } from "@/types/api";
import { sanitize } from "dompurify";

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

  return (
    <a
      className="flex flex-col gap-2 p-2 bg-white rounded group hover:bg-search-line hover:text-white"
      href={hit.url}
    >
      <h4
        className="text-lg font-medium SearchHighlight"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="text-sm font-light text-gray-600 group-hover:text-white">{`${
        hit.points
      } points by ${hit.author} on ${formatter.format(createdAt)} | ${
        hit.num_comments
      } comments`}</p>
    </a>
  );
};
