import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { editSubcategoryService } from "../services/editSubcategoryService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useEditSubcategory(subcategory) {
  const [form, setForm] = useState({
    category_id: subcategory.category_id || "",
    subcategory_name: subcategory.subcategory_name || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate, getChanges, fieldError, clearError } = useFormValidation();
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

    const changes = getChanges(subcategory, form);

    if (Object.keys(changes).length === 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await editSubcategoryService(
        subcategory.subcategory_id,
        changes,
      );
      
      if (response.success === true) {
        queryClient.invalidateQueries(["subcategories"]);
        queryClient.invalidateQueries({ queryKey: ["activeSubcategories"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "Por el momento no se puede editar la subcategoría, por favor intente nuevamente más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleSubmit, handleChange };
}
