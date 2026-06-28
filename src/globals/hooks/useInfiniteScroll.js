import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useInfiniteScroll({ hasNextPage, fetchNextPage, options }) {
  const { ref, inView } = useInView(options);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return { ref };
}
