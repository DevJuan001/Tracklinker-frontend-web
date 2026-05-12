import { useState } from "react";
import { createOutputOrderService } from "../services/createOutputOrderService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useCreateOutputOrder() {
  const [form, setForm] = useState({
    product_serial: "",
    output_product_garanty: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      const response = await createOutputOrderService(form);
      if (response.success == true) {
        openInnerModal("success", triggerButton);
      } else {
        openInnerModal("error", triggerButton);
      }
    } catch (error) {
      openInnerModal("error", triggerButton);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    error,
    fieldError,
    handleChange,
    handleSubmit,
  };
}
