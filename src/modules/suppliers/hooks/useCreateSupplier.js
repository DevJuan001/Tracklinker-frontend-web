import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { createSupplierService } from "../services/createSupplierService";

export function useCreateSupplier() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate } = useFormValidation();

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const buttonElement = e.currentTarget;
    const buttonRect = buttonElement.getBoundingClientRect();
    const triggerData = { currentTarget: buttonElement, rect: buttonRect };

    const isValid = validate(form);

    if (!isValid) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await createSupplierService(form);
      if (response.success === true) {
        openInnerModal("success", triggerData);
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      }
    } catch (error) {
      openInnerModal("error", triggerData);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
