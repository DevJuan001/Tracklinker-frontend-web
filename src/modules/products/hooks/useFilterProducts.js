import { useState } from "react";

export function useFilterProducts(filters) {
  const [form, setForm] = useState({
      start_date: filters.start_date || "",
      end_date: filters.end_date || "",
      category_order: filters.category_order || "",
      subcategory_order: filters.subcategory_order || "",
      warranty_time: filters.warranty_time || "",
      brand: filters.brand || "",
      input_order: filters.input_order || "",
      product_model: filters.product_model || "",
      product_status: filters.product_status || "",
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
