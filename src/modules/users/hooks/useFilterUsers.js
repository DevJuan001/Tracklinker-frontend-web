import { useState } from "react";

export function useFilterUsers(filters) {
  const [form, setForm] = useState({
    role_order: filters?.role_order || "",
    name_order: filters?.name_order || "",
    start_date: filters?.start_date || "",
    end_date: filters?.end_date || "",
    city: filters?.city || "",
    status: filters?.status || "",
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
