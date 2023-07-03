import { useVirtualizer } from "@tanstack/react-virtual";
import type { ComponentType } from "react";
import { useEffect, useRef } from "react";

export type InfiniteScrollProps<T> = {
  data: T[];
  hasNextPage: boolean;
  estimateSize: number;
  onReachEnd?: () => void | Promise<void>;
  overscan?: number;
  activeIndex?: number;

  children: ComponentType<{
    item: T;
    isActive: boolean;
  }>;
};

export const InfiniteScroll = <T,>({
  data,
  hasNextPage,
  estimateSize,
  onReachEnd,
  overscan = 1,
  activeIndex,
  children: Component,
}: InfiniteScrollProps<T>) => {
  const scrollRef = useRef<HTMLElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? data.length + 1 : data.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateSize,
    overscan: overscan,
  });

  const items = rowVirtualizer.getVirtualItems();
  useEffect(() => {
    const lastItem = items.at(-1);
    if (!lastItem) {
      return;
    }

    if (lastItem.index >= data.length - 1) {
      onReachEnd?.();
    }
  }, [items, data.length, onReachEnd]);

  useEffect(() => {
    if (activeIndex !== undefined) {
      rowVirtualizer.scrollToIndex(activeIndex, {
        align: "auto",
      });
    }
  }, [activeIndex, rowVirtualizer]);

  return (
    <section
      ref={scrollRef}
      className="relative px-6 overflow-y-auto scrollbar-thin scrollbar-thumb-search-scrollbar-light dark:scrollbar-thumb-search-scrollbar-dark scrollbar-thumb-rounded-full"
    >
      <div
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        <div
          className="absolute top-0 left-0 flex flex-col w-full gap-2"
          style={{
            transform: `translateY(${items[0].start}px)`,
          }}
        >
          {items.map((virtualRow) => {
            const isLoaded = virtualRow.index <= data.length - 1;
            const item = data[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
              >
                {isLoaded && (
                  <Component
                    item={item}
                    isActive={virtualRow.index === activeIndex}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
