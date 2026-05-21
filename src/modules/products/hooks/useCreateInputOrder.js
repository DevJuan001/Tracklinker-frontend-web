import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { createInputOrderService } from "../services/createInputOrderService";

export function useCreateInputOrder() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    supplier_id: "",
    input_order_bill: "",
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
      const response = await createInputOrderService(form);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["inputOrders"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo crear la orden de entrada. Por favor, intenta de nuevo más tarde",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleChange, handleSubmit };
}
