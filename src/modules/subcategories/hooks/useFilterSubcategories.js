import { useState } from "react";

export function useFilterSubcategories(filters) {
  const [form, setForm] = useState({
    start_date: filters.start_date || "",
    end_date: filters.end_date || "",
    category_order: filters.category_order || "",
    status: filters.status || "",
    name_order: filters.name_order || "",
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
