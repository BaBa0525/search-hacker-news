import { useCallback, useEffect, useState } from "react";

export const changePageActions = {
  NEXT: "NEXT",
  PREV: "PREV",
  FIRST: "FIRST",
} as const;

export const useVirtaulActiveResult = <T,>({ items }: { items: T[] }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const first = useCallback(() => setFocusedIndex(0), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (event.key === "ArrowDown") {
        setFocusedIndex((prev) => (prev + 1) % items.length);
      } else {
        setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [items.length]);

  return {
    focusedIndex,
    first,
  };
};
