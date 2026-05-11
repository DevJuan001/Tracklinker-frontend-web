import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { createSubcategory } from "../services/createSubcategorySevice";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useCreateSubcategory() {
  const [form, setForm] = useState({
    category_id: "",
    subcategory_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate, clearError, fieldError } = useFormValidation();
  const queryClient = useQueryClient();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await createSubcategory(form);

      if (response.success === true) {
        openInnerModal("success", triggerButton);
        queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      }
    } catch (error) {
      openInnerModal("error", triggerButton);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleSubmit, handleChange };
}
