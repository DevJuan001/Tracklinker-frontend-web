import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { updateOutputOrderService } from "../services/updateOutputOrderService";

export function useEditOutputOrder(selectedOutputOrder) {
  const [form, setForm] = useState({
    client_id: selectedOutputOrder?.client?.client_id || "" ,
    output_order_id: selectedOutputOrder?.output_order_id || "",
    output_product_garanty:
      selectedOutputOrder?.products?.[0]?.output_product_garanty || "",
    product_serials:
      selectedOutputOrder?.products?.map((product) => product.product_serial) ??
      [],
    output_order_status: selectedOutputOrder?.output_order_status || "",
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
    delete changes.product_serials;

    const originalSerials =
      selectedOutputOrder?.products?.map((product) => product.product_serial) ??
      [];
    const newSerials = form.product_serials;
    const serialsChanged =
      originalSerials.length !== newSerials.length ||
      originalSerials.some((s, i) => s !== newSerials[i]);

    if (serialsChanged) {
      changes.product_serials = newSerials;
    }

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerButton);
      return;
    }

    setLoading(true);

    try {
      const response = await updateOutputOrderService(
        selectedOutputOrder.output_order_id,
        {
          ...changes,
          output_product_garanty: form.output_product_garanty,
        },
      );

      if (response.success == true) {
        queryClient.invalidateQueries({ queryKey: ["outputOrders"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo editar la orden de salida. inténtalo nuevamente más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, form, handleChange, handleSubmit, fieldError };
}
