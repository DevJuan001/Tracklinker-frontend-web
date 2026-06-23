import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { createOutputOrderService } from "../services/createOutputOrderService";

export function useCreateOutputOrder(serial) {
  const [form, setForm] = useState({
    client_id: "",
    product_serials: serial ? [serial] : [],
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
        await queryClient.invalidateQueries({ queryKey: ["outputOrders"] });
        await queryClient.invalidateQueries({ queryKey: ["products"] });
        await queryClient.invalidateQueries({ queryKey: ["productsByStatus"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(response.error)
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
