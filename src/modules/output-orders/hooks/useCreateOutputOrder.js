import { useState } from "react";
import { createOutputOrderService } from "../services/createOutputOrderService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateOutputOrder() {
  const [form, setForm] = useState({
    client_id: "",
    product_serials: [],
    output_product_garanty: "",
  });
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["outputOrders"] });
        openInnerModal("success", triggerButton);
      } else {
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo crear la orden de salida. inténtalo nuevamente más tarde.",
      );
      openInnerModal("error", triggerButton);
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
