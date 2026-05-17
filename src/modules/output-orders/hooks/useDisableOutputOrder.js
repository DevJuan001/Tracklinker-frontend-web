import { useState } from "react";
import { disableOutputOrderService } from "../services/disableOutputOrderService";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useQueryClient } from "@tanstack/react-query";

export function useDisableOutputOrder(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, openInnerModal, onClose) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await disableOutputOrderService(id);

      if (response.success == true) {
        queryClient.invalidateQueries({ queryKey: ["outputOrders"] });
        onClose();
      } else {
        setError(error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo realizar esta acción intentalo de nuevo en un momento.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
