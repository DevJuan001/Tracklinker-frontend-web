import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { disableWarrantyService } from "../services/disableWarrantyService";

export function useDisableWarranty(warranty) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, openInnerModal, onClose) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await disableWarrantyService(
        warranty.id,
        warranty.product_serial,
      );

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["warranties"] });
        queryClient.invalidateQueries({ queryKey: ["warrantiesByStatus"] });
        onClose();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo deshabilitar la garantía. Por favor, intenta de nuevo más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading, error };
}
