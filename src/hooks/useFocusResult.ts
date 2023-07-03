import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { match } from "ts-pattern";

type GetPageResult<T, TData> = (index: number, array: T[]) => TData[];
type GetUrl<TData> = (index: number, array: TData[]) => string;

type UseFocusResultProps<T, TData> = {
  pages: T[];
  getPageResult: GetPageResult<T, TData>;
  getUrl: GetUrl<TData>;
};

export const changePageActions = {
  NEXT: "NEXT",
  PREV: "PREV",
  FIRST: "FIRST",
} as const;

type ChangePageAction = {
  type: keyof typeof changePageActions;
  changePage: boolean;
};

type FocusedIndex = {
  page: number;
  result: number;
};

export const useActiveResult = <T, TData>({
  pages,
  getPageResult,
  getUrl,
}: UseFocusResultProps<T, TData>) => {
  const [focusedIndex, dispatch] = useControlFocusReducer(pages, getPageResult);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const pageResults = getPageResult(focusedIndex.page, pages);

      match(event.key)
        .with("ArrowDown", () => {
          dispatch({
            type: changePageActions.NEXT,
            changePage: focusedIndex.result === pageResults.length - 1,
          });
        })
        .with("ArrowUp", () => {
          dispatch({
            type: changePageActions.PREV,
            changePage: focusedIndex.result === 0,
          });
        })
        .with("Enter", () => {
          const url = getUrl(focusedIndex.result, pageResults);
          router.push(url);
        })
        .otherwise(() => {
          throw new Error("Unhandled key");
        });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, getPageResult, pages, dispatch, router, getUrl]);

  return {
    focusedPage: focusedIndex.page,
    focusedResult: focusedIndex.result,
    dispatch,
  };
};

const useControlFocusReducer = <T, TData>(
  pages: T[],
  getPageResult: GetPageResult<T, TData>
) => {
  return useReducer(
    (state: FocusedIndex, action: ChangePageAction) => {
      return match(action)
        .with({ type: changePageActions.NEXT, changePage: true }, () => ({
          page: (state.page + 1) % pages.length,
          result: 0,
        }))
        .with({ type: changePageActions.NEXT, changePage: false }, () => ({
          page: state.page,
          result: state.result + 1,
        }))
        .with({ type: changePageActions.PREV, changePage: true }, () => {
          const page = state.page === 0 ? pages.length - 1 : state.page - 1;
          const newPageResults = getPageResult(page, pages);
          const result = newPageResults.length - 1;
          return { page, result };
        })
        .with({ type: changePageActions.PREV, changePage: false }, () => ({
          page: state.page,
          result: state.result - 1,
        }))
        .with({ type: changePageActions.FIRST }, () => ({
          page: 0,
          result: 0,
        }))
        .exhaustive();
    },
    { page: 0, result: 0 }
  );
};
