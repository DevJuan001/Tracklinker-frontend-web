import { useState } from "react";

export function useFilterWarranties() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    status: "",
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
