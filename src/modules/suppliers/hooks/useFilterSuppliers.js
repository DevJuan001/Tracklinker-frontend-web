import { useState } from "react";

export function useFilterSuppliers(filters) {
  const [form, setForm] = useState({
    start_date: filters.start_date || "",
    end_date: filters.end_date || "",
    status: filters.status || "",
    name_order: filters.name_order || "",
    city: filters.city || "",
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
