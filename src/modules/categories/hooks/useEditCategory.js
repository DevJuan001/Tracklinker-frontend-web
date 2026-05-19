import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { editCategoryService } from "../services/editCategoryService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useEditCategory(category) {
  const [form, setForm] = useState({
    name: category.name || "",
    description: category.description || "",
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

  // Función que envía los datos al service y maneja la respuesta
  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    const changes = getChanges(category, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerButton);
      return;
    }

    setLoading(true);

    try {
      const response = await editCategoryService(category.id, changes);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      openInnerModal("error", triggerButton);
      setError(
        "Por el momento no se puede editar la categoría, por favor intente nuevamente más tarde.",
      );
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleSubmit, handleChange };
}
