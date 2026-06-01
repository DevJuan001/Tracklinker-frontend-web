import { useState } from "react";
import { enableOutputOrderService } from "../services/enableOutputOrderService";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useEnableOutputOrder(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, openInnerModal, onClose) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await enableOutputOrderService(id);

      if (response.success == true) {
        queryClient.invalidateQueries({ queryKey: ["outputOrders"] });
        onClose();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo habilitar la orden de salida. inténtalo nuevamente más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
