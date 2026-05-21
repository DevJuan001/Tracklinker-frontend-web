import { useState } from "react";
import { updateProductStatusService } from "../services/updateProductStatusService";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useUpdateProductStatus(product_data) {
  const form = product_data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, openInnerModal, onClose) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await updateProductStatusService(form);
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        onClose();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
      setLoading(false);
    } catch {
      setError(
        "No se pudo editar el estado del producto. Por favor, intenta de nuevo más tarde",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleSubmit };
}
