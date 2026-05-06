import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { createInputOrderService } from "../services/createInputOrderService";

export function useCreateInputOrder() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    supplier_id: "",
    input_order_bill: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();
    setLoading(true);

    const triggerButton = getModalTrigger(e);

    try {
      const response = await createInputOrderService(form);
      if (response.success) {
        openInnerModal("success", triggerButton);
        queryClient.invalidateQueries({ queryKey: ["inputOrders"] });
      }
    } catch (error) {
      openInnerModal("error", triggerButton);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
