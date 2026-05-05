import { useState } from "react";
import { disableWarranty } from "../services/disableWarranty";
import { useQueryClient } from "@tanstack/react-query";

export function useDisableWarranty(warranty) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, onClose) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await disableWarranty(
        warranty.id,
        warranty.product_serial,
      );
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["warranties"] });
        onClose();
      } else {
        onClose();
      }
    } catch (error) {
      onClose();
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading, error };
}
