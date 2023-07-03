import { useEffect, useReducer } from "react";
import { match } from "ts-pattern";

type GetPageResult<T> = (index: number, array: T[]) => unknown[];

type UseFocusResultProps<T> = {
  pages: T[];
  getPageResult: GetPageResult<T>;
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

export const useActiveResult = <T>({
  pages,
  getPageResult,
}: UseFocusResultProps<T>) => {
  const [focusedIndex, dispatch] = useControlFocusReducer(pages, getPageResult);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const pageResults = getPageResult(focusedIndex.page, pages);
      if (event.key === "ArrowDown") {
        dispatch({
          type: changePageActions.NEXT,
          changePage: focusedIndex.result === pageResults.length - 1,
        });
      } else {
        dispatch({
          type: changePageActions.PREV,
          changePage: focusedIndex.result === 0,
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, getPageResult, pages, dispatch]);

  return {
    focusedPage: focusedIndex.page,
    focusedResult: focusedIndex.result,
    dispatch,
  };
};

const useControlFocusReducer = <T>(
  pages: T[],
  getPageResult: GetPageResult<T>
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
