import { useState } from "react";
import { updateOutputOrderService } from "../services/updateOutputOrderService";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { useQueryClient } from "@tanstack/react-query";

export function useEditOutputOrder(selectedOutputOrder) {
  const [form, setForm] = useState({
    output_order_id: selectedOutputOrder.output_order_id || "",
    output_product_garanty: selectedOutputOrder.output_product_garanty || "",
    product_serial: selectedOutputOrder.product_serial || "",
    output_order_status: selectedOutputOrder.output_order_status || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate, getChanges, fieldError, clearError } = useFormValidation();

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
      openInnerModal("error", triggerButton);
      return;
    }

    const changes = getChanges(selectedOutputOrder, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerButton);
      return;
    }

    setLoading(true);

    try {
      const response = await updateOutputOrderService(
        selectedOutputOrder.output_order_id,
        changes,
      );

      if (response.success == true) {
        queryClient.invalidateQueries({ queryKey: ["outputOrders"] });
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

  return { handleChange, handleSubmit, fieldError, loading, error, form };
}
