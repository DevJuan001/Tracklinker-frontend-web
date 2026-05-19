import { useState } from "react";
import { disableCategoryService } from "../services/disableCategoryService";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useDisableCategory(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  // Función que envía el ID al service y maneja la respuesta
  async function handleDisable(e, openInnerModal, onClose) {
    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await disableCategoryService(id);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        onClose();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      openInnerModal("error", triggerButton);
      setError(
        "Por el momento no se puede deshabilitar la categoría, por favor intente nuevamente más tarde.",
      );
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleDisable };
}
