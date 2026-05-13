import { useState } from "react";
import { disableOutputOrderService } from "../services/disableOutputOrderService";

export function useDisableOutputOrder(Id) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await disableOutputOrderService(Id);
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
