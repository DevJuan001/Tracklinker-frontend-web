import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { createProductModelService } from "../services/createProductModelService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useCreateProductModel() {
  const [form, setForm] = useState({
    brand_id: "",
    model: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate, fieldError, clearError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) return;

    setLoading(true);

    try {
      const response = await createProductModelService(form);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["models"] });
        openInnerModal("success", triggerButton);
      }
    } catch (error) {
      setError(error);
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleChange, handleSubmit };
}
