import { useCallback, useRef } from "react";

type UseLastElementRefProps = {
  hasMore: boolean;
  next: () => void | Promise<void>;
};

export const useLastElementRef = ({
  hasMore,
  next,
}: UseLastElementRefProps) => {
  const observer = useRef<IntersectionObserver>();
  return useCallback<(node: HTMLElement | null) => void>(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          next();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [hasMore, next]
  );
};
