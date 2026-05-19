import { useState } from "react";

export function useFilterCategories(filters) {
  const [form, setForm] = useState({
    start_date: filters.start_date || "",
    end_date: filters.end_date || "",
    name_order: filters.name_order || "",
    status: filters.status || "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return {
    form,
    handleChange,
  };
}
