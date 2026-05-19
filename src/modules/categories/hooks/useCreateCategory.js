import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createCategoryService } from "../services/createCategoryService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useCreateCategory() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate, fieldError, clearError } = useFormValidation();
  const queryClient = useQueryClient();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  // Función que pasa los parámetros al service y valida la respuesta
  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await createCategoryService(form);

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
        "Por el momento no se puede crear la categoría, por favor intente nuevamente más tarde.",
      );
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleSubmit, handleChange };
}
