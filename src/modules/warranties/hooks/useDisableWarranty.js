import { useState } from "react";
import { disableWarranty } from "../services/disableWarranty";

export function useDisableWarranty(warrantyId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e, onClose) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await disableWarranty(warrantyId);
      if (response.success === true) {
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
