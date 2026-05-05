import { useState } from "react";
import { updateWarranty } from "../services/updateWarranty";
import { useQueryClient } from "@tanstack/react-query";

const WARRANTY_NEXT_STATUS = {
  1: 2,
  2: 3,
  3: 4,
};

export function useEditWarrantyStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleStatusChange(warranty, onClose) {
    const nextStatus = WARRANTY_NEXT_STATUS[warranty.status];

    setLoading(true);
    
    try {
      const response = await updateWarranty(warranty.id, {
        status: nextStatus,
        product_serial: warranty.product_serial,
      });

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["warranties"] });
        onClose();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { handleStatusChange, loading, error };
}
