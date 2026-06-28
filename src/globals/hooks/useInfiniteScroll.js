import { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

export function useInfiniteScroll({ items, hasNextPage, fetchNextPage, options }) {
  const { ref, inView } = useInView(options);
  const total = items?.length ?? 0;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const getItemRef = useCallback(
    (index) => (index === total - 1 ? ref : undefined),
    [ref, total],
  );

  return { getItemRef };
}
