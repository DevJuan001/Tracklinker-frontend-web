import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { createProductService } from "../services/createProductService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    input_order: "",
    subcategory: "",
    model: "",
    serial: "",
    brand: "",
    warranty_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate } = useFormValidation();

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      openInnerModal("error", triggerButton);
      return;
    }

    setLoading(true);

    try {
      const response = await createProductService(form);
      if (response.sucess) {
        openInnerModal("success", triggerButton);
        await queryClient.invalidateQueries({ queryKey: ["products"] });
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
