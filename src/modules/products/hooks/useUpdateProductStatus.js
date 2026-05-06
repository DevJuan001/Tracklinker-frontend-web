import { useState } from "react";
import { updateProductStatusService } from "../services/updateProductStatusService";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useUpdateProductStatus(product_data) {
  const form = product_data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, onClose, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await updateProductStatusService(form);
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        onClose();
      } else {
        openInnerModal("error", triggerButton);
        setError(response.detail)
      }
      setLoading(false);
    } catch (err) {
      openInnerModal("error", triggerButton);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleSubmit };
}
