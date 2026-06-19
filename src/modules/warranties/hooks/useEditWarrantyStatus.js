import { useState } from "react";
import { updateWarrantyService } from "../services/updateWarrantyService";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";

const WARRANTY_NEXT_STATUS = {
  1: 2,
  2: 3,
  3: 4,
};

export function useEditWarrantyStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleStatusChange(e, warranty, openInnerModal, onClose) {
    const nextStatus = WARRANTY_NEXT_STATUS[warranty.status];

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await updateWarrantyService(warranty.id, {
        status: nextStatus,
        product_serial: warranty.product_serial,
      });

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
        " No se pudo cambiar el estado de la garantía. Por favor, intenta de nuevo más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { handleStatusChange, loading, error };
}
