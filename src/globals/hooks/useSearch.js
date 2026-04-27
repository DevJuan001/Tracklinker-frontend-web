import { useMemo } from "react";

export function useSearch(data, search) {
  return useMemo(() => {
    if (!search) return data;

    const text = search.toLowerCase();

    return (data || []).filter((item) =>
      Object.values(item).some((value) =>
        (value?.toString().toLowerCase() || "").includes(text),
      ),
    );
  }, [data, search]);
}
