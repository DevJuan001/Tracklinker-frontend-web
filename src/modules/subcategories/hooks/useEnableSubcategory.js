import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { enableSubcategoryService } from "../services/enableSubcategoryService";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useEnableSubcategory(subcategory_id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, openInnerModal, onClose) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await enableSubcategoryService(subcategory_id);
      
      if (response.success === true) {
        queryClient.invalidateQueries(["subcategories"]);
        onClose();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "Por el momento no se puede habilitar la subcategoría, por favor intente nuevamente más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
