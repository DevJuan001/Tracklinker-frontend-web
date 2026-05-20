import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { enableSupplierService } from "../services/enableSupplierService";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useEnableSupplier(supplier_id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  async function handleSubmit(e, openInnerModal, onClose) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await enableSupplierService(supplier_id);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        onClose();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "Por el momento no se puede habilitar el proveedor, por favor intente nuevamente más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
