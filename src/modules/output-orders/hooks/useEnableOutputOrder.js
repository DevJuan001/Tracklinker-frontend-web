import { useState } from "react";
import { enableOutputOrderService } from "../services/enableOutputOrderService";

export function useEnableOutputOrder(id) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await enableOutputOrderService(id);
      if (response.success == true) {
        setInnerModal("success");
      } else {
        setInnerModal("error");
      }
    } catch {
      setInnerModal("error");
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading };
}
